/* ==========================================================
   OUTFLO — RESOLVE TEMPORAL INSTANT 128 TO UNIX MILLISECONDS
   File: src/machine/resolution/unix/resolveTemporalInstant128ToUnixMilliseconds.ts
   Scope: Own exact resolution of an Outflō Clock Instant to Unix milliseconds
   Last Updated:
   - note: establish reversible Clock-to-Unix resolution without silent precision loss
   ========================================================== */

import type { TemporalInstant128 } from "../../clock/instant/TemporalInstant128";
import { NANOSECONDS_PER_MILLISECOND } from "../../clock/unit/temporalUnit.constants";
import { CLOCK_REFERENCE_TO_UNIX_EPOCH_LABEL_NANOSECONDS } from "./deriveClockReferenceToUnixEpochLabelSeconds";

export function resolveTemporalInstant128ToUnixMilliseconds(
  instant: TemporalInstant128,
  taiMinusUtcNanoseconds: bigint,
): bigint {
  const unixNanoseconds =
    instant -
    CLOCK_REFERENCE_TO_UNIX_EPOCH_LABEL_NANOSECONDS -
    taiMinusUtcNanoseconds;

  if (unixNanoseconds % NANOSECONDS_PER_MILLISECOND !== 0n) {
    throw new RangeError(
      "Temporal instant cannot be represented exactly as Unix milliseconds.",
    );
  }

  return unixNanoseconds / NANOSECONDS_PER_MILLISECOND;
}
