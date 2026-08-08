/* ==========================================================
   OUTFLO — READY ROUTE
   File: src/app/(onboarding)/ready/page.tsx
   Scope: Expose the final onboarding completion surface
   Last Updated:
   - date: 2026-08-08
   - note: route Step 7 onboarding into the Ready composition
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import {
    ReadyComposition,
} from "@/compositions/onboarding";

/* ------------------------------
   Route
-------------------------------- */
export default function ReadyPage() {
    return <ReadyComposition />;
}
