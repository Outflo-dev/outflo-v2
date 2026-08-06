/* ==========================================================
   OUTFLO — CREATE ACCOUNT SIGN-IN PROMPT
   File: src/compositions/onboarding/create-account/internal/signin/CreateAccountSignInPrompt.tsx
   Scope: Own the local sign-in alternate meaning and placement for Create Account
   Last Updated:
   - date: 2026-08-05
   - note: move the Create Account sign-in prompt slightly lower without changing shared onboarding form
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import {
    OnboardingPageAlternate,
} from "@/components/onboarding/page";

import frameStyles from "./CreateAccountSignInPrompt.module.css";

/* ------------------------------
   Component
-------------------------------- */
export default function CreateAccountSignInPrompt() {
    return (
        <div className={frameStyles.frame}>
            <OnboardingPageAlternate
                prompt="Already have an account?"
                actionLabel="Sign in."
                href="/sign-in"
            />
        </div>
    );
}