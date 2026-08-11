/* ==========================================================
   OUTFLO — SUPABASE SERVER CLIENT
   File: src/lib/supabase/server.ts
   Scope: Create the server-owned Supabase client
   Last Updated:
   - date: 2026-08-11
   - note: establish the canonical server Supabase client
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/* ------------------------------
   Client
-------------------------------- */

export async function createClient() {
    const cookieStore = await cookies();

    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll();
                },

                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(
                            ({ name, value, options }) => {
                                cookieStore.set(name, value, options);
                            },
                        );
                    } catch {
                        // Cookie writes are handled by the request proxy
                        // when this client runs inside a Server Component.
                    }
                },
            },
        },
    );
}
