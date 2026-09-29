/* ==========================================================
   OUTFLO — CLOCK TEXT EMISSION
   File: src/emitter/text/clock/ClockTextEmission.ts
   Scope: Define the output contract of the Clock Text Emitter
   ========================================================== */

export type ClockTextEmission = Readonly<{
  text: string;

  exact: Readonly<{
    referenceInstantOutfloseconds: string;
    minimumInstantOutfloseconds: string;
    maximumInstantOutfloseconds: string;
    tickOutfloseconds: string;
    siSecondsPerOutflosecondNumerator: string;
    siSecondsPerOutflosecondDenominator: string;
    outflosecondsPerSiSecondNumerator: string;
    outflosecondsPerSiSecondDenominator: string;
    currentTaiMinusUtcSiSeconds: string;
    currentInstantOutfloseconds: string;
  }>;
}>;
