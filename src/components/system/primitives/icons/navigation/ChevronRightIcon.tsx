/* ==========================================================
   OUTFLO — CHEVRON RIGHT ICON
   File: src/components/system/primitives/icons/navigation/ChevronRightIcon.tsx
   Scope: Render the shared rightward navigation indicator
   Last Updated:
   - date: 2026-07-22
   - note: establish a paint-neutral square-cap chevron for action doorways
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

/* ------------------------------
   Types
-------------------------------- */
type ChevronRightIconProps = {
    size?: number;
};

/* ------------------------------
   Component
-------------------------------- */
export default function ChevronRightIcon({
    size = 18,
}: ChevronRightIconProps) {
    const style: CSSProperties = {
        display: "block",
        width: size,
        height: size,
    };

    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            style={style}
        >
            <path
                d="M8 4L16 12L8 20"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="square"
                strokeLinejoin="miter"
            />
        </svg>
    );
}