import "server-only";

/* ==========================================================
   OUTFLO — READ OUTFLO BEGIN INSTANT
   File: src/runtime/begin/read/readOutfloBeginInstant.ts
   Scope: Read the authenticated Guide's immutable Outflō Begin
   Last Updated:
   - date: 2026-10-09
   - note: establish the canonical Outflō Begin read for TIME
   ========================================================== */

import {
    createClient,
} from "@/lib/supabase/server";

import {
    parseTemporalInstant128,
} from "@/machine/clock/serialization/parseTemporalInstant128";

import {
    serializeTemporalInstant128,
} from "@/machine/clock/serialization/serializeTemporalInstant128";

export async function readOutfloBeginInstant():
    Promise<string | null> {
    const supabase =
        await createClient();

    const {
        data: { user },
        error: authenticationError,
    } = await supabase.auth.getUser();

    if (authenticationError || !user) {
        throw new Error(
            "Authenticated Guide identity is required to read Outflō Begin.",
        );
    }

    const {
        data,
        error,
    } = await supabase
        .from("profiles")
        .select("outflo_begin_instant")
        .eq("user_id", user.id)
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

    if (!data) {
        return null;
    }

    if (data.outflo_begin_instant === null) {
        return null;
    }

    return serializeTemporalInstant128(
        parseTemporalInstant128(
            data.outflo_begin_instant,
        ),
    );
}
