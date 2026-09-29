/* ==========================================================
   OUTFLO — OLLAMA INFERENCE PROVIDER TEST
   File: src/inference/provider/ollama/createOllamaProvider.test.ts
   Scope: Prove structured inference execution through the Ollama adapter
   ========================================================== */

import {
  afterEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import {
  createOllamaProvider,
} from "./createOllamaProvider";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("createOllamaProvider", () => {
  it("translates an Outflō inference request into an Ollama chat request", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(
        JSON.stringify({
          model: "ministral-3:8b",
          message: {
            content: JSON.stringify({
              kind: "text-revision",
              proposedText: "Clearer text.",
            }),
          },
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        },
      ),
    );

    vi.stubGlobal(
      "fetch",
      fetchMock,
    );

    const provider = createOllamaProvider({
      model: "ministral-3:8b",
    });

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
      "http://127.0.0.1:11434/api/chat",
    );

    const body = JSON.parse(
      String(init.body),
    );

    expect(body).toEqual({
      model: "ministral-3:8b",
      messages: [
        {
          role: "user",
          content: "Make this clearer.",
        },
      ],
      stream: false,
      format: outputSchema,
    });
  });

  it("returns parsed model output as untrusted inference output", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(
          JSON.stringify({
            model: "ministral-3:8b",
            message: {
              content: JSON.stringify({
                kind: "text-revision",
                proposedText: "Clearer text.",
              }),
            },
          }),
          {
            status: 200,
          },
        ),
      ),
    );

    const provider = createOllamaProvider({
      model: "ministral-3:8b",
    });

    const result =
      await provider.inferStructured({
        prompt: "Make this clearer.",
        outputSchema: {
          type: "object",
        },
      });

    expect(result.output).toEqual({
      kind: "text-revision",
      proposedText: "Clearer text.",
    });

    expect(result.execution).toEqual({
      provider: "ollama",
      model: "ministral-3:8b",
    });
  });

  it("rejects an unsuccessful Ollama response", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(
          "provider failure",
          {
            status: 500,
          },
        ),
      ),
    );

    const provider = createOllamaProvider({
      model: "ministral-3:8b",
    });

    await expect(
      provider.inferStructured({
        prompt: "Make this clearer.",
        outputSchema: {
          type: "object",
        },
      }),
    ).rejects.toThrow(
      "Ollama inference failed with HTTP 500.",
    );
  });

  it("rejects malformed structured model output", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(
          JSON.stringify({
            model: "ministral-3:8b",
            message: {
              content:
                "this is not structured JSON",
            },
          }),
          {
            status: 200,
          },
        ),
      ),
    );

    const provider = createOllamaProvider({
      model: "ministral-3:8b",
    });

    await expect(
      provider.inferStructured({
        prompt: "Make this clearer.",
        outputSchema: {
          type: "object",
        },
      }),
    ).rejects.toThrow(
      "Ollama returned malformed structured output.",
    );
  });
});
