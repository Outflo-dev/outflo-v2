/* ==========================================================
   OUTFLO — CREATE ACCOUNT COMPOSITION
   File: src/compositions/onboarding/create-account/CreateAccountComposition.tsx
   Scope: Compose the complete visible Create Account experience
   Last Updated:
   - date: 2026-08-02
   - note: own the Create Account sequence within the shared onboarding frame
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import BackNavigationAction from "@/components/system/primitives/actions/navigation/BackNavigationAction";
import OnboardingPrimaryAction from "@/components/system/primitives/actions/onboarding/OnboardingPrimaryAction";
import OutfloMark from "@/components/system/primitives/marks/outflo/OutfloMark";

import {
    ArrowIcon,
} from "../internal/icons";

import OnboardingPage from "../internal/page/OnboardingPage";
import OnboardingPageAction from "../internal/page/internal/action/OnboardingPageAction";
import OnboardingPageBody from "../internal/page/internal/body/OnboardingPageBody";
import OnboardingPageIcon from "../internal/page/internal/icon/OnboardingPageIcon";
import OnboardingPageIntro from "../internal/page/internal/intro/OnboardingPageIntro";
import OnboardingPageProgress from "../internal/page/internal/progress/OnboardingPageProgress";

import CreateAccountForm, {
    CREATE_ACCOUNT_FORM_ID,
} from "./internal/form/CreateAccountForm";

import CreateAccountSignInPrompt from "./internal/signin/CreateAccountSignInPrompt";

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
        >
            <OnboardingPageIntro
                title="Create account"
                subtitle="Begin your life in time."
            />

            <OnboardingPageIcon
                icon={OutfloMark}
                title="Outflō"
            />

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

            <OnboardingPageProgress
                step={1}
                totalSteps={7}
            />

            <CreateAccountSignInPrompt />
        </OnboardingPage>
    );
}