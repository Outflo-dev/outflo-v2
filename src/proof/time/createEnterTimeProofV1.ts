/* ==========================================================
   OUTFLŌ — CREATE ENTER TIME PROOF V1
   File: src/proof/time/createEnterTimeProofV1.ts
   Scope: Construct one proof of successful Outflō creation
          from its observed Machine Time evidence
   Last Updated:
   - Outflō Time: 847937961822553110002352219277
   - note: establish distinct creation proof identity
   ========================================================== */

import { parseTemporalInstant128 } from "../../machine/clock/serialization/parseTemporalInstant128";

import type {
  ObservedMachineTime,
} from "../../runtime/clock/interval/resolveObservedMachineTime";

import type {
  EnterTimeProofCheckResultV1,
  EnterTimeProofV1,
} from "./EnterTimeProofV1";

import {
  verifyMachineTimeObservationV1,
} from "./verifyMachineTimeObservationV1";

export function createEnterTimeProofV1(input: Readonly<{
  observationId: string;
  outfloBeginInstant: string;
  observed: ObservedMachineTime;
}>): EnterTimeProofV1 {
  if (
    !/^[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i.test(
      input.observationId,
    )
  ) {
    throw new TypeError("Valid observation identity required.");
  }

  const temporalVerification =
    verifyMachineTimeObservationV1(input.observed);

  let beginMatchesEntrance = false;

  try {
    beginMatchesEntrance =
      parseTemporalInstant128(input.outfloBeginInstant) ===
      input.observed.firstInstant;
  } catch {
    beginMatchesEntrance = false;
  }

  const creationCheck: EnterTimeProofCheckResultV1 = {
    check: "outflo-begin-is-entrance",
    result: beginMatchesEntrance ? "pass" : "fail",
  };

  const checks = [
    ...temporalVerification.checks,
    creationCheck,
  ];

  return {
    kind: "enter-time-proof",
    version: 1,

    proofId:
      "enter-time-proof-v1:" + input.observationId,

    subject: {
      kind: "guide-enter-time-execution",
    },

    evidence: {
      kind: "machine-time-observation",
      observationId: input.observationId,
    },

    verification: {
      verdict: checks.every(
        (check) => check.result === "pass",
      )
        ? "verified"
        : "failed",

      checks,
    },
  };
}
