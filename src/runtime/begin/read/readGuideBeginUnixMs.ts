import "server-only";

/* ==========================================================
   OUTFLO — READ GUIDE BEGIN UNIX MS
   File: src/runtime/begin/read/readGuideBeginUnixMs.ts
   Scope: Read the authenticated Guide's persisted Guide Begin
   Last Updated:
   - date: 2026-08-19
   - note: expose canonical Guide Begin from public.guide_time without projection or fallback
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */

import {
    createClient,
} from "@/lib/supabase/server";

/* ------------------------------
   Read
-------------------------------- */

export async function readGuideBeginUnixMs(): Promise<number | null> {
    const supabase =
        await createClient();

    const {
        data,
        error,
    } = await supabase
        .from("guide_time")
        .select("begin_ms")
        .maybeSingle();

    if (error) {
        console.error(
            "readGuideBeginUnixMs failed:",
            error,
        );

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

    return data?.begin_ms ?? null;
}
