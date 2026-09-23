/* ==========================================================
   OUTFLO — COMPARE TEMPORAL INSTANTS
   File: src/machine/clock/arithmetic/compareTemporalInstants.ts
   Scope: Own canonical ordering between two Outflō Clock Instants
   Last Updated:
   - note: establish before, equal, and after comparison across canonical Instants
   ========================================================== */

import type { TemporalInstant128 } from "../instant/TemporalInstant128";

export type TemporalInstantOrder = -1 | 0 | 1;

export function compareTemporalInstants(
  first: TemporalInstant128,
  second: TemporalInstant128,
): TemporalInstantOrder {
  if (first < second) {
    return -1;
  }

  if (first > second) {
    return 1;
  }

  return 0;
}
