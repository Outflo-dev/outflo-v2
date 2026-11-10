/*
 * OUTFLO — EARTH / ADMITTED TEMPORAL COMPOSITION
 *
 * Earth owns scientific evidence interpretation.
 * Machine owns canonical temporal mathematics.
 * Proof owns verification.
 *
 * Read-only. No persistence or UI.
 */

import { machine } from "../../../machine";
import { verifyProtectedTemporalIntervalV1 } from
  "../../../proof/time/verifyProtectedTemporalIntervalV1";
import { createTrustedSupabaseClient } from
  "../../../lib/supabase/trusted/createTrustedSupabaseClient";

type Unit = {
  unit_id: string;
  unit_type: string;
  source_public_id: string;
};

type Claim = {
  unitType: string;
  sourcePublicId: string;
  parentPublicId: string | null;
  sourceElement: Record<string, unknown>;
};

type Evidence = {
  unit_id: string;
  occurrence_ordinal: number;
  source_receipt_id: string;
  source_claim: Claim;
};

function object(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error("Malformed admitted scientific claim");
  }
  return value as Record<string, unknown>;
}

function requiredText(value: unknown, label: string): string {
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`Missing ${label}`);
  }
  return value;
}

function uncertaintyMilliseconds(value: unknown): bigint {
  const valueText = String(value);

  if (!/^\d+(?:\.\d+)?$/.test(valueText)) {
    throw new Error(`Unsupported scientific uncertainty: ${valueText}`);
  }

  const [whole, fraction = ""] = valueText.split(".");
  const decimal = fraction.padEnd(3, "0");

  if (decimal.length > 3 && /[1-9]/.test(decimal.slice(3))) {
    throw new Error(
      "Sub-millisecond scientific uncertainty requires explicit resolution"
    );
  }

  return BigInt(whole) * 1000n +
    BigInt(decimal.slice(0, 3));
}

function observationFromClaim(claim: Claim) {
  const time = object(claim.sourceElement.time);
  const rawTime = requiredText(time.value, "scientific timestamp");

  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?$/.test(rawTime)) {
    throw new Error("Unsupported scientific time notation: " + rawTime);
  }

  const fraction = rawTime.match(/\.(\d+)/)?.[1] ?? "";
  if (fraction.length > 3 && /[1-9]/.test(fraction.slice(3))) {
    throw new Error("Sub-millisecond timestamp requires explicit resolution");
  }

  // QuakeML TimeQuantity uses UTC. No machine-local timezone inference.
  const explicitUtc = /(?:Z|[+-]\d{2}:\d{2})$/.test(rawTime)
    ? rawTime
    : rawTime + "Z";

  const parsed = Date.parse(explicitUtc);
  if (
    !Number.isSafeInteger(parsed) ||
    parsed < Date.parse("2017-01-01T00:00:00.000Z")
  ) {
    throw new Error("Unsupported scientific timestamp: " + rawTime);
  }

  const reportedUncertaintySeconds =
    time.uncertainty == null ? null : String(time.uncertainty);

  // Zero exclusion is a computation choice, not a claim of zero uncertainty.
  const declaredMarginMilliseconds =
    reportedUncertaintySeconds === null
      ? 0n
      : uncertaintyMilliseconds(reportedUncertaintySeconds);

  return {
    utc: new Date(parsed).toISOString(),
    unixMilliseconds: BigInt(parsed),
    reportedUncertaintySeconds,
    declaredMarginMilliseconds,
  };
}

