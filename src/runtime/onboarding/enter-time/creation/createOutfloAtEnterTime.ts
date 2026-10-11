"use server";

import "server-only";

/* ==========================================================
   OUTFLO — CREATE OUTFLO AT ENTER TIME
   File: src/runtime/onboarding/enter-time/creation/createOutfloAtEnterTime.ts
   Scope: Create Outflō from the protected Machine-Time entrance of Enter Time
   Last Updated:
   - Outflō Time: 847939900040420252267242733671
   - note: bind creation execution identity to persisted observation
   - Outflō Time: 847937961822553110002352219277
   - note: preserve committed creation independently of Proof verification
   - Outflō Time: 847937961822553110002352219277
   - note: construct Enter Time Proof from successful creation
   - Outflō Time: 847937961822553110002352219277
   - note: preserve successful creation observation identity
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

import { randomUUID } from "node:crypto";

import { createEnterTimeProofV1 } from "@/proof/time/createEnterTimeProofV1";
import type { EnterTimeProofV1 } from "@/proof/time/EnterTimeProofV1";

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
          proofOutcome:
              | {
                    status: EnterTimeProofV1["verification"]["verdict"];
                    observationId: string;
                    proof: EnterTimeProofV1;
                }
              | {
                    status: "unavailable";
                    observationId: string | null;
                    error: string;
                };
      }
    | {
          success: false;
          error: string;
      };

/* ------------------------------
   Creation
-------------------------------- */

export async function createOutfloAtEnterTime(): Promise<CreateOutfloAtEnterTimeResult> {
    const creationExecutionId = randomUUID();

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
                        p_creation_execution_id:
                            creationExecutionId,
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
        (value) => value.success ? creationExecutionId : null,
        );

    if (!observed.value.success) {
        return observed.value;
    }

    if (!observed.persistence.success) {
        return {
            ...observed.value,
            proofOutcome: {
                status: "unavailable",
                observationId: null,
                error: observed.persistence.error,
            },
        };
    }

    const observationId = observed.persistence.observationId;

    let proof: EnterTimeProofV1;

    try {
        proof = createEnterTimeProofV1({
            observationId,
            outfloBeginInstant: observed.value.outfloBeginInstant,
            observed: observed.machineTime,
        });
    } catch {
        return {
            ...observed.value,
            proofOutcome: {
                status: "unavailable",
                observationId,
                error: "Enter Time Proof construction failed.",
            },
        };
    }

    return {
        ...observed.value,
        proofOutcome: {
            status: proof.verification.verdict,
            observationId,
            proof,
        },
    };
}
