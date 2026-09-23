"use client";

/* ==========================================================
   OUTFLO — SIGN IN FORM
   File: src/compositions/onboarding/access/sign-in/internal/form/SignInForm.tsx
   Scope: Own the Sign In credential fields and native form boundary
   Last Updated:
   - date: 2026-08-19
   - note: connect credential submission to the Sign In runtime owner
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */

import type {
    FormEvent,
} from "react";

import {
    useState,
} from "react";

import { OnboardingTextInputField } from "@/components/onboarding/OnboardingComponentsIndex";

import {
    EyeIcon,
    LockIcon,
    MailIcon,
} from "@/components/onboarding/OnboardingComponentsIndex";

import {
    useSignInSubmission,
} from "@/runtime/onboarding/access/sign-in/submission/useSignInSubmission";

import styles from "./SignInForm.module.css";

/* ------------------------------
   Constants
-------------------------------- */

export const SIGN_IN_FORM_ID =
    "sign-in-form";

/* ------------------------------
   Component
-------------------------------- */

export default function SignInForm() {
    const [
        isPasswordVisible,
        setIsPasswordVisible,
    ] = useState(false);

    const {
        submitSignIn,
    } = useSignInSubmission();

    async function handleSubmit(
        event: FormEvent<HTMLFormElement>,
    ) {
        event.preventDefault();

        const formData =
            new FormData(event.currentTarget);

        const email =
            String(formData.get("email") ?? "");

        const password =
            String(formData.get("password") ?? "");

        await submitSignIn({
            email,
            password,
        });
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
