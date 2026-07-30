/* ==========================================================
   OUTFLO — CREATE ACCOUNT COMPOSITION
   File: src/compositions/onboarding/create-account/CreateAccountComposition.tsx
   Scope: Compose the complete visible Create Account experience
   Last Updated:
   - date: 2026-07-29
   - note: establish Create Account as a completed onboarding composition
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import BackNavigationAction from "@/components/system/primitives/actions/navigation/BackNavigationAction";
import OnboardingPrimaryAction from "@/components/system/primitives/actions/onboarding/OnboardingPrimaryAction";
import ArrowIcon from "@/components/system/primitives/icons/navigation/ArrowIcon";
import OutfloMark from "@/components/system/primitives/marks/outflo/OutfloMark";

import OnboardingPage from "../internal/page/OnboardingPage";

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
            icon={OutfloMark}
            iconTitle="Outflō"
            title="Create account"
            support="Begin your life in time."
            step={1}
            action={
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
                    Create account
                </OnboardingPrimaryAction>
            }
            alternate={
                <CreateAccountSignInPrompt />
            }
        >
            <CreateAccountForm />
        </OnboardingPage>
    );
}