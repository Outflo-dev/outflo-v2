/* ==========================================================
   OUTFLO — OUTFLO MARK MACRON
   File: src/components/system/primitives/marks/outflo/OutfloMarkMacron.tsx
   Scope: Render the canonical macron element of the Outflō mark
   Last Updated:
   - date: 2026-07-17
   - note: establish the initial coded macron element
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import {
    OUTFLO_MARK_MACRON,
} from "./outflo-mark-macron.constants";

/* ------------------------------
   Component
-------------------------------- */
export default function OutfloMarkMacron() {
    return (
        <line
            x1={OUTFLO_MARK_MACRON.startX}
            x2={OUTFLO_MARK_MACRON.endX}
            y1={OUTFLO_MARK_MACRON.y}
            y2={OUTFLO_MARK_MACRON.y}
            stroke="currentColor"
            strokeWidth={OUTFLO_MARK_MACRON.strokeWidth}
            strokeLinecap={OUTFLO_MARK_MACRON.strokeLinecap}
        />
    );
}
