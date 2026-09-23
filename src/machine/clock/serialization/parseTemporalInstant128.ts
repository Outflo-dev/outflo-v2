/* ==========================================================
   OUTFLO — PARSE TEMPORAL INSTANT 128
   File: src/machine/clock/serialization/parseTemporalInstant128.ts
   Scope: Own lawful reconstruction of a canonical Outflō temporal Instant from serialization
   Last Updated:
   - note: establish exact decimal-string parsing through the canonical Instant constructor
   ========================================================== */

import { createTemporalInstant128 } from "../instant/createTemporalInstant128";
import type { TemporalInstant128 } from "../instant/TemporalInstant128";

const TEMPORAL_INSTANT_128_SERIALIZED_PATTERN = /^-?(0|[1-9]\d*)$/;

export function parseTemporalInstant128(
  serialized: string,
): TemporalInstant128 {
  if (!TEMPORAL_INSTANT_128_SERIALIZED_PATTERN.test(serialized)) {
    throw new TypeError(
      "Serialized temporal instant must be a canonical base-10 integer string.",
    );
  }

  return createTemporalInstant128(BigInt(serialized));
}
