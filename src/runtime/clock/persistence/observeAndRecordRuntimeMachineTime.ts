import "server-only";

/* ==========================================================
   OUTFLO — OBSERVE AND RECORD RUNTIME MACHINE TIME
   File: src/runtime/clock/persistence/observeAndRecordRuntimeMachineTime.ts
   Scope: Observe one runtime operation and persist its complete Machine-Time record
   Last Updated:
   - Outflō Time: 847937961822553110002352219277
   - note: forward creation identity only from the completed operation result
   - Outflō Time: 847937961822553110002352219277
   - note: preserve operation result when persistence throws
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
  creationExecutionIdForResult?: (value: T) => string | null,
  signInExecutionIdForResult?: (value: T) => string | null,
) {
  const observed =
    await observeRuntimeMachineTime(
      operation,
    );

  let persistence: Awaited<ReturnType<typeof recordObservedMachineTime>>;

  try {
    persistence = await recordObservedMachineTime(
      observed.machineTime,
      observed.provenance,
      creationExecutionIdForResult?.(observed.value) ?? null,
      signInExecutionIdForResult?.(observed.value) ?? null,
    );
  } catch (error) {
    persistence = {
      success: false,
      error: error instanceof Error
        ? error.message
        : "Machine-Time persistence failed unexpectedly.",
    };
  }

  return {
    ...observed,
    persistence,
  };
}
