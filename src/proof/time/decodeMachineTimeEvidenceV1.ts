/* ==========================================================
   OUTFLŌ — DECODE MACHINE TIME EVIDENCE V1
   File: src/proof/time/decodeMachineTimeEvidenceV1.ts
   Scope: Reconstruct persisted Machine Time evidence
          without replacing its recorded values
   Last Updated:
   - Outflō Time: 847937933265318037843797634287
   - note: establish version-aware persisted evidence decoding
   ========================================================== */

import { parseTemporalInstant128 } from "../../machine/clock/serialization/parseTemporalInstant128";
import { parseTemporalDuration128 } from "../../machine/clock/serialization/parseTemporalDuration128";

import type { ObservedMachineTime } from "../../runtime/clock/interval/resolveObservedMachineTime";

const METHOD_V1 = "platform-unix-millisecond-protected-v1";
const CLOCK_V1 = "outflo-clock-definition-v1";

const REQUIRED_FIELDS = [
  "observation_id",
  "first_wall_unix_milliseconds",
  "first_monotonic_milliseconds",
  "second_wall_unix_milliseconds",
  "second_monotonic_milliseconds",
  "raw_span_milliseconds",
  "observation_precision_milliseconds",
  "protected_first_unix_milliseconds",
  "protected_second_unix_milliseconds",
  "protected_span_milliseconds",
  "first_instant",
  "second_instant",
  "duration",
  "provenance_snapshot",
] as const;

export type DecodedMachineTimeEvidenceV1 =
  | Readonly<{
      status: "supported";
      observationId: string;
      observed: ObservedMachineTime;
      provenance: unknown;
    }>
  | Readonly<{
      status: "unsupported-version";
    }>
  | Readonly<{
      status: "incomplete";
      missing: readonly string[];
    }>;

export function decodeMachineTimeEvidenceV1(
  input: unknown,
): DecodedMachineTimeEvidenceV1 {
  if (
    input === null ||
    typeof input !== "object" ||
    Array.isArray(input)
  ) {
    throw new TypeError("Observation evidence must be a record.");
  }

  const row = input as Record<string, unknown>;

  if (
    row.observation_method !== METHOD_V1 ||
    row.clock_definition !== CLOCK_V1
  ) {
    return { status: "unsupported-version" };
  }

  const missing = REQUIRED_FIELDS.filter(
    (field) => row[field] === null || row[field] === undefined,
  );

  if (missing.length > 0) {
    return { status: "incomplete", missing };
  }

  function text(field: string): string {
    const value = row[field];

    if (typeof value !== "string" || value.length === 0) {
      throw new TypeError("Invalid recorded field: " + field);
    }

    return value;
  }

  function integer(field: string): bigint {
    const value = text(field);

    if (!/^-?(0|[1-9][0-9]*)$/.test(value)) {
      throw new TypeError("Invalid integer field: " + field);
    }

    return BigInt(value);
  }

  function monotonic(field: string): number {
    const value = Number(text(field));

    if (!Number.isFinite(value)) {
      throw new TypeError("Invalid monotonic field: " + field);
    }

    return value;
  }

  const observed: ObservedMachineTime = {
    firstObservation: {
      wallUnixMilliseconds: integer("first_wall_unix_milliseconds"),
      monotonicMilliseconds: monotonic("first_monotonic_milliseconds"),
    },
    secondObservation: {
      wallUnixMilliseconds: integer("second_wall_unix_milliseconds"),
      monotonicMilliseconds: monotonic("second_monotonic_milliseconds"),
    },
    rawSpanMilliseconds: integer("raw_span_milliseconds"),
    observationPrecisionMilliseconds: integer("observation_precision_milliseconds"),
    protectedFirstUnixMilliseconds: integer("protected_first_unix_milliseconds"),
    protectedSecondUnixMilliseconds: integer("protected_second_unix_milliseconds"),
    protectedSpanMilliseconds: integer("protected_span_milliseconds"),
    firstInstant: parseTemporalInstant128(text("first_instant")),
    secondInstant: parseTemporalInstant128(text("second_instant")),
    duration: parseTemporalDuration128(text("duration")),
  };

  return {
    status: "supported",
    observationId: text("observation_id"),
    observed,
    provenance: row.provenance_snapshot,
  };
}
