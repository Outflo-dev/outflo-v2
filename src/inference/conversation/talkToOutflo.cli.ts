/* ==========================================================
   OUTFLO — TERMINAL CONVERSATION
   File: src/inference/conversation/talkToOutflo.cli.ts
   Scope: Live development conversation through the Outflō inference boundary
   ========================================================== */

import {
  createInterface,
} from "node:readline/promises";
import { randomUUID } from "node:crypto";
import { readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";
import { createRecordingMistralFetch } from "../persistence/createRecordingMistralFetch";
import { readMachineTimeProofSummaryV1 } from "../../proof/time/readMachineTimeProofSummaryV1";

import {
  stdin as input,
  stdout as output,
} from "node:process";

import {
  emitClockText,
} from "../../emitter/text/clock/emitClockText";


import {
  MistralInferenceProvider,
} from "../provider/mistral/MistralInferenceProvider";

import {
  createInferenceGround,
  type InferenceGround,
} from "../ground/InferenceGround";



import {
  talkToOutflo,
} from "./talkToOutflo";

async function main(): Promise<void> {

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;

  if (!url || !key) {
    throw new Error("Trusted database configuration missing.");
  }

  const db = createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });

  const sessionId = randomUUID();
  let turnOrdinal = 0;


  const readline =
    createInterface({
      input,
      output,
    });

  const transcript: string[] = [];

  const packetGround = createInferenceGround(
    "outflo:system:conversational-grounding:v1",
    readFileSync("src/inference/ground/outflo/outflo-conversational-grounding-v1.md", "utf8"),
  );
  const approval = await readline.question(
    "Type SEND to share the conversational orientation, live development Proof counts, and messages with Mistral: "
  );
  if (approval !== "SEND") {
    readline.close();
    return;
  }

  function conversationGround(
  ): readonly InferenceGround[] {
    const ground: InferenceGround[] = [
      packetGround,
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


        const provider = new MistralInferenceProvider(
          createRecordingMistralFetch(
            db,
            sessionId,
            ++turnOrdinal,
          ),
        );

        const result =
          await talkToOutflo(
            provider,
            {
              message,
              ground: [
                ...conversationGround(),
                createInferenceGround("outflo:machine:proof-summary:live:v1",
                  "Development ledger, not Guide-specific.\n" + JSON.stringify(await readMachineTimeProofSummaryV1(db))),
              ],
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
