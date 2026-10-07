import "server-only";

/* ==========================================================
   OUTFLO — OUTFLO CREATION SUPABASE CLIENT
   File: src/lib/supabase/creation/createOutfloCreationClient.ts
   Scope: Provide the trusted Supabase client used for atomic Outflō creation
   Last Updated:
   - date: 2026-10-07
   - note: delegate privileged client construction to the shared trusted database owner
   ========================================================== */

import {
    createTrustedSupabaseClient,
} from "../trusted/createTrustedSupabaseClient";

export function createOutfloCreationClient() {
    return createTrustedSupabaseClient();
}
