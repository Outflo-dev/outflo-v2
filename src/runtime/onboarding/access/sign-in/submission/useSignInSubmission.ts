"use client";

/* ==========================================================
   OUTFLO — SIGN IN SUBMISSION
   File: src/runtime/onboarding/access/sign-in/submission/useSignInSubmission.ts
   Scope: Own successful Sign In submission lifecycle
   Last Updated:
   - date: 2026-08-19
   - note: authenticate existing Access identity and transition to Begin Home
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */

import {
    useRouter,
} from "next/navigation";

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

        router.push("/time");

        return {
            error: null,
        };
    }

    return {
        submitSignIn,
    };
}
