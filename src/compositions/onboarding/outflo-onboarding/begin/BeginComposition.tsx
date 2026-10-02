"use client";

/* ==========================================================
   OUTFLO — BEGIN COMPOSITION
   File: src/compositions/onboarding/outflo-onboarding/begin/BeginComposition.tsx
   Scope: Compose the complete visible Begin onboarding experience
   Last Updated:
   - Outflō Time: 847627357828824664966983192303
   - note: reduce Begin onboarding to Now and Enter Time
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */

import BackNavigationAction from "@/components/system/primitives/actions/navigation/BackNavigationAction";
import OnboardingPrimaryAction from "@/components/system/primitives/actions/onboarding/OnboardingPrimaryAction";

import {
    ArrowIcon,
} from "@/components/onboarding/OnboardingComponentsIndex";

import {
    OnboardingPage,
    OnboardingPageAction,
    OnboardingPageBody,
    OnboardingPageIntro,
    OnboardingPageProgress,
} from "@/components/onboarding/page";

import BeginMoment from "@/compositions/onboarding/outflo-onboarding/begin/internal/moment/BeginMoment";
import BeginOptions from "@/compositions/onboarding/outflo-onboarding/begin/internal/options/BeginOptions";

import {
    useEnterTimeSubmission,
} from "@/runtime/onboarding/enter-time/submission/useEnterTimeSubmission";

import styles from "@/compositions/onboarding/outflo-onboarding/begin/internal/layout/BeginLayout.module.css";

/* ------------------------------
   Component
-------------------------------- */

export default function BeginComposition() {
    const {
        isSubmitting,
        submitEnterTime,
    } = useEnterTimeSubmission();

    return (
        <OnboardingPage
            navigation={
                <BackNavigationAction
                    href="/verify-email"
                    label="Back to Verify Email"
                />
            }
        >
            <div className={styles.mark}>
                <BeginMoment />
            </div>

            <div className={styles.intro}>
                <OnboardingPageIntro
                    title="Begin"
                    subtitle={
                        <span className={styles.subtitle}>
                            When does your Time begin?
                        </span>
                    }
                />
            </div>

            <OnboardingPageBody>
                <div className={styles.body}>
                    <BeginOptions />
                </div>
            </OnboardingPageBody>

            <div className={styles.action}>
                <OnboardingPageAction>
                    <OnboardingPrimaryAction
                        type="button"
                        disabled={isSubmitting}
                        onClick={() => {
                            void submitEnterTime();
                        }}
                        trailing={
                            <ArrowIcon
                                direction="right"
                                size={18}
                            />
                        }
                    >
                        Enter Time
                    </OnboardingPrimaryAction>
                </OnboardingPageAction>
            </div>

            <div className={styles.progress}>
                <OnboardingPageProgress
                    step={2}
                    totalSteps={2}
                />
            </div>
        </OnboardingPage>
    );
}
