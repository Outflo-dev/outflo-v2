/* ==========================================================
   OUTFLO — RESOLVE UNIX MILLISECOND OBSERVATION 128
   File: src/machine/resolution/observation/resolveUnixMillisecondObservation128.ts
   Scope: Resolve one observed Unix-millisecond boundary into canonical Outflō Time
   Last Updated:
   - date: 2026-10-07
   - note: provide the canonical Machine boundary for one raw Unix-millisecond observation
   ========================================================== */

import type {
  TemporalInstant128,
} from "../../clock/instant/TemporalInstant128";

import {
  resolveUnixMillisecondsToTemporalInstant128,
} from "../unix/resolveUnixMillisecondsToTemporalInstant128";

import {
  CURRENT_TAI_MINUS_UTC_SI_SECONDS,
} from "../utc/currentTaiMinusUtc.constants";

export function resolveUnixMillisecondObservation128(
  unixMilliseconds: bigint,
): TemporalInstant128 {
  return resolveUnixMillisecondsToTemporalInstant128(
    unixMilliseconds,
    CURRENT_TAI_MINUS_UTC_SI_SECONDS,
  );
}
