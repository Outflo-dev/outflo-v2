/* ==========================================================
   OUTFLO — READ CURRENT TEMPORAL INSTANT 128 TEST
   File: src/runtime/clock/now/readCurrentTemporalInstant128.test.ts
   Scope: Prove high-resolution runtime observation of platform now onto the Outflō Clock
   Last Updated:
   - note: prove wall-clock anchoring plus monotonic sub-millisecond advancement in canonical Outflōseconds
   ========================================================== */

import {
  afterEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

afterEach(() => {
  vi.restoreAllMocks();
  vi.resetModules();
});

describe("readCurrentTemporalInstant128", () => {
  it("anchors wall time and advances Now through canonical Outflōseconds", async () => {
    vi.spyOn(Date, "now")
      .mockReturnValue(1_483_228_800_000);

    vi.spyOn(performance, "now")
      .mockReturnValueOnce(1_000)
      .mockReturnValueOnce(1_000.125);

    const {
      readCurrentTemporalInstant128,
    } = await import("./readCurrentTemporalInstant128");

    expect(
      readCurrentTemporalInstant128(),
    ).toBe(
      727_423_657_894_581_740_274_782_007_221n,
    );
  });
});
