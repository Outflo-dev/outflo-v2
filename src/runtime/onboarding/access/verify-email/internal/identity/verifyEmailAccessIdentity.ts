/* ==========================================================
   OUTFLO — VERIFY EMAIL ACCESS IDENTITY
   File: src/runtime/onboarding/access/verify-email/identity/verifyEmailAccessIdentity.ts
   Scope: Verify an email Access identity through Supabase Auth
   Last Updated:
   - date: 2026-08-19
   - note: establish the runtime owner for email verification
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */

import {
    createClient,
} from "@/lib/supabase/client";

/* ------------------------------
   Types
-------------------------------- */

type VerifyEmailAccessIdentityInput = {
    email: string;
    code: string;
};

/* ------------------------------
   Verification
-------------------------------- */

export async function verifyEmailAccessIdentity({
    email,
    code,
}: VerifyEmailAccessIdentityInput) {
    const supabase = createClient();

    return supabase.auth.verifyOtp({
        email,
        token: code,
        type: "email",
    });
}
