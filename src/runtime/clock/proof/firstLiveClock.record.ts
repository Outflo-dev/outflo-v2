/* ==========================================================
   OUTFLO — FIRST LIVE CLOCK
   File: src/runtime/clock/proof/firstLiveClock.record.ts
   Scope: Preserve the first live canonical coordinate observed from the Outflō Clock
   Last Updated:
   - note: immortalize the first observed live Clock coordinate
   ========================================================== */

import { createTemporalInstant128 } from "../../../machine/clock/instant/createTemporalInstant128";

export const FIRST_LIVE_OUTFLO_CLOCK_INSTANT =
  createTemporalInstant128(2168774454345000000n);
