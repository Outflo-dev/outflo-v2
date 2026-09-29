/* ==========================================================
   OUTFLO — CONVERSATION REPLY
   File: src/inference/conversation/ConversationReply.ts
   Scope: Own the validated non-canonical conversational reply contract
   ========================================================== */

export const CONVERSATION_REPLY_KIND =
  "conversation-reply" as const;

export type ConversationReply = Readonly<{
  kind: typeof CONVERSATION_REPLY_KIND;
  text: string;
}>;

export const CONVERSATION_REPLY_JSON_SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    kind: {
      type: "string",
      const: CONVERSATION_REPLY_KIND,
    },
    text: {
      type: "string",
      minLength: 1,
      pattern: "\\S",
    },
  },
  required: [
    "kind",
    "text",
  ],
} as const;

function isRecord(
  value: unknown,
): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

export function validateConversationReply(
  value: unknown,
): ConversationReply {
  if (!isRecord(value)) {
    throw new TypeError(
      "Conversation reply must be an object.",
    );
  }

  const keys = Object.keys(value);

  if (
    keys.length !== 2 ||
    !Object.prototype.hasOwnProperty.call(
      value,
      "kind",
    ) ||
    !Object.prototype.hasOwnProperty.call(
      value,
      "text",
    )
  ) {
    throw new TypeError(
      "Conversation reply has an invalid shape.",
    );
  }

  if (
    value.kind !==
    CONVERSATION_REPLY_KIND
  ) {
    throw new TypeError(
      "Conversation reply has an invalid kind.",
    );
  }

  if (
    typeof value.text !== "string" ||
    value.text.trim().length === 0
  ) {
    throw new TypeError(
      "Conversation reply must contain text.",
    );
  }

  return {
    kind: CONVERSATION_REPLY_KIND,
    text: value.text,
  };
}
