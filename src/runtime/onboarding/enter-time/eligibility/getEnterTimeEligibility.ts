/* ==========================================================
   OUTFLO — ENTER TIME ELIGIBILITY
   File: src/runtime/onboarding/enter-time/eligibility/getEnterTimeEligibility.ts
   Scope: Resolve whether volatile onboarding state is complete enough to Enter Time
   Last Updated:
   - date: 2026-08-19
   - note: establish eligibility from Guide Begin mode and explicit date completion
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */

import type {
    GuideBeginSelection,
} from "@/runtime/onboarding/state/volatile/VolatileOnboardingState";

/* ------------------------------
   Types
-------------------------------- */

type GetEnterTimeEligibilityInput = {
    guideBeginSelection:
        GuideBeginSelection;

    guideBeginDate:
        string | null;
};

/* ------------------------------
   Resolution
-------------------------------- */

export function getEnterTimeEligibility({
    guideBeginSelection,
    guideBeginDate,
}: GetEnterTimeEligibilityInput) {
    if (guideBeginSelection === "now") {
        return true;
    }

    return guideBeginDate !== null;
}
