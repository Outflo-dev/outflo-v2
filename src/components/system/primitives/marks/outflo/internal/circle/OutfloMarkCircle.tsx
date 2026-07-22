/* ==========================================================
   OUTFLO — OUTFLO MARK CIRCLE
   File: src/components/system/primitives/marks/outflo/internal/circle/OutfloMarkCircle.tsx
   Scope: Render the canonical circle geometry of the Outflō mark
   Last Updated:
   - date: 2026-07-21
   - note: inherit canonical mark paint from the SVG composition boundary
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import {
    OUTFLO_MARK_CIRCLE,
} from "./outflo-mark-circle.constants";

/* ------------------------------
   Component
-------------------------------- */
export default function OutfloMarkCircle() {
    return (
        <circle
            cx={OUTFLO_MARK_CIRCLE.centerX}
            cy={OUTFLO_MARK_CIRCLE.centerY}
            r={OUTFLO_MARK_CIRCLE.radius}
            fill="none"
            strokeWidth={OUTFLO_MARK_CIRCLE.strokeWidth}
        />
    );
}