/* ==========================================================
   OUTFLO — ONBOARDING PAGE
   File: src/compositions/onboarding/internal/page/OnboardingPage.tsx
   Scope: Own the stable shared frame surrounding onboarding page compositions
   Last Updated:
   - date: 2026-08-02
   - note: separate the invariant onboarding frame from screen-owned content sequencing
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { ReactNode } from "react";

import OnboardingPageAtmosphere from "./internal/atmosphere/OnboardingPageAtmosphere";
import OnboardingPageNavigation from "./internal/navigation/OnboardingPageNavigation";
import OnboardingPageScroll from "./internal/scroll/OnboardingPageScroll";
import OnboardingPageSurface from "./internal/surface/OnboardingPageSurface";

/* ------------------------------
   Types
-------------------------------- */
type OnboardingPageProps = {
    children: ReactNode;
    navigation?: ReactNode;
};

/* ------------------------------
   Component
-------------------------------- */
export default function OnboardingPage({
    children,
    navigation,
}: OnboardingPageProps) {
    return (
        <OnboardingPageSurface>
            <OnboardingPageAtmosphere />

            {navigation ? (
                <OnboardingPageNavigation>
                    {navigation}
                </OnboardingPageNavigation>
            ) : null}

            <OnboardingPageScroll>
                {children}
            </OnboardingPageScroll>
        </OnboardingPageSurface>
    );
}