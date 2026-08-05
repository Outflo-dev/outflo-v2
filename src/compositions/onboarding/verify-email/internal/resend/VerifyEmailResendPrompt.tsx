"use client";

/* ==========================================================
   OUTFLO — VERIFY EMAIL RESEND PROMPT
   File: src/compositions/onboarding/verify-email/internal/resend/VerifyEmailResendPrompt.tsx
   Scope: Own the local resend-code alternate meaning for Verify Email
   Last Updated:
   - date: 2026-08-02
   - note: declare resend through the canonical onboarding alternate action
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import {
    OnboardingPageAlternateAction,
} from "@/components/onboarding/page";

/* ------------------------------
   Component
-------------------------------- */
export default function VerifyEmailResendPrompt() {
    function handleResendCode() {
        // Resend write path connects here.
    }

    return (
        <OnboardingPageAlternateAction
            prompt="Didn’t receive it?"
            actionLabel="Resend code."
            onAction={handleResendCode}
        />
    );
}