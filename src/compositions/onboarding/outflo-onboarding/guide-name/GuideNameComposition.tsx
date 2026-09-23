"use client";

/* ==========================================================
   OUTFLO — GUIDE NAME COMPOSITION
   File: src/compositions/onboarding/outflo-onboarding/guide-name/GuideNameComposition.tsx
   Scope: Compose the complete visible Guide Name experience
   Last Updated:
   - date: 2026-08-19
   - note: own the successful Guide Name transition into Begin
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */

import {
    useRouter,
} from "next/navigation";

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

import GuideNameForm, {
    GUIDE_NAME_FORM_ID,
} from "@/compositions/onboarding/outflo-onboarding/guide-name/internal/form/GuideNameForm";

import GuideNameIcon from "@/compositions/onboarding/outflo-onboarding/guide-name/internal/icon/GuideNameIcon";

import actionPlacementStyles from "@/compositions/onboarding/outflo-onboarding/guide-name/internal/action/GuideNameActionPlacement.module.css";
import introStyles from "@/compositions/onboarding/outflo-onboarding/guide-name/internal/intro/GuideNameIntro.module.css";
import progressPlacementStyles from "@/compositions/onboarding/outflo-onboarding/guide-name/internal/progress/GuideNameProgressPlacement.module.css";

/* ------------------------------
   Component
-------------------------------- */

export default function GuideNameComposition() {
    const router = useRouter();

    function handleContinue() {
        router.push("/begin");
    }

    return (
        <OnboardingPage
            navigation={
                <BackNavigationAction
                    href="/verify-email"
                    label="Back to verify email"
                />
            }
        >
            <GuideNameIcon />

            <div className={introStyles.frame}>
                <OnboardingPageIntro
                    title="Guide Name"
                    subtitle={
                        <>
                            <span className={introStyles.question}>
                                Choose how you’ll be known in Outflō.
                            </span>

                            <span className={introStyles.support}>
                                You can change this later.
                            </span>
                        </>
                    }
                />
            </div>

            <OnboardingPageBody>
                <GuideNameForm
                    onSubmit={handleContinue}
                />
            </OnboardingPageBody>

            <div className={actionPlacementStyles.frame}>
                <OnboardingPageAction>
                    <OnboardingPrimaryAction
                        type="submit"
                        form={GUIDE_NAME_FORM_ID}
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

            <div className={progressPlacementStyles.frame}>
                <OnboardingPageProgress
                    step={1}
                    totalSteps={2}
                />
            </div>
        </OnboardingPage>
    );
}
