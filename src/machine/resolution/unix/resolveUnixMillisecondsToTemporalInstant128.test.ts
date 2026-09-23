/* ==========================================================
   OUTFLO — RESOLVE UNIX MILLISECONDS TO TEMPORAL INSTANT 128 TEST
   File: src/machine/resolution/unix/resolveUnixMillisecondsToTemporalInstant128.test.ts
   Scope: Prove deterministic Unix-to-Clock temporal resolution
   Last Updated:
   - note: prove Unix epoch, modern UTC/TAI resolution, and millisecond precision mapping
   ========================================================== */

import { describe, expect, it } from "vitest";

import { resolveUnixMillisecondsToTemporalInstant128 } from "./resolveUnixMillisecondsToTemporalInstant128";

describe("resolveUnixMillisecondsToTemporalInstant128", () => {
  it("resolves the Unix epoch using the historical TAI-minus-UTC relationship", () => {
    const unixMilliseconds = 0n;
    const taiMinusUtcNanoseconds = 8_000_082_000n;

    expect(
      resolveUnixMillisecondsToTemporalInstant128(
        unixMilliseconds,
        taiMinusUtcNanoseconds,
      ),
    ).toBe(378_691_208_000_082_000n);
  });

  it("resolves 2017-01-01 UTC using TAI minus UTC of 37 seconds", () => {
    const unixMilliseconds = 1_483_228_800_000n;
    const taiMinusUtcNanoseconds = 37_000_000_000n;

    expect(
      resolveUnixMillisecondsToTemporalInstant128(
        unixMilliseconds,
        taiMinusUtcNanoseconds,
      ),
    ).toBe(1_861_920_037_000_000_000n);
  });

  it("maps one Unix millisecond to one million Clock nanoseconds", () => {
    const taiMinusUtcNanoseconds = 37_000_000_000n;

    const first =
      resolveUnixMillisecondsToTemporalInstant128(
        1_483_228_800_000n,
        taiMinusUtcNanoseconds,
      );

    const second =
      resolveUnixMillisecondsToTemporalInstant128(
        1_483_228_800_001n,
        taiMinusUtcNanoseconds,
      );

    expect(second - first).toBe(1_000_000n);
  });
});
