/* ==========================================================
   OUTFLO — RESOLVE OBSERVED MACHINE TIME
   File: src/runtime/clock/interval/resolveObservedMachineTime.ts
   Scope: Resolve raw platform observations into protected canonical Machine-Time boundaries and intervals
   Last Updated:
   - date: 2026-10-07
   - note: expose the protected entrance Instant without duplicating observation law
   ========================================================== */

import {
  machine,
} from "../../../machine";

import type {
  PlatformTemporalObservation,
} from "../observation/PlatformTemporalObservation";

const OBSERVATION_PRECISION_MILLISECONDS =
  1n;

export type ObservedMachineTimeEntrance =
  Readonly<{
    firstObservation:
      PlatformTemporalObservation;

    observationPrecisionMilliseconds:
      bigint;

    protectedFirstUnixMilliseconds:
      bigint;

    firstInstant: ReturnType<
      typeof machine.clock.resolveUnixMillisecondObservation128
    >;
  }>;

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

export function resolveObservedMachineTimeEntrance(
  firstObservation: PlatformTemporalObservation,
): ObservedMachineTimeEntrance {
  const protectedFirstUnixMilliseconds =
    firstObservation.wallUnixMilliseconds +
    OBSERVATION_PRECISION_MILLISECONDS;

  const firstInstant =
    machine.clock.resolveUnixMillisecondObservation128(
      protectedFirstUnixMilliseconds,
    );

  return {
    firstObservation,

    observationPrecisionMilliseconds:
      OBSERVATION_PRECISION_MILLISECONDS,

    protectedFirstUnixMilliseconds,

    firstInstant,
  };
}

export function resolveObservedMachineTime(
  firstObservation: PlatformTemporalObservation,
  secondObservation: PlatformTemporalObservation,
): ObservedMachineTime {
  const entrance =
    resolveObservedMachineTimeEntrance(
      firstObservation,
    );

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

  const protectedSecondUnixMilliseconds =
    secondObservation.wallUnixMilliseconds -
    OBSERVATION_PRECISION_MILLISECONDS;

  const protectedSpanMilliseconds =
    protectedSecondUnixMilliseconds -
    entrance.protectedFirstUnixMilliseconds;

  const secondInstant =
    machine.clock.resolveUnixMillisecondObservation128(
      protectedSecondUnixMilliseconds,
    );

  const duration =
    machine.clock.measureTemporalDurationBetweenInstants(
      entrance.firstInstant,
      secondInstant,
    );

  return {
    firstObservation:
      entrance.firstObservation,

    secondObservation,

    rawSpanMilliseconds,

    observationPrecisionMilliseconds:
      entrance.observationPrecisionMilliseconds,

    protectedFirstUnixMilliseconds:
      entrance.protectedFirstUnixMilliseconds,

    protectedSecondUnixMilliseconds,
    protectedSpanMilliseconds,

    firstInstant:
      entrance.firstInstant,

    secondInstant,
    duration,
  };
}
