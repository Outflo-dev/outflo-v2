/* ==========================================================
   OUTFLO — MAKE YOURS COMPOSITION
   File: src/compositions/onboarding/make-yours/MakeYoursComposition.tsx
   Scope: Compose the complete visible Make Outflō Yours experience
   Last Updated:
   - date: 2026-08-08
   - note: establish the static Step 4 language, theme, and preview surface
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import BackNavigationAction from "@/components/system/primitives/actions/navigation/BackNavigationAction";
import OnboardingPrimaryAction from "@/components/system/primitives/actions/onboarding/OnboardingPrimaryAction";

import {
    ArrowIcon,
} from "@/compositions/onboarding/internal/icons";

import {
    OnboardingPage,
    OnboardingPageAction,
    OnboardingPageBody,
    OnboardingPageIntro,
    OnboardingPageProgress,
} from "@/components/onboarding/page";

import MakeYoursOptions from "@/compositions/onboarding/make-yours/internal/options/MakeYoursOptions";
import MakeYoursPreview from "@/compositions/onboarding/make-yours/internal/preview/MakeYoursPreview";

import styles from "@/compositions/onboarding/make-yours/internal/layout/MakeYoursLayout.module.css";

/* ------------------------------
   Component
-------------------------------- */
export default function MakeYoursComposition() {
    return (
        <OnboardingPage
            navigation={
                <BackNavigationAction
                    href="/guide-name"
                    label="Back to Guide Name"
                />
            }
        >
            <div className={styles.intro}>
                <OnboardingPageIntro
                    title="Make Outflō yours"
                    subtitle={
                        <span className={styles.subtitle}>
                            <span>Set your language</span>
                            <span>and theme.</span>
                        </span>
                    }
                />
            </div>

            <OnboardingPageBody>
                <div className={styles.body}>
                    <MakeYoursOptions />
                    <MakeYoursPreview />
                </div>
            </OnboardingPageBody>

            <div className={styles.action}>
                <OnboardingPageAction>
                    <OnboardingPrimaryAction
                        type="button"
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

            <div className={styles.progress}>
                <OnboardingPageProgress
                    step={4}
                    totalSteps={7}
                />
            </div>
        </OnboardingPage>
    );
}
