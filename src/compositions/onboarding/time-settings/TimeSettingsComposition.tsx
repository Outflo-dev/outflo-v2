"use client";

/* ==========================================================
   OUTFLO — TIME SETTINGS COMPOSITION
   File: src/compositions/onboarding/time-settings/TimeSettingsComposition.tsx
   Scope: Compose the complete visible Time Settings onboarding experience
   Last Updated:
   - date: 2026-08-08
   - note: establish the static Step 5 Time presentation surface
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import { useRouter } from "next/navigation";

import BackNavigationAction from "@/components/system/primitives/actions/navigation/BackNavigationAction";
import OnboardingPrimaryAction from "@/components/system/primitives/actions/onboarding/OnboardingPrimaryAction";

import {
    ArrowIcon,
} from "@/compositions/onboarding/internal/icons";

import {
    OnboardingPage,
    OnboardingPageAction,
    OnboardingPageBody,
    OnboardingPageIntro,
    OnboardingPageProgress,
} from "@/components/onboarding/page";

import TimeSettingsOptions from "@/compositions/onboarding/time-settings/internal/options/TimeSettingsOptions";
import TimeSettingsPreview from "@/compositions/onboarding/time-settings/internal/preview/TimeSettingsPreview";

import styles from "@/compositions/onboarding/time-settings/internal/layout/TimeSettingsLayout.module.css";

/* ------------------------------
   Component
-------------------------------- */
export default function TimeSettingsComposition() {
    const router = useRouter();

    return (
        <OnboardingPage
            navigation={
                <BackNavigationAction
                    href="/make-yours"
                    label="Back to Make Outflō yours"
                />
            }
        >
            <div className={styles.intro}>
                <OnboardingPageIntro
                    title={"How should\nTime appear?"}
                    subtitle={
                        <span className={styles.subtitle}>
                            You can change these anytime.
                        </span>
                    }
                />
            </div>

            <OnboardingPageBody>
                <div className={styles.body}>
                    <TimeSettingsOptions />
                    <TimeSettingsPreview />
                </div>
            </OnboardingPageBody>

            <div className={styles.action}>
                <OnboardingPageAction>
                    <OnboardingPrimaryAction
                        type="button"
                        onClick={() => router.push("/orbit")}
                        trailing={
                            <ArrowIcon
                                direction="right"
                                size={18}
                            />
                        }
                    >
                        Continue
                    </OnboardingPrimaryAction>
                </OnboardingPageAction>
            </div>

            <div className={styles.progress}>
                <OnboardingPageProgress
                    step={3}
                    totalSteps={6}
                />
            </div>
        </OnboardingPage>
    );
}
