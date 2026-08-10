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
import introStyles from "./internal/intro/VerifyEmailIntro.module.css";
import progressPlacementStyles from "./internal/progress/VerifyEmailProgressPlacement.module.css";
import contentPlacementStyles from "./internal/layout/VerifyEmailContentPlacement.module.css";
import actionPlacementStyles from "./internal/action/VerifyEmailActionPlacement.module.css";

import {
    ArrowIcon,
} from "../internal/icons";

import {
    OnboardingPage,
    OnboardingPageAction,
    OnboardingPageBody,
    OnboardingPageIntro,
    OnboardingPageProgress,
} from "@/components/onboarding/page";

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
            <div className={contentPlacementStyles.frame}>
                <VerifyEmailIcon />

                <div className={introStyles.frame}>
                    <OnboardingPageIntro
                        title="Check your email"
                        subtitle={
                            <>
                                <span className={introStyles.support}>
                                    We sent a 6-digit code to
                                </span>

                                <span className={introStyles.email}>
                                    you@example.com
                                </span>
                            </>
                        }
                    />
                </div>

                <OnboardingPageBody>
                    <VerifyEmailForm />
                </OnboardingPageBody>

                <div className={actionPlacementStyles.frame}>
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
                </div>

                <VerifyEmailResendPrompt />

                <div className={progressPlacementStyles.frame}>
                    <OnboardingPageProgress
                        step={2}
                        totalSteps={2}
                    />
                </div>

            </div>
        </OnboardingPage>
    );
}