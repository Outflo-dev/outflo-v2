/* ==========================================================
   OUTFLO — VERIFY EMAIL COMPOSITION
   File: src/compositions/onboarding/verify-email/VerifyEmailComposition.tsx
   Scope: Compose the complete visible Verify Email experience
   Last Updated:
   - date: 2026-08-03
   - note: own the Verify Email sequence within the shared onboarding frame
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import BackNavigationAction from "@/components/system/primitives/actions/navigation/BackNavigationAction";
import OnboardingPrimaryAction from "@/components/system/primitives/actions/onboarding/OnboardingPrimaryAction";

import {
    ArrowIcon,
} from "../internal/icons";

import OnboardingPage from "../internal/page/OnboardingPage";
import OnboardingPageAction from "../internal/page/internal/action/OnboardingPageAction";
import OnboardingPageBody from "../internal/page/internal/body/OnboardingPageBody";
import OnboardingPageIntro from "../internal/page/internal/intro/OnboardingPageIntro";
import OnboardingPageProgress from "../internal/page/internal/progress/OnboardingPageProgress";

import VerifyEmailIcon from "./internal/icon/VerifyEmailIcon";

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
        >
            <VerifyEmailIcon />

            <OnboardingPageIntro
                title="Check your email"
                subtitle="We sent a 6-digit code to your email."
            />

            <OnboardingPageBody>
                <VerifyEmailForm />
            </OnboardingPageBody>

            <OnboardingPageAction>
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
            </OnboardingPageAction>

            <VerifyEmailResendPrompt />

            <OnboardingPageProgress
                step={2}
                totalSteps={7}
            />
        </OnboardingPage>
    );
}