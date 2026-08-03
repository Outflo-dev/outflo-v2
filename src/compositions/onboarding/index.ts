/* ==========================================================
   OUTFLO — ONBOARDING COMPOSITIONS
   File: src/compositions/onboarding/index.ts
   Scope: Expose the completed public onboarding compositions
   Last Updated:
   - date: 2026-07-29
   - note: expose Create Account as the first completed onboarding composition
   ========================================================== */

export {
    default as CreateAccountComposition,
} from "./create-account/CreateAccountComposition";

export {
    default as VerifyEmailComposition,
} from "./verify-email/VerifyEmailComposition";