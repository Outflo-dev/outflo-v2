/* ==========================================================
   OUTFLO — SYSTEM TIME V1 RESOLUTION TESTS
   File: src/machine/resolution/si/resolveTemporalDurationToSystemTimeV1.test.ts
   Scope: Prove exact SYSTEM duration decomposition
   ========================================================== */

import { describe, expect, it } from "vitest";

import {
  createTemporalDuration128,
} from "../../clock/duration/createTemporalDuration128";

import {
  SYSTEM_TIME_V1,
} from "../../clock/unit/systemTimeV1.constants";

import {
  SI_SECONDS_PER_OUTFLOSECOND_DENOMINATOR,
  SI_SECONDS_PER_OUTFLOSECOND_NUMERATOR,
} from "../../clock/unit/temporalUnit.constants";

import {
  resolveSiDurationToTemporalDuration128,
} from "./resolveSiDurationToTemporalDuration128";

import {
  resolveTemporalDurationToSystemTimeV1,
} from "./resolveTemporalDurationToSystemTimeV1";

describe("resolveTemporalDurationToSystemTimeV1", () => {
  it("resolves zero without inventing elapsed Time", () => {
    const result = resolveTemporalDurationToSystemTimeV1(
      createTemporalDuration128(0n),
    );

    expect(result).toEqual({
      referenceId: SYSTEM_TIME_V1.id,
      years: 0n,
      days: 0n,
      hours: 0n,
      minutes: 0n,
      seconds: 0n,
      subsecondSiNumerator: 0n,
      subsecondSiDenominator:
        SI_SECONDS_PER_OUTFLOSECOND_DENOMINATOR,
    });
  });

  it("respects every exact unit boundary", () => {
    const boundaries = [
      { unit: "second", siSeconds: 1n },
      { unit: "minute", siSeconds: 60n },
      { unit: "hour", siSeconds: 3_600n },
      { unit: "day", siSeconds: 86_400n },
      { unit: "year", siSeconds: 31_557_600n },
    ] as const;

    for (const { unit, siSeconds } of boundaries) {
      const floor = resolveSiDurationToTemporalDuration128(
        siSeconds,
      );

      // The SI boundary lies between native coordinates.
      const before = resolveTemporalDurationToSystemTimeV1(
        floor,
      );

      const after = resolveTemporalDurationToSystemTimeV1(
        createTemporalDuration128(floor + 1n),
      );

      expect(before[`${unit}s` as keyof typeof before]);
      // Verify the named unit explicitly below.
      const beforeUnit = {
        second: before.seconds,
        minute: before.minutes,
        hour: before.hours,
        day: before.days,
        year: before.years,
      }[unit];

      const afterUnit = {
        second: after.seconds,
        minute: after.minutes,
        hour: after.hours,
        day: after.days,
        year: after.years,
      }[unit];

      expect(beforeUnit).toBe(0n);
      expect(afterUnit).toBe(1n);
    }
  });

  it("reconstructs the exact SI rational duration", () => {
    const samples = [
      0n,
      1n,
      resolveSiDurationToTemporalDuration128(
        31_557_600n + 86_400n + 3_600n + 60n + 1n,
      ),
      (1n << 128n) - 1n,
    ];

    for (const value of samples) {
      const duration = createTemporalDuration128(value);
      const result = resolveTemporalDurationToSystemTimeV1(
        duration,
      );

      const units = SYSTEM_TIME_V1.unitsInSiSeconds;

      const wholeSiSeconds =
        result.years * units.year +
        result.days * units.day +
        result.hours * units.hour +
        result.minutes * units.minute +
        result.seconds * units.second;

      const reconstructedNumerator =
        wholeSiSeconds * result.subsecondSiDenominator +
        result.subsecondSiNumerator;

      const originalNumerator =
        duration * SI_SECONDS_PER_OUTFLOSECOND_NUMERATOR;

      expect(reconstructedNumerator).toBe(originalNumerator);

      expect(result.subsecondSiDenominator).toBe(
        SI_SECONDS_PER_OUTFLOSECOND_DENOMINATOR,
      );

      expect(result.subsecondSiNumerator >= 0n).toBe(true);

      expect(
        result.subsecondSiNumerator <
          result.subsecondSiDenominator,
      ).toBe(true);
    }
  });
});
