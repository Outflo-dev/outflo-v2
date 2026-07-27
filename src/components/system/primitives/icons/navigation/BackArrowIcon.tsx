/* ==========================================================
   OUTFLO — BACK ARROW ICON
   File: src/components/system/primitives/icons/navigation/BackArrowIcon.tsx
   Scope: Render the reusable canonical backward-navigation icon
   Last Updated:
   - date: 2026-07-26
   - note: establish the square-cut navigation arrow primitive
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

/* ------------------------------
   Types
-------------------------------- */
type BackArrowIconProps = {
    size?: number;
    title?: string;
};

/* ------------------------------
   Component
-------------------------------- */
export default function BackArrowIcon({
    size = 24,
    title,
}: BackArrowIconProps) {
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
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="miter"
            aria-hidden={isDecorative}
            aria-label={title}
            role={isDecorative ? undefined : "img"}
            style={style}
        >
            <path d="M10 5L3 12L10 19" />
            <path d="M3 12H21" />
        </svg>
    );
}