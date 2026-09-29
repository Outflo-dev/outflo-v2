/* ==========================================================
   OUTFLO — PROPOSE TEXT REVISION TEST
   File: src/inference/text/revision/proposeTextRevision.test.ts
   Scope: Prove the text revision inference request owner
   ========================================================== */

import {
  describe,
  expect,
  it,
  vi,
} from "vitest";

import type {
  InferenceProvider,
} from "../../provider/InferenceProvider";

import {
  proposeTextRevision,
} from "./proposeTextRevision";

describe("proposeTextRevision", () => {
  it("sends scoped source text and instruction through the provider", async () => {
    const inferStructured = vi.fn().mockResolvedValue({
      output: {
        kind: "text-revision",
        proposedText: "Clearer text.",
      },
      execution: {
        provider: "test-provider",
        model: "test-model",
      },
    });

    const provider: InferenceProvider = {
      inferStructured,
    };

    await proposeTextRevision(
      provider,
      {
        sourceText:
          "The original section text.",
        instruction:
          "Make this clearer.",
      },
    );

    expect(
      inferStructured,
    ).toHaveBeenCalledTimes(1);

    const request =
      inferStructured.mock.calls[0][0];

    expect(request.prompt).toContain(
      "Make this clearer.",
    );

    expect(request.prompt).toContain(
      "The original section text.",
    );

    expect(request.outputSchema).toBeDefined();
  });

  it("returns a validated non-canonical proposal", async () => {
    const provider: InferenceProvider = {
      async inferStructured() {
        return {
          output: {
            kind: "text-revision",
            proposedText:
              "The clearer revision.",
          },
          execution: {
            provider: "test-provider",
            model: "test-model",
          },
        };
      },
    };

    const result =
      await proposeTextRevision(
        provider,
        {
          sourceText:
            "Original text.",
          instruction:
            "Make this clearer.",
        },
      );

    expect(result.proposal).toEqual({
      kind: "text-revision",
      proposedText:
        "The clearer revision.",
    });

    expect(result.execution).toEqual({
      provider: "test-provider",
      model: "test-model",
    });
  });

  it("rejects invalid model output", async () => {
    const provider: InferenceProvider = {
      async inferStructured() {
        return {
          output: {
            kind: "text-revision",
            proposedText: "",
          },
          execution: {
            provider: "test-provider",
            model: "test-model",
          },
        };
      },
    };

    await expect(
      proposeTextRevision(
        provider,
        {
          sourceText:
            "Original text.",
          instruction:
            "Make this clearer.",
        },
      ),
    ).rejects.toThrow(TypeError);
  });

  it("rejects empty source text before inference", async () => {
    const inferStructured = vi.fn();

    const provider: InferenceProvider = {
      inferStructured,
    };

    await expect(
      proposeTextRevision(
        provider,
        {
          sourceText: "   ",
          instruction:
            "Make this clearer.",
        },
      ),
    ).rejects.toThrow(
      "Source text must not be empty.",
    );

    expect(
      inferStructured,
    ).not.toHaveBeenCalled();
  });

  it("rejects empty instruction before inference", async () => {
    const inferStructured = vi.fn();

    const provider: InferenceProvider = {
      inferStructured,
    };

    await expect(
      proposeTextRevision(
        provider,
        {
          sourceText:
            "Original text.",
          instruction: "   ",
        },
      ),
    ).rejects.toThrow(
      "Instruction must not be empty.",
    );

    expect(
      inferStructured,
    ).not.toHaveBeenCalled();
  });
});
