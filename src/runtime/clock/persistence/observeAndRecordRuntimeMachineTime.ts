import "server-only";

/*
 * OUTFLO — OBSERVE AND RECORD RUNTIME MACHINE TIME
 *
 * Owns the runtime sequence:
 * observe -> persist -> read -> verify -> record verdict.
 *
 * Observation and verification remain separate immutable records.
 * Proof recording failure never destroys a successful operation.
 */

import { createTrustedSupabaseClient } from
  "@/lib/supabase/trusted/createTrustedSupabaseClient";

import { decodeMachineTimeEvidenceV1 } from
  "@/proof/time/decodeMachineTimeEvidenceV1";

import { verifyMachineTimeObservationV1 } from
  "@/proof/time/verifyMachineTimeObservationV1";

import { observeRuntimeMachineTime } from
  "../interval/observeRuntimeMachineTime";

import type { ObservedMachineTimeEntrance } from
  "../interval/resolveObservedMachineTime";

import { readMachineTimeObservationById } from
  "./readMachineTimeObservationById";

import { recordObservedMachineTime } from
  "./recordObservedMachineTime";

type VerificationVerdict =
  | "verified"
  | "failed"
  | "incomplete"
  | "unsupported-version"
  | "invalid-evidence";

type ProofRecording =
  | {
      status: "recorded";
      verificationId: string;
      verdict: VerificationVerdict;
    }
  | {
      status: "unavailable";
      error: string;
    }
  | {
      status: "not-persisted";
    };

function errorMessage(error: unknown): string {
  return error instanceof Error
    ? error.message
    : "Machine Proof recording failed.";
}

async function verifyPersistedObservation(
  observationId: string,
): Promise<ProofRecording> {
  const row = await readMachineTimeObservationById(
    observationId,
  );

  if (!row) {
    throw new Error(
      "Persisted Machine Time observation not found.",
    );
  }

  let verdict: VerificationVerdict;
  let checks: {
    check: string;
    result: "pass" | "fail";
  }[] = [];
  let missing: string[] = [];

  try {
    const evidence = decodeMachineTimeEvidenceV1(row);

    if (evidence.status === "supported") {
      const result =
        verifyMachineTimeObservationV1(
          evidence.observed,
        );

      if (result.verdict === "insufficient-evidence") {
        return {
          status: "unavailable",
          error: "Machine verifier reported insufficient evidence.",
        };
      }

      const availableChecks: typeof checks = [];

      for (const check of result.checks) {
        if (check.result === "unavailable") {
          return {
            status: "unavailable",
            error: "Machine verifier returned an unavailable check.",
          };
        }

        availableChecks.push({
          check: check.check,
          result: check.result,
        });
      }

      verdict = result.verdict;
      checks = availableChecks;
    } else if (evidence.status === "incomplete") {
      verdict = "incomplete";
      missing = [...evidence.missing];
    } else {
      verdict = "unsupported-version";
    }
  } catch {
    verdict = "invalid-evidence";
  }

  const trustedSupabase =
    createTrustedSupabaseClient();

  const { data, error } = await trustedSupabase.rpc(
    "record_machine_time_proof_verification_v1",
    {
      p_observation_id: observationId,
      p_verdict: verdict,
      p_checks: checks,
      p_missing_fields: missing,
    },
  );

  if (error) {
    throw new Error(error.message);
  }

  if (typeof data !== "string") {
    throw new Error(
      "Verification persistence returned no identity.",
    );
  }

  return {
    status: "recorded",
    verificationId: data,
    verdict,
  };
}

export async function observeAndRecordRuntimeMachineTime<T>(
  operation: (
    entrance: ObservedMachineTimeEntrance,
  ) => Promise<T>,
  creationExecutionIdForResult?: (
    value: T,
  ) => string | null,
  signInExecutionIdForResult?: (
    value: T,
  ) => string | null,
) {
  const observed =
    await observeRuntimeMachineTime(operation);

  let persistence: Awaited<
    ReturnType<typeof recordObservedMachineTime>
  >;

  try {
    persistence = await recordObservedMachineTime(
      observed.machineTime,
      observed.provenance,
      creationExecutionIdForResult?.(observed.value)
        ?? null,
      signInExecutionIdForResult?.(observed.value)
        ?? null,
    );
  } catch (error) {
    persistence = {
      success: false,
      error: errorMessage(error),
    };
  }

  let proofVerification: ProofRecording = {
    status: "not-persisted",
  };

  if (persistence.success) {
    try {
      proofVerification =
        await verifyPersistedObservation(
          persistence.observationId,
        );
    } catch (error) {
      proofVerification = {
        status: "unavailable",
        error: errorMessage(error),
      };

      console.error(
        "Outflō Machine Proof recording unavailable:",
        persistence.observationId,
        proofVerification.error,
      );
    }
  }

  return {
    ...observed,
    persistence,
    proofVerification,
  };
}
