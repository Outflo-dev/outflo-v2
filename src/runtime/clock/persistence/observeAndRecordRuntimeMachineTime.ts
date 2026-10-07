import "server-only";

/* ==========================================================
   OUTFLO — OBSERVE AND RECORD RUNTIME MACHINE TIME
   File: src/runtime/clock/persistence/observeAndRecordRuntimeMachineTime.ts
   Scope: Observe one runtime operation and persist its complete Machine-Time record
   Last Updated:
   - date: 2026-10-07
   - note: persist the entrance-captured provenance snapshot with the observed interval
   ========================================================== */

import {
  observeRuntimeMachineTime,
} from "../interval/observeRuntimeMachineTime";

import {
  recordObservedMachineTime,
} from "./recordObservedMachineTime";

export async function observeAndRecordRuntimeMachineTime<T>(
  operation: () => Promise<T>,
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
