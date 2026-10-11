/* ==========================================================
   OUTFLŌ — CREATE ENTER TIME PROOF V1 TEST
   File: src/proof/time/createEnterTimeProofV1.test.ts
   Scope: Verify Proof identity, creation entrance,
          and rejection of inconsistent evidence
   Last Updated:
   - Outflō Time: 847937961822553110002352219277
   - note: establish Enter Time Proof construction tests
   ========================================================== */

import { describe, expect, it } from "vitest";

import { machine } from "../../machine";
import { createTemporalDuration128 } from "../../machine/clock/duration/createTemporalDuration128";
import { resolveObservedMachineTime } from "../../runtime/clock/interval/resolveObservedMachineTime";
import { createEnterTimeProofV1 } from "./createEnterTimeProofV1";

const observationId = "00000000-0000-4000-8000-000000000001";

function createEvidence() {
  const observed = resolveObservedMachineTime(
    {
      wallUnixMilliseconds: 1_791_377_197_352n,
      monotonicMilliseconds: 137_770_233.6555,
    },
    {
      wallUnixMilliseconds: 1_791_377_197_956n,
      monotonicMilliseconds: 137_770_838.1388,
    },
  );

  return {
    observationId,
    observed,
    outfloBeginInstant:
      machine.clock.serializeTemporalInstant128(
        observed.firstInstant,
      ),
  };
}

describe("Enter Time Proof v1", () => {
  it("constructs a verified Proof with eight passing checks", () => {
    const proof = createEnterTimeProofV1(createEvidence());

    expect(proof.kind).toBe("enter-time-proof");
    expect(proof.version).toBe(1);
    expect(proof.proofId).toBe(
      "enter-time-proof-v1:" + observationId,
    );
    expect(proof.evidence.observationId).toBe(observationId);
    expect(proof.verification.verdict).toBe("verified");
    expect(proof.verification.checks).toHaveLength(8);
    expect(
      proof.verification.checks.every(
        (check) => check.result === "pass",
      ),
    ).toBe(true);
  });

  it("detects an incorrect Outflō Begin", () => {
    const proof = createEnterTimeProofV1({
      ...createEvidence(),
      outfloBeginInstant: "0",
    });

    expect(proof.verification.verdict).toBe("failed");
    expect(
      proof.verification.checks.find(
        (check) => check.check === "outflo-begin-is-entrance",
      )?.result,
    ).toBe("fail");
  });

  it("detects an incorrect canonical duration", () => {
    const evidence = createEvidence();

    const proof = createEnterTimeProofV1({
      ...evidence,
      observed: {
        ...evidence.observed,
        duration: createTemporalDuration128(
          evidence.observed.duration + 1n,
        ),
      },
    });

    expect(proof.verification.verdict).toBe("failed");
    expect(
      proof.verification.checks.find(
        (check) => check.check === "canonical-duration",
      )?.result,
    ).toBe("fail");
  });

  it("rejects an invalid observation identity", () => {
    expect(() =>
      createEnterTimeProofV1({
        ...createEvidence(),
        observationId: "not-a-uuid",
      }),
    ).toThrow(TypeError);
  });
});
