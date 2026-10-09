/* ==========================================================
   OUTFLO — RESOLVE TEMPORAL DURATION TO SYSTEM TIME V1
   File: src/machine/resolution/si/resolveTemporalDurationToSystemTimeV1.ts
   Scope: Express canonical Outflō duration through SYSTEM units
   Last Updated:
   - date: 2026-10-09
   - note: establish exact rational SYSTEM duration decomposition
   ========================================================== */

import type {
  TemporalDuration128,
} from "../../clock/duration/TemporalDuration128";

import {
  SI_SECONDS_PER_OUTFLOSECOND_NUMERATOR,
  SI_SECONDS_PER_OUTFLOSECOND_DENOMINATOR,
} from "../../clock/unit/temporalUnit.constants";

import {
  SYSTEM_TIME_V1,
} from "../../clock/unit/systemTimeV1.constants";

export type SystemTimeV1Duration = {
  referenceId: typeof SYSTEM_TIME_V1.id;

  years: bigint;
  days: bigint;
  hours: bigint;
  minutes: bigint;
  seconds: bigint;

  subsecondSiNumerator: bigint;
  subsecondSiDenominator: bigint;
};

export function resolveTemporalDurationToSystemTimeV1(
  duration: TemporalDuration128,
): SystemTimeV1Duration {
  /*
    Canonical Outflōseconds
    × exact SI seconds per Outflōsecond
    = exact rational SI duration.

    All decomposition happens on this rational quantity.
    No intermediate rounding or floating-point arithmetic.
  */

  const siDenominator =
    SI_SECONDS_PER_OUTFLOSECOND_DENOMINATOR;

  let remainingSiNumerator =
    duration *
    SI_SECONDS_PER_OUTFLOSECOND_NUMERATOR;

  const units =
    SYSTEM_TIME_V1.unitsInSiSeconds;

  function take(unitInSiSeconds: bigint): bigint {
    const unitDenominator =
      unitInSiSeconds * siDenominator;

    const count =
      remainingSiNumerator / unitDenominator;

    remainingSiNumerator =
      remainingSiNumerator % unitDenominator;

    return count;
  }

  const years = take(units.year);
  const days = take(units.day);
  const hours = take(units.hour);
  const minutes = take(units.minute);
  const seconds = take(units.second);

  return {
    referenceId: SYSTEM_TIME_V1.id,

    years,
    days,
    hours,
    minutes,
    seconds,

    subsecondSiNumerator: remainingSiNumerator,
    subsecondSiDenominator: siDenominator,
  };
}
