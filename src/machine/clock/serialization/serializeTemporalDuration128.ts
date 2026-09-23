/* ==========================================================
   OUTFLO — SERIALIZE TEMPORAL DURATION 128
   File: src/machine/clock/serialization/serializeTemporalDuration128.ts
   Scope: Own deterministic serialization of a canonical Outflō temporal Duration
   Last Updated:
   - note: establish exact decimal-string serialization for canonical temporal quantities
   ========================================================== */

import type { TemporalDuration128 } from "../duration/TemporalDuration128";

export function serializeTemporalDuration128(
  duration: TemporalDuration128,
): string {
  return duration.toString(10);
}
