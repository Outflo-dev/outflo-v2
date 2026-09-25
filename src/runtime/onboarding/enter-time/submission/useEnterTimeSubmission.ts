"use client";

/* ==========================================================
   OUTFLO — ENTER TIME SUBMISSION
   File: src/runtime/onboarding/enter-time/submission/useEnterTimeSubmission.ts
   Scope: Own client submission from completed volatile onboarding state into trusted Outflō creation
   Last Updated:
   - date: 2026-09-24
   - note: submit Guide Name and Guide Begin selection to the trusted Enter Time creation boundary
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */

import {
    useState,
} from "react";

import {
    useRouter,
} from "next/navigation";

import {
    createOutfloAtEnterTime,
} from "@/runtime/onboarding/enter-time/creation/createOutfloAtEnterTime";

import {
    useVolatileOnboardingState,
} from "@/runtime/onboarding/state/volatile/VolatileOnboardingState";

/* ------------------------------
   Hook
-------------------------------- */

export function useEnterTimeSubmission() {
    const router = useRouter();

    const [
        isSubmitting,
        setIsSubmitting,
    ] = useState(false);

    const {
        username,
        guideBeginSelection,
    } = useVolatileOnboardingState();

    async function submitEnterTime() {
        if (username === null) {
            const error =
                "Guide Name is required before entering Time.";

            console.error(error);

            return {
                success: false as const,
                error,
            };
        }

        setIsSubmitting(true);

        try {
            const result =
                await createOutfloAtEnterTime({
                    username,
                    guideBeginSelection,
                });

            if (!result.success) {
                console.error(
                    "Enter Time failed:",
                    result.error,
                );

                return result;
            }

            router.push("/time");

            return result;
        } finally {
            setIsSubmitting(false);
        }
    }

    return {
        isSubmitting,
        submitEnterTime,
    };
}
