"use client";

/* ==========================================================
   OUTFLO — BEGIN COMPOSITION
   File: src/compositions/onboarding/begin/BeginComposition.tsx
   Scope: Compose the complete visible Begin onboarding experience
   Last Updated:
   - date: 2026-08-08
   - note: establish the static Step 6 Begin surface
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

import BeginMoment from "@/compositions/onboarding/begin/internal/moment/BeginMoment";
import BeginOptions from "@/compositions/onboarding/begin/internal/options/BeginOptions";
import BeginNote from "@/compositions/onboarding/begin/internal/note/BeginNote";
import BeginElapsedPreview from "@/compositions/onboarding/begin/internal/preview/BeginElapsedPreview";

import styles from "@/compositions/onboarding/begin/internal/layout/BeginLayout.module.css";

/* ------------------------------
   Component
-------------------------------- */
export default function BeginComposition() {
    const router = useRouter();

    return (
        <OnboardingPage
            navigation={
                <BackNavigationAction
                    href="/time-settings"
                    label="Back to Time settings"
                />
            }
        >
            <div className={styles.intro}>
                <OnboardingPageIntro
                    title="Set Begin"
                    subtitle={
                        <span className={styles.subtitle}>
                            <span>Choose the moment</span>
                            <span>Time begins.</span>
                        </span>
                    }
                />
            </div>

            <OnboardingPageBody>
                <div className={styles.body}>
                    <BeginMoment />
                    <BeginOptions />
                    <BeginNote />
                    <BeginElapsedPreview />
                </div>
            </OnboardingPageBody>

            <div className={styles.action}>
                <OnboardingPageAction>
                    <OnboardingPrimaryAction
                        type="button"
                        onClick={() => router.push("/ready")}
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
                    step={6}
                    totalSteps={7}
                />
            </div>
        </OnboardingPage>
    );
}
