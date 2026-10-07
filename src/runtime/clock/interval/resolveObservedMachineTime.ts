/* ==========================================================
   OUTFLO — RESOLVE OBSERVED MACHINE TIME
   File: src/runtime/clock/interval/resolveObservedMachineTime.ts
   Scope: Resolve two raw platform observations into one protected canonical Machine-Time interval
   Last Updated:
   - date: 2026-10-07
   - note: preserve raw observations, apply a one-millisecond inward observation bound, and derive one canonical Outflō duration
   ========================================================== */

import {
  machine,
} from "../../../machine";

import type {
  PlatformTemporalObservation,
} from "../observation/PlatformTemporalObservation";

const OBSERVATION_PRECISION_MILLISECONDS =
  1n;

export type ObservedMachineTime = Readonly<{
  firstObservation: PlatformTemporalObservation;
  secondObservation: PlatformTemporalObservation;

  rawSpanMilliseconds: bigint;

  observationPrecisionMilliseconds: bigint;

  protectedFirstUnixMilliseconds: bigint;
  protectedSecondUnixMilliseconds: bigint;
  protectedSpanMilliseconds: bigint;

  firstInstant: ReturnType<
    typeof machine.clock.resolveUnixMillisecondObservation128
  >;

  secondInstant: ReturnType<
    typeof machine.clock.resolveUnixMillisecondObservation128
  >;

  duration: ReturnType<
    typeof machine.clock.measureTemporalDurationBetweenInstants
  >;
}>;

export function resolveObservedMachineTime(
  firstObservation: PlatformTemporalObservation,
  secondObservation: PlatformTemporalObservation,
): ObservedMachineTime {
  const rawSpanMilliseconds =
    secondObservation.wallUnixMilliseconds -
    firstObservation.wallUnixMilliseconds;

  const minimumProtectedIntervalMilliseconds =
    OBSERVATION_PRECISION_MILLISECONDS *
    2n;

  if (
    rawSpanMilliseconds <=
    minimumProtectedIntervalMilliseconds
  ) {
    throw new RangeError(
      "Observed Unix-millisecond interval does not contain a positive protected interior.",
    );
  }

  const protectedFirstUnixMilliseconds =
    firstObservation.wallUnixMilliseconds +
    OBSERVATION_PRECISION_MILLISECONDS;

  const protectedSecondUnixMilliseconds =
    secondObservation.wallUnixMilliseconds -
    OBSERVATION_PRECISION_MILLISECONDS;

  const protectedSpanMilliseconds =
    protectedSecondUnixMilliseconds -
    protectedFirstUnixMilliseconds;

  const firstInstant =
    machine.clock.resolveUnixMillisecondObservation128(
      protectedFirstUnixMilliseconds,
    );

  const secondInstant =
    machine.clock.resolveUnixMillisecondObservation128(
      protectedSecondUnixMilliseconds,
    );

  const duration =
    machine.clock.measureTemporalDurationBetweenInstants(
      firstInstant,
      secondInstant,
    );

  return {
    firstObservation,
    secondObservation,

    rawSpanMilliseconds,

    observationPrecisionMilliseconds:
      OBSERVATION_PRECISION_MILLISECONDS,

    protectedFirstUnixMilliseconds,
    protectedSecondUnixMilliseconds,
    protectedSpanMilliseconds,

    firstInstant,
    secondInstant,
    duration,
  };
}
