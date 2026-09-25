import "server-only";

/* ==========================================================
   OUTFLO — OUTFLO CREATION SUPABASE CLIENT
   File: src/lib/supabase/creation/createOutfloCreationClient.ts
   Scope: Create the privileged server-only Supabase client for atomic Outflō creation
   Last Updated:
   - date: 2026-09-24
   - note: establish the narrow privileged database rail used only by trusted Outflō creation
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */

import {
    createClient,
} from "@supabase/supabase-js";

/* ------------------------------
   Client
-------------------------------- */

export function createOutfloCreationClient() {
    const supabaseUrl =
        process.env.NEXT_PUBLIC_SUPABASE_URL;

    const supabaseSecretKey =
        process.env.SUPABASE_SECRET_KEY;

    if (!supabaseUrl) {
        throw new Error(
            "NEXT_PUBLIC_SUPABASE_URL is not configured.",
        );
    }

    if (!supabaseSecretKey) {
        throw new Error(
            "SUPABASE_SECRET_KEY is not configured.",
        );
    }

    return createClient(
        supabaseUrl,
        supabaseSecretKey,
        {
            auth: {
                persistSession: false,
                autoRefreshToken: false,
                detectSessionInUrl: false,
            },
        },
    );
}
