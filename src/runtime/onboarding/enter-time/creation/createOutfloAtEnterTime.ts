"use server";

import "server-only";

/* ==========================================================
   OUTFLO — CREATE OUTFLO AT ENTER TIME
   File: src/runtime/onboarding/enter-time/creation/createOutfloAtEnterTime.ts
   Scope: Create Outflō from the protected Machine-Time entrance of Enter Time
   Last Updated:
   - date: 2026-10-07
   - note: anchor Guide Begin and Outflō Begin to the observed Enter Time entrance
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
    machine,
} from "@/machine";

import {
    observeAndRecordRuntimeMachineTime,
} from "@/runtime/clock/persistence/observeAndRecordRuntimeMachineTime";

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
    const observed =
        await observeAndRecordRuntimeMachineTime(
            async (entrance) => {
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
                    } as const;
                }

                const serializedBeginInstant =
                    machine.clock.serializeTemporalInstant128(
                        entrance.firstInstant,
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
                            serializedBeginInstant,
                        p_outflo_begin_instant:
                            serializedBeginInstant,
                    },
                );

                if (error) {
                    return {
                        success: false,
                        error: error.message,
                    } as const;
                }

                if (typeof data !== "string") {
                    return {
                        success: false,
                        error:
                            "Outflō creation did not return a canonical Begin.",
                    } as const;
                }

                return {
                    success: true,
                    outfloBeginInstant: data,
                } as const;
            },
        );

    if (!observed.value.success) {
        return observed.value;
    }

    if (!observed.persistence.success) {
        return {
            success: false,
            error:
                observed.persistence.error,
        };
    }

    return observed.value;
}
