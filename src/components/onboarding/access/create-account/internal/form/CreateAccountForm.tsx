"use client";

/* ==========================================================
   OUTFLO — CREATE ACCOUNT FORM
   File: src/compositions/onboarding/access/create-account/internal/form/CreateAccountForm.tsx
   Scope: Own the Create Account field order and local submission boundary
   Last Updated:
   - date: 2026-08-18
   - note: submit validated Create Account credentials through the Access runtime owner
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
    SecurityIcon,
} from "@/components/onboarding/OnboardingComponentsIndex";

import {
    useCreateAccountSubmission,
} from "@/runtime/onboarding/access/create-account/CreateAccountRuntimeIndex";

import styles from "./CreateAccountForm.module.css";

/* ------------------------------
   Constants
-------------------------------- */

export const CREATE_ACCOUNT_FORM_ID =
    "create-account-form";

/* ------------------------------
   Component
-------------------------------- */

export default function CreateAccountForm() {
    const [
        isPasswordVisible,
        setIsPasswordVisible,
    ] = useState(false);

    const [
        isConfirmPasswordVisible,
        setIsConfirmPasswordVisible,
    ] = useState(false);

    const {
        submitCreateAccount,
    } = useCreateAccountSubmission();

    async function handleSubmit(
        event: FormEvent<HTMLFormElement>,
    ) {
        event.preventDefault();

        const form = event.currentTarget;
        const formData = new FormData(form);

        const email =
            formData.get("email");

        const password =
            formData.get("password");

        const confirmPassword =
            formData.get("confirmPassword");

        if (
            typeof email !== "string" ||
            typeof password !== "string" ||
            typeof confirmPassword !== "string"
        ) {
            return;
        }

        const confirmPasswordInput =
            form.elements.namedItem(
                "confirmPassword",
            );

        if (
            confirmPasswordInput instanceof
            HTMLInputElement
        ) {
            confirmPasswordInput.setCustomValidity(
                password === confirmPassword
                    ? ""
                    : "Passwords do not match.",
            );

            if (
                password !== confirmPassword
            ) {
                confirmPasswordInput.reportValidity();

                return;
            }
        }

        await submitCreateAccount({
            email,
            password,
        });
    }

    return (
        <form
            id={CREATE_ACCOUNT_FORM_ID}
            className={styles.form}
            onSubmit={handleSubmit}
        >
            <OnboardingTextInputField
                id="create-account-email"
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
                id="create-account-password"
                name="password"
                label="Password"
                type={
                    isPasswordVisible
                        ? "text"
                        : "password"
                }
                autoComplete="new-password"
                minLength={12}
                placeholder="Create a password"
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
                        aria-pressed={
                            isPasswordVisible
                        }
                        onClick={() => {
                            setIsPasswordVisible(
                                (currentValue) =>
                                    !currentValue,
                            );
                        }}
                    >
                        <EyeIcon />
                    </button>
                }
                required
            />

            <OnboardingTextInputField
                id="create-account-confirm-password"
                name="confirmPassword"
                label="Confirm password"
                type={
                    isConfirmPasswordVisible
                        ? "text"
                        : "password"
                }
                autoComplete="new-password"
                minLength={12}
                placeholder="Confirm your password"
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
                            isConfirmPasswordVisible
                                ? "Hide password confirmation"
                                : "Show password confirmation"
                        }
                        aria-pressed={
                            isConfirmPasswordVisible
                        }
                        onClick={() => {
                            setIsConfirmPasswordVisible(
                                (currentValue) =>
                                    !currentValue,
                            );
                        }}
                    >
                        <EyeIcon />
                    </button>
                }
                required
            />

            <div className={styles.passwordRequirement}>
                <SecurityIcon />

                <span>
                    Use 12+ characters. Spaces are allowed.
                    <br />
                    Common or breached passwords will be blocked.
                </span>
            </div>
        </form>
    );
}
