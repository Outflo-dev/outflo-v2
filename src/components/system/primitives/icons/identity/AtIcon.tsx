/* ==========================================================
   OUTFLO — AT ICON
   File: src/components/system/primitives/icons/identity/AtIcon.tsx
   Scope: Render the reusable canonical username identity icon
   Last Updated:
   - date: 2026-07-26
   - note: establish the square-cut at-sign identity primitive
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

/* ------------------------------
   Types
-------------------------------- */
type AtIconProps = {
    size?: number;
    title?: string;
};

/* ------------------------------
   Component
-------------------------------- */
export default function AtIcon({
    size = 18,
    title,
}: AtIconProps) {
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
            <circle
                cx="12"
                cy="12"
                r="3.25"
            />

            <path d="M15.25 12V15.25C15.25 16.63 16.37 17.75 17.75 17.75C20.1 17.75 21.5 15.63 21.5 12.25C21.5 7.06 17.57 3.5 12.25 3.5C6.55 3.5 2.5 7.44 2.5 12.75C2.5 17.66 6.18 21 11.25 21C13.53 21 15.45 20.45 17 19.55" />
        </svg>
    );
}