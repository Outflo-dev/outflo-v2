"use client";

/* ==========================================================
   OUTFLO — ENTER TIME SUBMISSION
   File: src/runtime/onboarding/enter-time/submission/useEnterTimeSubmission.ts
   Scope: Own client submission into trusted Outflō creation
   Last Updated:
   - Outflō Time: 847627357828824664966983192303
   - note: remove Guide Name dependency from Enter Time
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

/* ------------------------------
   Hook
-------------------------------- */

export function useEnterTimeSubmission() {
    const router = useRouter();

    const [
        isSubmitting,
        setIsSubmitting,
    ] = useState(false);

    async function submitEnterTime() {
        setIsSubmitting(true);

        try {
            const result =
                await createOutfloAtEnterTime();

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
