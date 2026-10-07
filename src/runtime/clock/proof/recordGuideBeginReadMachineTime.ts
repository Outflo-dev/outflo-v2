import "server-only";

/* ==========================================================
   OUTFLO — RECORD GUIDE BEGIN READ MACHINE TIME
   File: src/runtime/clock/proof/recordGuideBeginReadMachineTime.ts
   Scope: Observe and persist Machine Time around one authenticated Guide Begin read
   Last Updated:
   - date: 2026-10-07
   - note: establish the first repeatable end-to-end Machine-Time persistence witness
   ========================================================== */

import {
  readGuideBeginSerializedInstant,
} from "@/runtime/begin/read/readGuideBeginSerializedInstant";

import {
  observeAndRecordRuntimeMachineTime,
} from "@/runtime/clock/persistence/observeAndRecordRuntimeMachineTime";

export async function recordGuideBeginReadMachineTime() {
  return observeAndRecordRuntimeMachineTime(
    async () =>
      readGuideBeginSerializedInstant(),
  );
}
