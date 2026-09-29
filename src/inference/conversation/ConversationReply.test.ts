/* ==========================================================
   OUTFLO — CONVERSATION REPLY TEST
   File: src/inference/conversation/ConversationReply.test.ts
   Scope: Prove the non-canonical conversational reply contract
   ========================================================== */

import {
  describe,
  expect,
  it,
} from "vitest";

import {
  CONVERSATION_REPLY_JSON_SCHEMA,
  CONVERSATION_REPLY_KIND,
  validateConversationReply,
} from "./ConversationReply";

describe("ConversationReply", () => {
  it("accepts a valid conversational reply", () => {
    const reply =
      validateConversationReply({
        kind: CONVERSATION_REPLY_KIND,
        text: "Hello from Outflō.",
      });

    expect(reply).toEqual({
      kind: "conversation-reply",
      text: "Hello from Outflō.",
    });
  });

  it("rejects an invalid reply kind", () => {
    expect(() =>
      validateConversationReply({
        kind: "canonical-answer",
        text: "Hello.",
      }),
    ).toThrow(TypeError);
  });

  it("rejects empty reply text", () => {
    expect(() =>
      validateConversationReply({
        kind: CONVERSATION_REPLY_KIND,
        text: "   ",
      }),
    ).toThrow(TypeError);
  });

  it("rejects additional fields", () => {
    expect(() =>
      validateConversationReply({
        kind: CONVERSATION_REPLY_KIND,
        text: "Hello.",
        canonical: true,
      }),
    ).toThrow(TypeError);
  });

  it("exposes a strict provider-facing JSON schema", () => {
    expect(
      CONVERSATION_REPLY_JSON_SCHEMA
        .additionalProperties,
    ).toBe(false);

    expect(
      CONVERSATION_REPLY_JSON_SCHEMA
        .required,
    ).toEqual([
      "kind",
      "text",
    ]);
  });
});
