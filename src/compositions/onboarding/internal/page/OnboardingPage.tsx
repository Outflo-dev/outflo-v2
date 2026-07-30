/* ==========================================================
   OUTFLO — ONBOARDING PAGE
   File: src/compositions/onboarding/internal/page/OnboardingPage.tsx
   Scope: Own the canonical propagated page composition across onboarding
   Last Updated:
   - date: 2026-07-29
   - note: compose the completed onboarding surface, atmosphere, navigation, and scroll owners
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { ReactNode } from "react";

import OnboardingPageAction from "./internal/action/OnboardingPageAction";
import OnboardingPageAtmosphere from "./internal/atmosphere/OnboardingPageAtmosphere";
import OnboardingPageBody from "./internal/body/OnboardingPageBody";

import type {
    OnboardingPageIconComponent,
} from "./internal/icon/module/construction/icon.contract";

import OnboardingPageIcon from "./internal/icon/OnboardingPageIcon";
import OnboardingPageIntro from "./internal/intro/OnboardingPageIntro";
import OnboardingPageNavigation from "./internal/navigation/OnboardingPageNavigation";
import OnboardingPageProgress from "./internal/progress/OnboardingPageProgress";
import OnboardingPageScroll from "./internal/scroll/OnboardingPageScroll";
import OnboardingPageSurface from "./internal/surface/OnboardingPageSurface";

/* ------------------------------
   Types
-------------------------------- */
type OnboardingPageProps = {
    icon: OnboardingPageIconComponent;
    iconTitle?: string;
    title: string;
    support: string;
    step: number;
    children: ReactNode;
    action: ReactNode;
    navigation?: ReactNode;
    alternate?: ReactNode;
    totalSteps?: number;
};

/* ------------------------------
   Component
-------------------------------- */
export default function OnboardingPage({
    icon,
    iconTitle,
    title,
    support,
    step,
    children,
    action,
    navigation,
    alternate,
    totalSteps = 7,
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
                <OnboardingPageIntro
                    title={title}
                    subtitle={support}
                />

                <OnboardingPageIcon
                    icon={icon}
                    title={iconTitle}
                />

                <OnboardingPageBody>
                    {children}
                </OnboardingPageBody>

                <OnboardingPageAction>
                    {action}
                </OnboardingPageAction>

                <OnboardingPageProgress
                    step={step}
                    totalSteps={totalSteps}
                />

                {alternate ?? null}
            </OnboardingPageScroll>
        </OnboardingPageSurface>
    );
}