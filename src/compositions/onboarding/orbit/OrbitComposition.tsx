"use client";

/* ==========================================================
   OUTFLO — ORBIT COMPOSITION
   File: src/compositions/onboarding/orbit/OrbitComposition.tsx
   Scope: Compose the complete visible Orbit onboarding experience
   Last Updated:
   - date: 2026-08-09
   - note: establish Guide-owned Time Orbit selection as Step 4 of onboarding
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import {
    useState,
} from "react";

import {
    useRouter,
} from "next/navigation";

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

import OrbitInfoAction from "@/compositions/onboarding/orbit/internal/info/OrbitInfoAction";
import OrbitOptions, {
    type OrbitBasis,
} from "@/compositions/onboarding/orbit/internal/options/OrbitOptions";

import styles from "@/compositions/onboarding/orbit/internal/layout/OrbitLayout.module.css";

/* ------------------------------
   Component
-------------------------------- */
export default function OrbitComposition() {
    const router = useRouter();

    const [
        orbitBasis,
        setOrbitBasis,
    ] = useState<OrbitBasis | null>(null);

    return (
        <OnboardingPage
            navigation={
                <BackNavigationAction
                    href="/time-settings"
                    label="Back to Time settings"
                />
            }
        >
            <div className={styles.intro}>
                <OnboardingPageIntro
                    title="Choose your Orbit."
                    subtitle={
                        <span className={styles.subtitle}>
                            How should Time resolve your year?
                        </span>
                    }
                />
            </div>

            <OnboardingPageBody>
                <div className={styles.body}>
                    <OrbitOptions
                        value={orbitBasis}
                        onChange={setOrbitBasis}
                    />

                    <OrbitInfoAction />
                </div>
            </OnboardingPageBody>

            <div className={styles.action}>
                <OnboardingPageAction>
                    <OnboardingPrimaryAction
                        type="button"
                        disabled={orbitBasis === null}
                        onClick={() => router.push("/begin")}
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
                    totalSteps={6}
                />
            </div>
        </OnboardingPage>
    );
}
