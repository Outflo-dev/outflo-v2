import "server-only";

/* ==========================================================
   OUTFLO — OBSERVE AND RECORD RUNTIME MACHINE TIME
   File: src/runtime/clock/persistence/observeAndRecordRuntimeMachineTime.ts
   Scope: Observe one runtime operation and persist its complete Machine-Time record
   Last Updated:
   - date: 2026-10-07
   - note: expose the protected entrance to the observed operation while preserving persistence ownership
   ========================================================== */

import {
  observeRuntimeMachineTime,
} from "../interval/observeRuntimeMachineTime";

import type {
  ObservedMachineTimeEntrance,
} from "../interval/resolveObservedMachineTime";

import {
  recordObservedMachineTime,
} from "./recordObservedMachineTime";

export async function observeAndRecordRuntimeMachineTime<T>(
  operation: (
    entrance: ObservedMachineTimeEntrance,
  ) => Promise<T>,
) {
  const observed =
    await observeRuntimeMachineTime(
      operation,
    );

  const persistence =
    await recordObservedMachineTime(
      observed.machineTime,
      observed.provenance,
    );

  return {
    ...observed,
    persistence,
  };
}
