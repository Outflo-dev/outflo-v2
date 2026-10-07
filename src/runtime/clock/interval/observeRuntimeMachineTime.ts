/* ==========================================================
   OUTFLO — OBSERVE RUNTIME MACHINE TIME
   File: src/runtime/clock/interval/observeRuntimeMachineTime.ts
   Scope: Capture one server-observed temporal interval around a runtime operation
   Last Updated:
   - date: 2026-10-07
   - note: capture observer provenance at entrance, preserve both raw boundaries, and resolve protected Machine Time
   ========================================================== */

import {
  observePlatformTemporalNow,
} from "../observation/observePlatformTemporalNow";

import {
  observeServerTemporalProvenance,
} from "../provenance/observeServerTemporalProvenance";

import type {
  ServerTemporalProvenance,
} from "../provenance/observeServerTemporalProvenance";

import {
  resolveObservedMachineTime,
} from "./resolveObservedMachineTime";

export type RuntimeMachineTimeObservation<T> = Readonly<{
  value: T;

  provenance:
    ServerTemporalProvenance;

  machineTime:
    ReturnType<
      typeof resolveObservedMachineTime
    >;
}>;

export async function observeRuntimeMachineTime<T>(
  operation: () => Promise<T>,
): Promise<RuntimeMachineTimeObservation<T>> {
  const provenance =
    observeServerTemporalProvenance();

  const firstObservation =
    observePlatformTemporalNow();

  const value =
    await operation();

  const secondObservation =
    observePlatformTemporalNow();

  return {
    value,
    provenance,

    machineTime:
      resolveObservedMachineTime(
        firstObservation,
        secondObservation,
      ),
  };
}
