/* ==========================================================
   OUTFLO — OUTFLO MARK CIRCLE
   File: src/components/system/primitives/marks/outflo/internal/circle/OutfloMarkCircle.tsx
   Scope: Render the canonical circle element of the Outflō mark
   Last Updated:
   - date: 2026-07-20
   - note: restore paint neutrality inside the circle ownership boundary
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
            stroke="currentColor"
            strokeWidth={OUTFLO_MARK_CIRCLE.strokeWidth}
        />
    );
}