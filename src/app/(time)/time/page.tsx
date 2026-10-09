/* ==========================================================
   OUTFLO — TIME ROUTE
   File: src/app/(time)/time/page.tsx
   Scope: Observe TIME entry and supply immutable Outflō Begin
   Last Updated:
   - date: 2026-10-09
   - note: anchor TIME entrance to immutable Outflō Begin
   ========================================================== */

import TimeComposition from "@/compositions/time/TimeComposition";

import {
    observeTimeEntryMachineTime,
} from "@/runtime/time/entry/observeTimeEntryMachineTime";

import {
    readOutfloBeginInstant,
} from "@/runtime/begin/read/readOutfloBeginInstant";

export default async function TimePage() {
    const observed =
        await observeTimeEntryMachineTime();

    if (!observed.persistence.success) {
        throw new Error(
            observed.persistence.error,
        );
    }

    const outfloBeginInstant =
        await readOutfloBeginInstant();

    return (
        <TimeComposition
            beginInstant={outfloBeginInstant}
        />
    );
}
