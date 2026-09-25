/* ==========================================================
   OUTFLO — RESOLVE SIGN IN DESTINATION
   File: src/runtime/onboarding/access/sign-in/destination/resolveSignInDestination.ts
   Scope: Resolve the lawful destination for an authenticated Access identity
   Last Updated:
   - date: 2026-09-25
   - note: route completed Outflō Guides to Time and incomplete identities to onboarding
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

export type SignInDestination =
    | "/guide-name"
    | "/time";

/* ------------------------------
   Resolution
-------------------------------- */

export async function resolveSignInDestination(): Promise<SignInDestination> {
    const supabase =
        createClient();

    const {
        data,
        error,
    } = await supabase
        .from("profiles")
        .select("user_id")
        .maybeSingle();

    if (error) {
        throw new Error(
            [
                error.message,
                error.code,
                error.hint,
                error.details,
            ]
                .filter(Boolean)
                .join(" | "),
        );
    }

    return data === null
        ? "/guide-name"
        : "/time";
}
