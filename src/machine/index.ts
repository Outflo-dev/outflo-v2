/* ==========================================================
   OUTFLO — MACHINE
   File: src/machine/index.ts
   Scope: Public boundary for deterministic Machine capabilities
   Last Updated:
   - date: 2026-10-05
   - note: expose canonical temporal duration resolution and serialization
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
    measureTemporalDurationBetweenInstants,
    serializeTemporalInstant128,
    serializeTemporalDuration128,
  }),
});
