/* ==========================================================
   OUTFLO — FIRST LIVE TEXT REVISION
   File: src/inference/proof/firstLiveTextRevision.test.ts
   Scope: Prove one live text revision through the Outflō inference boundary
   ========================================================== */

import {
  describe,
  expect,
  it,
} from "vitest";

import {
  MistralInferenceProvider,
} from "../provider/mistral/MistralInferenceProvider";

import {
  proposeTextRevision,
} from "../text/revision/proposeTextRevision";

describe("first live text revision", () => {
  if (
    process.env.OUTFLO_LIVE_INFERENCE !== "1"
  ) {
    it.skip(
      "requires explicit live inference opt-in",
      () => {},
    );

    return;
  }

  it("returns the first live validated Outflō text revision proposal", async () => {
    const provider =
      new MistralInferenceProvider();

    const result =
      await proposeTextRevision(
        provider,
        {
          sourceText:
            "These Terms may be updated from time to time, and if you continue to use Outflō after the updated Terms take effect, your continued use means you agree to the updated Terms.",

          instruction:
            "Make this clearer without changing its meaning.",
        },
      );

    expect(result.proposal.kind).toBe(
      "text-revision",
    );

    expect(
      result.proposal.proposedText
        .trim()
        .length,
    ).toBeGreaterThan(0);

    expect(
      result.execution.provider,
    ).toBe("mistral");

    console.log(
      "\nFIRST LIVE OUTFLO INFERENCE\n",
      JSON.stringify(
        result,
        null,
        2,
      ),
    );
  });
});
