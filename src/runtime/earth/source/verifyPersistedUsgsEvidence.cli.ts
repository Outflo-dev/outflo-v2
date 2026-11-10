/*
 * OUTFLO — EARTH EVIDENCE VERIFICATION
 *
 * Independently reads persisted source evidence.
 * Verifies bytes, checksums, identities, and completeness.
 *
 * No writes. No Machine Proof claim.
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
  !/^[0-9a-f-]{36}$/i.test(collectionId)
) {
  throw new Error("Expected event ID and collection UUID");
}

const db = createTrustedSupabaseClient();
const storage = db.storage.from("earth-evidence");

const { data: receipts, error } = await db
  .from("earth_source_receipts")
  .select("*")
  .eq("collection_id", collectionId);

if (error) throw error;
if (!receipts?.length) {
  throw new Error("No receipts for this collection");
}

const { data: bucket, error: bucketError } =
  await db.storage.getBucket("earth-evidence");

if (bucketError || !bucket || bucket.public !== false) {
  throw new Error("Private Earth bucket verification failed");
}

const sha256 = (bytes: Buffer) =>
  createHash("sha256").update(bytes).digest("hex");

const detailUrl =
  `https://earthquake.usgs.gov/earthquakes/feed/v1.0/detail/${eventId}.geojson`;

const seenUrls = new Set<string>();
const seenPaths = new Set<string>();
let detailBytes: Buffer | undefined;
let totalBytes = 0;

for (const receipt of receipts) {
  if (
    receipt.event_id !== eventId ||
    receipt.storage_bucket !== "earth-evidence" ||
    !receipt.retrieved_at
  ) {
    throw new Error("Invalid source receipt identity/provenance");
  }

  if (
    seenUrls.has(receipt.source_url) ||
    seenPaths.has(receipt.storage_path)
  ) {
    throw new Error("Duplicate source URL or storage path");
  }

  seenUrls.add(receipt.source_url);
  seenPaths.add(receipt.storage_path);

  const downloaded = await storage.download(
    receipt.storage_path
  );

  if (downloaded.error || !downloaded.data) {
    throw downloaded.error ??
      new Error("Stored evidence unavailable");
  }

  const bytes = Buffer.from(
    await downloaded.data.arrayBuffer()
  );

  if (
    bytes.length !== Number(receipt.byte_length) ||
    sha256(bytes) !== receipt.sha256
  ) {
    throw new Error(
      `Persisted evidence verification failed: ${receipt.source_url}`
    );
  }

  totalBytes += bytes.length;

  if (receipt.source_url === detailUrl) {
    if (receipt.product_type !== null) {
      throw new Error("Event detail classified incorrectly");
    }
    detailBytes = bytes;
  }
}

if (!detailBytes) {
  throw new Error("Event detail missing from collection");
}

const event = JSON.parse(detailBytes.toString("utf8"));

if (event.type !== "Feature" || event.id !== eventId) {
  throw new Error("Stored event identity mismatch");
}

const expectedUrls = new Set<string>([detailUrl]);
let advertisedReferences = 0;

for (const versions of Object.values(
  event.properties?.products ?? {}
)) {
  if (!Array.isArray(versions)) {
    throw new Error("Malformed scientific product collection");
  }

  for (const product of versions) {
    for (const content of Object.values(
      product.contents ?? {}
    )) {
      if (!content || typeof content !== "object" || !("url" in content) || typeof content.url !== "string") {
        throw new Error("Malformed attachment reference");
      }

      advertisedReferences++;
      expectedUrls.add(content.url);
    }
  }
}

if (
  receipts.length !== expectedUrls.size ||
  [...expectedUrls].some(url => !seenUrls.has(url))
) {
  throw new Error("Collection is missing advertised evidence");
}

console.log("=== EARTH PERSISTENCE VERIFICATION ===");
console.log(JSON.stringify({
  eventId,
  collectionId,
  advertisedReferences,
  distinctAttachments: expectedUrls.size - 1,
  persistedReceipts: receipts.length,
  verifiedFiles: receipts.length,
  verifiedBytes: totalBytes,
  complete: true,
  verdict: "verified-source-persistence",
  machineProof: false
}, null, 2));

}

main().catch((error) => {
  console.error("EARTH VERIFICATION FAILED:", error);
  process.exitCode = 1;
});
