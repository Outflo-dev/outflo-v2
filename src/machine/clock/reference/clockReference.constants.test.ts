/* ==========================================================
   OUTFLO — CLOCK REFERENCE CONSTANTS TEST
   File: src/machine/clock/reference/clockReference.constants.test.ts
   Scope: Prove the canonical zero coordinate of the Outflō Clock
   Last Updated:
   - note: establish the Clock reference as temporal instant zero
   ========================================================== */

import { describe, expect, it } from "vitest";

import { CLOCK_REFERENCE_INSTANT } from "./clockReference.constants";

describe("CLOCK_REFERENCE_INSTANT", () => {
  it("is canonical instant zero", () => {
    expect(CLOCK_REFERENCE_INSTANT).toBe(0n);
  });
});
