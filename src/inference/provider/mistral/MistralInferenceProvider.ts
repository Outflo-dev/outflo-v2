/* ==========================================================
   OUTFLO — MISTRAL INFERENCE PROVIDER
   File: src/inference/provider/mistral/MistralInferenceProvider.ts
   Scope: Execute structured inference through the Mistral API
   ========================================================== */

import type {
  InferenceProvider,
  InferenceProviderRequest,
  InferenceProviderResult,
} from "../InferenceProvider";

const MISTRAL_CHAT_COMPLETIONS_URL =
  "https://api.mistral.ai/v1/chat/completions";

const MISTRAL_MODEL =
  "ministral-8b-latest";

type MistralResponse = Readonly<{
  model?: string;
  choices?: readonly {
    message?: {
      content?: string | null;
    };
  }[];
}>;

export class MistralInferenceProvider
  implements InferenceProvider
{
  async inferStructured(
    request: InferenceProviderRequest,
  ): Promise<InferenceProviderResult> {
    const apiKey =
      process.env.MISTRAL_API_KEY;

    if (!apiKey) {
      throw new Error(
        "MISTRAL_API_KEY is not configured.",
      );
    }

    const response = await fetch(
      MISTRAL_CHAT_COMPLETIONS_URL,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: MISTRAL_MODEL,
          messages: [
            {
              role: "user",
              content: request.prompt,
            },
          ],
          response_format: {
            type: "json_schema",
            json_schema: {
              name: "outflo_inference_output",
              schema: request.outputSchema,
              strict: true,
            },
          },
        }),
      },
    );

    if (!response.ok) {
      throw new Error(
        `Mistral inference failed with HTTP ${response.status}.`,
      );
    }

    const body =
      (await response.json()) as MistralResponse;

    const content =
      body.choices?.[0]?.message?.content;

    if (
      typeof content !== "string" ||
      content.trim().length === 0
    ) {
      throw new TypeError(
        "Mistral returned an invalid chat response.",
      );
    }

    let output: unknown;

    try {
      output = JSON.parse(content);
    } catch {
      throw new TypeError(
        "Mistral returned malformed structured output.",
      );
    }

    return {
      output,
      execution: {
        provider: "mistral",
        model:
          typeof body.model === "string"
            ? body.model
            : MISTRAL_MODEL,
      },
    };
  }
}
