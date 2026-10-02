"use client";

/* ==========================================================
   OUTFLO — VERIFY EMAIL SUBMISSION
   File: src/runtime/onboarding/access/verify-email/submission/useVerifyEmailSubmission.ts
   Scope: Own the successful Verify Email submission lifecycle
   Last Updated:
   - Outflō Time: 847627357828824664966983192303
   - note: route verified Access identity directly into Begin
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */

import {
    useRouter,
} from "next/navigation";

import {
    verifyEmailAccessIdentity,
} from "@/runtime/onboarding/access/verify-email/internal/identity/verifyEmailAccessIdentity";

import {
    useVolatileAccessState,
} from "@/runtime/onboarding/access/state/volatile/VolatileAccessState";

/* ------------------------------
   Types
-------------------------------- */

type VerifyEmailSubmissionInput = {
    code: string;
};

/* ------------------------------
   Hook
-------------------------------- */

export function useVerifyEmailSubmission() {
    const router = useRouter();

    const {
        verificationEmail,
    } = useVolatileAccessState();

    async function submitVerifyEmail({
        code,
    }: VerifyEmailSubmissionInput) {
        if (verificationEmail === null) {
            return {
                error: new Error(
                    "Verification email is not available.",
                ),
            };
        }

        const {
            error,
        } = await verifyEmailAccessIdentity({
            email: verificationEmail,
            code,
        });

        if (error) {
            return {
                error,
            };
        }

        router.push("/begin");

        return {
            error: null,
        };
    }

    return {
        submitVerifyEmail,
    };
}
