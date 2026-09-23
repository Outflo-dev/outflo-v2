/* ==========================================================
   OUTFLO — CURRENT TAI MINUS UTC TEST
   File: src/machine/resolution/utc/currentTaiMinusUtc.constants.test.ts
   Scope: Prove the current source-backed TAI-minus-UTC relationship
   Last Updated:
   - note: prove the IERS-published current relationship in Clock units
   ========================================================== */

import { describe, expect, it } from "vitest";
import { CURRENT_TAI_MINUS_UTC_NANOSECONDS } from "./currentTaiMinusUtc.constants";

describe("CURRENT_TAI_MINUS_UTC_NANOSECONDS", () => {
  it("represents the current +37 second TAI-minus-UTC relationship", () => {
    expect(CURRENT_TAI_MINUS_UTC_NANOSECONDS).toBe(
      37_000_000_000n,
    );
  });
});
