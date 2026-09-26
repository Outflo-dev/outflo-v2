/* ==========================================================
   OUTFLO — CLOCK DEFINITION V1
   File: src/machine/clock/definition/clockDefinitionV1.constants.ts
   Scope: Own the canonical derivation of the Outflō Clock v1 quantum
   ========================================================== */

import {
  TEMPORAL_INSTANT_128_MIN,
} from "../instant/temporalInstant128.constants";

/*
  Clock Definition v1

  Coordinate domain:
  - signed 128-bit integer

  Zero:
  - 1958-01-01 00:00:00 TAI

  Adopted cosmic calibrator:
  - 13.8 billion years
  - resolved here to 435,494,880,000,000,000 SI seconds

  Canonical quantum:
  - one Outflōsecond
  - cosmic span in SI seconds / 2^127

  Provenance and derivation are documented in ../README.md.
*/

export const CLOCK_DEFINITION_V1_COSMIC_SPAN_SI_SECONDS =
  435_494_880_000_000_000n;

export const CLOCK_DEFINITION_V1_NEGATIVE_COORDINATE_CAPACITY =
  -TEMPORAL_INSTANT_128_MIN;

export const OUTFLO_SECOND_V1_SI_SECONDS_NUMERATOR =
  CLOCK_DEFINITION_V1_COSMIC_SPAN_SI_SECONDS;

export const OUTFLO_SECOND_V1_SI_SECONDS_DENOMINATOR =
  CLOCK_DEFINITION_V1_NEGATIVE_COORDINATE_CAPACITY;
