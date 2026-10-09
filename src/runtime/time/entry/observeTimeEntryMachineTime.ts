import "server-only";

/* ==========================================================
   OUTFLO — OBSERVE TIME ENTRY MACHINE TIME
   File: src/runtime/time/entry/observeTimeEntryMachineTime.ts
   Scope: Observe and persist Machine Time around one authenticated Time entry
   Last Updated:
   - date: 2026-10-09
   - note: return canonical Begin record from observed Time entry
   ========================================================== */

import {
    readGuideBeginRecord,
} from "@/runtime/begin/read/readGuideBeginSerializedInstant";

import {
    observeAndRecordRuntimeMachineTime,
} from "@/runtime/clock/persistence/observeAndRecordRuntimeMachineTime";

export async function observeTimeEntryMachineTime() {
    return observeAndRecordRuntimeMachineTime(
        async () =>
            readGuideBeginRecord(),
    );
}
