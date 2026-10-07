/* ==========================================================
   OUTFLO — PLATFORM TEMPORAL OBSERVATION
   File: src/runtime/clock/observation/PlatformTemporalObservation.ts
   Scope: Define one raw runtime observation of platform temporal sources
   ========================================================== */

export type PlatformTemporalObservation = Readonly<{
  wallUnixMilliseconds: bigint;
  monotonicMilliseconds: number;
}>;
