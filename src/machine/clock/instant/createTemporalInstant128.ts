/* ==========================================================
   OUTFLO — CREATE TEMPORAL INSTANT 128
   File: src/machine/clock/instant/createTemporalInstant128.ts
   Scope: Own lawful construction of a canonical Outflō temporal instant
   Last Updated:
   - note: establish validated construction within the signed 128-bit temporal domain
   ========================================================== */

import type { TemporalInstant128 } from "./TemporalInstant128";
import {
  TEMPORAL_INSTANT_128_MAX,
  TEMPORAL_INSTANT_128_MIN,
} from "./temporalInstant128.constants";

export function createTemporalInstant128(
  value: bigint,
): TemporalInstant128 {
  if (
    value < TEMPORAL_INSTANT_128_MIN ||
    value > TEMPORAL_INSTANT_128_MAX
  ) {
    throw new RangeError(
      "Temporal instant exceeds signed 128-bit range.",
    );
  }

  return value as TemporalInstant128;
}
