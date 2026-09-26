/* ==========================================================
   OUTFLO — RESOLVE SI DURATION TO TEMPORAL DURATION 128 TEST
   File: src/machine/resolution/si/resolveSiDurationToTemporalDuration128.test.ts
   Scope: Prove exact rational SI-duration resolution into Outflōseconds
   ========================================================== */

import { describe, expect, it } from "vitest";

import {
  resolveSiDurationToTemporalDuration128,
} from "./resolveSiDurationToTemporalDuration128";

describe("resolveSiDurationToTemporalDuration128", () => {
  it("resolves one SI second into canonical Outflōseconds", () => {
    expect(
      resolveSiDurationToTemporalDuration128(1n),
    ).toBe(
      390_684_692_918_707_176_836n,
    );
  });

  it("resolves the adopted cosmic span exactly to 2^127 Outflōseconds", () => {
    expect(
      resolveSiDurationToTemporalDuration128(
        435_494_880_000_000_000n,
      ),
    ).toBe(
      1n << 127n,
    );
  });

  it("resolves rational SI duration without floating-point arithmetic", () => {
    expect(
      resolveSiDurationToTemporalDuration128(
        1n,
        1_000n,
      ),
    ).toBe(
      390_684_692_918_707_176n,
    );
  });
});
