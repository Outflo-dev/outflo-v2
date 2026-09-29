/* ==========================================================
   OUTFLO — CLOCK INFERENCE GROUND
   File: src/inference/ground/machine/createClockGround.ts
   Scope: Present emitted Clock text as explicitly scoped inference ground
   ========================================================== */

import type {
  ClockTextEmission,
} from "../../../emitter/text/clock/ClockTextEmission";

import {
  emitClockText,
} from "../../../emitter/text/clock/emitClockText";

import {
  createInferenceGround,
  type InferenceGround,
} from "../InferenceGround";

export function createClockGround(
  emission: ClockTextEmission =
    emitClockText(),
): InferenceGround {
  return createInferenceGround(
    "outflo:machine:clock:v1",
    emission.text,
  );
}
