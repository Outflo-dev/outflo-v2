/* ==========================================================
   OUTFLO — MISTRAL INFERENCE PROVIDER TEST
   File: src/inference/provider/mistral/MistralInferenceProvider.test.ts
   Scope: Prove structured inference execution through the Mistral adapter
   ========================================================== */

import {
  afterEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import {
  MistralInferenceProvider,
} from "./MistralInferenceProvider";

afterEach(() => {
  vi.unstubAllGlobals();
  delete process.env.MISTRAL_API_KEY;
});

describe("MistralInferenceProvider", () => {
  it("translates an Outflō structured inference request into Mistral", async () => {
    process.env.MISTRAL_API_KEY =
      "test-key";

    const fetchMock = vi.fn().mockResolvedValue(
      new Response(
        JSON.stringify({
          model: "ministral-8b-latest",
          choices: [
            {
              message: {
                content: JSON.stringify({
                  kind: "text-revision",
                  proposedText:
                    "Clearer text.",
                }),
              },
            },
          ],
        }),
        {
          status: 200,
          headers: {
            "Content-Type":
              "application/json",
          },
        },
      ),
    );

    vi.stubGlobal(
      "fetch",
      fetchMock,
    );

    const provider =
      new MistralInferenceProvider();

    const outputSchema = {
      type: "object",
      additionalProperties: false,
      properties: {
        kind: {
          type: "string",
        },
        proposedText: {
          type: "string",
        },
      },
      required: [
        "kind",
        "proposedText",
      ],
    } as const;

    await provider.inferStructured({
      prompt: "Make this clearer.",
      outputSchema,
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);

    const [
      url,
      init,
    ] = fetchMock.mock.calls[0];

    expect(url).toBe(
      "https://api.mistral.ai/v1/chat/completions",
    );

    const body = JSON.parse(
      String(init.body),
    );

    expect(body).toEqual({
      model: "ministral-8b-latest",
      messages: [
        {
          role: "user",
          content:
            "Make this clearer.",
        },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name:
            "outflo_inference_output",
          schema: outputSchema,
          strict: true,
        },
      },
    });
  });

  it("returns parsed output with execution provenance", async () => {
    process.env.MISTRAL_API_KEY =
      "test-key";

    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(
          JSON.stringify({
            model:
              "ministral-8b-latest",
            choices: [
              {
                message: {
                  content:
                    JSON.stringify({
                      kind:
                        "text-revision",
                      proposedText:
                        "Clearer text.",
                    }),
                },
              },
            ],
          }),
          {
            status: 200,
          },
        ),
      ),
    );

    const provider =
      new MistralInferenceProvider();

    const result =
      await provider.inferStructured({
        prompt:
          "Make this clearer.",
        outputSchema: {
          type: "object",
        },
      });

    expect(result.output).toEqual({
      kind: "text-revision",
      proposedText:
        "Clearer text.",
    });

    expect(result.execution).toEqual({
      provider: "mistral",
      model:
        "ministral-8b-latest",
    });
  });

  it("rejects malformed structured output", async () => {
    process.env.MISTRAL_API_KEY =
      "test-key";

    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(
          JSON.stringify({
            model:
              "ministral-8b-latest",
            choices: [
              {
                message: {
                  content:
                    "not-json",
                },
              },
            ],
          }),
          {
            status: 200,
          },
        ),
      ),
    );

    const provider =
      new MistralInferenceProvider();

    await expect(
      provider.inferStructured({
        prompt:
          "Make this clearer.",
        outputSchema: {
          type: "object",
        },
      }),
    ).rejects.toThrow(
      "Mistral returned malformed structured output.",
    );
  });

  it("rejects inference when the API key is absent", async () => {
    const provider =
      new MistralInferenceProvider();

    await expect(
      provider.inferStructured({
        prompt:
          "Make this clearer.",
        outputSchema: {
          type: "object",
        },
      }),
    ).rejects.toThrow(
      "MISTRAL_API_KEY is not configured.",
    );
  });
});
