import "server-only";

/*
 * OUTFLŌ — READ AUTHENTICATED CONVERSATION PROOF
 *
 * Read the latest persisted, verified Conversation Proof.
 * No Machine computation. No verification. No writes.
 */

import { createClient as createAuthenticatedClient } from
  "@/lib/supabase/server";
import { createTrustedSupabaseClient } from
  "@/lib/supabase/trusted/createTrustedSupabaseClient";

export async function readAuthenticatedConversationProofSnapshot(
  conversationId: string,
) {
  const authenticated = await createAuthenticatedClient();

  const { data: { user }, error: authError } =
    await authenticated.auth.getUser();

  if (authError || !user) {
    throw new Error("Authenticated Guide identity is required.");
  }

  const db = createTrustedSupabaseClient();

  const { data: conversation, error: conversationError } = await db
    .from("conversations")
    .select("conversation_id")
    .eq("conversation_id", conversationId)
    .eq("guide_id", user.id)
    .maybeSingle();

  if (conversationError) throw conversationError;

  if (!conversation) {
    throw new Error("Guide conversation not found.");
  }

  const { data: proof, error: proofError } = await db
    .from("conversation_proof_snapshots_v1")
    .select(`
      proof_id,
      verifier_version,
      verdict,
      source_sha256,
      snapshot_cutoff_at,
      status_at_cutoff,
      recorded_span_outflo_seconds,
      checks,
      verified_at
    `)
    .eq("conversation_id", conversationId)
    .eq("verdict", "verified")
    .order("verified_at", { ascending: false })
    .order("proof_id", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (proofError) throw proofError;
  if (!proof) return null;

  return {
    proofId: proof.proof_id,
    verifierVersion: proof.verifier_version,
    verdict: proof.verdict,
    sourceSha256: proof.source_sha256,
    snapshotCutoffAt: proof.snapshot_cutoff_at,
    conversationStatusAtCutoff: proof.status_at_cutoff,
    recordedSpanOutfloSeconds: proof.recorded_span_outflo_seconds,
    checksPassed: Array.isArray(proof.checks)
      ? proof.checks.filter(
          (check) => check.passed === true,
        ).length
      : 0,
    checksTotal: Array.isArray(proof.checks)
      ? proof.checks.length
      : 0,
    verifiedAt: proof.verified_at,
  };
}
