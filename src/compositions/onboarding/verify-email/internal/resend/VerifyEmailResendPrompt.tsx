"use client";

/* ==========================================================
   OUTFLO — VERIFY EMAIL RESEND PROMPT
   File: src/compositions/onboarding/verify-email/internal/resend/VerifyEmailResendPrompt.tsx
   Scope: Own the local resend-code alternate meaning and placement for Verify Email
   Last Updated:
   - date: 2026-08-06
   - note: lower the resend prompt without changing the shared onboarding alternate action
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import {
    OnboardingPageAlternateAction,
} from "@/components/onboarding/page";

import styles from "./VerifyEmailResendPrompt.module.css";

/* ------------------------------
   Component
-------------------------------- */
export default function VerifyEmailResendPrompt() {
    function handleResendCode() {
        // Resend write path connects here.
    }

    return (
        <div className={styles.frame}>
            <OnboardingPageAlternateAction
                prompt="Didn’t receive it?"
                actionLabel="Resend code."
                onAction={handleResendCode}
            />
        </div>
    );
}