/* ==========================================================
   OUTFLO — CURRENT TAI MINUS UTC
   File: src/machine/resolution/utc/currentTaiMinusUtc.constants.ts
   Scope: Own the source-backed current TAI-minus-UTC relationship in SI units
   ========================================================== */

/*
  Provenance:
  - Authority: International Earth Rotation and Reference Systems Service (IERS)
  - Source: Bulletin C 72
  - Published: 2026-07-06
  - Effective relationship:
      UTC - TAI = -37 seconds
      therefore TAI - UTC = +37 seconds
  - Effective from: 2017-01-01 00:00 UTC until further notice
  - Bulletin C 72 confirms no leap second at the end of December 2026.
*/

export const CURRENT_TAI_MINUS_UTC_SI_SECONDS = 37n;
