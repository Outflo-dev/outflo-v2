"use server";

/* ==========================================================
   OUTFLO — RECORD SUCCESSFUL SIGN IN MACHINE TIME
   File: src/runtime/onboarding/access/sign-in/observation/recordSuccessfulSignInMachineTime.ts
   Scope: Observe and persist the authenticated server-entry interval for one successful Sign In
   Last Updated:
   - date: 2026-10-07
   - note: begin server Machine-Time observation immediately after client authentication succeeds
   ========================================================== */

import {
    createClient as createAuthenticatedSupabaseClient,
} from "@/lib/supabase/server";

import {
    observeAndRecordRuntimeMachineTime,
} from "@/runtime/clock/persistence/observeAndRecordRuntimeMachineTime";

import {
    resolveSignInDestination,
} from "../destination/resolveSignInDestination";

type SuccessfulSignInMachineTimeResult =
    | {
          success: true;
          observationId: string;
          destination: Awaited<
              ReturnType<
                  typeof resolveSignInDestination
              >
          >;
      }
    | {
          success: false;
          error: string;
      };

export async function recordSuccessfulSignInMachineTime():
    Promise<SuccessfulSignInMachineTimeResult> {
    try {
        const observed =
            await observeAndRecordRuntimeMachineTime(
                async () => {
                    const supabase =
                        await createAuthenticatedSupabaseClient();

                    const {
                        data: {
                            user,
                        },
                        error,
                    } =
                        await supabase.auth.getUser();

                    if (error || !user) {
                        throw new Error(
                            "Authenticated Guide identity is required for Sign In observation.",
                        );
                    }

                    return resolveSignInDestination();
                },
            );

        if (!observed.persistence.success) {
            return {
                success: false,
                error:
                    observed.persistence.error,
            };
        }

        return {
            success: true,
            observationId:
                observed.persistence.observationId,
            destination:
                observed.value,
        };
    } catch (error) {
        return {
            success: false,
            error:
                error instanceof Error
                    ? error.message
                    : "Successful Sign In Machine-Time observation failed.",
        };
    }
}
