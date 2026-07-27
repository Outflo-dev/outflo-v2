/* ==========================================================
   OUTFLO — CREATE ACCOUNT VIEW
   File: src/app/(onboarding)/create-account/CreateAccountView.tsx
   Scope: Declare Create Account meaning through the propagated onboarding page
   Last Updated:
   - date: 2026-07-26
   - note: declare backward navigation through the shared onboarding page
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import BackNavigationAction from "@/components/system/primitives/actions/navigation/BackNavigationAction";
import OnboardingPrimaryAction from "@/components/system/primitives/actions/onboarding/OnboardingPrimaryAction";
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
                >
                    Continue
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