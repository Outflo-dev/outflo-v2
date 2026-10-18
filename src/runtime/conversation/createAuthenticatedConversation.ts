import "server-only";

/* ==========================================================
   OUTFLO — CREATE AUTHENTICATED CONVERSATION
   File: src/runtime/conversation/createAuthenticatedConversation.ts
   Scope: Admit one authenticated Guide conversation and
          confirm its durable identity through read-back
   ========================================================== */

import { createClient as createAuthenticatedSupabaseClient } from
  "@/lib/supabase/server";

import { createTrustedSupabaseClient } from
  "@/lib/supabase/trusted/createTrustedSupabaseClient";

export type CreatedConversation = Readonly<{
  conversationId: string;
  status: "open";
}>;

export async function createAuthenticatedConversation(): Promise<CreatedConversation> {
  const authenticatedSupabase =
    await createAuthenticatedSupabaseClient();

  const {
    data: { user },
    error: identityError,
  } = await authenticatedSupabase.auth.getUser();

  if (identityError || !user) {
    throw new Error("Authenticated Guide identity is required.");
  }

  const trustedSupabase = createTrustedSupabaseClient();

  const { data: inserted, error: writeError } = await trustedSupabase
    .from("conversations")
    .insert({ guide_id: user.id })
    .select("conversation_id")
    .single();

  if (writeError || !inserted) {
    throw new Error(
      `Conversation creation failed: ${writeError?.message ?? "Missing identity"}`,
    );
  }

  const { data: persisted, error: readError } = await trustedSupabase
    .from("conversations")
    .select("conversation_id, guide_id, status, completed_at")
    .eq("conversation_id", inserted.conversation_id)
    .eq("guide_id", user.id)
    .single();

  if (readError || !persisted) {
    throw new Error(
      `Conversation read-back failed: ${readError?.message ?? "Missing row"}`,
    );
  }

  if (
    persisted.conversation_id !== inserted.conversation_id ||
    persisted.guide_id !== user.id ||
    persisted.status !== "open" ||
    persisted.completed_at !== null
  ) {
    throw new Error("Persisted conversation identity or initial state does not match.");
  }

  return {
    conversationId: persisted.conversation_id,
    status: "open",
  };
}
