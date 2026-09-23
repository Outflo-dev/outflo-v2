/* ==========================================================
   OUTFLO — SIGN IN EMAIL ACCESS IDENTITY
   File: src/runtime/onboarding/access/sign-in/identity/signInEmailAccessIdentity.ts
   Scope: Authenticate an existing email/password Access identity
   Last Updated:
   - date: 2026-08-19
   - note: establish the runtime owner for email/password Sign In
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

type SignInEmailAccessIdentityInput = {
    email: string;
    password: string;
};

/* ------------------------------
   Authentication
-------------------------------- */

export async function signInEmailAccessIdentity({
    email,
    password,
}: SignInEmailAccessIdentityInput) {
    const supabase = createClient();

    return supabase.auth.signInWithPassword({
        email,
        password,
    });
}
