/* ==========================================================
   OUTFLO — CURRENT TAI MINUS UTC TEST
   File: src/machine/resolution/utc/currentTaiMinusUtc.constants.test.ts
   Scope: Prove the current source-backed TAI-minus-UTC relationship in SI units
   ========================================================== */

import { describe, expect, it } from "vitest";

import {
  CURRENT_TAI_MINUS_UTC_SI_SECONDS,
} from "./currentTaiMinusUtc.constants";

describe("CURRENT_TAI_MINUS_UTC_SI_SECONDS", () => {
  it("represents the current +37 second TAI-minus-UTC relationship", () => {
    expect(
      CURRENT_TAI_MINUS_UTC_SI_SECONDS,
    ).toBe(37n);
  });
});
