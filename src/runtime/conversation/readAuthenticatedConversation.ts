import "server-only";

/* ==========================================================
   OUTFLŌ — READ AUTHENTICATED CONVERSATION
   Target: src/runtime/conversation/readAuthenticatedConversation.ts
   Scope: Read one Guide-owned conversation and its persisted
          turns/messages for the phone conversation surface.
   This is a display read, not a Conversation Proof verifier.
   ========================================================== */

import { createClient as createAuthenticatedSupabaseClient } from
  "@/lib/supabase/server";
import { createTrustedSupabaseClient } from
  "@/lib/supabase/trusted/createTrustedSupabaseClient";

const UUID = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i;

export type ConversationDisplayMessage = Readonly<{
  messageId: string;
  author: "guide" | "outflo";
  content: string;
  recordedAt: string;
}>;

export type ConversationDisplayTurn = Readonly<{
  turnId: string;
  turnOrdinal: number;
  messages: readonly ConversationDisplayMessage[];
}>;

export type AuthenticatedConversationRead = Readonly<{
  conversationId: string;
  status: "open" | "completed";
  turns: readonly ConversationDisplayTurn[];
}>;

export async function readAuthenticatedConversation(
  conversationId: string,
): Promise<AuthenticatedConversationRead> {
  if (!UUID.test(conversationId)) {
    throw new TypeError("Valid conversation identity is required.");
  }

  const authenticated = await createAuthenticatedSupabaseClient();
  const { data: { user }, error: identityError } =
    await authenticated.auth.getUser();

  if (identityError || !user) {
    throw new Error("Authenticated Guide identity is required.");
  }

  const db = createTrustedSupabaseClient();
  const { data: conversation, error: conversationError } = await db
    .from("conversations")
    .select("conversation_id, status")
    .eq("conversation_id", conversationId)
    .eq("guide_id", user.id)
    .maybeSingle();

  if (conversationError) {
    throw new Error(`Conversation read failed: ${conversationError.message}`);
  }
  if (!conversation) {
    throw new Error("Guide conversation not found.");
  }
  if (conversation.status !== "open" && conversation.status !== "completed") {
    throw new Error("Unsupported persisted conversation status.");
  }

  const { data: turns, error: turnsError } = await db
    .from("conversation_turns")
    .select("turn_id, turn_ordinal")
    .eq("conversation_id", conversationId)
    .order("turn_ordinal", { ascending: true });

  if (turnsError) {
    throw new Error(`Conversation turns unavailable: ${turnsError.message}`);
  }

  if (!turns?.length) {
    return {
      conversationId: conversation.conversation_id,
      status: conversation.status,
      turns: [],
    };
  }

  const { data: messages, error: messagesError } = await db
    .from("conversation_messages")
    .select("message_id, turn_id, author, content, recorded_at")
    .in("turn_id", turns.map((turn) => turn.turn_id));

  if (messagesError) {
    throw new Error(`Conversation messages unavailable: ${messagesError.message}`);
  }

  const messagesByTurn = new Map<string, ConversationDisplayMessage[]>();
  for (const message of messages ?? []) {
    if (message.author !== "guide" && message.author !== "outflo") {
      throw new Error("Unsupported persisted conversation message author.");
    }
    const item: ConversationDisplayMessage = {
      messageId: message.message_id,
      author: message.author,
      content: message.content,
      recordedAt: message.recorded_at,
    };
    const existing = messagesByTurn.get(message.turn_id) ?? [];
    existing.push(item);
    messagesByTurn.set(message.turn_id, existing);
  }

  return {
    conversationId: conversation.conversation_id,
    status: conversation.status,
    turns: turns.map((turn) => ({
      turnId: turn.turn_id,
      turnOrdinal: turn.turn_ordinal,
      messages: (messagesByTurn.get(turn.turn_id) ?? []).sort(
        (a, b) => (a.author === "guide" ? 0 : 1) -
                  (b.author === "guide" ? 0 : 1),
      ),
    })),
  };
}
