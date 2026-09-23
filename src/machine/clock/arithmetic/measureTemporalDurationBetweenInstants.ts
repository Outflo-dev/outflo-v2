/* ==========================================================
   OUTFLO — MEASURE TEMPORAL DURATION BETWEEN INSTANTS
   File: src/machine/clock/arithmetic/measureTemporalDurationBetweenInstants.ts
   Scope: Own measurement of temporal distance between two Instants
   Last Updated:
   - note: establish direction-independent Instant-to-Instant duration measurement
   ========================================================== */

import { createTemporalDuration128 } from "../duration/createTemporalDuration128";
import type { TemporalDuration128 } from "../duration/TemporalDuration128";
import type { TemporalInstant128 } from "../instant/TemporalInstant128";

export function measureTemporalDurationBetweenInstants(
  first: TemporalInstant128,
  second: TemporalInstant128,
): TemporalDuration128 {
  const difference = first - second;

  return createTemporalDuration128(
    difference < 0n ? -difference : difference,
  );
}
