/* ==========================================================
   OUTFLO — CREATE EMAIL ACCESS IDENTITY
   File: src/runtime/onboarding/access/create-account/identity/createEmailAccessIdentity.ts
   Scope: Create an email/password Access identity through Supabase Auth
   Last Updated:
   - date: 2026-08-18
   - note: establish the runtime owner for email Create Account identity creation
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

type CreateEmailAccessIdentityInput = {
    email: string;
    password: string;
};

/* ------------------------------
   Creation
-------------------------------- */

export async function createEmailAccessIdentity({
    email,
    password,
}: CreateEmailAccessIdentityInput) {
    const supabase = createClient();

    return supabase.auth.signUp({
        email,
        password,
    });
}
