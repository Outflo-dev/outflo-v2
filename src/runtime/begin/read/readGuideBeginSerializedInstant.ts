import "server-only";

/* ==========================================================
   OUTFLO — READ GUIDE BEGIN
   File: src/runtime/begin/read/readGuideBeginSerializedInstant.ts
   Scope: Read canonical Guide Begin and its identity
   Last Updated:
   - date: 2026-10-09
   - note: expose Begin identity while preserving Instant read
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

export type GuideBeginRecord = {
    beginId: string;
    title: string | null;
    beginInstant: string;
};

export async function readGuideBeginRecord():
    Promise<GuideBeginRecord | null> {
    const supabase =
        await createClient();

    const {
        data,
        error,
    } = await supabase
        .from("guide_begins")
        .select("begin_id,title,begin_instant::text")
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

    return {
        beginId: data.begin_id,
        title: data.title,
        beginInstant:
            serializeTemporalInstant128(
                parseTemporalInstant128(
                    data.begin_instant,
                ),
            ),
    };
}

export async function readGuideBeginSerializedInstant():
    Promise<string | null> {
    const begin =
        await readGuideBeginRecord();

    return begin?.beginInstant ?? null;
}
