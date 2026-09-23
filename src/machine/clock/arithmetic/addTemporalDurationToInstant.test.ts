/* ==========================================================
   OUTFLO — ADD TEMPORAL DURATION TO INSTANT TEST
   File: src/machine/clock/arithmetic/addTemporalDurationToInstant.test.ts
   Scope: Prove lawful forward movement across the Clock
   Last Updated:
   - note: establish arithmetic and overflow proofs for Instant plus Duration
   ========================================================== */

import { describe, expect, it } from "vitest";

import { createTemporalDuration128 } from "../duration/createTemporalDuration128";
import { TEMPORAL_DURATION_128_MAX } from "../duration/temporalDuration128.constants";
import { createTemporalInstant128 } from "../instant/createTemporalInstant128";
import {
  TEMPORAL_INSTANT_128_MAX,
  TEMPORAL_INSTANT_128_MIN,
} from "../instant/temporalInstant128.constants";
import { addTemporalDurationToInstant } from "./addTemporalDurationToInstant";

describe("addTemporalDurationToInstant", () => {
  it("preserves an instant when duration is zero", () => {
    const instant = createTemporalInstant128(0n);
    const duration = createTemporalDuration128(0n);

    expect(addTemporalDurationToInstant(instant, duration)).toBe(0n);
  });

  it("moves an instant forward", () => {
    const instant = createTemporalInstant128(-1n);
    const duration = createTemporalDuration128(1n);

    expect(addTemporalDurationToInstant(instant, duration)).toBe(0n);
  });

  it("can traverse the full Clock from minimum to maximum", () => {
    const instant = createTemporalInstant128(TEMPORAL_INSTANT_128_MIN);
    const duration = createTemporalDuration128(TEMPORAL_DURATION_128_MAX);

    expect(addTemporalDurationToInstant(instant, duration)).toBe(
      TEMPORAL_INSTANT_128_MAX,
    );
  });

  it("rejects movement beyond the maximum instant", () => {
    const instant = createTemporalInstant128(TEMPORAL_INSTANT_128_MAX);
    const duration = createTemporalDuration128(1n);

    expect(() =>
      addTemporalDurationToInstant(instant, duration),
    ).toThrow(RangeError);
  });
});
