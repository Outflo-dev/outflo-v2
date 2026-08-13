"use client";

/* ==========================================================
   OUTFLO — BEGIN COMPOSITION
   File: src/compositions/onboarding/begin/BeginComposition.tsx
   Scope: Compose the complete visible Begin onboarding experience
   Last Updated:
   - date: 2026-08-12
   - note: reduce Begin to Guide Begin choice and Enter Time
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
                    subtitle="When does your Time begin?"
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
                        onClick={() => router.push("/time")}
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
