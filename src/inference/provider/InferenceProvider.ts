/* ==========================================================
   OUTFLO — INFERENCE PROVIDER
   File: src/inference/provider/InferenceProvider.ts
   Scope: Own the provider-independent execution contract for structured inference
   ========================================================== */

export type InferenceOutputSchema =
  Readonly<Record<string, unknown>>;

export type InferenceProviderRequest = Readonly<{
  prompt: string;
  outputSchema: InferenceOutputSchema;
}>;

export type InferenceProviderExecution = Readonly<{
  provider: string;
  model: string;
}>;

export type InferenceProviderResult = Readonly<{
  output: unknown;
  execution: InferenceProviderExecution;
}>;

export type InferenceProvider = Readonly<{
  inferStructured(
    request: InferenceProviderRequest,
  ): Promise<InferenceProviderResult>;
}>;
