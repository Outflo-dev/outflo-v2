/*
 * OUTFLO — EARTH SOURCE EVIDENCE
 *
 * Owner: Earth source collection and preservation.
 *
 * One USGS event -> all advertised evidence.
 * Original bytes preserved in private cloud storage.
 * Readback and checksum before receipt persistence.
 *
 * No canonical scientific admission.
 * No Machine mathematics.
 * No Proof claim.
 */

import { createHash, randomUUID } from "node:crypto";
import { createTrustedSupabaseClient } from
  "../../../lib/supabase/trusted/createTrustedSupabaseClient";

const BUCKET = "earth-evidence";
const MAX_BYTES = 6 * 1024 * 1024;

const hash = (bytes: Buffer | string) =>
  createHash("sha256").update(bytes).digest("hex");

function validateUrl(value: string): URL {
  const url = new URL(value);
  const host = url.hostname.toLowerCase();

  if (
    url.protocol !== "https:" ||
    (host !== "usgs.gov" && !host.endsWith(".usgs.gov")) ||
    url.username ||
    url.password ||
    (url.port && url.port !== "443")
  ) {
    throw new Error(`Unapproved source URL: ${value}`);
  }

  return url;
}

async function fetchEvidence(value: string) {
  let url = validateUrl(value);

  for (let redirects = 0; redirects <= 3; redirects++) {
    const response = await fetch(url, {
      redirect: "manual",
      signal: AbortSignal.timeout(60000),
    });

    if ([301, 302, 303, 307, 308].includes(response.status)) {
      const location = response.headers.get("location");
      if (!location) throw new Error("Redirect without location");
      url = validateUrl(new URL(location, url).href);
      continue;
    }

    if (!response.ok) {
      throw new Error(`USGS HTTP ${response.status}: ${url}`);
    }

    const declared = Number(
      response.headers.get("content-length") ?? 0
    );

    if (declared > MAX_BYTES) {
      throw new Error(`Source exceeds standard upload limit: ${url}`);
    }

    const bytes = Buffer.from(await response.arrayBuffer());

    if (bytes.length > MAX_BYTES) {
      throw new Error(`Source exceeds standard upload limit: ${url}`);
    }

    return {
      bytes,
      retrievedAt: new Date().toISOString(),
    };
  }

  throw new Error("Too many source redirects");
}

type Evidence = {
  url: string;
  productType?: string;
  productSource?: string;
  productCode?: string;
  productUpdatedMs?: number;
  mediaType?: string;
};

