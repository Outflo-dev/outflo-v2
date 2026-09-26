/* ==========================================================
   OUTFLO — CLOCK TICK CONSTANTS TEST
   File: src/machine/clock/tick/clockTick.constants.test.ts
   Scope: Prove the canonical tick quantity of the Outflō Clock
   Last Updated:
   - note: establish one Clock tick as one Outflōsecond
   ========================================================== */

import { describe, expect, it } from "vitest";

import {
  CLOCK_TICK_OUTFLOSECONDS,
} from "./clockTick.constants";

describe("CLOCK_TICK_OUTFLOSECONDS", () => {
  it("is one canonical Outflōsecond", () => {
    expect(
      CLOCK_TICK_OUTFLOSECONDS,
    ).toBe(1n);
  });
});
