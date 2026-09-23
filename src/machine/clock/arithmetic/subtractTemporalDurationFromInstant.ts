/* ==========================================================
   OUTFLO — SUBTRACT TEMPORAL DURATION FROM INSTANT
   File: src/machine/clock/arithmetic/subtractTemporalDurationFromInstant.ts
   Scope: Own backward temporal movement from an Instant by a Duration
   Last Updated:
   - note: establish lawful Instant minus Duration arithmetic
   ========================================================== */

import type { TemporalDuration128 } from "../duration/TemporalDuration128";
import type { TemporalInstant128 } from "../instant/TemporalInstant128";
import { createTemporalInstant128 } from "../instant/createTemporalInstant128";

export function subtractTemporalDurationFromInstant(
  instant: TemporalInstant128,
  duration: TemporalDuration128,
): TemporalInstant128 {
  return createTemporalInstant128(instant - duration);
}
