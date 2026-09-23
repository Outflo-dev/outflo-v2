/* ==========================================================
   OUTFLO — RESOLVE UNIX MILLISECONDS TO TEMPORAL INSTANT 128
   File: src/machine/resolution/unix/resolveUnixMillisecondsToTemporalInstant128.ts
   Scope: Own deterministic resolution of Unix milliseconds onto the Outflō Clock
   Last Updated:
   - note: resolve Unix civil-time coordinates using an explicit TAI-minus-UTC relationship
   ========================================================== */

import type { TemporalInstant128 } from "../../clock/instant/TemporalInstant128";
import { createTemporalInstant128 } from "../../clock/instant/createTemporalInstant128";
import { NANOSECONDS_PER_MILLISECOND } from "../../clock/unit/temporalUnit.constants";
import { CLOCK_REFERENCE_TO_UNIX_EPOCH_LABEL_NANOSECONDS } from "./deriveClockReferenceToUnixEpochLabelSeconds";

export function resolveUnixMillisecondsToTemporalInstant128(
  unixMilliseconds: bigint,
  taiMinusUtcNanoseconds: bigint,
): TemporalInstant128 {
  const unixNanoseconds =
    unixMilliseconds * NANOSECONDS_PER_MILLISECOND;

  return createTemporalInstant128(
    CLOCK_REFERENCE_TO_UNIX_EPOCH_LABEL_NANOSECONDS +
      unixNanoseconds +
      taiMinusUtcNanoseconds,
  );
}