async function main() {
  const eventId = process.argv[2];

  if (!eventId || !/^[a-zA-Z0-9_-]+$/.test(eventId)) {
    throw new Error("Supply one valid USGS event ID");
  }

  const db = createTrustedSupabaseClient();
  const storage = db.storage.from(BUCKET);

  const existingCollections = new Set<string>();

  for (let offset = 0; ; offset += 500) {
    const result = await db
      .from("earth_source_receipts")
      .select("collection_id")
      .eq("event_id", eventId)
      .order("receipt_id")
      .range(offset, offset + 499);

    if (result.error) throw result.error;

    const rows = result.data ?? [];

    for (const row of rows) {
      existingCollections.add(row.collection_id);
    }

    if (rows.length < 500) break;
  }

  if (existingCollections.size > 1) {
    throw new Error("Multiple existing collections require inspection");
  }

  const collectionId =
    [...existingCollections][0] ?? randomUUID();


  async function preserve(item: Evidence, provided?: Awaited<
    ReturnType<typeof fetchEvidence>
  >) {
    const fetched = provided ?? await fetchEvidence(item.url);
    const bytes = fetched.bytes;
    const sha256 = hash(bytes);

    const existingResult = await db
      .from("earth_source_receipts")
      .select("receipt_id,storage_path,sha256,byte_length")
      .eq("event_id", eventId)
      .eq("source_url", item.url)
      .eq("sha256", sha256)
      .limit(1);

    if (existingResult.error) throw existingResult.error;

    const existing = existingResult.data?.[0];

    const path = existing?.storage_path ??
      `usgs/${eventId}/${hash(item.url)}/${sha256}`;

    if (!existing) {
      const uploaded = await storage.upload(path, bytes, {
        contentType: item.mediaType ?? "application/octet-stream",
        upsert: false,
      });

      if (
        uploaded.error &&
        !/already exists|duplicate/i.test(uploaded.error.message)
      ) {
        throw uploaded.error;
      }
    }

    const downloaded = await storage.download(path);

    if (downloaded.error || !downloaded.data) {
      throw downloaded.error ?? new Error("Cloud readback failed");
    }

    const returned = Buffer.from(
      await downloaded.data.arrayBuffer()
    );

    if (
      returned.length !== bytes.length ||
      hash(returned) !== sha256
    ) {
      throw new Error(`Cloud evidence mismatch: ${item.url}`);
    }

    let receiptId = existing?.receipt_id;

    if (existing) {
      if (
        existing.sha256 !== sha256 ||
        Number(existing.byte_length) !== bytes.length
      ) {
        throw new Error("Existing receipt does not match evidence");
      }
    } else {
      const inserted = await db
        .from("earth_source_receipts")
        .insert({
          collection_id: collectionId,
          source_provider: "USGS",
          source_url: item.url,
          event_id: eventId,
          product_type: item.productType ?? null,
          product_source: item.productSource ?? null,
          product_code: item.productCode ?? null,
          product_updated_ms: item.productUpdatedMs ?? null,
          media_type: item.mediaType ?? null,
          storage_bucket: BUCKET,
          storage_path: path,
          byte_length: bytes.length,
          sha256,
          retrieved_at: fetched.retrievedAt,
        })
        .select("receipt_id,sha256,byte_length,storage_path")
        .single();

      if (inserted.error) throw inserted.error;

      if (
        inserted.data.sha256 !== sha256 ||
        Number(inserted.data.byte_length) !== bytes.length ||
        inserted.data.storage_path !== path
      ) {
        throw new Error("Persisted receipt mismatch");
      }

      receiptId = inserted.data.receipt_id;
    }

    console.log(JSON.stringify({
      receiptId,
      product: item.productType ?? "event-detail",
      bytes: bytes.length,
      sha256,
      reused: Boolean(existing),
      verified: true,
    }));
  }

  const detailUrl =
    `https://earthquake.usgs.gov/earthquakes/feed/v1.0/detail/${eventId}.geojson`;

  const detail = await fetchEvidence(detailUrl);
  const event = JSON.parse(detail.bytes.toString("utf8"));

  if (event.type !== "Feature" || event.id !== eventId) {
    throw new Error("Unexpected USGS event identity");
  }

  await preserve({
    url: detailUrl,
    mediaType: "application/geo+json",
  }, detail);

  const discovered = new Map<string, Evidence>();
  let advertisedReferences = 0;

  for (const [type, versions] of Object.entries(
    event.properties?.products ?? {}
  )) {
    if (!Array.isArray(versions)) {
      throw new Error(`Invalid product versions: ${type}`);
    }

    for (const product of versions) {
      for (const content of Object.values(
        product.contents ?? {}
      )) {
        advertisedReferences++;

        if (!content || typeof content !== "object" || !("url" in content) || typeof content.url !== "string") {
          throw new Error("Product attachment has no source URL");
        }

        if (!discovered.has(content.url)) {
          discovered.set(content.url, {
            url: content.url,
            productType: type,
            productSource: product.source,
            productCode: product.code,
            productUpdatedMs: product.updateTime,
            mediaType: "contentType" in content && typeof content.contentType === "string" ? content.contentType : undefined,
          });
        }
      }
    }
  }

  console.log("=== EARTH EVIDENCE DISCOVERY ===");
  console.log({
    eventId,
    advertisedReferences,
    distinctAttachmentUrls: discovered.size,
  });

  for (const evidence of discovered.values()) {
    await preserve(evidence);
  }

  console.log("=== EARTH COLLECTION COMPLETE ===");
  console.log({
    eventId,
    collectionId,
    verifiedFiles: 1 + discovered.size,
  });
}

main().catch(error => {
  console.error("EARTH COLLECTION FAILED:", error);
  process.exitCode = 1;
});
