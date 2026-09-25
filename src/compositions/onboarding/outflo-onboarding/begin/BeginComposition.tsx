"use client";

/* ==========================================================
   OUTFLO — BEGIN COMPOSITION
   File: src/compositions/onboarding/outflo-onboarding/begin/BeginComposition.tsx
   Scope: Compose the complete visible Begin onboarding experience
   Last Updated:
   - date: 2026-08-12
   - note: reduce Begin to Guide Begin choice and Enter Time
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
    useVolatileOnboardingState,
} from "@/runtime/onboarding/state/volatile/VolatileOnboardingState";

import {
    getEnterTimeEligibility,
} from "@/runtime/onboarding/enter-time/eligibility/getEnterTimeEligibility";

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

    const {
        guideBeginSelection,
        guideBeginDate,
    } = useVolatileOnboardingState();

    const isEnterTimeEligible =
        getEnterTimeEligibility({
            guideBeginSelection,
            guideBeginDate,
        });

    return (
        <OnboardingPage
            navigation={
                <BackNavigationAction
                    href="/guide-name"
                    label="Back to Guide Name"
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
                        disabled={!isEnterTimeEligible || isSubmitting}
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