async function main() {
  const [eventId, collectionId] = process.argv.slice(2);

  if (
    !eventId ||
    !/^[A-Za-z0-9_-]+$/.test(eventId) ||
    !collectionId ||
    !/^[0-9a-f-]{36}$/i.test(collectionId)
  ) {
    throw new Error("Expected USGS event ID and collection UUID");
  }

  const db = createTrustedSupabaseClient();

  const unitsResult = await db
    .from("earth_scientific_units")
    .select("unit_id,unit_type,source_public_id")
    .eq("event_id", eventId);

  if (unitsResult.error) throw unitsResult.error;

  const units = (unitsResult.data ?? []) as Unit[];

  if (!units.length) {
    throw new Error("No admitted scientific units");
  }

  const evidence: Evidence[] = [];
  const unitIds = units.map(unit => unit.unit_id);
  const UNIT_BATCH = 100;
  const PAGE = 500;

  for (let i = 0; i < unitIds.length; i += UNIT_BATCH) {
    const batch = unitIds.slice(i, i + UNIT_BATCH);

    for (let offset = 0; ; offset += PAGE) {
      const result = await db
        .from("earth_scientific_unit_evidence")
        .select("unit_id,source_receipt_id,occurrence_ordinal,source_claim")
        .in("unit_id", batch)
        .order("evidence_id")
        .range(offset, offset + PAGE - 1);

      if (result.error) throw result.error;

      evidence.push(...(result.data ?? []) as Evidence[]);

      if ((result.data?.length ?? 0) < PAGE) break;
    }
  }

  const receiptsResult = await db
    .from("earth_source_receipts")
    .select("receipt_id")
    .eq("collection_id", collectionId)
    .eq("event_id", eventId);

  if (receiptsResult.error) throw receiptsResult.error;

  const allowedReceipts = new Set(
    (receiptsResult.data ?? []).map(receipt => receipt.receipt_id)
  );

  if (!allowedReceipts.size) {
    throw new Error("No preserved receipts in requested collection");
  }

  const byIdentity = new Map<string, Unit>();
  const claimsByUnit = new Map<string, Evidence[]>();

  for (const unit of units) {
    const key = `${unit.unit_type}:${unit.source_public_id}`;

    if (byIdentity.has(key)) {
      throw new Error(`Duplicate admitted identity: ${key}`);
    }

    byIdentity.set(key, unit);
  }

  for (const row of evidence) {
    if (!allowedReceipts.has(row.source_receipt_id)) {
      continue;
    }

    const unit = units.find(item => item.unit_id === row.unit_id);
    if (!unit) throw new Error("Scientific evidence has no unit");

    const claim = row.source_claim;

    if (
      claim.unitType !== unit.unit_type ||
      claim.sourcePublicId !== unit.source_public_id
    ) {
      throw new Error("Admitted scientific identity mismatch");
    }

    const entries = claimsByUnit.get(row.unit_id) ?? [];
    entries.push(row);
    claimsByUnit.set(row.unit_id, entries);
  }

  function claims(unit: Unit): Evidence[] {
    const rows = claimsByUnit.get(unit.unit_id) ?? [];

    if (!rows.length) {
      throw new Error(
        `Scientific identity lacks evidence in collection: ${unit.source_public_id}`
      );
    }

    return rows.sort(
      (a, b) => a.source_receipt_id.localeCompare(b.source_receipt_id)
    );
  }

  function unit(type: string, publicId: string): Unit {
    const found = byIdentity.get(`${type}:${publicId}`);

    if (!found) {
      throw new Error(`Referenced scientific identity missing: ${type}:${publicId}`);
    }

    return found;
  }

  function observed(unitRecord: Unit) {
    const rows = claims(unitRecord);
    const first = observationFromClaim(rows[0].source_claim);

    for (const row of rows.slice(1)) {
      const another = observationFromClaim(row.source_claim);

      if (
        another.unixMilliseconds !== first.unixMilliseconds ||
        another.declaredMarginMilliseconds !==
          first.declaredMarginMilliseconds
      ) {
        throw new Error(
          `Conflicting source observations: ${unitRecord.source_public_id}`
        );
      }
    }

    return {
      ...first,
      receiptIds: rows.map(row => row.source_receipt_id),
    };
  }

  const arrivals = units
    .filter(item => item.unit_type === "arrival")
    .flatMap(item =>
      claims(item).map(association => ({ item, association }))
    )
    .sort((a, b) =>
      a.item.source_public_id.localeCompare(b.item.source_public_id) ||
      a.association.source_receipt_id.localeCompare(
        b.association.source_receipt_id
      ) ||
      a.association.occurrence_ordinal -
        b.association.occurrence_ordinal
    );

  if (!arrivals.length) {
    throw new Error("No admitted arrival relationships");
  }

  const intervals = [];

  for (const { item: arrival, association } of arrivals) {
    const associations = [association];
    const firstAssociation = association.source_claim;

    const originId = requiredText(
      firstAssociation.parentPublicId,
      "arrival origin identity"
    );

    const pickId = requiredText(
      firstAssociation.sourceElement.pickID,
      "arrival pick identity"
    );

    const origin = unit("origin", originId);
    const pick = unit("pick", pickId);

    const first = observed(origin);
    const second = observed(pick);

    const protectedFirst =
      first.unixMilliseconds + first.declaredMarginMilliseconds;

    const protectedSecond =
      second.unixMilliseconds - second.declaredMarginMilliseconds;

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
      firstUnixMilliseconds: first.unixMilliseconds,
      secondUnixMilliseconds: second.unixMilliseconds,

      firstExclusionMilliseconds:
        first.declaredMarginMilliseconds,

      secondExclusionMilliseconds:
        second.declaredMarginMilliseconds,

      rawSpanMilliseconds:
        second.unixMilliseconds - first.unixMilliseconds,

      protectedFirstUnixMilliseconds: protectedFirst,
      protectedSecondUnixMilliseconds: protectedSecond,

      protectedSpanMilliseconds:
        protectedSecond - protectedFirst,

      firstInstant,
      secondInstant,
      duration,
    });

    intervals.push({
      ...(association.occurrence_ordinal > 1
        ? { arrivalOccurrenceOrdinal: association.occurrence_ordinal }
        : {}),
      arrivalId: arrival.source_public_id,
      originId,
      pickId,

      sourceReceipts: {
        arrival: associations.map(row => row.source_receipt_id),
        origin: first.receiptIds,
        pick: second.receiptIds,
      },

      observations: {
        originUtc: first.utc,
        pickUtc: second.utc,
        originReportedUncertaintySeconds:
          first.reportedUncertaintySeconds,
        pickReportedUncertaintySeconds:
          second.reportedUncertaintySeconds,
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
    });
  }

  const allVerified = intervals.every(
    interval => interval.verification.verdict === "verified"
  );

  console.log(JSON.stringify({
    operation: "earth-admitted-temporal-composition-v1",
    eventId,
    collectionId,
    admittedScientificUnits: units.length,
    admittedSourceClaims: evidence.length,
    arrivalRelationships: arrivals.length,
    verifiedIntervals: intervals.filter(
      interval => interval.verification.verdict === "verified"
    ).length,
    nineCheckPrimitive: true,
    verdict: allVerified
      ? "verified-temporal-relationships"
      : "failed",
    sourceByteVerification: "separate-existing-verifier",
    proofPersisted: false,
    intervals,
  }, null, 2));

  if (!allVerified) process.exitCode = 1;
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
