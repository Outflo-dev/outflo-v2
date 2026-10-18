import "server-only";

/* ==========================================================
   OUTFLO — COMPLETE AUTHENTICATED CONVERSATION TURN
   Target: src/runtime/conversation/completeAuthenticatedConversationTurn.ts
   Scope: Run existing inference for an admitted Guide turn,
          associate persisted HTTP evidence, and admit one reply.
   The inference ledger, model, Machine, and database own their
   respective evidence and computations; this file coordinates.
   ========================================================== */

import { randomUUID } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";

import { createClient as createAuthenticatedSupabaseClient } from
  "@/lib/supabase/server";
import { createTrustedSupabaseClient } from
  "@/lib/supabase/trusted/createTrustedSupabaseClient";
import { createInferenceGround } from
  "@/inference/ground/InferenceGround";
import { talkToOutflo } from
  "@/inference/conversation/talkToOutflo";
import { MistralInferenceProvider } from
  "@/inference/provider/mistral/MistralInferenceProvider";
import { createRecordingMistralFetch } from
  "@/inference/persistence/createRecordingMistralFetch";

const UUID = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i;

export type CompletedConversationTurn = Readonly<{
  conversationId: string;
  turnId: string;
  guideMessageId: string;
  outflowMessageId: string;
  executionId: string;
  associationId: string;
  reply: string;
}>;

function conversationalOrientation(): string {
  return readFileSync(
    join(process.cwd(), "src/inference/ground/outflo/outflo-conversational-grounding-v1.md"),
    "utf8",
  );
}

