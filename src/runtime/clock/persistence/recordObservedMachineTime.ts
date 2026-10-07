import "server-only";

/* ==========================================================
   OUTFLO — RECORD OBSERVED MACHINE TIME
   File: src/runtime/clock/persistence/recordObservedMachineTime.ts
   Scope: Persist one authenticated observed Machine-Time derivation through the trusted database boundary
   Last Updated:
   - date: 2026-10-07
   - note: preserve raw evidence, protected millisecond derivation, canonical Instants, and the resulting Outflō duration
   ========================================================== */

import {
    createClient as createAuthenticatedSupabaseClient,
} from "@/lib/supabase/server";

import {
    createTrustedSupabaseClient,
} from "@/lib/supabase/trusted/createTrustedSupabaseClient";

import {
    machine,
} from "@/machine";

import type {
    ObservedMachineTime,
} from "@/runtime/clock/interval/resolveObservedMachineTime";

import type {
    ServerTemporalProvenance,
} from "@/runtime/clock/provenance/observeServerTemporalProvenance";

const MACHINE_TIME_OBSERVATION_METHOD =
    "platform-unix-millisecond-protected-v1";

const MACHINE_TIME_CLOCK_DEFINITION =
    "outflo-clock-definition-v1";

export type RecordObservedMachineTimeResult =
    | {
          success: true;
          observationId: string;
      }
    | {
          success: false;
          error: string;
      };

function toSafeJsonInteger(
    value: bigint,
    label: string,
): number {
    const resolved =
        Number(value);

    if (!Number.isSafeInteger(resolved)) {
        throw new RangeError(
            `${label} exceeds the safe runtime integer domain.`,
        );
    }

    return resolved;
}

export async function recordObservedMachineTime(
    observedMachineTime: ObservedMachineTime,
    provenance: ServerTemporalProvenance,
): Promise<RecordObservedMachineTimeResult> {
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

    let firstWallUnixMilliseconds: number;
    let secondWallUnixMilliseconds: number;
    let rawSpanMilliseconds: number;
    let observationPrecisionMilliseconds: number;
    let protectedFirstUnixMilliseconds: number;
    let protectedSecondUnixMilliseconds: number;
    let protectedSpanMilliseconds: number;

    try {
        firstWallUnixMilliseconds =
            toSafeJsonInteger(
                observedMachineTime
                    .firstObservation
                    .wallUnixMilliseconds,
                "First observed Unix milliseconds",
            );

        secondWallUnixMilliseconds =
            toSafeJsonInteger(
                observedMachineTime
                    .secondObservation
                    .wallUnixMilliseconds,
                "Second observed Unix milliseconds",
            );

        rawSpanMilliseconds =
            toSafeJsonInteger(
                observedMachineTime
                    .rawSpanMilliseconds,
                "Raw observed span milliseconds",
            );

        observationPrecisionMilliseconds =
            toSafeJsonInteger(
                observedMachineTime
                    .observationPrecisionMilliseconds,
                "Observation precision milliseconds",
            );

        protectedFirstUnixMilliseconds =
            toSafeJsonInteger(
                observedMachineTime
                    .protectedFirstUnixMilliseconds,
                "Protected first Unix milliseconds",
            );

        protectedSecondUnixMilliseconds =
            toSafeJsonInteger(
                observedMachineTime
                    .protectedSecondUnixMilliseconds,
                "Protected second Unix milliseconds",
            );

        protectedSpanMilliseconds =
            toSafeJsonInteger(
                observedMachineTime
                    .protectedSpanMilliseconds,
                "Protected span milliseconds",
            );
    } catch (error) {
        return {
            success: false,
            error:
                error instanceof Error
                    ? error.message
                    : "Machine-Time millisecond serialization failed.",
        };
    }

    const trustedSupabase =
        createTrustedSupabaseClient();

    const {
        data,
        error,
    } = await trustedSupabase.rpc(
        "record_machine_time_observation",
        {
            p_user_id:
                user.id,

            p_first_wall_unix_milliseconds:
                firstWallUnixMilliseconds,

            p_first_monotonic_milliseconds:
                observedMachineTime
                    .firstObservation
                    .monotonicMilliseconds
                    .toString(),

            p_second_wall_unix_milliseconds:
                secondWallUnixMilliseconds,

            p_second_monotonic_milliseconds:
                observedMachineTime
                    .secondObservation
                    .monotonicMilliseconds
                    .toString(),

            p_raw_span_milliseconds:
                rawSpanMilliseconds,

            p_observation_precision_milliseconds:
                observationPrecisionMilliseconds,

            p_protected_first_unix_milliseconds:
                protectedFirstUnixMilliseconds,

            p_protected_second_unix_milliseconds:
                protectedSecondUnixMilliseconds,

            p_protected_span_milliseconds:
                protectedSpanMilliseconds,

            p_first_instant:
                machine.clock.serializeTemporalInstant128(
                    observedMachineTime.firstInstant,
                ),

            p_second_instant:
                machine.clock.serializeTemporalInstant128(
                    observedMachineTime.secondInstant,
                ),

            p_duration:
                machine.clock.serializeTemporalDuration128(
                    observedMachineTime.duration,
                ),

            p_observation_method:
                MACHINE_TIME_OBSERVATION_METHOD,

            p_clock_definition:
                MACHINE_TIME_CLOCK_DEFINITION,

            p_provenance_snapshot:
                provenance,
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
                "Machine-Time persistence did not return an observation identity.",
        };
    }

    return {
        success: true,
        observationId: data,
    };
}
