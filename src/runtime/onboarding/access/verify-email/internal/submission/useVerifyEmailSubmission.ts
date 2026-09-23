"use client";

/* ==========================================================
   OUTFLO — VERIFY EMAIL SUBMISSION
   File: src/runtime/onboarding/access/verify-email/submission/useVerifyEmailSubmission.ts
   Scope: Own the successful Verify Email submission lifecycle
   Last Updated:
   - date: 2026-08-19
   - note: connect volatile verification email and entered code to authenticated Access
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

        router.push("/guide-name");

        return {
            error: null,
        };
    }

    return {
        submitVerifyEmail,
    };
}
