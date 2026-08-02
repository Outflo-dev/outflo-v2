"use client";

/* ==========================================================
   OUTFLO — CREATE ACCOUNT FORM
   File: src/compositions/onboarding/create-account/internal/form/CreateAccountForm.tsx
   Scope: Own the Create Account field order and local submission boundary
   Last Updated:
   - date: 2026-07-29
   - note: consume the completed onboarding text-input field owner
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { FormEvent } from "react";
import { useState } from "react";

import OnboardingTextInputField from "@/compositions/onboarding/internal/forms/fields/text/OnboardingTextInputField";

import {
    AtIcon,
    CheckIcon,
    EyeIcon,
    LockIcon,
    MailIcon,
    SecurityIcon,
} from "@/compositions/onboarding/internal/icons";

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

    const [
        username,
        setUsername,
    ] = useState("");

    function handleSubmit(
        event: FormEvent<HTMLFormElement>,
    ) {
        event.preventDefault();
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
                id="create-account-username"
                name="username"
                label="Username"
                type="text"
                autoComplete="username"
                placeholder="Choose a username"
                value={username}
                onChange={(event) => {
                    setUsername(event.target.value);
                }}
                leading={
                    <span className={styles.leadingOpticalLeft}>
                        <AtIcon />
                    </span>
                }
                trailing={
                    username.length > 5 ? (
                        <span className={styles.usernameAvailable}>
                            <CheckIcon size={18} />
                        </span>
                    ) : undefined
                }
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
                        aria-pressed={isPasswordVisible}
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