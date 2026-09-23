/* ==========================================================
   OUTFLO — PARSE TEMPORAL DURATION 128
   File: src/machine/clock/serialization/parseTemporalDuration128.ts
   Scope: Own lawful reconstruction of a canonical Outflō temporal Duration from serialization
   Last Updated:
   - note: establish exact decimal-string parsing through the canonical Duration constructor
   ========================================================== */

import { createTemporalDuration128 } from "../duration/createTemporalDuration128";
import type { TemporalDuration128 } from "../duration/TemporalDuration128";

const TEMPORAL_DURATION_128_SERIALIZED_PATTERN = /^(0|[1-9]\d*)$/;

export function parseTemporalDuration128(
  serialized: string,
): TemporalDuration128 {
  if (!TEMPORAL_DURATION_128_SERIALIZED_PATTERN.test(serialized)) {
    throw new TypeError(
      "Serialized temporal duration must be a canonical base-10 unsigned integer string.",
    );
  }

  return createTemporalDuration128(BigInt(serialized));
}
