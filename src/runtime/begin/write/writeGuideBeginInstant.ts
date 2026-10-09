import "server-only";

/* ==========================================================
   OUTFLO — WRITE GUIDE BEGIN INSTANT
   File: src/runtime/begin/write/writeGuideBeginInstant.ts
   Scope: Persist one already-resolved canonical Instant as Guide Begin
   Last Updated:
   - date: 2026-10-09
   - note: require unambiguous Begin identity before updating
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
    const supabase =
        await createTrustedSupabaseClient();

    /*
     * The current Sign In contract supports one Guide Begin.
     *
     * Resolve its identity before writing.
     * Multiple Begins require explicit selection.
     */
    const {
        data: begins,
        error: readError,
    } = await supabase
        .from("guide_begins")
        .select("begin_id")
        .eq("user_id", userId)
        .limit(2);

    if (readError) {
        return {
            success: false,
            error: readError.message,
        } as const;
    }

    if (!begins || begins.length === 0) {
        return {
            success: false,
            error: "Guide Begin does not exist.",
        } as const;
    }

    if (begins.length !== 1) {
        return {
            success: false,
            error: "Explicit Guide Begin selection is required.",
        } as const;
    }

    const serializedBeginInstant =
        machine.clock.serializeTemporalInstant128(
            beginInstant,
        );

    const {
        data,
        error,
    } = await supabase
        .from("guide_begins")
        .update({
            begin_instant:
                serializedBeginInstant,
        })
        .eq("begin_id", begins[0].begin_id)
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
            error: "Guide Begin update failed.",
        } as const;
    }

    return {
        success: true,
        beginInstant:
            data.begin_instant,
    } as const;
}
