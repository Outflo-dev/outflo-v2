/* ==========================================================
   OUTFLO — TEMPORAL UNIT CONSTANTS
   File: src/machine/clock/unit/temporalUnit.constants.ts
   Scope: Own exact temporal unit relationships used by the Outflō Clock
   Last Updated:
   - note: establish SI-derived nanosecond scale relationships
   ========================================================== */

/*
  Provenance:
  - BIPM International System of Units (SI)
  - milli = 10^-3
  - nano  = 10^-9

  Therefore:
  - 1 millisecond = 10^6 nanoseconds
  - 1 second = 10^9 nanoseconds
*/

export const NANOSECONDS_PER_MILLISECOND = 10n ** 6n;
export const NANOSECONDS_PER_SECOND = 10n ** 9n;
