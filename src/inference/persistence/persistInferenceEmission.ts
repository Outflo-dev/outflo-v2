/* ==========================================================
   OUTFLO — INFERENCE EMISSION PERSISTENCE
   Scope: Write and read back one inference execution
   ========================================================== */

import type { SupabaseClient } from "@supabase/supabase-js";

export type InferenceEmission = Readonly<{
  execution_id: string;
  session_id: string;
  turn_ordinal: number;
  provider: string;
  request_observed_at: string;
  request_body: string;
  request_sha256: string;
  outcome: string;
  [field: string]: unknown;
}>;

export async function persistInferenceEmission(
  db: SupabaseClient,
  emission: InferenceEmission,
): Promise<void> {
  const { error: writeError } = await db
    .from("inference_execution_emissions")
    .insert(emission);

  if (writeError) {
    throw new Error(`Inference write failed: ${writeError.message}`);
  }

  const { data, error: readError } = await db
    .from("inference_execution_emissions")
    .select("*")
    .eq("execution_id", emission.execution_id)
    .single();

  if (readError || !data) {
    throw new Error(
      `Inference read-back failed: ${readError?.message ?? "Missing row"}`,
    );
  }

  if (
    data.execution_id !== emission.execution_id ||
    data.request_body !== emission.request_body ||
    data.response_body !== (emission.response_body ?? null) ||
    data.request_sha256 !== emission.request_sha256
  ) {
    throw new Error("Persisted inference evidence does not match.");
  }

  console.info("[OUTFLO INFERENCE PERSISTED]", {
    executionId: data.execution_id,
    persistedAt: data.persisted_at,
    inputTokens: data.input_tokens,
    outputTokens: data.output_tokens,
    totalTokens: data.total_tokens,
  });
}
