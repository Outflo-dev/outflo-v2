"use client";

/* ==========================================================
   OUTFLO — CREATE ACCOUNT FORM
   File: src/app/(onboarding)/create-account/form/CreateAccountForm.tsx
   Scope: Own the Create Account field order and local submission boundary
   Last Updated:
   - date: 2026-07-27
   - note: group identity before security and retain password guidance
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { FormEvent } from "react";
import { useState } from "react";

import TextInputField from "@/components/system/primitives/fields/text/TextInputField";

import MailIcon from "@/components/system/primitives/icons/communication/MailIcon";
import AtIcon from "@/components/system/primitives/icons/identity/AtIcon";
import EyeIcon from "@/components/system/primitives/icons/security/EyeIcon";
import LockIcon from "@/components/system/primitives/icons/security/LockIcon";
import SecurityIcon from "@/components/system/primitives/icons/security/SecurityIcon";
import CheckIcon from "@/components/system/primitives/icons/state/CheckIcon";

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
            <TextInputField
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

            <TextInputField
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

            <TextInputField
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

            <TextInputField
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