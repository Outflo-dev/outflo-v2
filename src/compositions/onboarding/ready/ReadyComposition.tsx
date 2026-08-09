"use client";

/* ==========================================================
   OUTFLO — READY COMPOSITION
   File: src/compositions/onboarding/ready/ReadyComposition.tsx
   Scope: Compose the complete visible Step 7 onboarding experience
   Last Updated:
   - date: 2026-08-08
   - note: establish the final static onboarding surface
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
    OnboardingPageIntro,
    OnboardingPageProgress,
} from "@/components/onboarding/page";

import ReadyIcon from "@/compositions/onboarding/ready/internal/icon/ReadyIcon";

import actionPlacementStyles from "@/compositions/onboarding/ready/internal/action/ReadyActionPlacement.module.css";
import introStyles from "@/compositions/onboarding/ready/internal/intro/ReadyIntro.module.css";
import progressPlacementStyles from "@/compositions/onboarding/ready/internal/progress/ReadyProgressPlacement.module.css";

/* ------------------------------
   Component
-------------------------------- */
export default function ReadyComposition() {
    const router = useRouter();

    return (
        <OnboardingPage
            navigation={
                <BackNavigationAction
                    href="/begin"
                    label="Back to Begin"
                />
            }
        >
            <ReadyIcon />

            <div className={introStyles.frame}>
                <OnboardingPageIntro
                    title="Your Time is ready."
                    subtitle={
                        <span className={introStyles.support}>
                            Your life, in time.
                        </span>
                    }
                />
            </div>

            <div className={actionPlacementStyles.frame}>
                <OnboardingPageAction>
                    <OnboardingPrimaryAction
                        type="button"
                        onClick={() => {
                            router.push("/time");
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

            <div className={progressPlacementStyles.frame}>
                <OnboardingPageProgress
                    step={7}
                    totalSteps={7}
                />
            </div>
        </OnboardingPage>
    );
}
