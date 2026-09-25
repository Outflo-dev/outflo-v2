"use client";

/* ==========================================================
   OUTFLO — SIGN IN SUBMISSION
   File: src/runtime/onboarding/access/sign-in/submission/useSignInSubmission.ts
   Scope: Own successful Sign In submission lifecycle
   Last Updated:
   - date: 2026-09-25
   - note: authenticate Access identity and resolve entry from persisted Outflō existence
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */

import {
    useRouter,
} from "next/navigation";

import {
    resolveSignInDestination,
} from "@/runtime/onboarding/access/sign-in/destination/resolveSignInDestination";

import {
    signInEmailAccessIdentity,
} from "@/runtime/onboarding/access/sign-in/identity/signInEmailAccessIdentity";

/* ------------------------------
   Types
-------------------------------- */

type SignInSubmissionInput = {
    email: string;
    password: string;
};

/* ------------------------------
   Hook
-------------------------------- */

export function useSignInSubmission() {
    const router = useRouter();

    async function submitSignIn({
        email,
        password,
    }: SignInSubmissionInput) {
        const {
            error,
        } = await signInEmailAccessIdentity({
            email,
            password,
        });

        if (error) {
            return {
                error,
            };
        }

        try {
            const destination =
                await resolveSignInDestination();

            router.replace(destination);
            router.refresh();

            return {
                error: null,
            };
        } catch (error) {
            return {
                error,
            };
        }
    }

    return {
        submitSignIn,
    };
}
