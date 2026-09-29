/* ==========================================================
   OUTFLO — TEXT REVISION PROPOSAL
   File: src/inference/text/revision/TextRevisionProposal.ts
   Scope: Own the validated non-canonical output contract for text revision inference
   ========================================================== */

export const TEXT_REVISION_PROPOSAL_KIND =
  "text-revision" as const;

export type TextRevisionProposal = Readonly<{
  kind: typeof TEXT_REVISION_PROPOSAL_KIND;
  proposedText: string;
}>;

/*
  Provider-facing structured-output contract.

  This constrains model output.

  It does not make model output canonical.
*/
export const TEXT_REVISION_PROPOSAL_JSON_SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    kind: {
      type: "string",
      const: TEXT_REVISION_PROPOSAL_KIND,
    },
    proposedText: {
      type: "string",
      minLength: 1,
      pattern: "\\S",
    },
  },
  required: [
    "kind",
    "proposedText",
  ],
} as const;

function isRecord(
  value: unknown,
): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

export function validateTextRevisionProposal(
  value: unknown,
): TextRevisionProposal {
  if (!isRecord(value)) {
    throw new TypeError(
      "Text revision proposal must be an object.",
    );
  }

  const keys = Object.keys(value);

  if (
    keys.length !== 2 ||
    !Object.prototype.hasOwnProperty.call(
      value,
      "kind",
    ) ||
    !Object.prototype.hasOwnProperty.call(
      value,
      "proposedText",
    )
  ) {
    throw new TypeError(
      "Text revision proposal has an invalid shape.",
    );
  }

  if (
    value.kind !==
    TEXT_REVISION_PROPOSAL_KIND
  ) {
    throw new TypeError(
      "Text revision proposal has an invalid kind.",
    );
  }

  if (
    typeof value.proposedText !== "string" ||
    value.proposedText.trim().length === 0
  ) {
    throw new TypeError(
      "Text revision proposal must contain proposed text.",
    );
  }

  return {
    kind: TEXT_REVISION_PROPOSAL_KIND,
    proposedText: value.proposedText,
  };
}
