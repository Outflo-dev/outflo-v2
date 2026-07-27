/* ==========================================================
   OUTFLO — EYE ICON
   File: src/components/system/primitives/icons/security/EyeIcon.tsx
   Scope: Render the reusable canonical visibility icon
   Last Updated:
   - date: 2026-07-26
   - note: establish the square-cut password-visibility icon primitive
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

/* ------------------------------
   Types
-------------------------------- */
type EyeIconProps = {
    size?: number;
    title?: string;
};

/* ------------------------------
   Component
-------------------------------- */
export default function EyeIcon({
    size = 18,
    title,
}: EyeIconProps) {
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
            <path d="M2.5 12C4.7 7.9 8 5.75 12 5.75C16 5.75 19.3 7.9 21.5 12C19.3 16.1 16 18.25 12 18.25C8 18.25 4.7 16.1 2.5 12Z" />

            <circle
                cx="12"
                cy="12"
                r="2.75"
            />
        </svg>
    );
}