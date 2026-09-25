"use server";

import "server-only";

/* ==========================================================
   OUTFLO — CREATE OUTFLO AT ENTER TIME
   File: src/runtime/onboarding/enter-time/creation/createOutfloAtEnterTime.ts
   Scope: Own trusted authenticated Outflō creation at the Enter Time boundary
   Last Updated:
   - date: 2026-09-24
   - note: verify authenticated identity, observe canonical Now once, and atomically create Outflō
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */

import {
    createClient as createAuthenticatedSupabaseClient,
} from "@/lib/supabase/server";

import {
    createOutfloCreationClient,
} from "@/lib/supabase/creation/createOutfloCreationClient";

import {
    serializeTemporalInstant128,
} from "@/machine/clock/serialization/serializeTemporalInstant128";

import {
    readCurrentTemporalInstant128,
} from "@/runtime/clock/now/readCurrentTemporalInstant128";

/* ------------------------------
   Types
-------------------------------- */

type CreateOutfloAtEnterTimeInput = {
    username: string;
    guideBeginSelection:
        | "now"
        | "another-date";
};

export type CreateOutfloAtEnterTimeResult =
    | {
          success: true;
          outfloBeginInstant: string;
      }
    | {
          success: false;
          error: string;
      };

/* ------------------------------
   Creation
-------------------------------- */

export async function createOutfloAtEnterTime({
    username,
    guideBeginSelection,
}: CreateOutfloAtEnterTimeInput): Promise<CreateOutfloAtEnterTimeResult> {
    if (guideBeginSelection !== "now") {
        return {
            success: false,
            error:
                "Another date does not yet have a canonical temporal resolver.",
        };
    }

    const authenticatedSupabase =
        await createAuthenticatedSupabaseClient();

    const {
        data: {
            user,
        },
        error: authenticationError,
    } =
        await authenticatedSupabase.auth.getUser();

    if (authenticationError || !user) {
        return {
            success: false,
            error:
                "Authenticated Guide identity is required.",
        };
    }

    const observedInstant =
        readCurrentTemporalInstant128();

    const serializedInstant =
        serializeTemporalInstant128(
            observedInstant,
        );

    const creationSupabase =
        createOutfloCreationClient();

    const {
        data,
        error,
    } = await creationSupabase.rpc(
        "enter_time",
        {
            p_user_id: user.id,
            p_username: username,
            p_guide_begin_instant:
                serializedInstant,
            p_outflo_begin_instant:
                serializedInstant,
        },
    );

    if (error) {
        return {
            success: false,
            error: error.message,
        };
    }

    if (typeof data !== "string") {
        return {
            success: false,
            error:
                "Outflō creation did not return a canonical Begin.",
        };
    }

    return {
        success: true,
        outfloBeginInstant: data,
    };
}
