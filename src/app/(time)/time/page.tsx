/* ==========================================================
   OUTFLO — TIME ROUTE
   File: src/app/(time)/time/page.tsx
   Scope: Expose Time from persisted canonical Guide Begin truth
   Last Updated:
   - date: 2026-09-25
   - note: read canonical Guide Begin and pass exact serialization into Time
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */

import TimeComposition from "@/compositions/time/TimeComposition";

import {
    readGuideBeginSerializedInstant,
} from "@/runtime/begin/read/readGuideBeginSerializedInstant";

/* ------------------------------
   Route
-------------------------------- */

export default async function TimePage() {
    const beginInstant =
        await readGuideBeginSerializedInstant();

    return (
        <TimeComposition
            beginInstant={beginInstant}
        />
    );
}
