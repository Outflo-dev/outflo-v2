import "server-only";

/* ==========================================================
   OUTFLO — READ GUIDE BEGIN SERIALIZED INSTANT
   File: src/runtime/begin/read/readGuideBeginSerializedInstant.ts
   Scope: Read the authenticated Guide's persisted canonical Begin without precision loss
   Last Updated:
   - date: 2026-09-25
   - note: read Guide Begin as exact text from public.guide_begins
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */

import {
    createClient,
} from "@/lib/supabase/server";

import {
    parseTemporalInstant128,
} from "@/machine/clock/serialization/parseTemporalInstant128";

import {
    serializeTemporalInstant128,
} from "@/machine/clock/serialization/serializeTemporalInstant128";

/* ------------------------------
   Read
-------------------------------- */

export async function readGuideBeginSerializedInstant(): Promise<string | null> {
    const supabase =
        await createClient();

    const {
        data,
        error,
    } = await supabase
        .from("guide_begins")
        .select("begin_instant::text")
        .maybeSingle();

    if (error) {
        console.error(
            "readGuideBeginSerializedInstant failed:",
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

    const serialized =
        data?.begin_instant ?? null;

    if (serialized === null) {
        return null;
    }

    return serializeTemporalInstant128(
        parseTemporalInstant128(serialized),
    );
}
