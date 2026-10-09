/* ==========================================================
   OUTFLO — SYSTEM TIME V1
   File: src/machine/clock/unit/systemTimeV1.constants.ts
   Scope: Own the default referenced temporal unit definitions

   SYSTEM:
   - TAI temporal reference
   - SI duration basis
   - Julian year convention

   These definitions do not alter Clock Definition v1.
   ========================================================== */

export const SYSTEM_TIME_V1 = Object.freeze({
  id: "outflo-system-time-v1",

  temporalReference: "TAI",

  durationBasis: "SI second",

  yearConvention: "Julian year",

  unitsInSiSeconds: Object.freeze({
    year: 31_557_600n,
    day: 86_400n,
    hour: 3_600n,
    minute: 60n,
    second: 1n,
  }),

  provenance: Object.freeze({
    durationUnits: Object.freeze({
      authority: "BIPM",
      reference: "SI Brochure, 9th edition",
      url: "https://www.bipm.org/en/publications/si-brochure/",
    }),

    year: Object.freeze({
      authority: "IAU",
      convention: "Julian year",
      url: "https://iauarchive.eso.org/public/themes/measuring/",
    }),

    canonicalClock: Object.freeze({
      definition: "outflo-clock-definition-v1",
      reference: "1958-01-01T00:00:00 TAI",
    }),
  }),
} as const);
