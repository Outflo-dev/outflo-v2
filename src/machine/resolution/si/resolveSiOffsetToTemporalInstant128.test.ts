/* ==========================================================
   OUTFLO — RESOLVE SI OFFSET TO TEMPORAL INSTANT 128 TEST
   File: src/machine/resolution/si/resolveSiOffsetToTemporalInstant128.test.ts
   Scope: Prove exact signed SI-offset resolution into Outflō coordinates
   ========================================================== */

import { describe, expect, it } from "vitest";

import {
  resolveSiOffsetToTemporalInstant128,
} from "./resolveSiOffsetToTemporalInstant128";

describe("resolveSiOffsetToTemporalInstant128", () => {
  it("resolves one SI second after Clock zero", () => {
    expect(
      resolveSiOffsetToTemporalInstant128(1n),
    ).toBe(
      390_684_692_918_707_176_836n,
    );
  });

  it("resolves the adopted cosmic span before Clock zero exactly to -2^127", () => {
    expect(
      resolveSiOffsetToTemporalInstant128(
        -435_494_880_000_000_000n,
      ),
    ).toBe(
      -(1n << 127n),
    );
  });

  it("floors negative rational offsets onto the bounded integer number line", () => {
    expect(
      resolveSiOffsetToTemporalInstant128(
        -1n,
        1_000n,
      ),
    ).toBe(
      -390_684_692_918_707_177n,
    );
  });
});
