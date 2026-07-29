/* ==========================================================
   OUTFLO — CREATE ACCOUNT SIGN-IN PROMPT
   File: src/app/(onboarding)/create-account/signin/CreateAccountSignInPrompt.tsx
   Scope: Own the returning-Guide alternate meaning for Create Account
   Last Updated:
   - date: 2026-07-29
   - note: declare local alternate meaning through the canonical onboarding presentation
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import OnboardingPageAlternate from "@/components/system/primitives/onboarding/page/internal/alternate/OnboardingPageAlternate";

/* ------------------------------
   Component
-------------------------------- */
export default function CreateAccountSignInPrompt() {
    return (
        <OnboardingPageAlternate
            prompt="Already have an account?"
            actionLabel="Sign in."
            href="/sign-in"
        />
    );
}