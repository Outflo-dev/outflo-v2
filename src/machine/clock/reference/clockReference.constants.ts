/* ==========================================================
   OUTFLO — CLOCK REFERENCE CONSTANTS
   File: src/machine/clock/reference/clockReference.constants.ts
   Scope: Own the canonical zero coordinate of the Outflō Clock
   Last Updated:
   - note: establish canonical Clock reference at temporal instant zero
   ========================================================== */

import { createTemporalInstant128 } from "../instant/createTemporalInstant128";

export const CLOCK_REFERENCE_INSTANT =
  createTemporalInstant128(0n);
