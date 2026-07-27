/* ==========================================================
   OUTFLO — ARROW ICON
   File: src/components/system/primitives/icons/navigation/ArrowIcon.tsx
   Scope: Render the reusable canonical directional arrow icon
   Last Updated:
   - date: 2026-07-26
   - note: unify backward and forward arrow geometry under one directional primitive
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

/* ------------------------------
   Types
-------------------------------- */
type ArrowIconDirection =
    | "left"
    | "right";

type ArrowIconProps = {
    direction: ArrowIconDirection;
    size?: number;
    title?: string;
};

/* ------------------------------
   Component
-------------------------------- */
export default function ArrowIcon({
    direction,
    size = 24,
    title,
}: ArrowIconProps) {
    const isDecorative = title === undefined;

    const style: CSSProperties = {
        display: "block",

        width: size,
        height: size,

        flexShrink: 0,
    };

    const transform =
        direction === "right"
            ? "translate(24 0) scale(-1 1)"
            : undefined;

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
            <path d="M13.5 5L20.5 12L13.5 19" />
            <path d="M4.5 12H20.5" />
        </svg>
    );
}