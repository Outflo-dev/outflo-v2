/*
 * OUTFLO — EARTH SCIENTIFIC ADMISSION
 *
 * Earth owns scientific identity and source claims.
 * Original evidence remains in private cloud storage.
 * Machine mathematics and Proof remain separate.
 *
 * --preview : read and discover, no writes
 * --commit  : admit, then verify persisted claims
 */

import { createHash } from "node:crypto";
import { XMLParser, XMLValidator } from "fast-xml-parser";
import { createTrustedSupabaseClient } from
  "../../../lib/supabase/trusted/createTrustedSupabaseClient";

const BUCKET = "earth-evidence";
const PAGE = 500;
const BATCH = 100;

type RecordValue = Record<string, any>;

type Claim = {
  type: string;
  id: string;
  parentId: string | null;
  receiptId: string;
  element: RecordValue;
};

function obj(v: unknown): v is RecordValue {
  return v !== null && typeof v === "object" &&
    !Array.isArray(v);
}

function sha256(bytes: Buffer): string {
  return createHash("sha256").update(bytes).digest("hex");
}

function key(type: string, id: string): string {
  return JSON.stringify([type, id]);
}

/*
 * Keep measurements and source references.
 * Nested independently identified units are represented
 * by identity; their own source claims are admitted separately.
 * The untouched XML remains the original evidence.
 */
function claimBody(value: unknown, root = true): unknown {
  if (Array.isArray(value)) {
    return value.map(v => claimBody(v, false));
  }

  if (!obj(value)) return value;

  if (!root && typeof value["@_publicID"] === "string") {
    return { "@_publicID": value["@_publicID"] };
  }

  return Object.fromEntries(
    Object.entries(value).map(
      ([k, v]) => [k, claimBody(v, false)]
    )
  );
}

function discover(
  value: unknown,
  tag: string,
  parentId: string | null,
  receiptId: string,
  claims: Claim[]
): void {
  if (Array.isArray(value)) {
    for (const item of value) {
      discover(item, tag, parentId, receiptId, claims);
    }
    return;
  }

  if (!obj(value)) return;

  const publicId = value["@_publicID"];
  const identified =
    typeof publicId === "string" && publicId.length > 0;

  const scientific =
    identified &&
    tag !== "eventParameters" &&
    tag !== "quakeml";

  if (scientific) {
    claims.push({
      type: tag,
      id: publicId,
      parentId,
      receiptId,
      element: claimBody(value) as RecordValue
    });
  }

  const nextParent = scientific ? publicId : parentId;

  for (const [name, child] of Object.entries(value)) {
    if (name.startsWith("@_") || name === "#text") continue;
    discover(child, name, nextParent, receiptId, claims);
  }
}

function canonical(value: unknown): string {
  if (Array.isArray(value)) {
    return "[" + value.map(canonical).join(",") + "]";
  }

  if (obj(value)) {
    return "{" + Object.keys(value).sort().map(
      k => JSON.stringify(k) + ":" + canonical(value[k])
    ).join(",") + "}";
  }

  return JSON.stringify(value);
}

