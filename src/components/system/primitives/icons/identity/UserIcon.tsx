/* ==========================================================
   OUTFLO — USER ICON
   File: src/components/system/primitives/icons/identity/UserIcon.tsx
   Scope: Render the shared paint-neutral person indicator
   Last Updated:
   - date: 2026-07-23
   - note: refine the identity glyph with a compact head and closed shoulder form
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

/* ------------------------------
   Types
-------------------------------- */
type UserIconProps = {
    size?: number;
};

/* ------------------------------
   Component
-------------------------------- */
export default function UserIcon({
    size = 22,
}: UserIconProps) {
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
            <circle
                cx="12"
                cy="6.75"
                r="3.25"
                stroke="currentColor"
                strokeWidth="1.65"
            />

            <path
                d="
                    M4.5 20
                    C4.5 15.85 7.85 12.5 12 12.5
                    C16.15 12.5 19.5 15.85 19.5 20
                    H4.5
                    Z
                "
                stroke="currentColor"
                strokeWidth="1.65"
                strokeLinejoin="miter"
            />
        </svg>
    );
}