"use client";

/* ==========================================================
   OUTFLO — SIGN IN COMPOSITION
   File: src/compositions/onboarding/sign-in/SignInComposition.tsx
   Scope: Compose the complete visible Sign In access experience
   Last Updated:
   - date: 2026-08-09
   - note: establish Sign In as the second access surface before authentication wiring
   ========================================================== */

import BackNavigationAction from "@/components/system/primitives/actions/navigation/BackNavigationAction";
import OnboardingPrimaryAction from "@/components/system/primitives/actions/onboarding/OnboardingPrimaryAction";
import OutfloMark from "@/components/system/primitives/marks/outflo/OutfloMark";

import {
    ArrowIcon,
} from "@/compositions/onboarding/internal/icons";

import {
    OnboardingPage,
    OnboardingPageAction,
    OnboardingPageBody,
    OnboardingPageIcon,
    OnboardingPageIntro,
} from "@/components/onboarding/page";

import SignInCreateAccountPrompt from "@/compositions/onboarding/sign-in/internal/alternate/SignInCreateAccountPrompt";

import SignInForm, {
    SIGN_IN_FORM_ID,
} from "@/compositions/onboarding/sign-in/internal/form/SignInForm";

import styles from "@/compositions/onboarding/sign-in/internal/layout/SignInLayout.module.css";

export default function SignInComposition() {
    return (
        <OnboardingPage
            navigation={
                <BackNavigationAction
                    href="/"
                    label="Back to landing"
                />
            }
        >
            <div className={styles.intro}>
                <OnboardingPageIntro
                    title="Sign in"
                    subtitle="Welcome back."
                />
            </div>

            <OnboardingPageIcon
                icon={OutfloMark}
                title="Outflō"
            />

            <div className={styles.body}>
                <OnboardingPageBody>
                    <SignInForm />
                </OnboardingPageBody>
            </div>

            <div className={styles.action}>
                <OnboardingPageAction>
                    <OnboardingPrimaryAction
                        type="submit"
                        form={SIGN_IN_FORM_ID}
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

            <div className={styles.alternate}>
                <SignInCreateAccountPrompt />
            </div>
        </OnboardingPage>
    );
}
