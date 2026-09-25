/* ==========================================================
   OUTFLO — ACCESS PASSWORD VALIDATION
   File: src/runtime/onboarding/access/password/validateAccessPassword.ts
   Scope: Own the canonical local password law for Access identity creation
   Last Updated:
   - date: 2026-09-24
   - note: enforce the local 12–72 character password boundary with at least one letter
   ========================================================== */

/* ------------------------------
   Constants
-------------------------------- */

const MIN_ACCESS_PASSWORD_LENGTH = 12;
const MAX_ACCESS_PASSWORD_LENGTH = 72;

/* ------------------------------
   Types
-------------------------------- */

export type AccessPasswordValidationResult =
    | {
          valid: true;
      }
    | {
          valid: false;
          message: string;
      };

/* ------------------------------
   Validation
-------------------------------- */

export function validateAccessPassword(
    password: string,
): AccessPasswordValidationResult {
    const length =
        Array.from(password).length;

    if (
        length <
        MIN_ACCESS_PASSWORD_LENGTH
    ) {
        return {
            valid: false,
            message:
                "Password must be at least 12 characters.",
        };
    }

    if (
        length >
        MAX_ACCESS_PASSWORD_LENGTH
    ) {
        return {
            valid: false,
            message:
                "Password must be 72 characters or fewer.",
        };
    }

    if (!/\p{L}/u.test(password)) {
        return {
            valid: false,
            message:
                "Password must include at least one letter.",
        };
    }

    return {
        valid: true,
    };
}
