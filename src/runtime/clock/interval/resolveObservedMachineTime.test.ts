/* ==========================================================
   OUTFLO — RESOLVE OBSERVED MACHINE TIME TEST
   File: src/runtime/clock/interval/resolveObservedMachineTime.test.ts
   Scope: Prove raw temporal observations resolve into one protected Machine-Time interval
   Last Updated:
   - date: 2026-10-07
   - note: prove raw preservation, one-millisecond inward bounds, protected span, and canonical resolution
   ========================================================== */

import {
  describe,
  expect,
  it,
} from "vitest";

import type {
  PlatformTemporalObservation,
} from "../observation/PlatformTemporalObservation";

import {
  resolveObservedMachineTime,
} from "./resolveObservedMachineTime";

describe("resolveObservedMachineTime", () => {
  it("preserves every raw observation and derives the protected interval", () => {
    const firstObservation: PlatformTemporalObservation = {
      wallUnixMilliseconds:
        1_791_377_197_352n,
      monotonicMilliseconds:
        137_770_233.6555,
    };

    const secondObservation: PlatformTemporalObservation = {
      wallUnixMilliseconds:
        1_791_377_197_956n,
      monotonicMilliseconds:
        137_770_838.1388,
    };

    const result =
      resolveObservedMachineTime(
        firstObservation,
        secondObservation,
      );

    expect(result.firstObservation).toBe(
      firstObservation,
    );

    expect(result.secondObservation).toBe(
      secondObservation,
    );

    expect(result.rawSpanMilliseconds).toBe(
      604n,
    );

    expect(
      result.observationPrecisionMilliseconds,
    ).toBe(1n);

    expect(
      result.protectedFirstUnixMilliseconds,
    ).toBe(
      1_791_377_197_353n,
    );

    expect(
      result.protectedSecondUnixMilliseconds,
    ).toBe(
      1_791_377_197_955n,
    );

    expect(
      result.protectedSpanMilliseconds,
    ).toBe(602n);

    expect(result.secondInstant).toBeGreaterThan(
      result.firstInstant,
    );

    expect(result.duration).toBeGreaterThan(0n);
  });

  it("rejects an interval with no positive protected interior", () => {
    const firstObservation: PlatformTemporalObservation = {
      wallUnixMilliseconds:
        1_791_377_197_352n,
      monotonicMilliseconds:
        1_000,
    };

    const secondObservation: PlatformTemporalObservation = {
      wallUnixMilliseconds:
        1_791_377_197_354n,
      monotonicMilliseconds:
        1_002,
    };

    expect(() =>
      resolveObservedMachineTime(
        firstObservation,
        secondObservation,
      ),
    ).toThrow(RangeError);
  });
});
