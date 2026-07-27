/* ==========================================================
   OUTFLO — CLOSE ICON
   File: src/components/system/primitives/icons/state/CloseIcon.tsx
   Scope: Render the reusable canonical negative-state icon
   Last Updated:
   - date: 2026-07-27
   - note: establish the shared unavailable or invalid state symbol
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

/* ------------------------------
   Types
-------------------------------- */
type CloseIconProps = {
    size?: number;
    title?: string;
};

/* ------------------------------
   Component
-------------------------------- */
export default function CloseIcon({
    size = 16,
    title,
}: CloseIconProps) {
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
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden={isDecorative}
            aria-label={title}
            role={isDecorative ? undefined : "img"}
            style={style}
        >
            <path d="M7 7L17 17" />
            <path d="M17 7L7 17" />
        </svg>
    );
}