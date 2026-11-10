/*
 * OUTFLO — INDEPENDENT EARTH PROOF REPLAY
 *
 * Read-only.
 * Loads persisted evidence independently of the composer.
 * Machine owns canonical mathematics.
 * Proof owns interval verification.
 */

import { createHash } from "node:crypto";
import { machine } from "../../../machine";
import { verifyProtectedTemporalIntervalV1 } from
  "../../../proof/time/verifyProtectedTemporalIntervalV1";
import { createTrustedSupabaseClient } from
  "../../../lib/supabase/trusted/createTrustedSupabaseClient";

type Receipt = {
  receipt_id: string;
  event_id: string;
  collection_id: string;
  sha256: string;
  byte_length: number;
  storage_bucket: string;
  storage_path: string;
};

type Unit = {
  unit_id: string;
  event_id: string;
  unit_type: string;
  source_public_id: string;
};

type Claim = {
  unitType: string;
  sourcePublicId: string;
  parentPublicId: string | null;
  sourceElement: Record<string, unknown>;
};

type ClaimRow = {
  evidence_id: string;
  unit_id: string;
  source_receipt_id: string;
  occurrence_ordinal: number;
  source_claim: Claim;
};

function canonical(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(canonical);

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([k, v]) => [k, canonical(v)])
    );
  }

  return value;
}

function encode(value: unknown): string {
  return JSON.stringify(canonical(value));
}

function hash(value: string | Buffer): string {
  return createHash("sha256").update(value).digest("hex");
}

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

function object(value: unknown): Record<string, unknown> {
  assert(
    value !== null &&
    typeof value === "object" &&
    !Array.isArray(value),
    "Malformed scientific element"
  );
  return value as Record<string, unknown>;
}

function text(value: unknown): string {
  assert(typeof value === "string" && value.length > 0,
    "Missing scientific text");
  return value;
}

function observation(claim: Claim) {
  const time = object(claim.sourceElement.time);
  const raw = text(time.value);

  assert(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?$/.test(raw),
    "Unsupported scientific timestamp notation");

  const fraction = raw.match(/\.(\d+)/)?.[1] ?? "";
  assert(fraction.length <= 3 || !/[1-9]/.test(fraction.slice(3)),
    "Unresolved sub-millisecond timestamp");

  const explicit = /(?:Z|[+-]\d{2}:\d{2})$/.test(raw)
    ? raw : raw + "Z";

  const parsed = Date.parse(explicit);
  assert(Number.isSafeInteger(parsed) &&
    parsed >= Date.parse("2017-01-01T00:00:00.000Z"),
    "Unsupported scientific timestamp");

  const uncertainty = time.uncertainty == null
    ? null : text(String(time.uncertainty));

  let margin = 0n;
  if (uncertainty !== null) {
    assert(/^\d+(?:\.\d+)?$/.test(uncertainty),
      "Unsupported scientific uncertainty");

    const [whole, fractional = ""] = uncertainty.split(".");
    assert(fractional.length <= 3 || !/[1-9]/.test(fractional.slice(3)),
      "Unresolved sub-millisecond uncertainty");

    margin = BigInt(whole) * 1000n +
      BigInt(fractional.padEnd(3, "0").slice(0, 3));
  }

  return {
    utc: new Date(parsed).toISOString(),
    ms: BigInt(parsed),
    uncertainty,
    margin
  };
}

