/* ==========================================================
   OUTFLO — CLOCK TICK CONSTANTS
   File: src/machine/clock/tick/clockTick.constants.ts
   Scope: Own the canonical tick quantity of the Outflō Clock
   Last Updated:
   - note: establish one Clock tick as one SI nanosecond
   ========================================================== */

import { createTemporalDuration128 } from "../duration/createTemporalDuration128";

export const CLOCK_TICK_NANOSECONDS =
  createTemporalDuration128(1n);
