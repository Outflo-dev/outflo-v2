"use client";

/* ==========================================================
   OUTFLO — SIGN IN FORM
   File: src/compositions/onboarding/sign-in/internal/form/SignInForm.tsx
   Scope: Own the Sign In credential fields and temporary submission boundary
   Last Updated:
   - date: 2026-08-09
   - note: establish Email and Password access fields before authentication wiring
   ========================================================== */

import type {
    FormEvent,
} from "react";

import {
    useState,
} from "react";

import {
    useRouter,
} from "next/navigation";

import OnboardingTextInputField from "@/compositions/onboarding/internal/forms/fields/text/OnboardingTextInputField";

import {
    EyeIcon,
    LockIcon,
    MailIcon,
} from "@/compositions/onboarding/internal/icons";

import styles from "./SignInForm.module.css";

export const SIGN_IN_FORM_ID =
    "sign-in-form";

export default function SignInForm() {
    const router = useRouter();

    const [
        isPasswordVisible,
        setIsPasswordVisible,
    ] = useState(false);

    function handleSubmit(
        event: FormEvent<HTMLFormElement>,
    ) {
        event.preventDefault();

        router.push("/time");
    }

    return (
        <form
            id={SIGN_IN_FORM_ID}
            className={styles.form}
            onSubmit={handleSubmit}
        >
            <OnboardingTextInputField
                id="sign-in-email"
                name="email"
                label="Email"
                type="email"
                autoComplete="email"
                inputMode="email"
                placeholder="you@example.com"
                leading={<MailIcon />}
                required
            />

            <OnboardingTextInputField
                id="sign-in-password"
                name="password"
                label="Password"
                type={
                    isPasswordVisible
                        ? "text"
                        : "password"
                }
                autoComplete="current-password"
                placeholder="Enter your password"
                leading={
                    <span className={styles.leadingOpticalLeft}>
                        <LockIcon />
                    </span>
                }
                trailing={
                    <button
                        type="button"
                        className={styles.visibilityAction}
                        aria-label={
                            isPasswordVisible
                                ? "Hide password"
                                : "Show password"
                        }
                        aria-pressed={isPasswordVisible}
                        onClick={() => {
                            setIsPasswordVisible(
                                (current) => !current,
                            );
                        }}
                    >
                        <EyeIcon />
                    </button>
                }
                required
            />
        </form>
    );
}
