/*
 * OUTFLO — EARTH EVENT ADMISSION
 *
 * Admit one USGS event identity from verified,
 * previously persisted source evidence.
 *
 * Source receipts own evidence.
 * Earth owns scientific identity.
 * Machine owns temporal mathematics.
 */

import { createHash } from "node:crypto";
import { createTrustedSupabaseClient } from
  "../../../lib/supabase/trusted/createTrustedSupabaseClient";

async function main() {
  const [eventId, collectionId] = process.argv.slice(2);

  if (
    !eventId ||
    !/^[A-Za-z0-9_-]+$/.test(eventId) ||
    !collectionId ||
    !/^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i
      .test(collectionId)
  ) {
    throw new Error("Expected event ID and collection UUID");
  }

  const db = createTrustedSupabaseClient();

  const detailUrl =
    `https://earthquake.usgs.gov/earthquakes/feed/v1.0/detail/${eventId}.geojson`;

  const { data: receipt, error: receiptError } = await db
    .from("earth_source_receipts")
    .select("*")
    .eq("collection_id", collectionId)
    .eq("event_id", eventId)
    .eq("source_url", detailUrl)
    .single();

  if (receiptError || !receipt) {
    throw receiptError ?? new Error("Source receipt missing");
  }

  if (
    receipt.source_provider !== "USGS" ||
    receipt.storage_bucket !== "earth-evidence" ||
    receipt.product_type !== null
  ) {
    throw new Error("Unexpected source provenance");
  }

  const downloaded = await db.storage
    .from("earth-evidence")
    .download(receipt.storage_path);

  if (downloaded.error || !downloaded.data) {
    throw downloaded.error ?? new Error("Source unavailable");
  }

  const bytes = Buffer.from(
    await downloaded.data.arrayBuffer()
  );

  const sha256 = createHash("sha256")
    .update(bytes)
    .digest("hex");

  if (
    sha256 !== receipt.sha256 ||
    bytes.length !== Number(receipt.byte_length)
  ) {
    throw new Error("Source evidence integrity failure");
  }

  const event = JSON.parse(bytes.toString("utf8"));

  if (event.type !== "Feature" || event.id !== eventId) {
    throw new Error("Source event identity mismatch");
  }

  const previous = await db
    .from("earth_events")
    .select("event_id,first_evidence_receipt_id")
    .eq("event_id", eventId)
    .maybeSingle();

  if (previous.error) throw previous.error;

  if (!previous.data) {
    const inserted = await db
      .from("earth_events")
      .insert({
        event_id: eventId,
        first_evidence_receipt_id: receipt.receipt_id,
      });

    if (inserted.error && inserted.error.code !== "23505") {
      throw inserted.error;
    }
  }

  const { data: admitted, error: readError } = await db
    .from("earth_events")
    .select("event_id,first_evidence_receipt_id,admitted_at")
    .eq("event_id", eventId)
    .single();

  if (readError || !admitted) {
    throw readError ?? new Error("Event readback failed");
  }

  const originalReceipt = await db
    .from("earth_source_receipts")
    .select("event_id,source_provider,source_url")
    .eq("receipt_id", admitted.first_evidence_receipt_id)
    .single();

  if (
    originalReceipt.error ||
    originalReceipt.data?.event_id !== eventId ||
    originalReceipt.data?.source_provider !== "USGS" ||
    originalReceipt.data?.source_url !== detailUrl
  ) {
    throw new Error("Admitted event provenance mismatch");
  }

  console.log("=== EARTH EVENT ADMISSION ===");
  console.log(JSON.stringify({
    eventId: admitted.event_id,
    firstEvidenceReceiptId: admitted.first_evidence_receipt_id,
    admittedAt: admitted.admitted_at,
    sourceIntegrity: "verified",
    persistedIdentity: "verified",
    alreadyExisted: Boolean(previous.data),
    scientificUnitsAdmitted: false,
    machineProof: false
  }, null, 2));
}

main().catch(error => {
  console.error("EARTH ADMISSION FAILED:", error);
  process.exitCode = 1;
});
