/* ==========================================================
   OUTFLO — TEMPORAL DURATION 128 CONSTANTS
   File: src/machine/clock/duration/temporalDuration128.constants.ts
   Scope: Own the unsigned 128-bit bounds of a canonical Outflō temporal duration
   Last Updated:
   - note: establish the minimum and maximum canonical temporal duration values
   ========================================================== */

export const TEMPORAL_DURATION_128_MIN = 0n;

export const TEMPORAL_DURATION_128_MAX = (1n << 128n) - 1n;
