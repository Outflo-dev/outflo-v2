"use client";

/* ==========================================================
   OUTFLO — VERIFY EMAIL FORM
   File: src/compositions/onboarding/access/verify-email/internal/form/VerifyEmailForm.tsx
   Scope: Own the Verify Email code value and local submission boundary
   Last Updated:
   - date: 2026-08-19
   - note: submit the entered verification code through the Access runtime owner
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

import {
    useVerifyEmailSubmission,
} from "@/runtime/onboarding/access/verify-email/VerifyEmailRuntimeIndex";

import VerifyEmailCodeInput from "../code/VerifyEmailCodeInput";
import VerifyEmailExpiry from "../expiry/VerifyEmailExpiry";

import frameStyles from "./module/style/form.frame.module.css";

/* ------------------------------
   Constants
-------------------------------- */

export const VERIFY_EMAIL_FORM_ID =
    "verify-email-form";

/* ------------------------------
   Component
-------------------------------- */

export default function VerifyEmailForm() {
    const [
        code,
        setCode,
    ] = useState("");

    const {
        submitVerifyEmail,
    } = useVerifyEmailSubmission();

    async function handleSubmit(
        event: FormEvent<HTMLFormElement>,
    ) {
        event.preventDefault();

        await submitVerifyEmail({
            code,
        });
    }

    return (
        <form
            id={VERIFY_EMAIL_FORM_ID}
            className={frameStyles.frame}
            onSubmit={handleSubmit}
        >
            <VerifyEmailCodeInput
                value={code}
                onChange={setCode}
            />

            <VerifyEmailExpiry />
        </form>
    );
}
