/* ==========================================================
   OUTFLO — RESOLVE SI DURATION TO TEMPORAL DURATION 128
   File: src/machine/resolution/si/resolveSiDurationToTemporalDuration128.ts
   Scope: Resolve an exact rational SI duration into canonical Outflōseconds
   ========================================================== */

import {
  createTemporalDuration128,
} from "../../clock/duration/createTemporalDuration128";

import type {
  TemporalDuration128,
} from "../../clock/duration/TemporalDuration128";

import {
  OUTFLOSECONDS_PER_SI_SECOND_DENOMINATOR,
  OUTFLOSECONDS_PER_SI_SECOND_NUMERATOR,
} from "../../clock/unit/temporalUnit.constants";

/*
  Resolution law:

  exact SI duration
  ×
  Outflōseconds per SI second
  =
  exact rational Outflō coordinate distance

  TemporalDuration128 is integer-valued.

  When the exact rational result lies between canonical coordinates,
  resolve downward to the greatest coordinate that does not exceed
  the observed duration.

  No floating-point arithmetic is permitted.
*/

export function resolveSiDurationToTemporalDuration128(
  siSecondsNumerator: bigint,
  siSecondsDenominator: bigint = 1n,
): TemporalDuration128 {
  if (siSecondsNumerator < 0n) {
    throw new RangeError(
      "SI duration numerator must be non-negative.",
    );
  }

  if (siSecondsDenominator <= 0n) {
    throw new RangeError(
      "SI duration denominator must be positive.",
    );
  }

  const outfloNumerator =
    siSecondsNumerator *
    OUTFLOSECONDS_PER_SI_SECOND_NUMERATOR;

  const outfloDenominator =
    siSecondsDenominator *
    OUTFLOSECONDS_PER_SI_SECOND_DENOMINATOR;

  const resolvedOutfloseconds =
    outfloNumerator / outfloDenominator;

  return createTemporalDuration128(
    resolvedOutfloseconds,
  );
}
