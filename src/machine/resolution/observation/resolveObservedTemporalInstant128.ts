/* ==========================================================
   OUTFLO — RESOLVE OBSERVED TEMPORAL INSTANT 128
   File: src/machine/resolution/observation/resolveObservedTemporalInstant128.ts
   Scope: Resolve a wall-clock anchor and monotonic observation into canonical Outflō Time
   ========================================================== */

import type {
  TemporalInstant128,
} from "../../clock/instant/TemporalInstant128";

import {
  addTemporalDurationToInstant,
} from "../../clock/arithmetic/addTemporalDurationToInstant";

import {
  SI_NANO_UNITS_PER_BASE_UNIT,
  SI_NANO_UNITS_PER_MILLI_UNIT,
} from "../../primitive/si/siPrefix.constants";

import {
  resolveSiDurationToTemporalDuration128,
} from "../si/resolveSiDurationToTemporalDuration128";

import {
  resolveUnixMillisecondsToTemporalInstant128,
} from "../unix/resolveUnixMillisecondsToTemporalInstant128";

import {
  CURRENT_TAI_MINUS_UTC_SI_SECONDS,
} from "../utc/currentTaiMinusUtc.constants";

export function resolveObservedTemporalInstant128(
  wallAnchorUnixMilliseconds: bigint,
  monotonicAnchorMilliseconds: number,
  observedMonotonicMilliseconds: number,
): TemporalInstant128 {
  const elapsedMilliseconds =
    observedMonotonicMilliseconds -
    monotonicAnchorMilliseconds;

  if (elapsedMilliseconds < 0) {
    throw new RangeError(
      "Observed monotonic time precedes the temporal anchor.",
    );
  }

  const observedElapsedNanoseconds =
    BigInt(
      Math.trunc(
        elapsedMilliseconds *
          Number(SI_NANO_UNITS_PER_MILLI_UNIT),
      ),
    );

  const temporalAnchor =
    resolveUnixMillisecondsToTemporalInstant128(
      wallAnchorUnixMilliseconds,
      CURRENT_TAI_MINUS_UTC_SI_SECONDS,
    );

  const elapsedDuration =
    resolveSiDurationToTemporalDuration128(
      observedElapsedNanoseconds,
      SI_NANO_UNITS_PER_BASE_UNIT,
    );

  return addTemporalDurationToInstant(
    temporalAnchor,
    elapsedDuration,
  );
}
