/* ==========================================================
   OUTFLO — VERIFY EMAIL COMPOSITION
   File: src/compositions/onboarding/access/verify-email/VerifyEmailComposition.tsx
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
    VerifyEmailAddress,
    VerifyEmailForm,
    VERIFY_EMAIL_FORM_ID,
    VerifyEmailIcon,
    VerifyEmailResendPrompt,
} from "@/components/onboarding/access/verify-email/VerifyEmailComponentsIndex";

import introStyles from "./internal/intro/VerifyEmailIntro.module.css";
import contentPlacementStyles from "./internal/layout/VerifyEmailContentPlacement.module.css";
import actionPlacementStyles from "./internal/action/VerifyEmailActionPlacement.module.css";

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
            progress={
                <OnboardingPageProgress
                    step={2}
                    totalSteps={2}
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
                                    <VerifyEmailAddress />
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

            </div>
        </OnboardingPage>
    );
}
