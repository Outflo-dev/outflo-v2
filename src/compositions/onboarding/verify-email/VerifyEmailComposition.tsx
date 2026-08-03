/* ==========================================================
   OUTFLO — VERIFY EMAIL COMPOSITION
   File: src/compositions/onboarding/verify-email/VerifyEmailComposition.tsx
   Scope: Compose the complete visible Verify Email experience
   Last Updated:
   - date: 2026-08-02
   - note: instantiate Verify Email through the canonical onboarding page
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import BackNavigationAction from "@/components/system/primitives/actions/navigation/BackNavigationAction";
import OnboardingPrimaryAction from "@/components/system/primitives/actions/onboarding/OnboardingPrimaryAction";
import {
    ArrowIcon,
    EmailVerificationConceptIcon,
} from "../internal/icons";

import OnboardingPage from "../internal/page/OnboardingPage";

import VerifyEmailForm, {
    VERIFY_EMAIL_FORM_ID,
} from "./internal/form/VerifyEmailForm";

import VerifyEmailResendPrompt from "./internal/resend/VerifyEmailResendPrompt";

/* ------------------------------
   Component
-------------------------------- */
export default function VerifyEmailComposition() {
    return (
        <OnboardingPage
            navigation={
                <BackNavigationAction
                    href="/create-account"
                    label="Back to create account"
                />
            }
            icon={EmailVerificationConceptIcon}
            iconTitle="Email verification"
            title="Check your email"
            support="We sent a 6-digit code to your email."
            step={2}
            action={
                <OnboardingPrimaryAction
                    type="submit"
                    form={VERIFY_EMAIL_FORM_ID}
                    trailing={
                        <ArrowIcon
                            direction="right"
                            size={18}
                        />
                    }
                >
                    Continue
                </OnboardingPrimaryAction>
            }
            alternate={
                <VerifyEmailResendPrompt />
            }
        >
            <VerifyEmailForm />
        </OnboardingPage>
    );
}