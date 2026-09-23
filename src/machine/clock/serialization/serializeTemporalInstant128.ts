/* ==========================================================
   OUTFLO — SERIALIZE TEMPORAL INSTANT 128
   File: src/machine/clock/serialization/serializeTemporalInstant128.ts
   Scope: Own deterministic serialization of a canonical Outflō temporal Instant
   Last Updated:
   - note: establish exact decimal-string serialization for canonical Clock coordinates
   ========================================================== */

import type { TemporalInstant128 } from "../instant/TemporalInstant128";

export function serializeTemporalInstant128(
  instant: TemporalInstant128,
): string {
  return instant.toString(10);
}
