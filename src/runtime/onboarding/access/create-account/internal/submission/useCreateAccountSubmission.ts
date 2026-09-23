"use client";

/* ==========================================================
   OUTFLO — CREATE ACCOUNT SUBMISSION
   File: src/runtime/onboarding/access/create-account/submission/useCreateAccountSubmission.ts
   Scope: Own the successful Create Account submission lifecycle
   Last Updated:
   - date: 2026-08-18
   - note: connect email identity creation to verification state and route transition
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */

import {
    useRouter,
} from "next/navigation";

import {
    createEmailAccessIdentity,
} from "@/runtime/onboarding/access/create-account/internal/identity/createEmailAccessIdentity";

import {
    useVolatileAccessState,
} from "@/runtime/onboarding/access/state/volatile/VolatileAccessState";

/* ------------------------------
   Types
-------------------------------- */

type CreateAccountSubmissionInput = {
    email: string;
    password: string;
};

/* ------------------------------
   Hook
-------------------------------- */

export function useCreateAccountSubmission() {
    const router = useRouter();

    const {
        setVerificationEmail,
    } = useVolatileAccessState();

    async function submitCreateAccount({
        email,
        password,
    }: CreateAccountSubmissionInput) {
        const {
            error,
        } = await createEmailAccessIdentity({
            email,
            password,
        });

        if (error) {

            return {
                error,
            };
        }

        setVerificationEmail(email);

        router.push("/verify-email");

        return {
            error: null,
        };
    }

    return {
        submitCreateAccount,
    };
}
