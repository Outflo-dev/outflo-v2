/* ==========================================================
   OUTFLO — CREATE TEMPORAL INSTANT 128 TEST
   File: src/machine/clock/instant/createTemporalInstant128.test.ts
   Scope: Prove lawful construction at the signed 128-bit temporal boundaries
   Last Updated:
   - note: establish acceptance and rejection proofs for the canonical instant domain
   ========================================================== */

import { describe, expect, it } from "vitest";

import { createTemporalInstant128 } from "./createTemporalInstant128";
import {
  TEMPORAL_INSTANT_128_MAX,
  TEMPORAL_INSTANT_128_MIN,
} from "./temporalInstant128.constants";

describe("createTemporalInstant128", () => {
  it("accepts the minimum signed 128-bit value", () => {
    expect(
      createTemporalInstant128(TEMPORAL_INSTANT_128_MIN),
    ).toBe(TEMPORAL_INSTANT_128_MIN);
  });

  it("accepts zero", () => {
    expect(createTemporalInstant128(0n)).toBe(0n);
  });

  it("accepts the maximum signed 128-bit value", () => {
    expect(
      createTemporalInstant128(TEMPORAL_INSTANT_128_MAX),
    ).toBe(TEMPORAL_INSTANT_128_MAX);
  });

  it("rejects a value below the minimum", () => {
    expect(() =>
      createTemporalInstant128(TEMPORAL_INSTANT_128_MIN - 1n),
    ).toThrow(RangeError);
  });

  it("rejects a value above the maximum", () => {
    expect(() =>
      createTemporalInstant128(TEMPORAL_INSTANT_128_MAX + 1n),
    ).toThrow(RangeError);
  });
});
