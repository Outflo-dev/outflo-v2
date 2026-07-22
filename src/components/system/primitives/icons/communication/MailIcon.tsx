/* ==========================================================
   OUTFLO — MAIL ICON
   File: src/components/system/primitives/icons/communication/MailIcon.tsx
   Scope: Render the shared paint-neutral email indicator
   Last Updated:
   - date: 2026-07-22
   - note: establish the square-geometry mail mark for authentication actions
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

/* ------------------------------
   Types
-------------------------------- */
type MailIconProps = {
    size?: number;
};

/* ------------------------------
   Component
-------------------------------- */
export default function MailIcon({
    size = 20,
}: MailIconProps) {
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
            <rect
                x="3"
                y="5"
                width="18"
                height="14"
                stroke="currentColor"
                strokeWidth="1.75"
            />

            <path
                d="M4 6L12 13L20 6"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="square"
                strokeLinejoin="miter"
            />
        </svg>
    );
}