/* ==========================================================
   OUTFLO — TEMPORAL INSTANT 128 CONSTANTS
   File: src/machine/clock/instant/temporalInstant128.constants.ts
   Scope: Own the signed 128-bit bounds of a canonical Outflō temporal instant
   Last Updated:
   - note: establish the minimum and maximum canonical temporal instant values
   ========================================================== */

export const TEMPORAL_INSTANT_128_MIN = -(1n << 127n);

export const TEMPORAL_INSTANT_128_MAX = (1n << 127n) - 1n;
