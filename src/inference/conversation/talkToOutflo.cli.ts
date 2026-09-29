/* ==========================================================
   OUTFLO — TERMINAL CONVERSATION
   File: src/inference/conversation/talkToOutflo.cli.ts
   Scope: Live development conversation through the Outflō inference boundary
   ========================================================== */

import {
  createInterface,
} from "node:readline/promises";

import {
  stdin as input,
  stdout as output,
} from "node:process";

import {
  emitClockText,
} from "../../emitter/text/clock/emitClockText";

import type {
  ClockTextEmission,
} from "../../emitter/text/clock/ClockTextEmission";

import {
  MistralInferenceProvider,
} from "../provider/mistral/MistralInferenceProvider";

import {
  createInferenceGround,
  type InferenceGround,
} from "../ground/InferenceGround";

import {
  createOutfloOrientationGround,
} from "../ground/outflo/createOutfloOrientationGround";

import {
  createClockGround,
} from "../ground/machine/createClockGround";

import {
  talkToOutflo,
} from "./talkToOutflo";

async function main(): Promise<void> {
  const provider =
    new MistralInferenceProvider();

  const readline =
    createInterface({
      input,
      output,
    });

  const transcript: string[] = [];

  function conversationGround(
    clockEmission: ClockTextEmission,
  ): readonly InferenceGround[] {
    const ground: InferenceGround[] = [
      createOutfloOrientationGround(),
      createClockGround(
        clockEmission,
      ),
    ];

    if (transcript.length > 0) {
      ground.push(
        createInferenceGround(
          "conversation:current-session",
          transcript.join("\n\n"),
        ),
      );
    }

    return ground;
  }

  console.log("");
  console.log("OUTFLŌ — LIVE CONVERSATION");
  console.log("Type /exit to leave.");
  console.log("");

  try {
    while (true) {
      const message =
        await readline.question(
          "you > ",
        );

      if (
        message.trim() === "/exit"
      ) {
        break;
      }

      if (
        message.trim().length === 0
      ) {
        continue;
      }

      try {
        const clockEmission =
          emitClockText();

        const result =
          await talkToOutflo(
            provider,
            {
              message,
              ground:
                conversationGround(
                  clockEmission,
                ),
            },
          );

        console.log("");
        console.log(
          `machine > ${clockEmission.exact.currentInstantOutfloseconds} Outflōseconds`,
        );

        console.log(
          `outflō > ${result.reply.text}`,
        );

        console.log("");

        transcript.push(
          `GUIDE:\n${message}`,
        );

        transcript.push(
          `OUTFLŌ:\n${result.reply.text}`,
        );
      } catch (error) {
        console.error("");
        console.error(
          "outflō !",
          error instanceof Error
            ? error.message
            : error,
        );
        console.error("");
      }
    }
  } finally {
    readline.close();
  }
}

main().catch((error) => {
  console.error(
    "OUTFLŌ TERMINAL FAILURE:",
    error instanceof Error
      ? error.message
      : error,
  );

  process.exitCode = 1;
});
