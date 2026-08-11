/* ==========================================================
   OUTFLO — SUPABASE BROWSER CLIENT
   File: src/lib/supabase/client.ts
   Scope: Create the browser-owned Supabase client
   Last Updated:
   - date: 2026-08-11
   - note: establish the canonical browser Supabase client
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */

import { createBrowserClient } from "@supabase/ssr";

/* ------------------------------
   Client
-------------------------------- */

export function createClient() {
    return createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    );
}
