/* ==========================================================
   OUTFLO — CREATE ACCOUNT COMPOSITION
   File: src/compositions/onboarding/access/create-account/CreateAccountComposition.tsx
   Scope: Compose the complete visible Create Account experience
   Last Updated:
   - date: 2026-08-18
   - note: bind the primary Create Account action to the canonical form boundary
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */

import BackNavigationAction from "@/components/system/primitives/actions/navigation/BackNavigationAction";
import OnboardingPrimaryAction from "@/components/system/primitives/actions/onboarding/OnboardingPrimaryAction";
import OutfloMark from "@/components/system/primitives/marks/outflo/OutfloMark";

import {
    OnboardingPage,
    OnboardingPageAction,
    OnboardingPageBody,
    OnboardingPageIcon,
    OnboardingPageIntro,
    OnboardingPageProgress,
} from "@/components/onboarding/page";

import {
    ArrowIcon,
} from "@/components/onboarding/OnboardingComponentsIndex";

import {
    CreateAccountForm,
    CREATE_ACCOUNT_FORM_ID,
    CreateAccountSignInPrompt,
} from "@/components/onboarding/access/create-account/CreateAccountComponentsIndex";



import iconPlacementStyles from "./internal/icon/CreateAccountIconPlacement.module.css";
import introPlacementStyles from "./internal/intro/CreateAccountIntroPlacement.module.css";

/* ------------------------------
   Component
-------------------------------- */

export default function CreateAccountComposition() {
    return (
        <OnboardingPage
            navigation={
                <BackNavigationAction
                    href="/"
                    label="Back to landing"
                />
            }
            progress={
                <OnboardingPageProgress
                    step={1}
                    totalSteps={2}
                />
            }
        >
            <div className={introPlacementStyles.frame}>
                <OnboardingPageIntro
                    title="Create account"
                    subtitle="Begin your life in time."
                />
            </div>

            <div className={iconPlacementStyles.frame}>
                <OnboardingPageIcon
                    icon={OutfloMark}
                    title="Outflō"
                />
            </div>

            <OnboardingPageBody>
                <CreateAccountForm />
            </OnboardingPageBody>

            <OnboardingPageAction>
                <OnboardingPrimaryAction
                    type="submit"
                    form={CREATE_ACCOUNT_FORM_ID}
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

            <CreateAccountSignInPrompt />
        </OnboardingPage>
    );
}
