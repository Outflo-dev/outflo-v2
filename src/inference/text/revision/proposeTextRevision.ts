/* ==========================================================
   OUTFLO — PROPOSE TEXT REVISION
   File: src/inference/text/revision/proposeTextRevision.ts
   Scope: Own one text revision inference request
   ========================================================== */

import type {
  InferenceProvider,
  InferenceProviderExecution,
} from "../../provider/InferenceProvider";

import {
  TEXT_REVISION_PROPOSAL_JSON_SCHEMA,
  validateTextRevisionProposal,
  type TextRevisionProposal,
} from "./TextRevisionProposal";

export type TextRevisionRequest = Readonly<{
  sourceText: string;
  instruction: string;
}>;

export type TextRevisionInferenceResult =
  Readonly<{
    proposal: TextRevisionProposal;
    execution: InferenceProviderExecution;
  }>;

function requireNonEmptyText(
  value: string,
  name: string,
): string {
  if (value.trim().length === 0) {
    throw new TypeError(
      `${name} must not be empty.`,
    );
  }

  return value;
}

export async function proposeTextRevision(
  provider: InferenceProvider,
  request: TextRevisionRequest,
): Promise<TextRevisionInferenceResult> {
  const sourceText = requireNonEmptyText(
    request.sourceText,
    "Source text",
  );

  const instruction = requireNonEmptyText(
    request.instruction,
    "Instruction",
  );

  const prompt = [
    "You are revising supplied text.",
    "",
    "Follow the instruction exactly.",
    "Return only the structured output required by the supplied schema.",
    "Do not claim the revision is canonical, accepted, or authoritative.",
    "",
    "INSTRUCTION:",
    instruction,
    "",
    "SOURCE TEXT:",
    sourceText,
  ].join("\n");

  const result =
    await provider.inferStructured({
      prompt,
      outputSchema:
        TEXT_REVISION_PROPOSAL_JSON_SCHEMA,
    });

  return {
    proposal:
      validateTextRevisionProposal(
        result.output,
      ),
    execution: result.execution,
  };
}
