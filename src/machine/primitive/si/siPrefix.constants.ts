/* ==========================================================
   OUTFLO — SI PREFIX CONSTANTS
   File: src/machine/primitive/si/siPrefix.constants.ts
   Scope: Own exact reusable SI decimal-prefix relationships
   ========================================================== */

export const SI_THOUSAND =
  1_000n;

export const SI_MILLI_UNITS_PER_BASE_UNIT =
  SI_THOUSAND;

export const SI_NANO_UNITS_PER_BASE_UNIT =
  SI_THOUSAND *
  SI_THOUSAND *
  SI_THOUSAND;

export const SI_NANO_UNITS_PER_MILLI_UNIT =
  SI_THOUSAND *
  SI_THOUSAND;