async function main() {
  const proofId = process.argv[2];

  assert(
    typeof proofId === "string" &&
    /^[0-9a-f-]{36}$/i.test(proofId),
    "Expected Earth Proof UUID"
  );

  const db = createTrustedSupabaseClient();

  const loaded = await db
    .from("earth_proof_snapshots_v1")
    .select("*")
    .eq("proof_id", proofId)
    .single();

  if (loaded.error) throw loaded.error;
  const proof = loaded.data;

  assert(proof, "Earth Proof not found");
  assert(
    proof.verifier_version ===
      "verifyProtectedTemporalIntervalV1",
    "Unsupported verifier version"
  );

  const eventId = proof.event_id;
  const collectionId = proof.collection_id;
  const manifest = object(proof.source_manifest);

  assert(
    manifest.eventId === eventId &&
    manifest.collectionId === collectionId,
    "Manifest identity mismatch"
  );

  assert(
    hash(encode(manifest)) === proof.manifest_sha256,
    "Recorded manifest fingerprint mismatch"
  );

  const receiptResult = await db
    .from("earth_source_receipts")
    .select(
      "receipt_id,event_id,collection_id,sha256,byte_length,storage_bucket,storage_path"
    )
    .eq("event_id", eventId)
    .eq("collection_id", collectionId)
    .order("receipt_id");

  if (receiptResult.error) throw receiptResult.error;
  const receipts = (receiptResult.data ?? []) as Receipt[];

  const unitResult = await db
    .from("earth_scientific_units")
    .select("unit_id,event_id,unit_type,source_public_id")
    .eq("event_id", eventId)
    .order("unit_id");

  if (unitResult.error) throw unitResult.error;
  const units = (unitResult.data ?? []) as Unit[];

  assert(receipts.length > 0 && units.length > 0,
    "Missing scientific evidence");

  const manifestClaims = manifest.claims;
  assert(Array.isArray(manifestClaims) && manifestClaims.length > 0,
    "Proof manifest missing claims");

  const legacyManifest = manifestClaims.every(c =>
    c && typeof c === "object" &&
    !Object.prototype.hasOwnProperty.call(c, "occurrence_ordinal"));

  assert(legacyManifest || manifestClaims.every(c =>
    c && typeof c === "object" &&
    Number.isInteger(c.occurrence_ordinal) && c.occurrence_ordinal >= 1),
    "Mixed occurrence manifest format");

  const claims: ClaimRow[] = [];
  const ids = units.map(u => u.unit_id);

  for (let i = 0; i < ids.length; i += 100) {
    for (let offset = 0; ; offset += 500) {
      const result = await db.from("earth_scientific_unit_evidence")
        .select("evidence_id,unit_id,source_receipt_id,occurrence_ordinal,source_claim")
        .in("unit_id", ids.slice(i, i + 100))
        .order("evidence_id")
        .range(offset, offset + 499);

      if (result.error) throw result.error;

      const page = (result.data ?? []) as ClaimRow[];
      claims.push(...page);

      if (page.length < 500) break;
    }
  }

  claims.sort((a, b) =>
    a.evidence_id < b.evidence_id ? -1 :
    a.evidence_id > b.evidence_id ? 1 : 0);

  const claimsForManifest = legacyManifest
    ? claims.map(({ occurrence_ordinal: _ordinal, ...row }) => row)
    : claims;

  const currentManifest = {
    eventId,
    collectionId,
    receipts,
    units,
    claims: claimsForManifest,
  };

  assert(
    encode(currentManifest) === encode(manifest),
    "Live admitted evidence differs from snapshot"
  );

  const receiptIds = new Set<string>();
  const sourceTexts = new Map<string, string>();
  let bytesVerified = 0;

  const storage = db.storage.from("earth-evidence");

  for (const receipt of receipts) {
    assert(
      receipt.event_id === eventId &&
      receipt.collection_id === collectionId &&
      receipt.storage_bucket === "earth-evidence" &&
      !receiptIds.has(receipt.receipt_id),
      "Invalid or duplicate source receipt"
    );

    receiptIds.add(receipt.receipt_id);

    const downloaded = await storage.download(
      receipt.storage_path
    );

    if (downloaded.error || !downloaded.data) {
      throw downloaded.error ??
        new Error("Source evidence unavailable");
    }

    const bytes = Buffer.from(
      await downloaded.data.arrayBuffer()
    );

    assert(
      bytes.length === receipt.byte_length &&
      hash(bytes) === receipt.sha256,
      "Original source bytes fail checksum verification"
    );

    sourceTexts.set(
      receipt.receipt_id,
      bytes.toString("utf8")
    );
    bytesVerified += bytes.length;
  }

  const unitsById = new Map(units.map(u => [u.unit_id, u]));
  const unitsByIdentity = new Map(
    units.map(u => [`${u.unit_type}:${u.source_public_id}`, u])
  );

  assert(
    unitsById.size === units.length &&
    unitsByIdentity.size === units.length,
    "Duplicate scientific identities"
  );

  const byUnit = new Map<string, ClaimRow[]>();

  for (const row of claims) {
    const unit = unitsById.get(row.unit_id);
    const c = row.source_claim;

    assert(
      unit &&
      receiptIds.has(row.source_receipt_id) &&
      c.unitType === unit.unit_type &&
      c.sourcePublicId === unit.source_public_id,
      "Broken admitted scientific association"
    );

    const raw = sourceTexts.get(row.source_receipt_id);

    assert(
      raw?.includes(c.sourcePublicId),
      "Scientific identity absent from preserved source"
    );

    const rows = byUnit.get(row.unit_id) ?? [];
    rows.push(row);
    byUnit.set(row.unit_id, rows);
  }

  function find(type: string, id: string): Unit {
    const result = unitsByIdentity.get(`${type}:${id}`);
    assert(result, `Missing scientific identity: ${type}:${id}`);
    return result;
  }

  function evidence(unit: Unit): ClaimRow[] {
    const rows = byUnit.get(unit.unit_id);
    assert(rows?.length, "Scientific identity lacks source evidence");
    return [...rows].sort((a, b) =>
      a.source_receipt_id.localeCompare(b.source_receipt_id) ||
      a.occurrence_ordinal - b.occurrence_ordinal
    );
  }

  function observed(unit: Unit) {
    const rows = evidence(unit);
    const first = observation(rows[0].source_claim);

    for (const row of rows) {
      const another = observation(row.source_claim);

      assert(
        first.ms === another.ms &&
        first.margin === another.margin,
        "Conflicting scientific observations"
      );
    }

    return {
      ...first,
      receiptIds: rows.map(r => r.source_receipt_id),
    };
  }

  const arrivals = units
    .filter(u => u.unit_type === "arrival")
    .flatMap(arrival => {
      const rows = evidence(arrival);

      return legacyManifest
        ? [{ arrival, associations: rows, ordinal: 1 }]
        : rows.map(row => ({
            arrival,
            associations: [row],
            ordinal: row.occurrence_ordinal
          }));
    })
    .sort((a, b) =>
      a.arrival.source_public_id.localeCompare(b.arrival.source_public_id) ||
      (legacyManifest ? 0 :
        a.associations[0].source_receipt_id.localeCompare(
          b.associations[0].source_receipt_id
        ) || a.ordinal - b.ordinal));

  assert(arrivals.length > 0, "No arrival relationships");

  const reproduced = arrivals.map(({ arrival, associations, ordinal }) => {
    const association = associations[0].source_claim;

    const originId = text(association.parentPublicId);
    const pickId = text(association.sourceElement.pickID);

    for (const row of associations) {
      assert(
        row.source_claim.parentPublicId === originId &&
        row.source_claim.sourceElement.pickID === pickId,
        "Conflicting arrival associations"
      );
    }

    const first = observed(find("origin", originId));
    const second = observed(find("pick", pickId));

    const protectedFirst = first.ms + first.margin;
    const protectedSecond = second.ms - second.margin;

    const firstInstant =
      machine.clock.resolveUnixMillisecondObservation128(
        protectedFirst
      );

    const secondInstant =
      machine.clock.resolveUnixMillisecondObservation128(
        protectedSecond
      );

    const duration =
      machine.clock.measureTemporalDurationBetweenInstants(
        firstInstant,
        secondInstant
      );

    const verification = verifyProtectedTemporalIntervalV1({
      firstUnixMilliseconds: first.ms,
      secondUnixMilliseconds: second.ms,
      firstExclusionMilliseconds: first.margin,
      secondExclusionMilliseconds: second.margin,
      rawSpanMilliseconds: second.ms - first.ms,
      protectedFirstUnixMilliseconds: protectedFirst,
      protectedSecondUnixMilliseconds: protectedSecond,
      protectedSpanMilliseconds:
        protectedSecond - protectedFirst,
      firstInstant,
      secondInstant,
      duration,
    });

    return {
      ...(!legacyManifest && ordinal > 1 ? { arrivalOccurrenceOrdinal: ordinal } : {}),
      arrivalId: arrival.source_public_id,
      originId,
      pickId,
      sourceReceipts: {
        arrival: associations.map(r => r.source_receipt_id),
        origin: first.receiptIds,
        pick: second.receiptIds,
      },
      observations: {
        originUtc: first.utc,
        pickUtc: second.utc,
        originReportedUncertaintySeconds: first.uncertainty,
        pickReportedUncertaintySeconds: second.uncertainty,
      },
      canonical: {
        firstInstant:
          machine.clock.serializeTemporalInstant128(firstInstant),
        secondInstant:
          machine.clock.serializeTemporalInstant128(secondInstant),
        duration:
          machine.clock.serializeTemporalDuration128(duration),
      },
      verification,
    };
  });

  assert(
    reproduced.every(r => r.verification.verdict === "verified"),
    "Independent mathematical verification failed"
  );

  assert(
    encode(reproduced) === encode(proof.intervals),
    "Recorded intervals differ from independent replay"
  );

  assert(
    proof.verdict === "verified",
    "Recorded Proof verdict mismatch"
  );

  console.log(JSON.stringify({
    operation: "independent-earth-proof-replay-v1",
    proofId,
    eventId,
    manifestSha256: proof.manifest_sha256,
    sourceReceiptsVerified: receipts.length,
    sourceBytesVerified: bytesVerified,
    scientificIdentities: units.length,
    admittedClaims: claims.length,
    reproducedIntervals: reproduced.length,
    passingChecks: reproduced.length * 9,
    verdict: "independently-reproduced",
    databaseWrites: false
  }, null, 2));
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
