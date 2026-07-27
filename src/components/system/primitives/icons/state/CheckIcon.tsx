/* ==========================================================
   OUTFLO — CHECK ICON
   File: src/components/system/primitives/icons/state/CheckIcon.tsx
   Scope: Render the reusable canonical positive-state icon
   Last Updated:
   - date: 2026-07-27
   - note: establish the shared positive confirmation symbol
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

/* ------------------------------
   Types
-------------------------------- */
type CheckIconProps = {
    size?: number;
    title?: string;
};

/* ------------------------------
   Component
-------------------------------- */
export default function CheckIcon({
    size = 16,
    title,
}: CheckIconProps) {
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
            <path d="M5 12.5L9.5 17L19 7.5" />
        </svg>
    );
}