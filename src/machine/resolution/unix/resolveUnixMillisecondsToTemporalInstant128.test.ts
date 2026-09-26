/* ==========================================================
   OUTFLO — RESOLVE UNIX MILLISECONDS TO TEMPORAL INSTANT 128 TEST
   File: src/machine/resolution/unix/resolveUnixMillisecondsToTemporalInstant128.test.ts
   Scope: Prove deterministic Unix-to-Clock resolution in canonical Outflōseconds
   ========================================================== */

import { describe, expect, it } from "vitest";

import {
  resolveUnixMillisecondsToTemporalInstant128,
} from "./resolveUnixMillisecondsToTemporalInstant128";

describe("resolveUnixMillisecondsToTemporalInstant128", () => {
  it("resolves the Unix epoch using the historical 8.000082 SI-second TAI-minus-UTC relationship", () => {
    expect(
      resolveUnixMillisecondsToTemporalInstant128(
        0n,
        8_000_082n,
        1_000_000n,
      ),
    ).toBe(
      147_948_858_308_526_302_739_422_230_175n,
    );
  });

  it("resolves 2017-01-01 UTC using TAI minus UTC of 37 SI seconds", () => {
    expect(
      resolveUnixMillisecondsToTemporalInstant128(
        1_483_228_800_000n,
        37n,
      ),
    ).toBe(
      727_423_657_894_532_904_688_167_168_824n,
    );
  });

  it("resolves one additional Unix millisecond onto the Outflō number line", () => {
    const first =
      resolveUnixMillisecondsToTemporalInstant128(
        1_483_228_800_000n,
        37n,
      );

    const second =
      resolveUnixMillisecondsToTemporalInstant128(
        1_483_228_800_001n,
        37n,
      );

    expect(
      second - first,
    ).toBe(
      390_684_692_918_707_177n,
    );
  });
});
