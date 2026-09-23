/* ==========================================================
   OUTFLO — RESOLVE TEMPORAL INSTANT 128 TO UNIX MILLISECONDS TEST
   File: src/machine/resolution/unix/resolveTemporalInstant128ToUnixMilliseconds.test.ts
   Scope: Prove exact reversible Clock-to-Unix resolution
   Last Updated:
   - note: establish Unix round-trip and precision-loss rejection proofs
   ========================================================== */

import { describe, expect, it } from "vitest";

import { createTemporalInstant128 } from "../../clock/instant/createTemporalInstant128";
import { resolveUnixMillisecondsToTemporalInstant128 } from "./resolveUnixMillisecondsToTemporalInstant128";
import { resolveTemporalInstant128ToUnixMilliseconds } from "./resolveTemporalInstant128ToUnixMilliseconds";

describe("resolveTemporalInstant128ToUnixMilliseconds", () => {
  it("round-trips Unix milliseconds exactly", () => {
    const unixMilliseconds = 1_483_228_800_123n;
    const taiMinusUtcNanoseconds = 37_000_000_000n;

    const instant =
      resolveUnixMillisecondsToTemporalInstant128(
        unixMilliseconds,
        taiMinusUtcNanoseconds,
      );

    expect(
      resolveTemporalInstant128ToUnixMilliseconds(
        instant,
        taiMinusUtcNanoseconds,
      ),
    ).toBe(unixMilliseconds);
  });

  it("rejects an Instant that would lose sub-millisecond precision", () => {
    const instant = createTemporalInstant128(
      1_861_920_037_000_000_001n,
    );

    expect(() =>
      resolveTemporalInstant128ToUnixMilliseconds(
        instant,
        37_000_000_000n,
      ),
    ).toThrow(RangeError);
  });
});
