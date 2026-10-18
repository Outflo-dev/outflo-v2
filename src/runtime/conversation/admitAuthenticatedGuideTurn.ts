import "server-only";

/* ==========================================================
   OUTFLO — ADMIT AUTHENTICATED GUIDE TURN
   File: src/runtime/conversation/admitAuthenticatedGuideTurn.ts
   Scope: Admit one Guide turn through the atomic database owner
          and confirm persisted identities and content by read-back
   ========================================================== */

import { createClient as createAuthenticatedSupabaseClient } from
  "@/lib/supabase/server";

import { createTrustedSupabaseClient } from
  "@/lib/supabase/trusted/createTrustedSupabaseClient";

export type AdmittedGuideTurn = Readonly<{
  conversationId: string;
  turnId: string;
  turnOrdinal: number;
  messageId: string;
}>;

type AdmissionReceipt = {
  conversation_id?: unknown;
  turn_id?: unknown;
  turn_ordinal?: unknown;
  message_id?: unknown;
};

export async function admitAuthenticatedGuideTurn(
  conversationId: string,
  content: string,
): Promise<AdmittedGuideTurn> {
  if (
    typeof conversationId !== "string" ||
    conversationId.trim().length === 0 ||
    typeof content !== "string" ||
    content.trim().length === 0 ||
    content.length > 4000
  ) {
    throw new TypeError("Valid conversation identity and Guide message are required (maximum 4000 characters).");
  }

  const authenticatedSupabase = await createAuthenticatedSupabaseClient();
  const { data: { user }, error: identityError } =
    await authenticatedSupabase.auth.getUser();

  if (identityError || !user) {
    throw new Error("Authenticated Guide identity is required.");
  }

  const trustedSupabase = createTrustedSupabaseClient();
  const { data, error: admissionError } = await trustedSupabase.rpc(
    "admit_conversation_guide_turn_v1",
    {
      p_conversation_id: conversationId,
      p_guide_id: user.id,
      p_content: content,
    },
  );

  if (admissionError) {
    throw new Error(`Guide turn admission failed: ${admissionError.message}`);
  }

  const receipt: AdmissionReceipt =
    data && typeof data === "object" && !Array.isArray(data)
      ? data as AdmissionReceipt
      : {};

  if (
    receipt.conversation_id !== conversationId ||
    typeof receipt.turn_id !== "string" ||
    typeof receipt.turn_ordinal !== "number" ||
    !Number.isSafeInteger(receipt.turn_ordinal) ||
    receipt.turn_ordinal < 1 ||
    typeof receipt.message_id !== "string"
  ) {
    throw new Error("Guide turn admission returned invalid identities.");
  }

  const { data: conversation, error: ownerError } = await trustedSupabase
    .from("conversations")
    .select("conversation_id, guide_id, status")
    .eq("conversation_id", conversationId)
    .eq("guide_id", user.id)
    .single();

  if (ownerError || !conversation || conversation.status !== "open") {
    throw new Error("Persisted Guide conversation ownership or state did not match.");
  }

  const { data: turn, error: turnError } = await trustedSupabase
    .from("conversation_turns")
    .select("turn_id, conversation_id, turn_ordinal")
    .eq("turn_id", receipt.turn_id)
    .eq("conversation_id", conversationId)
    .single();

  if (
    turnError || !turn ||
    turn.turn_ordinal !== receipt.turn_ordinal
  ) {
    throw new Error("Persisted Guide turn identity or order did not match.");
  }

  const { data: message, error: messageError } = await trustedSupabase
    .from("conversation_messages")
    .select("message_id, turn_id, author, content")
    .eq("message_id", receipt.message_id)
    .eq("turn_id", receipt.turn_id)
    .single();

  if (
    messageError || !message ||
    message.author !== "guide" ||
    message.content !== content
  ) {
    throw new Error("Persisted Guide message identity or content did not match.");
  }

  return {
    conversationId,
    turnId: receipt.turn_id,
    turnOrdinal: receipt.turn_ordinal,
    messageId: receipt.message_id,
  };
}
