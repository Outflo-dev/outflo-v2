/* ==========================================================
   OUTFLO — CLOCK DEFINITION V1 TEST
   File: src/machine/clock/definition/clockDefinitionV1.constants.test.ts
   Scope: Prove the canonical derivation inputs of the Outflō Clock v1 quantum
   ========================================================== */

import { describe, expect, it } from "vitest";

import {
  CLOCK_DEFINITION_V1_COSMIC_SPAN_SI_SECONDS,
  CLOCK_DEFINITION_V1_NEGATIVE_COORDINATE_CAPACITY,
  OUTFLO_SECOND_V1_SI_SECONDS_DENOMINATOR,
  OUTFLO_SECOND_V1_SI_SECONDS_NUMERATOR,
} from "./clockDefinitionV1.constants";

describe("Clock Definition v1", () => {
  it("uses the full negative half of the signed 128-bit domain", () => {
    expect(
      CLOCK_DEFINITION_V1_NEGATIVE_COORDINATE_CAPACITY,
    ).toBe(1n << 127n);
  });

  it("owns the adopted cosmic span in SI seconds", () => {
    expect(
      CLOCK_DEFINITION_V1_COSMIC_SPAN_SI_SECONDS,
    ).toBe(435_494_880_000_000_000n);
  });

  it("defines one Outflōsecond as cosmic span divided by 2^127", () => {
    expect(
      OUTFLO_SECOND_V1_SI_SECONDS_NUMERATOR,
    ).toBe(
      CLOCK_DEFINITION_V1_COSMIC_SPAN_SI_SECONDS,
    );

    expect(
      OUTFLO_SECOND_V1_SI_SECONDS_DENOMINATOR,
    ).toBe(
      CLOCK_DEFINITION_V1_NEGATIVE_COORDINATE_CAPACITY,
    );
  });
});
