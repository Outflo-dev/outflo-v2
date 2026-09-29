/* ==========================================================
   OUTFLO — TEXT REVISION PROPOSAL TEST
   File: src/inference/text/revision/TextRevisionProposal.test.ts
   Scope: Prove the non-canonical text revision proposal contract
   ========================================================== */

import {
  describe,
  expect,
  it,
} from "vitest";

import {
  TEXT_REVISION_PROPOSAL_JSON_SCHEMA,
  TEXT_REVISION_PROPOSAL_KIND,
  validateTextRevisionProposal,
} from "./TextRevisionProposal";

describe("TextRevisionProposal", () => {
  it("accepts a valid text revision proposal", () => {
    const proposal =
      validateTextRevisionProposal({
        kind: TEXT_REVISION_PROPOSAL_KIND,
        proposedText:
          "This section explains the policy more clearly.",
      });

    expect(proposal).toEqual({
      kind: "text-revision",
      proposedText:
        "This section explains the policy more clearly.",
    });
  });

  it("rejects an invalid proposal kind", () => {
    expect(() =>
      validateTextRevisionProposal({
        kind: "canonical-text",
        proposedText: "Changed text.",
      }),
    ).toThrow(TypeError);
  });

  it("rejects empty proposed text", () => {
    expect(() =>
      validateTextRevisionProposal({
        kind: TEXT_REVISION_PROPOSAL_KIND,
        proposedText: "   ",
      }),
    ).toThrow(TypeError);
  });

  it("rejects missing proposal fields", () => {
    expect(() =>
      validateTextRevisionProposal({
        kind: TEXT_REVISION_PROPOSAL_KIND,
      }),
    ).toThrow(TypeError);
  });

  it("rejects additional model output fields", () => {
    expect(() =>
      validateTextRevisionProposal({
        kind: TEXT_REVISION_PROPOSAL_KIND,
        proposedText: "Changed text.",
        canonical: true,
      }),
    ).toThrow(TypeError);
  });

  it("exposes a strict provider-facing JSON schema", () => {
    expect(
      TEXT_REVISION_PROPOSAL_JSON_SCHEMA
        .additionalProperties,
    ).toBe(false);

    expect(
      TEXT_REVISION_PROPOSAL_JSON_SCHEMA
        .required,
    ).toEqual([
      "kind",
      "proposedText",
    ]);
  });
});
