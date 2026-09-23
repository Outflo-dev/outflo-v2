/* ==========================================================
   OUTFLO — TEMPORAL DURATION 128
   File: src/machine/clock/duration/TemporalDuration128.ts
   Scope: Own the type identity of a canonical Outflō temporal duration
   Last Updated:
   - note: establish the canonical unsigned 128-bit temporal duration type
   ========================================================== */

declare const temporalDuration128Brand: unique symbol;

export type TemporalDuration128 = bigint & {
  readonly [temporalDuration128Brand]: "TemporalDuration128";
};
