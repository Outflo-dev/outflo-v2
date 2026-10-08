import "server-only";

/* ==========================================================
   OUTFLO — WRITE GUIDE BEGIN INSTANT
   File: src/runtime/begin/write/writeGuideBeginInstant.ts
   Scope: Persist one already-resolved canonical Instant as Guide Begin
   Last Updated:
   - date: 2026-10-07
   - note: consume canonical Machine truth without observing Time again
   ========================================================== */

import {
    createTrustedSupabaseClient,
} from "@/lib/supabase/trusted/createTrustedSupabaseClient";

import {
    machine,
} from "@/machine";

import type {
    TemporalInstant128,
} from "@/machine/clock/instant/TemporalInstant128";

export async function writeGuideBeginInstant({
    userId,
    beginInstant,
}: {
    userId: string;
    beginInstant: TemporalInstant128;
}) {
    const serializedBeginInstant =
        machine.clock.serializeTemporalInstant128(
            beginInstant,
        );

    const supabase =
        await createTrustedSupabaseClient();

    const {
        data,
        error,
    } = await supabase
        .from("guide_begins")
        .update({
            begin_instant:
                serializedBeginInstant,
        })
        .eq("user_id", userId)
        .select("begin_instant")
        .maybeSingle();

    if (error) {
        return {
            success: false,
            error: error.message,
        } as const;
    }

    if (!data) {
        return {
            success: false,
            error:
                "Guide Begin does not exist.",
        } as const;
    }

    return {
        success: true,
        beginInstant:
            data.begin_instant,
    } as const;
}
