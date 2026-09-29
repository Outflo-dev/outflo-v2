/* ==========================================================
   OUTFLO — TALK TO OUTFLO TEST
   File: src/inference/conversation/talkToOutflo.test.ts
   Scope: Prove one conversational inference request
   ========================================================== */

import {
  describe,
  expect,
  it,
  vi,
} from "vitest";

import type {
  InferenceProvider,
} from "../provider/InferenceProvider";

import {
  createInferenceGround,
} from "../ground/InferenceGround";

import {
  talkToOutflo,
} from "./talkToOutflo";

describe("talkToOutflo", () => {
  it("sends the Guide message and supplied ground through inference", async () => {
    const inferStructured =
      vi.fn().mockResolvedValue({
        output: {
          kind: "conversation-reply",
          text: "I can see the supplied ground.",
        },
        execution: {
          provider: "test-provider",
          model: "test-model",
        },
      });

    const provider: InferenceProvider = {
      inferStructured,
    };

    await talkToOutflo(
      provider,
      {
        message:
          "What do you know about these Terms?",
        ground: [
          createInferenceGround(
            "legal:terms:current",
            "These are the current Terms.",
          ),
        ],
      },
    );

    expect(
      inferStructured,
    ).toHaveBeenCalledTimes(1);

    const request =
      inferStructured.mock.calls[0][0];

    expect(
      request.prompt,
    ).toContain(
      "What do you know about these Terms?",
    );

    expect(
      request.prompt,
    ).toContain(
      "legal:terms:current",
    );

    expect(
      request.prompt,
    ).toContain(
      "These are the current Terms.",
    );

    expect(
      request.outputSchema,
    ).toBeDefined();
  });

  it("returns a validated conversational reply with execution provenance", async () => {
    const provider: InferenceProvider = {
      async inferStructured() {
        return {
          output: {
            kind:
              "conversation-reply",
            text:
              "Hello from Outflō.",
          },
          execution: {
            provider:
              "test-provider",
            model:
              "test-model",
          },
        };
      },
    };

    const result =
      await talkToOutflo(
        provider,
        {
          message: "Hello.",
          ground: [],
        },
      );

    expect(result.reply).toEqual({
      kind:
        "conversation-reply",
      text:
        "Hello from Outflō.",
    });

    expect(
      result.execution,
    ).toEqual({
      provider:
        "test-provider",
      model:
        "test-model",
    });
  });

  it("rejects invalid model output", async () => {
    const provider: InferenceProvider = {
      async inferStructured() {
        return {
          output: {
            kind:
              "conversation-reply",
            text: "",
          },
          execution: {
            provider:
              "test-provider",
            model:
              "test-model",
          },
        };
      },
    };

    await expect(
      talkToOutflo(
        provider,
        {
          message: "Hello.",
          ground: [],
        },
      ),
    ).rejects.toThrow(TypeError);
  });

  it("rejects an empty Guide message before inference", async () => {
    const inferStructured =
      vi.fn();

    const provider: InferenceProvider = {
      inferStructured,
    };

    await expect(
      talkToOutflo(
        provider,
        {
          message: "   ",
          ground: [],
        },
      ),
    ).rejects.toThrow(
      "Conversation message must not be empty.",
    );

    expect(
      inferStructured,
    ).not.toHaveBeenCalled();
  });
});
