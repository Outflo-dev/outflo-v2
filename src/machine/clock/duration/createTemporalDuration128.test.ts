/* ==========================================================
   OUTFLO — CREATE TEMPORAL DURATION 128 TEST
   File: src/machine/clock/duration/createTemporalDuration128.test.ts
   Scope: Prove lawful construction at the unsigned 128-bit temporal duration boundaries
   Last Updated:
   - note: establish acceptance and rejection proofs for the canonical duration domain
   ========================================================== */

import { describe, expect, it } from "vitest";

import { createTemporalDuration128 } from "./createTemporalDuration128";
import {
  TEMPORAL_DURATION_128_MAX,
  TEMPORAL_DURATION_128_MIN,
} from "./temporalDuration128.constants";

describe("createTemporalDuration128", () => {
  it("accepts zero", () => {
    expect(
      createTemporalDuration128(TEMPORAL_DURATION_128_MIN),
    ).toBe(0n);
  });

  it("accepts one nanosecond", () => {
    expect(createTemporalDuration128(1n)).toBe(1n);
  });

  it("accepts the maximum unsigned 128-bit value", () => {
    expect(
      createTemporalDuration128(TEMPORAL_DURATION_128_MAX),
    ).toBe(TEMPORAL_DURATION_128_MAX);
  });

  it("rejects a negative duration", () => {
    expect(() => createTemporalDuration128(-1n)).toThrow(RangeError);
  });

  it("rejects a value above the maximum", () => {
    expect(() =>
      createTemporalDuration128(TEMPORAL_DURATION_128_MAX + 1n),
    ).toThrow(RangeError);
  });
});
