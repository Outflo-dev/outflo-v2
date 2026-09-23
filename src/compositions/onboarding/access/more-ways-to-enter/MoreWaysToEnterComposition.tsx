"use client";

import { useRouter } from "next/navigation";

import BackNavigationAction from "@/components/system/primitives/actions/navigation/BackNavigationAction";
import OnboardingPrimaryAction from "@/components/system/primitives/actions/onboarding/OnboardingPrimaryAction";

import MailIcon from "@/components/system/primitives/icons/communication/MailIcon";
import AppleIcon from "@/components/system/primitives/icons/identity/AppleIcon";
import GoogleIcon from "@/components/system/primitives/icons/identity/GoogleIcon";
import OutfloMark from "@/components/system/primitives/marks/outflo/OutfloMark";

import {
    OnboardingPage,
    OnboardingPageAction,
    OnboardingPageBody,
    OnboardingPageIcon,
    OnboardingPageIntro,
} from "@/components/onboarding/page";

import MoreWaysToEnterOption from "@/components/onboarding/access/more-ways-to-enter/MoreWaysToEnterOption";

import {
    ArrowIcon,
} from "@/components/onboarding/OnboardingComponentsIndex";

import styles from "./MoreWaysToEnterComposition.module.css";

export default function MoreWaysToEnterComposition() {
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
            <OnboardingPageIcon
                icon={OutfloMark}
                title={"Outfl\u014d"}
            />

            <div className={styles.intro}>
                <OnboardingPageIntro
                    title="More ways to enter"
                    subtitle={
                        <>
                            Apple and Google sign-in are coming.
                            <br />
                            Email is available now.
                        </>
                    }
                />
            </div>

            <OnboardingPageBody>
                <div className={styles.options}>
                    <MoreWaysToEnterOption
                        icon={<AppleIcon />}
                        name="Apple"
                        detail="Sign in with your Apple account."
                        status="Coming Soon"
                    />

                    <MoreWaysToEnterOption
                        icon={<GoogleIcon />}
                        name="Google"
                        detail="Sign in with your Google account."
                        status="Coming Soon"
                    />

                    <MoreWaysToEnterOption
                        icon={<MailIcon />}
                        name="Email"
                        detail="Create your account with email."
                        status="Available Now"
                        available
                    />
                </div>
            </OnboardingPageBody>

            <OnboardingPageAction>
                <OnboardingPrimaryAction
                    type="button"
                    onClick={() => router.push("/create-account")}
                    trailing={
                        <ArrowIcon
                            direction="right"
                            size={18}
                        />
                    }
                >
                    Continue with email
                </OnboardingPrimaryAction>
            </OnboardingPageAction>
        </OnboardingPage>
    );
}
