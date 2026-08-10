/* ==========================================================
   OUTFLO — SIGN IN CREATE ACCOUNT PROMPT
   File: src/compositions/onboarding/sign-in/internal/alternate/SignInCreateAccountPrompt.tsx
   Scope: Own the alternate doorway from Sign In to Create Account
   Last Updated:
   - date: 2026-08-09
   - note: establish the reciprocal access path for new Guides
   ========================================================== */

import {
    OnboardingPageAlternate,
} from "@/components/onboarding/page";

export default function SignInCreateAccountPrompt() {
    return (
        <OnboardingPageAlternate
            prompt="New to Outflō?"
            actionLabel="Create account."
            href="/create-account"
        />
    );
}
