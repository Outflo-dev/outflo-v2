/* ==========================================================
   OUTFLO — CREATE TEMPORAL DURATION 128
   File: src/machine/clock/duration/createTemporalDuration128.ts
   Scope: Own lawful construction of a canonical Outflō temporal duration
   Last Updated:
   - note: establish validated construction within the unsigned 128-bit temporal duration domain
   ========================================================== */

import type { TemporalDuration128 } from "./TemporalDuration128";
import {
  TEMPORAL_DURATION_128_MAX,
  TEMPORAL_DURATION_128_MIN,
} from "./temporalDuration128.constants";

export function createTemporalDuration128(
  value: bigint,
): TemporalDuration128 {
  if (
    value < TEMPORAL_DURATION_128_MIN ||
    value > TEMPORAL_DURATION_128_MAX
  ) {
    throw new RangeError(
      "Temporal duration exceeds unsigned 128-bit range.",
    );
  }

  return value as TemporalDuration128;
}
