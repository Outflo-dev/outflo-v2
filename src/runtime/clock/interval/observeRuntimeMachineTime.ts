/* ==========================================================
   OUTFLO — OBSERVE RUNTIME MACHINE TIME
   File: src/runtime/clock/interval/observeRuntimeMachineTime.ts
   Scope: Capture one server-observed temporal interval around a runtime operation
   Last Updated:
   - date: 2026-10-07
   - note: expose the protected entrance Instant to the observed operation
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
  resolveObservedMachineTimeEntrance,
} from "./resolveObservedMachineTime";

import type {
  ObservedMachineTimeEntrance,
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
  operation: (
    entrance: ObservedMachineTimeEntrance,
  ) => Promise<T>,
): Promise<RuntimeMachineTimeObservation<T>> {
  const provenance =
    observeServerTemporalProvenance();

  const firstObservation =
    observePlatformTemporalNow();

  const entrance =
    resolveObservedMachineTimeEntrance(
      firstObservation,
    );

  const value =
    await operation(
      entrance,
    );

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
