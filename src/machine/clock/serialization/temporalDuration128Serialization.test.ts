/* ==========================================================
   OUTFLO — TEMPORAL DURATION 128 SERIALIZATION TEST
   File: src/machine/clock/serialization/temporalDuration128Serialization.test.ts
   Scope: Prove exact reversible serialization of canonical temporal Durations
   Last Updated:
   - note: establish round-trip, boundary, and malformed-input serialization proofs
   ========================================================== */

import { describe, expect, it } from "vitest";

import { createTemporalDuration128 } from "../duration/createTemporalDuration128";
import { TEMPORAL_DURATION_128_MAX } from "../duration/temporalDuration128.constants";
import { parseTemporalDuration128 } from "./parseTemporalDuration128";
import { serializeTemporalDuration128 } from "./serializeTemporalDuration128";

describe("TemporalDuration128 serialization", () => {
  it("round-trips zero exactly", () => {
    const duration = createTemporalDuration128(0n);

    expect(
      parseTemporalDuration128(
        serializeTemporalDuration128(duration),
      ),
    ).toBe(duration);
  });

  it("round-trips the maximum Duration exactly", () => {
    const duration = createTemporalDuration128(
      TEMPORAL_DURATION_128_MAX,
    );

    expect(
      parseTemporalDuration128(
        serializeTemporalDuration128(duration),
      ),
    ).toBe(duration);
  });

  it("rejects non-canonical unsigned integer strings", () => {
    expect(() => parseTemporalDuration128("-1")).toThrow(TypeError);
    expect(() => parseTemporalDuration128("01")).toThrow(TypeError);
    expect(() => parseTemporalDuration128("+1")).toThrow(TypeError);
    expect(() => parseTemporalDuration128("1.0")).toThrow(TypeError);
    expect(() => parseTemporalDuration128(" 1")).toThrow(TypeError);
  });

  it("rejects serialized values outside the Duration domain", () => {
    expect(() =>
      parseTemporalDuration128(
        (TEMPORAL_DURATION_128_MAX + 1n).toString(),
      ),
    ).toThrow(RangeError);
  });
});
