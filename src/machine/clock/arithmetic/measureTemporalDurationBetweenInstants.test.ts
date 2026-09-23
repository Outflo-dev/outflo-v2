/* ==========================================================
   OUTFLO — MEASURE TEMPORAL DURATION BETWEEN INSTANTS TEST
   File: src/machine/clock/arithmetic/measureTemporalDurationBetweenInstants.test.ts
   Scope: Prove direction-independent temporal distance measurement
   Last Updated:
   - note: establish zero, directional symmetry, and full-domain duration proofs
   ========================================================== */

import { describe, expect, it } from "vitest";

import { TEMPORAL_DURATION_128_MAX } from "../duration/temporalDuration128.constants";
import { createTemporalInstant128 } from "../instant/createTemporalInstant128";
import {
  TEMPORAL_INSTANT_128_MAX,
  TEMPORAL_INSTANT_128_MIN,
} from "../instant/temporalInstant128.constants";
import { measureTemporalDurationBetweenInstants } from "./measureTemporalDurationBetweenInstants";

describe("measureTemporalDurationBetweenInstants", () => {
  it("measures zero between identical instants", () => {
    const instant = createTemporalInstant128(0n);

    expect(
      measureTemporalDurationBetweenInstants(instant, instant),
    ).toBe(0n);
  });

  it("measures forward temporal distance", () => {
    const first = createTemporalInstant128(0n);
    const second = createTemporalInstant128(10n);

    expect(
      measureTemporalDurationBetweenInstants(first, second),
    ).toBe(10n);
  });

  it("measures the same duration in reverse order", () => {
    const first = createTemporalInstant128(10n);
    const second = createTemporalInstant128(0n);

    expect(
      measureTemporalDurationBetweenInstants(first, second),
    ).toBe(10n);
  });

  it("measures the full Clock span", () => {
    const minimum = createTemporalInstant128(
      TEMPORAL_INSTANT_128_MIN,
    );
    const maximum = createTemporalInstant128(
      TEMPORAL_INSTANT_128_MAX,
    );

    expect(
      measureTemporalDurationBetweenInstants(minimum, maximum),
    ).toBe(TEMPORAL_DURATION_128_MAX);
  });
});
