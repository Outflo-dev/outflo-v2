/* ==========================================================
   OUTFLO — CLOCK TICK CONSTANTS TEST
   File: src/machine/clock/tick/clockTick.constants.test.ts
   Scope: Prove the canonical tick quantity of the Outflō Clock
   Last Updated:
   - note: establish one Clock tick as one temporal nanosecond
   ========================================================== */

import { describe, expect, it } from "vitest";

import { CLOCK_TICK_NANOSECONDS } from "./clockTick.constants";

describe("CLOCK_TICK_NANOSECONDS", () => {
  it("is one temporal nanosecond", () => {
    expect(CLOCK_TICK_NANOSECONDS).toBe(1n);
  });
});
