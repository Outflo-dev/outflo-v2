/* ==========================================================
   OUTFLO — ONBOARDING PAGE
   File: src/components/onboarding/page/OnboardingPage.tsx
   Scope: Own the stable shared frame surrounding onboarding page compositions
   Last Updated:
   - date: 2026-08-12
   - note: establish navigation, content, and progress as distinct page channels
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { ReactNode } from "react";

import OnboardingPageAtmosphere from "./internal/atmosphere/OnboardingPageAtmosphere";
import OnboardingPageNavigation from "./internal/navigation/OnboardingPageNavigation";
import OnboardingPageProgressBand from "./internal/progress-band/OnboardingPageProgressBand";
import OnboardingPageScroll from "./internal/scroll/OnboardingPageScroll";
import OnboardingPageSurface from "./internal/surface/OnboardingPageSurface";

/* ------------------------------
   Types
-------------------------------- */
type OnboardingPageProps = {
    children: ReactNode;
    navigation?: ReactNode;
    progress?: ReactNode;
};

/* ------------------------------
   Component
-------------------------------- */
export default function OnboardingPage({
    children,
    navigation,
    progress,
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

            {progress ? (
                <OnboardingPageProgressBand>
                    {progress}
                </OnboardingPageProgressBand>
            ) : null}
        </OnboardingPageSurface>
    );
}
