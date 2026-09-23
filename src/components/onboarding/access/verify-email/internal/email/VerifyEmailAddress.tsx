"use client";

/* ==========================================================
   OUTFLO — VERIFY EMAIL ADDRESS
   File: src/compositions/onboarding/access/verify-email/internal/email/VerifyEmailAddress.tsx
   Scope: Render the volatile Access verification email
   Last Updated:
   - date: 2026-08-19
   - note: replace the Verify Email placeholder with Access-owned email truth
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */

import {
    useVolatileAccessState,
} from "@/runtime/onboarding/access/state/volatile/VolatileAccessState";

/* ------------------------------
   Component
-------------------------------- */

export default function VerifyEmailAddress() {
    const {
        verificationEmail,
    } = useVolatileAccessState();

    return verificationEmail ?? "";
}