async function main() {
  const [eventId, collectionId, mode = "--preview"] =
    process.argv.slice(2);

  if (
    !eventId ||
    !/^[A-Za-z0-9_-]+$/.test(eventId) ||
    !collectionId ||
    !/^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i
      .test(collectionId) ||
    !["--preview", "--commit"].includes(mode)
  ) {
    throw new Error(
      "Expected event ID, collection UUID, --preview or --commit"
    );
  }

  const db = createTrustedSupabaseClient();

  const eventRead = await db.from("earth_events")
    .select("event_id")
    .eq("event_id", eventId)
    .single();

  if (eventRead.error || eventRead.data?.event_id !== eventId) {
    throw new Error("Earth event identity must be admitted first");
  }

  // Read all source receipts, not an assumed file count.
  const receipts: RecordValue[] = [];

  for (let offset = 0; ; offset += PAGE) {
    const result = await db.from("earth_source_receipts")
      .select("*")
      .eq("collection_id", collectionId)
      .eq("event_id", eventId)
      .order("receipt_id")
      .range(offset, offset + PAGE - 1);

    if (result.error) throw result.error;

    receipts.push(...(result.data ?? []));

    if ((result.data?.length ?? 0) < PAGE) break;
  }

  if (!receipts.length) {
    throw new Error("No persisted source evidence found");
  }

  const sources = new Map<
    string,
    { receipt: RecordValue; bytes: Buffer }
  >();

  for (const receipt of receipts) {
    if (
      receipt.source_provider !== "USGS" ||
      receipt.storage_bucket !== BUCKET ||
      sources.has(receipt.source_url)
    ) {
      throw new Error("Invalid or duplicate source receipt");
    }

    const read = await db.storage.from(BUCKET)
      .download(receipt.storage_path);

    if (read.error || !read.data) {
      throw read.error ?? new Error("Cloud evidence missing");
    }

    const bytes = Buffer.from(
      await read.data.arrayBuffer()
    );

    if (
      bytes.length !== Number(receipt.byte_length) ||
      sha256(bytes) !== receipt.sha256
    ) {
      throw new Error("Source evidence integrity failure");
    }

    sources.set(receipt.source_url, { receipt, bytes });
  }

  // The stored event detail determines which files belong
  // to this collection.
  const detailUrl =
    `https://earthquake.usgs.gov/earthquakes/feed/v1.0/detail/${eventId}.geojson`;

  const detailBytes = sources.get(detailUrl)?.bytes;

  if (!detailBytes) {
    throw new Error("Preserved event detail missing");
  }

  const detail = JSON.parse(detailBytes.toString("utf8"));

  if (detail.type !== "Feature" || detail.id !== eventId) {
    throw new Error("Unexpected source event identity");
  }

  const expected = new Set<string>([detailUrl]);

  for (const versions of Object.values(
    detail.properties?.products ?? {}
  )) {
    if (!Array.isArray(versions)) {
      throw new Error("Malformed source product list");
    }

    for (const product of versions) {
      for (const content of Object.values(
        product.contents ?? {}
      )) {
        if (!obj(content) || typeof content.url !== "string") {
          throw new Error("Malformed source attachment");
        }

        expected.add(content.url);
      }
    }
  }

  if (
    expected.size !== sources.size ||
    [...expected].some(url => !sources.has(url))
  ) {
    throw new Error("Incomplete source collection");
  }

  const parser = new XMLParser({
    ignoreAttributes: false,
    removeNSPrefix: true,
    attributeNamePrefix: "@_",
    parseTagValue: false,
    parseAttributeValue: false,
    trimValues: false,
    processEntities: false
  });

  const claims: Claim[] = [];
    const duplicates: Array<{
      sourceUrl: string;
      unitType: string;
      publicId: string;
      parentId: string | null;
    }> = [];

  for (const [url, source] of sources) {
    const xmlSource =
      new URL(url).pathname.toLowerCase().endsWith(".xml") ||
      String(source.receipt.media_type ?? "")
        .toLowerCase().includes("xml");

    if (!xmlSource) continue;

    const xml = source.bytes.toString("utf8");

    if (XMLValidator.validate(xml) !== true) {
      throw new Error(`Invalid scientific XML: ${url}`);
    }

    const found: Claim[] = [];

    discover(
      parser.parse(xml),
      "document",
      null,
      source.receipt.receipt_id,
      found
    );

    const seen = new Set<string>();

    for (const claim of found) {
      const identity = key(claim.type, claim.id);

      if (seen.has(identity)) {
        duplicates.push({
          sourceUrl: url,
          unitType: claim.type,
          publicId: claim.id,
          parentId: claim.parentId
        });
      }

      seen.add(identity);
      claims.push(claim);
    }
  }

  const identities = new Map<string, Claim>();
  const types: Record<string, number> = {};

  for (const claim of claims) {
    const identity = key(claim.type, claim.id);

    if (!identities.has(identity)) {
      identities.set(identity, claim);
      types[claim.type] = (types[claim.type] ?? 0) + 1;
    }
  }

  const summary = {
    eventId,
    collectionId,
    verifiedSourceFiles: receipts.length,
    distinctScientificIdentities: identities.size,
    sourceClaimAssociations: claims.length,
      repeatedWithinSource: duplicates.length,
      repeatedExamples: duplicates.slice(0, 8),
    identityTypes: types
  };

  if (mode === "--preview") {
    console.log("=== EARTH SCIENTIFIC ADMISSION PREVIEW ===");
    console.log(JSON.stringify({
      ...summary,
      databaseWrites: 0
    }, null, 2));
    return;
  }

  // Persist identities without rewriting existing ones.
  const unitRows = [...identities.values()].map(claim => ({
    event_id: eventId,
    unit_type: claim.type,
    source_public_id: claim.id
  }));

  for (let i = 0; i < unitRows.length; i += BATCH) {
    const result = await db.from("earth_scientific_units")
      .upsert(unitRows.slice(i, i + BATCH), {
        onConflict: "event_id,unit_type,source_public_id",
        ignoreDuplicates: true
      });

    if (result.error) throw result.error;
  }

  const unitIds = new Map<string, string>();

  for (let offset = 0; ; offset += PAGE) {
    const result = await db.from("earth_scientific_units")
      .select("unit_id,unit_type,source_public_id")
      .eq("event_id", eventId)
      .order("unit_id")
      .range(offset, offset + PAGE - 1);

    if (result.error) throw result.error;

    for (const unit of result.data ?? []) {
      unitIds.set(
        key(unit.unit_type, unit.source_public_id),
        unit.unit_id
      );
    }

    if ((result.data?.length ?? 0) < PAGE) break;
  }

  const occurrenceCounts = new Map<string, number>();

    const evidenceRows = claims.map(claim => {
    const unitId = unitIds.get(
      key(claim.type, claim.id)
    );

    if (!unitId) {
      throw new Error("Persisted scientific identity missing");
    }

    const slot = key(unitId, claim.receiptId);
      const ordinal = (occurrenceCounts.get(slot) ?? 0) + 1;
      occurrenceCounts.set(slot, ordinal);

      return {
        unit_id: unitId,
        source_receipt_id: claim.receiptId,
        occurrence_ordinal: ordinal,
        source_claim: {
        unitType: claim.type,
        sourcePublicId: claim.id,
        parentPublicId: claim.parentId,
        sourceElement: claim.element
      }
    };
  });

  for (let i = 0; i < evidenceRows.length; i += BATCH) {
    const result = await db
      .from("earth_scientific_unit_evidence")
      .upsert(evidenceRows.slice(i, i + BATCH), {
        onConflict: "unit_id,source_receipt_id,occurrence_ordinal",
        ignoreDuplicates: true
      });

    if (result.error) throw result.error;
  }

  // Read back and compare actual claims.
  const persisted = new Map<string, unknown>();

  for (const receipt of receipts) {
    for (let offset = 0; ; offset += PAGE) {
      const result = await db
        .from("earth_scientific_unit_evidence")
        .select("unit_id,source_receipt_id,occurrence_ordinal,source_claim")
        .eq("source_receipt_id", receipt.receipt_id)
        .order("evidence_id")
        .range(offset, offset + PAGE - 1);

      if (result.error) throw result.error;

      for (const row of result.data ?? []) {
        persisted.set(
          key(row.unit_id, row.source_receipt_id) + ":" + row.occurrence_ordinal,
          row.source_claim
        );
      }

      if ((result.data?.length ?? 0) < PAGE) break;
    }
  }

  if (persisted.size !== evidenceRows.length) {
    throw new Error("Persisted claim count mismatch");
  }

  for (const row of evidenceRows) {
    const saved = persisted.get(
      key(row.unit_id, row.source_receipt_id) + ":" + row.occurrence_ordinal
    );

    if (
      !saved ||
      canonical(saved) !== canonical(row.source_claim)
    ) {
      throw new Error("Scientific claim readback mismatch");
    }
  }

  console.log("=== EARTH SCIENTIFIC ADMISSION ===");
  console.log(JSON.stringify({
    ...summary,
    verifiedClaimReadbacks: persisted.size,
    verdict: "admitted-and-read-back",
    machineProof: false
  }, null, 2));
}

main().catch(error => {
  console.error("EARTH SCIENTIFIC ADMISSION FAILED:", error);
  process.exitCode = 1;
});
