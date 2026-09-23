/* ==========================================================
   OUTFLO — SUBTRACT TEMPORAL DURATION FROM INSTANT TEST
   File: src/machine/clock/arithmetic/subtractTemporalDurationFromInstant.test.ts
   Scope: Prove lawful backward movement across the Clock
   Last Updated:
   - note: establish arithmetic and underflow proofs for Instant minus Duration
   ========================================================== */

import { describe, expect, it } from "vitest";

import { createTemporalDuration128 } from "../duration/createTemporalDuration128";
import { TEMPORAL_DURATION_128_MAX } from "../duration/temporalDuration128.constants";
import { createTemporalInstant128 } from "../instant/createTemporalInstant128";
import {
  TEMPORAL_INSTANT_128_MAX,
  TEMPORAL_INSTANT_128_MIN,
} from "../instant/temporalInstant128.constants";
import { subtractTemporalDurationFromInstant } from "./subtractTemporalDurationFromInstant";

describe("subtractTemporalDurationFromInstant", () => {
  it("preserves an instant when duration is zero", () => {
    const instant = createTemporalInstant128(0n);
    const duration = createTemporalDuration128(0n);

    expect(subtractTemporalDurationFromInstant(instant, duration)).toBe(0n);
  });

  it("moves an instant backward", () => {
    const instant = createTemporalInstant128(1n);
    const duration = createTemporalDuration128(1n);

    expect(subtractTemporalDurationFromInstant(instant, duration)).toBe(0n);
  });

  it("can traverse the full Clock from maximum to minimum", () => {
    const instant = createTemporalInstant128(TEMPORAL_INSTANT_128_MAX);
    const duration = createTemporalDuration128(TEMPORAL_DURATION_128_MAX);

    expect(subtractTemporalDurationFromInstant(instant, duration)).toBe(
      TEMPORAL_INSTANT_128_MIN,
    );
  });

  it("rejects movement beyond the minimum instant", () => {
    const instant = createTemporalInstant128(TEMPORAL_INSTANT_128_MIN);
    const duration = createTemporalDuration128(1n);

    expect(() =>
      subtractTemporalDurationFromInstant(instant, duration),
    ).toThrow(RangeError);
  });
});
