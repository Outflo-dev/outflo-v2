/* ==========================================================
   OUTFLŌ — VERIFY MACHINE TIME OBSERVATION V1 TEST
   File: src/proof/time/verifyMachineTimeObservationV1.test.ts
   Scope: Verify valid evidence and detect altered observations,
          protected boundaries, and canonical duration
   Last Updated:
   - Outflō Time: 847937751411833525720037284126
   - note: establish focused Proof verification tests
   ========================================================== */

import { describe, expect, it } from "vitest";

import { createTemporalDuration128 } from "../../machine/clock/duration/createTemporalDuration128";

import { resolveObservedMachineTime } from "../../runtime/clock/interval/resolveObservedMachineTime";

import { verifyMachineTimeObservationV1 } from "./verifyMachineTimeObservationV1";

function createValidObservation() {
  return resolveObservedMachineTime(
    {
      wallUnixMilliseconds: 1_791_377_197_352n,
      monotonicMilliseconds: 137_770_233.6555,
    },
    {
      wallUnixMilliseconds: 1_791_377_197_956n,
      monotonicMilliseconds: 137_770_838.1388,
    },
  );
}

describe("Machine Time Proof v1 verification", () => {
  it("verifies all seven relationships for valid evidence", () => {
    const observed = createValidObservation();

    const result = verifyMachineTimeObservationV1(observed);

    expect(result.verdict).toBe("verified");
    expect(result.checks).toHaveLength(7);

    expect(
      result.checks.every((check) => check.result === "pass"),
    ).toBe(true);
  });

  it("rejects an altered first platform observation", () => {
    const observed = createValidObservation();

    const altered = {
      ...observed,
      firstObservation: {
        ...observed.firstObservation,
        wallUnixMilliseconds:
          observed.firstObservation.wallUnixMilliseconds + 1n,
      },
    };

    const result = verifyMachineTimeObservationV1(altered);

    expect(result.verdict).toBe("failed");

    expect(
      result.checks.find((check) => check.check === "raw-span")?.result,
    ).toBe("fail");

    expect(
      result.checks.find(
        (check) => check.check === "first-canonical-instant",
      )?.result,
    ).toBe("fail");
  });

  it("rejects an altered protected boundary", () => {
    const observed = createValidObservation();

    const altered = {
      ...observed,
      protectedSecondUnixMilliseconds:
        observed.protectedSecondUnixMilliseconds + 1n,
    };

    const result = verifyMachineTimeObservationV1(altered);

    expect(result.verdict).toBe("failed");

    expect(
      result.checks.find(
        (check) => check.check === "protected-completion",
      )?.result,
    ).toBe("fail");
  });

  it("rejects an incorrect canonical duration", () => {
    const observed = createValidObservation();

    const altered = {
      ...observed,
      duration: createTemporalDuration128(
        observed.duration + 1n,
      ),
    };

    const result = verifyMachineTimeObservationV1(altered);

    expect(result.verdict).toBe("failed");

    expect(
      result.checks.find(
        (check) => check.check === "canonical-duration",
      )?.result,
    ).toBe("fail");
  });
});
