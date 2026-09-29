/* ==========================================================
   OUTFLO — OLLAMA INFERENCE PROVIDER
   File: src/inference/provider/ollama/createOllamaProvider.ts
   Scope: Execute structured inference through Ollama
   ========================================================== */

import type {
  InferenceProvider,
  InferenceProviderRequest,
  InferenceProviderResult,
} from "../InferenceProvider";

const DEFAULT_OLLAMA_BASE_URL =
  "http://127.0.0.1:11434";

type OllamaProviderConfiguration = Readonly<{
  model: string;
  baseUrl?: string;
}>;

type OllamaChatResponse = Readonly<{
  model: string;
  message: Readonly<{
    content: string;
  }>;
}>;

export function createOllamaProvider(
  configuration: OllamaProviderConfiguration,
): InferenceProvider {
  const baseUrl =
    configuration.baseUrl ??
    DEFAULT_OLLAMA_BASE_URL;

  return {
    async inferStructured(
      request: InferenceProviderRequest,
    ): Promise<InferenceProviderResult> {
      const response = await fetch(
        `${baseUrl}/api/chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: configuration.model,
            messages: [
              {
                role: "user",
                content: request.prompt,
              },
            ],
            stream: false,
            format: request.outputSchema,
          }),
        },
      );

      if (!response.ok) {
        throw new Error(
          `Ollama inference failed with HTTP ${response.status}.`,
        );
      }

      const body =
        (await response.json()) as OllamaChatResponse;

      if (
        typeof body.model !== "string" ||
        typeof body.message?.content !== "string"
      ) {
        throw new TypeError(
          "Ollama returned an invalid chat response.",
        );
      }

      let output: unknown;

      try {
        output = JSON.parse(
          body.message.content,
        );
      } catch {
        throw new TypeError(
          "Ollama returned malformed structured output.",
        );
      }

      return {
        output,
        execution: {
          provider: "ollama",
          model: body.model,
        },
      };
    },
  };
}
