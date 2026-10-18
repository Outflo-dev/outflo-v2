/*
 * OUTFLO — READ MACHINE TIME PROOF SUMMARY V1
 *
 * Read-only summary of persisted Machine observations
 * and verification verdicts.
 *
 * Does not execute verification or modify evidence.
 */

import type { SupabaseClient } from "@supabase/supabase-js";

const VERSION = "verifyMachineTimeObservationV1";

type Verdict =
  | "verified"
  | "failed"
  | "incomplete"
  | "unsupported-version"
  | "invalid-evidence";

async function exactCount(
  db: SupabaseClient,
  table: "machine_time_observations" | "machine_time_proof_verifications_v1",
  column: string,
  verdict?: Verdict,
): Promise<number> {
  let query = db.from(table).select(column, {
    count: "exact",
    head: true,
  });

  if (table === "machine_time_proof_verifications_v1") {
    query = query.eq("verifier_version", VERSION);
  }

  if (verdict) {
    query = query.eq("verdict", verdict);
  }

  const { count, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  if (count === null) {
    throw new Error("Machine Proof count unavailable.");
  }

  return count;
}

export async function readMachineTimeProofSummaryV1(
  db: SupabaseClient,
) {
  const proofCount = (verdict?: Verdict) =>
    exactCount(
      db,
      "machine_time_proof_verifications_v1",
      "verification_id",
      verdict,
    );

  const [
    observations,
    verificationRecords,
    verified,
    failed,
    incomplete,
    unsupportedVersion,
    invalidEvidence,
  ] = await Promise.all([
    exactCount(db, "machine_time_observations", "observation_id"),
    proofCount(),
    proofCount("verified"),
    proofCount("failed"),
    proofCount("incomplete"),
    proofCount("unsupported-version"),
    proofCount("invalid-evidence"),
  ]);

  return {
    verifierVersion: VERSION,
    observations,
    verificationRecords,
    verdicts: {
      verified,
      failed,
      incomplete,
      unsupportedVersion,
      invalidEvidence,
    },
  } as const;
}
