"use server";

/* ==========================================================
   OUTFLO — SUCCESSFUL SIGN IN MACHINE TIME
   Scope: Persist a distinct Machine Time observation for
          each authenticated Sign In execution.
   ========================================================== */

import { randomUUID } from "node:crypto";

import {
    createClient as createAuthenticatedSupabaseClient,
} from "@/lib/supabase/server";

import {
    observeAndRecordRuntimeMachineTime,
} from "@/runtime/clock/persistence/observeAndRecordRuntimeMachineTime";

import {
    resolveSignInDestination,
} from "../destination/resolveSignInDestination";

type SignInDestination = Awaited<
    ReturnType<typeof resolveSignInDestination>
>;

type SuccessfulSignInMachineTimeResult =
    | {
          success: true;
          observationId: string | null;
          proofPersistence: "recorded" | "unavailable";
          destination: SignInDestination;
      }
    | {
          success: false;
          error: string;
      };

export async function recordSuccessfulSignInMachineTime():
    Promise<SuccessfulSignInMachineTimeResult> {

    const signInExecutionId = randomUUID();

    const completedOperation: {
        destination?: SignInDestination;
    } = {};

    try {
        const observed =
            await observeAndRecordRuntimeMachineTime(
                async () => {
                    const supabase =
                        await createAuthenticatedSupabaseClient();

                    const {
                        data: { user },
                        error,
                    } = await supabase.auth.getUser();

                    if (error || !user) {
                        throw new Error(
                            "Authenticated Guide identity is required.",
                        );
                    }

                    const destination =
                        await resolveSignInDestination();

                    completedOperation.destination = destination;

                    return { destination };
                },
                undefined,
                ({ destination }) =>
                    destination === "/time"
                        ? signInExecutionId
                        : null,
            );

        return {
            success: true,
            observationId: observed.persistence.success
                ? observed.persistence.observationId
                : null,
            proofPersistence: observed.persistence.success
                ? "recorded"
                : "unavailable",
            destination: observed.value.destination,
        };

    } catch (error) {
        if (completedOperation.destination) {
            return {
                success: true,
                observationId: null,
                proofPersistence: "unavailable",
                destination: completedOperation.destination,
            };
        }

        return {
            success: false,
            error: error instanceof Error
                ? error.message
                : "Sign In entry failed.",
        };
    }
}
