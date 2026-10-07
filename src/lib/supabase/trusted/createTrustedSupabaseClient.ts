import "server-only";

/* ==========================================================
   OUTFLO — TRUSTED SUPABASE CLIENT
   File: src/lib/supabase/trusted/createTrustedSupabaseClient.ts
   Scope: Create the privileged server-only Supabase client for trusted database operations
   Last Updated:
   - date: 2026-10-07
   - note: establish the shared privileged database rail for trusted server runtime operations
   ========================================================== */

import {
    createClient,
} from "@supabase/supabase-js";

export function createTrustedSupabaseClient() {
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
