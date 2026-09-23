/* ==========================================================
   OUTFLO — TIME ROUTE
   File: src/app/(time)/time/page.tsx
   Scope: Expose Begin Home from persisted Guide Begin truth
   Last Updated:
   - date: 2026-08-19
   - note: read the authenticated Guide's persisted Begin and pass it into the live Begin surface
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */

import TimeComposition from "@/compositions/time/TimeComposition";

import {
    readGuideBeginUnixMs,
} from "@/runtime/begin/read/readGuideBeginUnixMs";

/* ------------------------------
   Route
-------------------------------- */

export default async function TimePage() {
    const beginUnixMs =
        await readGuideBeginUnixMs();

    return (
        <TimeComposition
            beginUnixMs={beginUnixMs}
        />
    );
}
