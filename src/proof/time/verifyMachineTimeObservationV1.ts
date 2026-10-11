/* ==========================================================
   OUTFLŌ — VERIFY MACHINE TIME OBSERVATION V1
   File: src/proof/time/verifyMachineTimeObservationV1.ts
   Scope: Verify the recorded mathematical relationships
          of one Machine Time observation
   Last Updated:
   - Outflō Time: 847937682918622044902481006929
   - note: establish independent observation verification
   ========================================================== */

import { machine } from "../../machine";

import type {
  ObservedMachineTime,
} from "../../runtime/clock/interval/resolveObservedMachineTime";

import type {
  EnterTimeProofCheckResultV1,
  EnterTimeProofV1,
} from "./EnterTimeProofV1";

const PRECISION_MILLISECONDS_V1 = 1n;

export function verifyMachineTimeObservationV1(
  observed: ObservedMachineTime,
): EnterTimeProofV1["verification"] {
  const first = observed.firstObservation;
  const second = observed.secondObservation;

  const precision = PRECISION_MILLISECONDS_V1;

  const checks: EnterTimeProofCheckResultV1[] = [];

  function verify(
    check: EnterTimeProofCheckResultV1["check"],
    assertion: () => boolean,
  ): void {
    let passed = false;

    try {
      passed = assertion();
    } catch {
      passed = false;
    }

    checks.push({
      check,
      result: passed ? "pass" : "fail",
    });
  }

  verify(
    "raw-span",
    () =>
      observed.rawSpanMilliseconds ===
      second.wallUnixMilliseconds -
        first.wallUnixMilliseconds,
  );

  verify(
    "protected-entrance",
    () =>
      observed.observationPrecisionMilliseconds ===
        precision &&
      observed.protectedFirstUnixMilliseconds ===
        first.wallUnixMilliseconds + precision,
  );

  verify(
    "protected-completion",
    () =>
      observed.protectedSecondUnixMilliseconds ===
      second.wallUnixMilliseconds - precision,
  );

  verify(
    "protected-span",
    () =>
      observed.rawSpanMilliseconds > precision * 2n &&
      observed.protectedSpanMilliseconds > 0n &&
      observed.protectedSpanMilliseconds ===
        observed.protectedSecondUnixMilliseconds -
          observed.protectedFirstUnixMilliseconds,
  );

  verify(
    "first-canonical-instant",
    () =>
      observed.firstInstant ===
      machine.clock.resolveUnixMillisecondObservation128(
        first.wallUnixMilliseconds + precision,
      ),
  );

  verify(
    "second-canonical-instant",
    () =>
      observed.secondInstant ===
      machine.clock.resolveUnixMillisecondObservation128(
        second.wallUnixMilliseconds - precision,
      ),
  );

  verify(
    "canonical-duration",
    () =>
      observed.duration ===
      machine.clock.measureTemporalDurationBetweenInstants(
        observed.firstInstant,
        observed.secondInstant,
      ),
  );

  return {
    verdict: checks.every(
      (check) => check.result === "pass",
    )
      ? "verified"
      : "failed",

    checks,
  };
}
