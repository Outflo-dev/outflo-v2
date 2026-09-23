"use client";

/* ==========================================================
   OUTFLO — VERIFY EMAIL RESEND
   File: src/runtime/onboarding/access/verify-email/resend/useVerifyEmailResend.ts
   Scope: Own the Verify Email resend lifecycle
   Last Updated:
   - date: 2026-08-19
   - note: connect volatile verification email to the resend operation
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */

import {
    resendEmailAccessVerification,
} from "@/runtime/onboarding/access/verify-email/internal/resend/resendEmailAccessVerification";

import {
    useVolatileAccessState,
} from "@/runtime/onboarding/access/state/volatile/VolatileAccessState";

/* ------------------------------
   Hook
-------------------------------- */

export function useVerifyEmailResend() {
    const {
        verificationEmail,
    } = useVolatileAccessState();

    async function resendVerificationEmail() {
        if (verificationEmail === null) {
            return {
                error: new Error(
                    "Verification email is not available.",
                ),
            };
        }

        const {
            error,
        } = await resendEmailAccessVerification({
            email: verificationEmail,
        });

        return {
            error,
        };
    }

    return {
        resendVerificationEmail,
    };
}
