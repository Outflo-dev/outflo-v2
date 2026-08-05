/* ==========================================================
   OUTFLO — ONBOARDING PAGE
   File: src/components/onboarding/page/OnboardingPage.tsx
   Scope: Own the stable shared frame surrounding onboarding page compositions
   Last Updated:
   - date: 2026-08-04
   - note: restore the shared onboarding atmosphere within the page frame
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