/* ==========================================================
   OUTFLO — READ CURRENT TEMPORAL INSTANT 128
   File: src/runtime/clock/now/readCurrentTemporalInstant128.ts
   Scope: Own high-resolution observation of platform now onto the Outflō Clock
   Last Updated:
   - note: anchor platform wall time once and advance Now through canonical Outflōseconds
   ========================================================== */

import type {
  TemporalInstant128,
} from "../../../machine/clock/instant/TemporalInstant128";

import {
  addTemporalDurationToInstant,
} from "../../../machine/clock/arithmetic/addTemporalDurationToInstant";

import {
  resolveSiDurationToTemporalDuration128,
} from "../../../machine/resolution/si/resolveSiDurationToTemporalDuration128";

import {
  resolveUnixMillisecondsToTemporalInstant128,
} from "../../../machine/resolution/unix/resolveUnixMillisecondsToTemporalInstant128";

import {
  CURRENT_TAI_MINUS_UTC_SI_SECONDS,
} from "../../../machine/resolution/utc/currentTaiMinusUtc.constants";

const NANOSECONDS_PER_MILLISECOND = 1_000_000;
const NANOSECONDS_PER_SI_SECOND = 1_000_000_000n;

const WALL_CLOCK_ANCHOR_UNIX_MILLISECONDS =
  BigInt(Date.now());

const MONOTONIC_ANCHOR_MILLISECONDS =
  performance.now();

const TEMPORAL_ANCHOR =
  resolveUnixMillisecondsToTemporalInstant128(
    WALL_CLOCK_ANCHOR_UNIX_MILLISECONDS,
    CURRENT_TAI_MINUS_UTC_SI_SECONDS,
  );

export function readCurrentTemporalInstant128(): TemporalInstant128 {
  const elapsedMilliseconds =
    performance.now() -
    MONOTONIC_ANCHOR_MILLISECONDS;

  if (elapsedMilliseconds < 0) {
    throw new RangeError(
      "Monotonic clock moved before the Outflō Now anchor.",
    );
  }

  const observedElapsedNanoseconds =
    BigInt(
      Math.trunc(
        elapsedMilliseconds *
          NANOSECONDS_PER_MILLISECOND,
      ),
    );

  const elapsedDuration =
    resolveSiDurationToTemporalDuration128(
      observedElapsedNanoseconds,
      NANOSECONDS_PER_SI_SECOND,
    );

  return addTemporalDurationToInstant(
    TEMPORAL_ANCHOR,
    elapsedDuration,
  );
}
