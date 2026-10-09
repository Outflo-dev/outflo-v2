/* ==========================================================
   OUTFLO — TIME ROUTE
   File: src/app/(time)/time/page.tsx
   Scope: Enter Time through one observed canonical Guide Begin read
   Last Updated:
   - date: 2026-10-09
   - note: pass observed Guide Begin identity to Time composition
   ========================================================== */

import TimeComposition from "@/compositions/time/TimeComposition";

import {
    observeTimeEntryMachineTime,
} from "@/runtime/time/entry/observeTimeEntryMachineTime";

export default async function TimePage() {
    const observed =
        await observeTimeEntryMachineTime();

    if (!observed.persistence.success) {
        throw new Error(
            observed.persistence.error,
        );
    }

    return (
        <TimeComposition
            beginInstant={
                observed.value?.beginInstant ?? null
            }
        />
    );
}
