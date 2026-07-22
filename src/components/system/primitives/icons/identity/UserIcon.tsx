/* ==========================================================
   OUTFLO — USER ICON
   File: src/components/system/primitives/icons/identity/UserIcon.tsx
   Scope: Render the shared paint-neutral person indicator
   Last Updated:
   - date: 2026-07-22
   - note: establish the identity mark for authentication doorways
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
    size = 20,
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
                cy="7"
                r="4"
                stroke="currentColor"
                strokeWidth="1.75"
            />

            <path
                d="M4 21V18C4 14.6863 6.68629 12 10 12H14C17.3137 12 20 14.6863 20 18V21"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="square"
                strokeLinejoin="miter"
            />
        </svg>
    );
}