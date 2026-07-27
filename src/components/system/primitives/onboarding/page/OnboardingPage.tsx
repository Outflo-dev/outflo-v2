/* ==========================================================
   OUTFLO — ONBOARDING PAGE
   File: src/components/system/primitives/onboarding/page/OnboardingPage.tsx
   Scope: Own the canonical propagated page composition across onboarding
   Last Updated:
   - date: 2026-07-27
   - note: isolate stationary navigation from the scrolling onboarding body
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { ReactNode } from "react";

import OnboardingAtmosphere from "@/components/system/primitives/atmospheres/onboarding/OnboardingAtmosphere";

import OnboardingPageIcon from "./internal/OnboardingPageIcon";
import OnboardingPageIntro from "./internal/OnboardingPageIntro";
import OnboardingPageProgress from "./internal/OnboardingPageProgress";

import styles from "./OnboardingPage.module.css";

/* ------------------------------
   Types
-------------------------------- */
type OnboardingPageProps = {
    icon: ReactNode;
    title: string;
    support: string;
    step: number;
    children: ReactNode;
    action: ReactNode;
    navigation?: ReactNode;
    secondary?: ReactNode;
    totalSteps?: number;
};

/* ------------------------------
   Component
-------------------------------- */
export default function OnboardingPage({
    icon,
    title,
    support,
    step,
    children,
    action,
    navigation,
    secondary,
    totalSteps = 7,
}: OnboardingPageProps) {
    return (
        <section className={styles.page}>
            <OnboardingAtmosphere />

            {navigation ? (
                <div className={styles.navigationLanding}>
                    {navigation}
                </div>
            ) : null}

            <div className={styles.scrollBody}>
                <div className={styles.introLanding}>
                    <OnboardingPageIntro
                        title={title}
                        support={support}
                    />
                </div>

                <div className={styles.iconLanding}>
                    <OnboardingPageIcon>
                        {icon}
                    </OnboardingPageIcon>
                </div>

                <div className={styles.contentLanding}>
                    {children}
                </div>

                <div className={styles.actionLanding}>
                    {action}
                </div>

                <div className={styles.progressLanding}>
                    <OnboardingPageProgress
                        step={step}
                        totalSteps={totalSteps}
                    />
                </div>

                {secondary ? (
                    <div className={styles.secondaryLanding}>
                        {secondary}
                    </div>
                ) : null}
            </div>
        </section>
    );
}