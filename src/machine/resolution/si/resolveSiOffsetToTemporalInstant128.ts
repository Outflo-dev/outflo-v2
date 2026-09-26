/* ==========================================================
   OUTFLO — RESOLVE SI OFFSET TO TEMPORAL INSTANT 128
   File: src/machine/resolution/si/resolveSiOffsetToTemporalInstant128.ts
   Scope: Resolve an exact signed rational SI offset from Clock zero into a canonical Outflō coordinate
   ========================================================== */

import {
  createTemporalInstant128,
} from "../../clock/instant/createTemporalInstant128";

import type {
  TemporalInstant128,
} from "../../clock/instant/TemporalInstant128";

import {
  OUTFLOSECONDS_PER_SI_SECOND_DENOMINATOR,
  OUTFLOSECONDS_PER_SI_SECOND_NUMERATOR,
} from "../../clock/unit/temporalUnit.constants";

/*
  Resolution law:

  signed SI offset from Clock zero
  ×
  Outflōseconds per SI second
  =
  exact rational Outflō coordinate

  TemporalInstant128 is integer-valued.

  When the exact rational result lies between coordinates,
  resolve to the greatest integer coordinate not exceeding
  the observed position.

  BigInt division truncates toward zero, so negative
  non-integral values require an explicit floor correction.

  No floating-point arithmetic is permitted.
*/

function divideFloor(
  numerator: bigint,
  denominator: bigint,
): bigint {
  const quotient = numerator / denominator;
  const remainder = numerator % denominator;

  if (
    remainder !== 0n &&
    numerator < 0n
  ) {
    return quotient - 1n;
  }

  return quotient;
}

export function resolveSiOffsetToTemporalInstant128(
  siSecondsNumerator: bigint,
  siSecondsDenominator: bigint = 1n,
): TemporalInstant128 {
  if (siSecondsDenominator <= 0n) {
    throw new RangeError(
      "SI offset denominator must be positive.",
    );
  }

  const outfloNumerator =
    siSecondsNumerator *
    OUTFLOSECONDS_PER_SI_SECOND_NUMERATOR;

  const outfloDenominator =
    siSecondsDenominator *
    OUTFLOSECONDS_PER_SI_SECOND_DENOMINATOR;

  return createTemporalInstant128(
    divideFloor(
      outfloNumerator,
      outfloDenominator,
    ),
  );
}