export async function completeAuthenticatedConversationTurn(
  conversationId: string,
  turnId: string,
): Promise<CompletedConversationTurn> {
  if (!UUID.test(conversationId) || !UUID.test(turnId)) {
    throw new TypeError("Valid conversation and turn identities are required.");
  }

  const authenticated = await createAuthenticatedSupabaseClient();
  const { data: { user }, error: identityError } = await authenticated.auth.getUser();
  if (identityError || !user) {
    throw new Error("Authenticated Guide identity is required.");
  }

  const db = createTrustedSupabaseClient();
  const { data: conversation, error: conversationError } = await db
    .from("conversations")
    .select("conversation_id, guide_id, status")
    .eq("conversation_id", conversationId)
    .eq("guide_id", user.id)
    .maybeSingle();
  if (conversationError || !conversation || conversation.status !== "open") {
    throw new Error("Open Guide conversation not found.");
  }

  const { data: turn, error: turnError } = await db
    .from("conversation_turns")
    .select("turn_id, turn_ordinal")
    .eq("turn_id", turnId)
    .eq("conversation_id", conversationId)
    .maybeSingle();
  if (turnError || !turn) {
    throw new Error("Guide turn not found in this conversation.");
  }

  const { data: guideMessage, error: guideError } = await db
    .from("conversation_messages")
    .select("message_id, content")
    .eq("turn_id", turnId)
    .eq("author", "guide")
    .maybeSingle();
  if (guideError || !guideMessage || typeof guideMessage.content !== "string") {
    throw new Error("Persisted Guide message not found.");
  }

  const { data: existingReply, error: replyError } = await db
    .from("conversation_messages")
    .select("message_id")
    .eq("turn_id", turnId)
    .eq("author", "outflo")
    .maybeSingle();
  if (replyError) throw new Error(`Reply state read failed: ${replyError.message}`);
  if (existingReply) throw new Error("This Guide turn already has an Outflō reply.");

  const { data: priorAttempts, error: attemptsError } = await db
    .from("conversation_inference_executions")
    .select("attempt_ordinal")
    .eq("turn_id", turnId)
    .order("attempt_ordinal", { ascending: false })
    .limit(1);
  if (attemptsError) throw new Error(`Inference attempt read failed: ${attemptsError.message}`);
  const attemptOrdinal = (priorAttempts?.[0]?.attempt_ordinal ?? 0) + 1;

  // Only previous completed turns may participate as conversational history.
  // The current Guide question is supplied by the Conversation request itself.
  const { data: priorTurns, error: historyError } = await db
    .from("conversation_turns")
    .select("turn_id, turn_ordinal")
    .eq("conversation_id", conversationId)
    .lt("turn_ordinal", turn.turn_ordinal)
    .order("turn_ordinal", { ascending: false })
    .limit(8);
  if (historyError) throw new Error(`Conversation history read failed: ${historyError.message}`);

  const grounds = [
    createInferenceGround(
      "outflo:system:conversational-grounding:v1",
      conversationalOrientation(),
    ),
  ];
  if (priorTurns?.length) {
    const { data: historicalMessages, error: messagesError } = await db
      .from("conversation_messages")
      .select("turn_id, author, content")
      .in("turn_id", priorTurns.map((item) => item.turn_id));
    if (messagesError) throw new Error(`Conversation history messages unavailable: ${messagesError.message}`);

    const history = [...priorTurns].reverse().flatMap((prior) => {
      const messages = (historicalMessages ?? []).filter((item) => item.turn_id === prior.turn_id);
      const guide = messages.find((item) => item.author === "guide");
      const outflow = messages.find((item) => item.author === "outflo");
      return guide && outflow
        ? [`GUIDE: ${guide.content}\nOUTFLŌ: ${outflow.content}`]
        : [];
    });
    if (history.length) {
      grounds.push(createInferenceGround("outflo:conversation:transcript:v1", history.join("\n\n")));
    }
  }

  // The inference session is a separately generated identity, never the
  // conversation ID or turn ID. One recorded request per inference session.
  const inferenceSessionId = randomUUID();
  let executionId: string | null = null;
  let result: Awaited<ReturnType<typeof talkToOutflo>> | null = null;
  let inferenceFailure: unknown;

  try {
    const provider = new MistralInferenceProvider(
      createRecordingMistralFetch(db, inferenceSessionId, 1, {
        authenticatedGuideId: user.id,
        onPersistedExecution: (id) => { executionId = id; },
      }),
    );
    result = await talkToOutflo(provider, {
      message: guideMessage.content,
      ground: grounds,
    });
  } catch (error) {
    inferenceFailure = error;
  }

  // Even HTTP errors and invalid structured replies retain their association
  // once the recorder has persisted the execution evidence.
  let associationId: string | null = null;
  if (executionId !== null) {
    const { data, error } = await db.rpc(
      "associate_conversation_inference_execution_v1",
      {
        p_turn_id: turnId,
        p_guide_id: user.id,
        p_execution_id: executionId,
        p_attempt_ordinal: attemptOrdinal,
      },
    );
    if (error || typeof data !== "string") {
      throw new Error(`Persisted inference association failed: ${error?.message ?? "Missing identity"}`);
    }
    associationId = data;
  }

  if (inferenceFailure !== undefined) throw inferenceFailure;
  if (!result || !executionId || !associationId) {
    throw new Error("Inference completed without linked execution evidence.");
  }

  const reply = result.reply.text;
  if (typeof reply !== "string" || !reply.trim()) {
    throw new Error("Validated inference reply text is missing.");
  }

  const { data: outflowMessageId, error: acceptanceError } = await db.rpc(
    "accept_conversation_outflo_reply_v1",
    {
      p_turn_id: turnId,
      p_guide_id: user.id,
      p_execution_id: executionId,
      p_content: reply,
    },
  );
  if (acceptanceError || typeof outflowMessageId !== "string") {
    throw new Error(`Outflō reply acceptance failed: ${acceptanceError?.message ?? "Missing identity"}`);
  }

  const { data: persisted, error: persistedError } = await db
    .from("conversation_messages")
    .select("message_id, turn_id, author, content")
    .eq("message_id", outflowMessageId)
    .eq("turn_id", turnId)
    .single();
  if (persistedError || !persisted || persisted.author !== "outflo" || persisted.content !== reply) {
    throw new Error("Accepted Outflō response read-back did not match.");
  }

  return {
    conversationId,
    turnId,
    guideMessageId: guideMessage.message_id,
    outflowMessageId,
    executionId,
    associationId,
    reply,
  };
}
