/* ==========================================================
   OUTFLO — CREATE ACCOUNT SIGN-IN PROMPT
   File: src/compositions/onboarding/create-account/internal/signin/CreateAccountSignInPrompt.tsx
   Scope: Own the returning-Guide alternate meaning for Create Account
   Last Updated:
   - date: 2026-07-29
   - note: declare local alternate meaning through the canonical onboarding presentation
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */

import {
    OnboardingPageAlternate,
} from "@/components/onboarding/page";

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