/* ==========================================================
   OUTFLO — DERIVE CLOCK REFERENCE TO UNIX EPOCH LABEL SECONDS
   File: src/machine/resolution/unix/deriveClockReferenceToUnixEpochLabelSeconds.ts
   Scope: Derive the nominal civil-label displacement between the Outflō Clock reference and the Unix Epoch
   Last Updated:
   - note: replace precomputed 378,691,200-second displacement with transparent derivation
   ========================================================== */

/*
  Provenance:
  - Outflō Clock reference alignment: 1958-01-01
  - Unix Epoch: 1970-01-01 00:00:00 UTC
  - POSIX time ignores leap seconds when expressing seconds since the Epoch.

  This derives the nominal Gregorian label displacement only.
  TAI-minus-UTC is resolved separately.
*/

import { NANOSECONDS_PER_SECOND } from "../../clock/unit/temporalUnit.constants";

const CLOCK_REFERENCE_YEAR = 1958;
const UNIX_EPOCH_YEAR = 1970;

const HOURS_PER_DAY = 24n;
const MINUTES_PER_HOUR = 60n;
const SECONDS_PER_MINUTE = 60n;

const SECONDS_PER_NOMINAL_DAY =
  HOURS_PER_DAY *
  MINUTES_PER_HOUR *
  SECONDS_PER_MINUTE;

function isGregorianLeapYear(year: number): boolean {
  return (
    year % 4 === 0 &&
    (year % 100 !== 0 || year % 400 === 0)
  );
}

function daysInGregorianYear(year: number): bigint {
  return isGregorianLeapYear(year) ? 366n : 365n;
}

export function deriveClockReferenceToUnixEpochLabelSeconds(): bigint {
  let days = 0n;

  for (
    let year = CLOCK_REFERENCE_YEAR;
    year < UNIX_EPOCH_YEAR;
    year += 1
  ) {
    days += daysInGregorianYear(year);
  }

  return days * SECONDS_PER_NOMINAL_DAY;
}

export const CLOCK_REFERENCE_TO_UNIX_EPOCH_LABEL_NANOSECONDS =
  deriveClockReferenceToUnixEpochLabelSeconds() *
  NANOSECONDS_PER_SECOND;
