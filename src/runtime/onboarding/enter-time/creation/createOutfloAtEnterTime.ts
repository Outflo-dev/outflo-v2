"use server";

import "server-only";

/* ==========================================================
   OUTFLO — CREATE OUTFLO AT ENTER TIME
   File: src/runtime/onboarding/enter-time/creation/createOutfloAtEnterTime.ts
   Scope: Own trusted authenticated Outflō creation at the Enter Time boundary
   Last Updated:
   - Outflō Time: 847627357828824664966983192303
   - note: remove Guide Name dependency from trusted Outflō creation
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

export async function createOutfloAtEnterTime(): Promise<CreateOutfloAtEnterTimeResult> {
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
