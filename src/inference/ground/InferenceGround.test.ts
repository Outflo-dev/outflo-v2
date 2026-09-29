/* ==========================================================
   OUTFLO — INFERENCE GROUND TEST
   File: src/inference/ground/InferenceGround.test.ts
   Scope: Prove one explicitly scoped inference ground source
   ========================================================== */

import {
  describe,
  expect,
  it,
} from "vitest";

import {
  createInferenceGround,
} from "./InferenceGround";

describe("InferenceGround", () => {
  it("creates an identifiable inference ground source", () => {
    const ground =
      createInferenceGround(
        "legal:terms:current",
        "Current Terms text.",
      );

    expect(ground).toEqual({
      sourceId:
        "legal:terms:current",
      content:
        "Current Terms text.",
    });
  });

  it("rejects an empty sourceId", () => {
    expect(() =>
      createInferenceGround(
        "   ",
        "Current Terms text.",
      ),
    ).toThrow(
      "Inference ground sourceId must not be empty.",
    );
  });

  it("rejects empty content", () => {
    expect(() =>
      createInferenceGround(
        "legal:terms:current",
        "   ",
      ),
    ).toThrow(
      "Inference ground content must not be empty.",
    );
  });
});
