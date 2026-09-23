/* ==========================================================
   OUTFLO — READ CURRENT TEMPORAL INSTANT 128 TEST
   File: src/runtime/clock/now/readCurrentTemporalInstant128.test.ts
   Scope: Prove runtime observation of the current platform instant onto the Outflō Clock
   Last Updated:
   - note: establish deterministic Date.now observation at the runtime boundary
   ========================================================== */

import { afterEach, describe, expect, it, vi } from "vitest";

import { readCurrentTemporalInstant128 } from "./readCurrentTemporalInstant128";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("readCurrentTemporalInstant128", () => {
  it("observes platform now and resolves it onto the Clock", () => {
    vi.spyOn(Date, "now").mockReturnValue(1_483_228_800_000);

    expect(
      readCurrentTemporalInstant128(),
    ).toBe(1_861_920_037_000_000_000n);
  });
});
