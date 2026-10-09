/* ==========================================================
   OUTFLO — MACHINE
   File: src/machine/index.ts
   Scope: Public boundary for deterministic Machine capabilities
   Last Updated:
   - date: 2026-10-09
   - note: expose SYSTEM Time v1 duration resolution
   ========================================================== */

import {
  resolveObservedTemporalInstant128,
} from "./resolution/observation/resolveObservedTemporalInstant128";

import {
  resolveUnixMillisecondObservation128,
} from "./resolution/observation/resolveUnixMillisecondObservation128";

import {
  measureTemporalDurationBetweenInstants,
} from "./clock/arithmetic/measureTemporalDurationBetweenInstants";

import {
  resolveSiDurationToTemporalDuration128,
} from "./resolution/si/resolveSiDurationToTemporalDuration128";

import {
  resolveTemporalDurationToSystemTimeV1,
} from "./resolution/si/resolveTemporalDurationToSystemTimeV1";

import {
  serializeTemporalInstant128,
} from "./clock/serialization/serializeTemporalInstant128";

import {
  serializeTemporalDuration128,
} from "./clock/serialization/serializeTemporalDuration128";

export const machine = Object.freeze({
  clock: Object.freeze({
    resolveObservedTemporalInstant128,
    resolveUnixMillisecondObservation128,
    resolveSiDurationToTemporalDuration128,
    resolveTemporalDurationToSystemTimeV1,
    measureTemporalDurationBetweenInstants,
    serializeTemporalInstant128,
    serializeTemporalDuration128,
  }),
});
