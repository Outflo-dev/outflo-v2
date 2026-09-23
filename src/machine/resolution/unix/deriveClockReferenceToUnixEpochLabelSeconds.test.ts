/* ==========================================================
   OUTFLO — DERIVE CLOCK REFERENCE TO UNIX EPOCH LABEL SECONDS TEST
   File: src/machine/resolution/unix/deriveClockReferenceToUnixEpochLabelSeconds.test.ts
   Scope: Prove the nominal civil-label displacement from 1958-01-01 to 1970-01-01
   Last Updated:
   - note: prove derived Unix epoch displacement
   ========================================================== */

import { describe, expect, it } from "vitest";
import { deriveClockReferenceToUnixEpochLabelSeconds } from "./deriveClockReferenceToUnixEpochLabelSeconds";

describe("deriveClockReferenceToUnixEpochLabelSeconds", () => {
  it("derives the 1958-01-01 to 1970-01-01 nominal label displacement", () => {
    expect(
      deriveClockReferenceToUnixEpochLabelSeconds(),
    ).toBe(378_691_200n);
  });
});
