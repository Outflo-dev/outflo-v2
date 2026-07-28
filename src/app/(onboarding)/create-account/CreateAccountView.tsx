/* ==========================================================
   OUTFLO — CREATE ACCOUNT VIEW
   File: src/app/(onboarding)/create-account/CreateAccountView.tsx
   Scope: Declare Create Account meaning through the propagated onboarding page
   Last Updated:
   - date: 2026-07-26
   - note: declare backward navigation and forward progression through shared onboarding actions
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import BackNavigationAction from "@/components/system/primitives/actions/navigation/BackNavigationAction";
import OnboardingPrimaryAction from "@/components/system/primitives/actions/onboarding/OnboardingPrimaryAction";
import ArrowIcon from "@/components/system/primitives/icons/navigation/ArrowIcon";
import OnboardingPage from "@/components/system/primitives/onboarding/page/OnboardingPage";
import OutfloMark from "@/components/system/primitives/marks/outflo/OutfloMark";

import CreateAccountForm, {
    CREATE_ACCOUNT_FORM_ID,
} from "./form/CreateAccountForm";

import CreateAccountSignInPrompt from "./signin/CreateAccountSignInPrompt";

/* ------------------------------
   Component
-------------------------------- */
export default function CreateAccountView() {
    return (
        <OnboardingPage
            navigation={
                <BackNavigationAction
                    href="/"
                    label="Back to landing"
                />
            }
            icon={
                <OutfloMark
                    size={165}
                    title="Outflō"
                />
            }
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
            secondary={
                <CreateAccountSignInPrompt />
            }
        >
            <CreateAccountForm />
        </OnboardingPage>
    );
}