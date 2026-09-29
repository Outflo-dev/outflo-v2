/* ==========================================================
   OUTFLO — INFERENCE GROUND
   File: src/inference/ground/InferenceGround.ts
   Scope: Represent one explicitly scoped source of inference ground
   ========================================================== */

export type InferenceGround = Readonly<{
  sourceId: string;
  content: string;
}>;

export function createInferenceGround(
  sourceId: string,
  content: string,
): InferenceGround {
  if (sourceId.trim().length === 0) {
    throw new TypeError(
      "Inference ground sourceId must not be empty.",
    );
  }

  if (content.trim().length === 0) {
    throw new TypeError(
      "Inference ground content must not be empty.",
    );
  }

  return {
    sourceId,
    content,
  };
}
