/* ==========================================================
   OUTFLO — OBSERVE PLATFORM TEMPORAL NOW
   File: src/runtime/clock/observation/observePlatformTemporalNow.ts
   Scope: Observe the platform wall and monotonic temporal sources once
   ========================================================== */

import type {
  PlatformTemporalObservation,
} from "./PlatformTemporalObservation";

export function observePlatformTemporalNow(): PlatformTemporalObservation {
  return {
    wallUnixMilliseconds:
      BigInt(Date.now()),

    monotonicMilliseconds:
      performance.now(),
  };
}
