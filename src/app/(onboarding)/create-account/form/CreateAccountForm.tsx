"use client";

/* ==========================================================
   OUTFLO — CREATE ACCOUNT FORM
   File: src/app/(onboarding)/create-account/form/CreateAccountForm.tsx
   Scope: Own the Create Account field order and local submission boundary
   Last Updated:
   - date: 2026-07-26
   - note: remove page, card, and action ownership from the local account form
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { FormEvent } from "react";

import TextInputField from "@/components/system/primitives/fields/text/TextInputField";

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
                required
            />

            <TextInputField
                id="create-account-password"
                name="password"
                label="Password"
                type="password"
                autoComplete="new-password"
                placeholder="Create a password"
                required
            />

            <TextInputField
                id="create-account-confirm-password"
                name="confirmPassword"
                label="Confirm password"
                type="password"
                autoComplete="new-password"
                placeholder="Enter it again"
                required
            />

            <TextInputField
                id="create-account-username"
                name="username"
                label="Username"
                type="text"
                autoComplete="username"
                placeholder="Choose a username"
                required
            />

            <TextInputField
                id="create-account-name"
                name="name"
                label="Name (optional)"
                type="text"
                autoComplete="name"
                placeholder="Your name"
            />

        </form>
    );
}
