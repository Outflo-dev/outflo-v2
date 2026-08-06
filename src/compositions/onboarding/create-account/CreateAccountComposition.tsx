"use client";

/* ==========================================================
   OUTFLO — CREATE ACCOUNT COMPOSITION
   File: src/compositions/onboarding/create-account/CreateAccountComposition.tsx
   Scope: Compose the complete visible Create Account experience
   Last Updated:
   - date: 2026-08-05
   - note: route the temporary Create Account Continue action directly to Verify Email
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import { useRouter } from "next/navigation";

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
} from "../internal/icons";

import CreateAccountForm from "./internal/form/CreateAccountForm";
import CreateAccountSignInPrompt from "./internal/signin/CreateAccountSignInPrompt";

/* ------------------------------
   Component
-------------------------------- */
export default function CreateAccountComposition() {
    const router = useRouter();

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
                    type="button"
                    onClick={() => {
                        router.push("/verify-email");
                    }}
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