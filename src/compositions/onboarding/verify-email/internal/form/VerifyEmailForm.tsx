"use client";

/* ==========================================================
   OUTFLO — VERIFY EMAIL FORM
   File: src/compositions/onboarding/verify-email/internal/form/VerifyEmailForm.tsx
   Scope: Own the Verify Email code value and local submission boundary
   Last Updated:
   - date: 2026-08-02
   - note: compose code entry and expiry beneath the Verify Email page
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { FormEvent } from "react";
import { useState } from "react";

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

    function handleSubmit(
        event: FormEvent<HTMLFormElement>,
    ) {
        event.preventDefault();
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