/* ==========================================================
   OUTFLO — CLOCK TEXT EMITTER
   File: src/emitter/text/clock/emitClockText.ts
   Scope: Give existing Outflō Clock truth a compact textual form
   ========================================================== */

import type {
  ClockTextEmission,
} from "./ClockTextEmission";

import {
  TEMPORAL_INSTANT_128_MIN,
  TEMPORAL_INSTANT_128_MAX,
} from "../../../machine/clock/instant/temporalInstant128.constants";

import {
  createTemporalInstant128,
} from "../../../machine/clock/instant/createTemporalInstant128";

import {
  CLOCK_REFERENCE_INSTANT,
} from "../../../machine/clock/reference/clockReference.constants";

import {
  CLOCK_TICK_OUTFLOSECONDS,
} from "../../../machine/clock/tick/clockTick.constants";

import {
  SI_SECONDS_PER_OUTFLOSECOND_NUMERATOR,
  SI_SECONDS_PER_OUTFLOSECOND_DENOMINATOR,
  OUTFLOSECONDS_PER_SI_SECOND_NUMERATOR,
  OUTFLOSECONDS_PER_SI_SECOND_DENOMINATOR,
} from "../../../machine/clock/unit/temporalUnit.constants";

import {
  serializeTemporalInstant128,
} from "../../../machine/clock/serialization/serializeTemporalInstant128";

import {
  serializeTemporalDuration128,
} from "../../../machine/clock/serialization/serializeTemporalDuration128";

import {
  CURRENT_TAI_MINUS_UTC_SI_SECONDS,
} from "../../../machine/resolution/utc/currentTaiMinusUtc.constants";

import {
  readCurrentTemporalInstant128,
} from "../../../runtime/clock/now/readCurrentTemporalInstant128";

export function emitClockText(): ClockTextEmission {
  const minimumInstant =
    createTemporalInstant128(
      TEMPORAL_INSTANT_128_MIN,
    );

  const maximumInstant =
    createTemporalInstant128(
      TEMPORAL_INSTANT_128_MAX,
    );

  const currentInstant =
    readCurrentTemporalInstant128();

  const exact = {
    referenceInstantOutfloseconds:
      serializeTemporalInstant128(
        CLOCK_REFERENCE_INSTANT,
      ),

    minimumInstantOutfloseconds:
      serializeTemporalInstant128(
        minimumInstant,
      ),

    maximumInstantOutfloseconds:
      serializeTemporalInstant128(
        maximumInstant,
      ),

    tickOutfloseconds:
      serializeTemporalDuration128(
        CLOCK_TICK_OUTFLOSECONDS,
      ),

    siSecondsPerOutflosecondNumerator:
      SI_SECONDS_PER_OUTFLOSECOND_NUMERATOR.toString(
        10,
      ),

    siSecondsPerOutflosecondDenominator:
      SI_SECONDS_PER_OUTFLOSECOND_DENOMINATOR.toString(
        10,
      ),

    outflosecondsPerSiSecondNumerator:
      OUTFLOSECONDS_PER_SI_SECOND_NUMERATOR.toString(
        10,
      ),

    outflosecondsPerSiSecondDenominator:
      OUTFLOSECONDS_PER_SI_SECOND_DENOMINATOR.toString(
        10,
      ),

    currentTaiMinusUtcSiSeconds:
      CURRENT_TAI_MINUS_UTC_SI_SECONDS.toString(
        10,
      ),

    currentInstantOutfloseconds:
      serializeTemporalInstant128(
        currentInstant,
      ),
  } as const;

  const text = [
    "OUTFLŌ_MACHINE_CLOCK",
    "definition=v1",
    `reference_instant_outfloseconds=${exact.referenceInstantOutfloseconds}`,
    `minimum_instant_outfloseconds=${exact.minimumInstantOutfloseconds}`,
    `maximum_instant_outfloseconds=${exact.maximumInstantOutfloseconds}`,
    `tick_outfloseconds=${exact.tickOutfloseconds}`,
    `si_seconds_per_outflosecond=${exact.siSecondsPerOutflosecondNumerator}/${exact.siSecondsPerOutflosecondDenominator}`,
    `outfloseconds_per_si_second=${exact.outflosecondsPerSiSecondNumerator}/${exact.outflosecondsPerSiSecondDenominator}`,
    `current_tai_minus_utc_si_seconds=${exact.currentTaiMinusUtcSiSeconds}`,
    `current_instant_outfloseconds=${exact.currentInstantOutfloseconds}`,
  ].join("\n");

  return {
    text,
    exact,
  };
}
