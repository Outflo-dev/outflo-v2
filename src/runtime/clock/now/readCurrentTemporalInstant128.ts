/* ==========================================================
   OUTFLO — READ CURRENT TEMPORAL INSTANT 128
   File: src/runtime/clock/now/readCurrentTemporalInstant128.ts
   Scope: Observe platform now and resolve it through the Outflō Machine
   ========================================================== */

import {
  machine,
} from "../../../machine";

import {
  observePlatformTemporalNow,
} from "../observation/observePlatformTemporalNow";

const PLATFORM_TEMPORAL_ANCHOR =
  observePlatformTemporalNow();

export function readCurrentTemporalInstant128() {
  const currentObservation =
    observePlatformTemporalNow();

  return machine.clock.resolveObservedTemporalInstant128(
    PLATFORM_TEMPORAL_ANCHOR.wallUnixMilliseconds,
    PLATFORM_TEMPORAL_ANCHOR.monotonicMilliseconds,
    currentObservation.monotonicMilliseconds,
  );
}
