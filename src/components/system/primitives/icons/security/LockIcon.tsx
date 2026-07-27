/* ==========================================================
   OUTFLO — LOCK ICON
   File: src/components/system/primitives/icons/security/LockIcon.tsx
   Scope: Render the reusable canonical security-lock icon
   Last Updated:
   - date: 2026-07-26
   - note: establish the square-cut password-field identity icon
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

/* ------------------------------
   Types
-------------------------------- */
type LockIconProps = {
    size?: number;
    title?: string;
};

/* ------------------------------
   Component
-------------------------------- */
export default function LockIcon({
    size = 18,
    title,
}: LockIconProps) {
    const isDecorative = title === undefined;

    const style: CSSProperties = {
        display: "block",

        width: size,
        height: size,

        flexShrink: 0,
    };

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={size}
            height={size}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="square"
            strokeLinejoin="miter"
            aria-hidden={isDecorative}
            aria-label={title}
            role={isDecorative ? undefined : "img"}
            style={style}
        >
            <path d="M7 10V7.5C7 4.46 9.24 2 12 2C14.76 2 17 4.46 17 7.5V10" />
            <rect
                x="5"
                y="10"
                width="14"
                height="11"
                rx="1"
            />
            <path d="M12 14V17" />
        </svg>
    );
}