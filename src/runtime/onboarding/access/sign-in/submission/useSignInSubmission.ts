"use client";

/* ==========================================================
   OUTFLO — SIGN IN SUBMISSION
   File: src/runtime/onboarding/access/sign-in/submission/useSignInSubmission.ts
   Scope: Own successful Sign In submission lifecycle
   Last Updated:
   - date: 2026-10-05
   - note: expose raw client temporal observations around Supabase Auth
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

import {
    observePlatformTemporalNow,
} from "@/runtime/clock/observation/observePlatformTemporalNow";

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
        const beforeAuthentication =
            observePlatformTemporalNow();

        console.log(
            "[Outflō Clock Experiment] client before authentication",
            beforeAuthentication,
        );

        const {
            error,
        } = await signInEmailAccessIdentity({
            email,
            password,
        });

        const afterAuthentication =
            observePlatformTemporalNow();

        console.log(
            "[Outflō Clock Experiment] client after authentication",
            afterAuthentication,
        );

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
