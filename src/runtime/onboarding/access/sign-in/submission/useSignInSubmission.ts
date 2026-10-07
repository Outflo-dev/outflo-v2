"use client";

/* ==========================================================
   OUTFLO — SIGN IN SUBMISSION
   File: src/runtime/onboarding/access/sign-in/submission/useSignInSubmission.ts
   Scope: Own successful Sign In submission lifecycle
   Last Updated:
   - date: 2026-10-07
   - note: authenticate Access identity, record successful Sign In Machine Time, then enter Outflō
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

import {
    recordSuccessfulSignInMachineTime,
} from "@/runtime/onboarding/access/sign-in/observation/recordSuccessfulSignInMachineTime";

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
            const observation =
                await recordSuccessfulSignInMachineTime();

            if (!observation.success) {
                return {
                    error: new Error(
                        observation.error,
                    ),
                };
            }

            router.replace(
                observation.destination,
            );

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
