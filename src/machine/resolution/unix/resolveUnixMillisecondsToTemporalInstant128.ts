/* ==========================================================
   OUTFLO — RESOLVE UNIX MILLISECONDS TO TEMPORAL INSTANT 128
   File: src/machine/resolution/unix/resolveUnixMillisecondsToTemporalInstant128.ts
   Scope: Own exact deterministic resolution of Unix milliseconds onto the Outflō Clock
   ========================================================== */

import type {
  TemporalInstant128,
} from "../../clock/instant/TemporalInstant128";

import {
  resolveSiOffsetToTemporalInstant128,
} from "../si/resolveSiOffsetToTemporalInstant128";

import {
  CLOCK_REFERENCE_TO_UNIX_EPOCH_LABEL_SI_SECONDS,
} from "./deriveClockReferenceToUnixEpochLabelSeconds";

const MILLISECONDS_PER_SI_SECOND = 1_000n;

export function resolveUnixMillisecondsToTemporalInstant128(
  unixMilliseconds: bigint,
  taiMinusUtcSiSecondsNumerator: bigint,
  taiMinusUtcSiSecondsDenominator: bigint = 1n,
): TemporalInstant128 {
  const siOffsetNumerator =
    CLOCK_REFERENCE_TO_UNIX_EPOCH_LABEL_SI_SECONDS *
      MILLISECONDS_PER_SI_SECOND *
      taiMinusUtcSiSecondsDenominator +
    unixMilliseconds *
      taiMinusUtcSiSecondsDenominator +
    taiMinusUtcSiSecondsNumerator *
      MILLISECONDS_PER_SI_SECOND;

  const siOffsetDenominator =
    MILLISECONDS_PER_SI_SECOND *
    taiMinusUtcSiSecondsDenominator;

  return resolveSiOffsetToTemporalInstant128(
    siOffsetNumerator,
    siOffsetDenominator,
  );
}
