/*
 * OUTFLŌ — PROTECTED TEMPORAL INTERVAL PROOF V1
 *
 * Owner: Proof
 *
 * Verifies declared observation boundaries and their
 * canonical temporal relationships.
 *
 * Sole dependency: Machine Clock.
 *
 * No source interpretation.
 * No runtime observation.
 * No persistence.
 * No IO.
 */

import { machine } from "../../machine";

type Instant = ReturnType<
  typeof machine.clock.resolveUnixMillisecondObservation128
>;

type Duration = ReturnType<
  typeof machine.clock.measureTemporalDurationBetweenInstants
>;

export type ProtectedTemporalIntervalEvidenceV1 = Readonly<{
  firstUnixMilliseconds: bigint;
  secondUnixMilliseconds: bigint;

  firstExclusionMilliseconds: bigint;
  secondExclusionMilliseconds: bigint;

  rawSpanMilliseconds: bigint;

  protectedFirstUnixMilliseconds: bigint;
  protectedSecondUnixMilliseconds: bigint;
  protectedSpanMilliseconds: bigint;

  firstInstant: Instant;
  secondInstant: Instant;
  duration: Duration;
}>;

export function verifyProtectedTemporalIntervalV1(
  evidence: ProtectedTemporalIntervalEvidenceV1,
) {
  const checks: Array<{
    check: string;
    result: "pass" | "fail";
  }> = [];

  function verify(
    name: string,
    assertion: () => boolean,
  ): void {
    let passed = false;

    try {
      passed = assertion();
    } catch {
      passed = false;
    }

    checks.push({
      check: name,
      result: passed ? "pass" : "fail",
    });
  }

  const e = evidence;

  verify(
    "observation-order",
    () => e.secondUnixMilliseconds > e.firstUnixMilliseconds,
  );

  verify(
    "raw-span",
    () =>
      e.rawSpanMilliseconds ===
      e.secondUnixMilliseconds - e.firstUnixMilliseconds,
  );

  verify(
    "declared-exclusions",
    () =>
      e.firstExclusionMilliseconds >= 0n &&
      e.secondExclusionMilliseconds >= 0n,
  );

  verify(
    "protected-entrance",
    () =>
      e.protectedFirstUnixMilliseconds ===
      e.firstUnixMilliseconds + e.firstExclusionMilliseconds,
  );

  verify(
    "protected-completion",
    () =>
      e.protectedSecondUnixMilliseconds ===
      e.secondUnixMilliseconds - e.secondExclusionMilliseconds,
  );

  verify(
    "protected-interior",
    () =>
      e.protectedSecondUnixMilliseconds >
        e.protectedFirstUnixMilliseconds &&
      e.protectedSpanMilliseconds ===
        e.protectedSecondUnixMilliseconds -
          e.protectedFirstUnixMilliseconds,
  );

  verify(
    "first-canonical-instant",
    () =>
      e.firstInstant ===
      machine.clock.resolveUnixMillisecondObservation128(
        e.protectedFirstUnixMilliseconds,
      ),
  );

  verify(
    "second-canonical-instant",
    () =>
      e.secondInstant ===
      machine.clock.resolveUnixMillisecondObservation128(
        e.protectedSecondUnixMilliseconds,
      ),
  );

  verify(
    "canonical-duration",
    () =>
      e.duration ===
      machine.clock.measureTemporalDurationBetweenInstants(
        e.firstInstant,
        e.secondInstant,
      ),
  );

  return {
    verdict: checks.every(c => c.result === "pass")
      ? "verified" as const
      : "failed" as const,
    checks,
  };
}
