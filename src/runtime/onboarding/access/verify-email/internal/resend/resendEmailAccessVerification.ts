/* ==========================================================
   OUTFLO — RESEND EMAIL ACCESS VERIFICATION
   File: src/runtime/onboarding/access/verify-email/resend/resendEmailAccessVerification.ts
   Scope: Resend an email Access signup verification through Supabase Auth
   Last Updated:
   - date: 2026-08-19
   - note: establish the runtime owner for resending email verification
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

type ResendEmailAccessVerificationInput = {
    email: string;
};

/* ------------------------------
   Resend
-------------------------------- */

export async function resendEmailAccessVerification({
    email,
}: ResendEmailAccessVerificationInput) {
    const supabase = createClient();

    return supabase.auth.resend({
        type: "signup",
        email,
    });
}
