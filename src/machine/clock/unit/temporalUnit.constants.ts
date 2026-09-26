/* ==========================================================
   OUTFLO — TEMPORAL UNIT CONSTANTS
   File: src/machine/clock/unit/temporalUnit.constants.ts
   Scope: Own exact SI-second relationships used by the Outflō Clock
   ========================================================== */

import {
  OUTFLO_SECOND_V1_SI_SECONDS_DENOMINATOR,
  OUTFLO_SECOND_V1_SI_SECONDS_NUMERATOR,
} from "../definition/clockDefinitionV1.constants";

/*
  Clock Definition v1

  1 Outflōsecond
  =
  OUTFLO_SECOND_V1_SI_SECONDS_NUMERATOR
  /
  OUTFLO_SECOND_V1_SI_SECONDS_DENOMINATOR
  SI seconds

  The inverse relationship is therefore:

  1 SI second
  =
  OUTFLO_SECOND_V1_SI_SECONDS_DENOMINATOR
  /
  OUTFLO_SECOND_V1_SI_SECONDS_NUMERATOR
  Outflōseconds

  Both relationships remain exact rational quantities.
  No floating-point approximation belongs in the Machine.
*/

export const SI_SECONDS_PER_OUTFLOSECOND_NUMERATOR =
  OUTFLO_SECOND_V1_SI_SECONDS_NUMERATOR;

export const SI_SECONDS_PER_OUTFLOSECOND_DENOMINATOR =
  OUTFLO_SECOND_V1_SI_SECONDS_DENOMINATOR;

export const OUTFLOSECONDS_PER_SI_SECOND_NUMERATOR =
  OUTFLO_SECOND_V1_SI_SECONDS_DENOMINATOR;

export const OUTFLOSECONDS_PER_SI_SECOND_DENOMINATOR =
  OUTFLO_SECOND_V1_SI_SECONDS_NUMERATOR;
