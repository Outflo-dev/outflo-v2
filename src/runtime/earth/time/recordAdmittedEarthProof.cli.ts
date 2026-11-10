/*
 * OUTFLO — RECORD ADMITTED EARTH PROOF
 *
 * Earth owns evidence composition and persistence.
 * Proof owns verification.
 * Machine owns canonical mathematics.
 *
 * Records an immutable snapshot of an already
 * composed and verified Earth operation.
 */

import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { createTrustedSupabaseClient } from
  "../../../lib/supabase/trusted/createTrustedSupabaseClient";

function canonical(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(canonical);
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([key, item]) => [key, canonical(item)])
    );
  }

  return value;
}

function equal(a: unknown, b: unknown): boolean {
  return JSON.stringify(canonical(a)) ===
    JSON.stringify(canonical(b));
}

const expectedChecks = new Set([
  "observation-order",
  "raw-span",
  "declared-exclusions",
  "protected-entrance",
  "protected-completion",
  "protected-interior",
  "first-canonical-instant",
  "second-canonical-instant",
  "canonical-duration",
]);

async function main() {
  const [eventId, collectionId, filename] =
    process.argv.slice(2);

  if (
    !eventId ||
    !/^[A-Za-z0-9_-]+$/.test(eventId) ||
    !collectionId ||
    !/^[0-9a-f-]{36}$/i.test(collectionId) ||
    !filename
  ) {
    throw new Error(
      "Expected event ID, collection UUID, and JSON file"
    );
  }

  const candidate = JSON.parse(
    await readFile(filename, "utf8")
  );

  const intervals = candidate.intervals;

  if (
    candidate.eventId !== eventId ||
    candidate.collectionId !== collectionId ||
    candidate.verdict !== "verified-temporal-relationships" ||
    candidate.proofPersisted !== false ||
    !Array.isArray(intervals) ||
    intervals.length === 0 ||
    intervals.length !== candidate.arrivalRelationships ||
    intervals.length !== candidate.verifiedIntervals
  ) {
    throw new Error("Invalid Earth composition");
  }

  for (const interval of intervals) {
    const checks = interval.verification?.checks;

    if (
      interval.verification?.verdict !== "verified" ||
      !Array.isArray(checks) ||
      checks.length !== 9 ||
      new Set(checks.map((c: { check: string }) =>
        c.check
      )).size !== 9 ||
      !checks.every(
        (c: { check: string; result: string }) =>
          expectedChecks.has(c.check) &&
          c.result === "pass"
      )
    ) {
      throw new Error("Invalid primitive verification");
    }
  }

  const db = createTrustedSupabaseClient();

  const receiptResult = await db
    .from("earth_source_receipts")
    .select(
      "receipt_id,event_id,collection_id,sha256,byte_length,storage_bucket,storage_path"
    )
    .eq("event_id", eventId)
    .eq("collection_id", collectionId)
    .order("receipt_id");

  if (receiptResult.error) throw receiptResult.error;

  const receipts = receiptResult.data ?? [];

  const unitResult = await db
    .from("earth_scientific_units")
    .select("unit_id,event_id,unit_type,source_public_id")
    .eq("event_id", eventId)
    .order("unit_id");

  if (unitResult.error) throw unitResult.error;

  const units = unitResult.data ?? [];

  if (!receipts.length || !units.length) {
    throw new Error("Persisted scientific evidence missing");
  }

  const claims: Array<{
    evidence_id: string;
    unit_id: string;
    source_receipt_id: string;
    occurrence_ordinal: number;
    source_claim: unknown;
  }> = [];

  const ids = units.map(u => u.unit_id);

  for (let i = 0; i < ids.length; i += 100) {
    for (let offset = 0; ; offset += 500) {
      const result = await db
        .from("earth_scientific_unit_evidence")
        .select("evidence_id,unit_id,source_receipt_id,occurrence_ordinal,source_claim")
        .in("unit_id", ids.slice(i, i + 100))
        .order("evidence_id")
        .range(offset, offset + 499);

      if (result.error) throw result.error;

      const page = result.data ?? [];
      claims.push(...page);

      if (page.length < 500) break;
    }
  }

  claims.sort((a, b) =>
    a.evidence_id < b.evidence_id ? -1 :
    a.evidence_id > b.evidence_id ? 1 : 0
  );

  const receiptIds = new Set(
    receipts.map(r => r.receipt_id)
  );

  if (
    units.length !== candidate.admittedScientificUnits ||
    claims.length !== candidate.admittedSourceClaims ||
    claims.some(c => !receiptIds.has(c.source_receipt_id))
  ) {
    throw new Error("Scientific evidence count or ownership mismatch");
  }

  for (const interval of intervals) {
    const refs = interval.sourceReceipts;

    if (
      !refs ||
      !["arrival", "origin", "pick"].every(key =>
        Array.isArray(refs[key]) &&
        refs[key].length > 0 &&
        refs[key].every(
          (id: string) => receiptIds.has(id)
        )
      )
    ) {
      throw new Error("Invalid source receipt reference");
    }
  }

  const manifest = {
    eventId,
    collectionId,
    receipts,
    units,
    claims,
  };

  const manifestSha256 = createHash("sha256")
    .update(JSON.stringify(canonical(manifest)))
    .digest("hex");

  const recorded = await db.rpc(
    "record_earth_proof_snapshot_v1",
    {
      p_event_id: eventId,
      p_collection_id: collectionId,
      p_manifest_sha256: manifestSha256,
      p_source_manifest: manifest,
      p_intervals: intervals,
      p_verdict: "verified",
    }
  );

  if (recorded.error) throw recorded.error;

  const proofId = recorded.data;

  const readback = await db
    .from("earth_proof_snapshots_v1")
    .select(
      "proof_id,manifest_sha256,source_manifest,intervals,verdict"
    )
    .eq("proof_id", proofId)
    .single();

  if (readback.error) throw readback.error;

  const saved = readback.data;

  if (
    !saved ||
    saved.manifest_sha256 !== manifestSha256 ||
    saved.verdict !== "verified" ||
    !equal(saved.source_manifest, manifest) ||
    !equal(saved.intervals, intervals)
  ) {
    throw new Error("Immutable Earth Proof readback mismatch");
  }

  console.log(JSON.stringify({
    operation: "record-admitted-earth-proof-v1",
    proofId,
    eventId,
    collectionId,
    manifestSha256,
    sourceReceipts: receipts.length,
    scientificIdentities: units.length,
    sourceClaims: claims.length,
    verifiedIntervals: intervals.length,
    passingChecks: intervals.length * 9,
    verdict: "persisted-and-read-back",
    independentReplay: false
  }, null, 2));
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
