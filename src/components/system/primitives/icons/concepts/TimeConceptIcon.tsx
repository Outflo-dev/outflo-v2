/* ==========================================================
   OUTFLO — TIME CONCEPT ICON
   File: src/components/system/primitives/icons/concepts/TimeConceptIcon.tsx
   Scope: Render the reusable canonical Time concept icon
   Last Updated:
   - date: 2026-07-23
   - note: resolve Time as a flat matte icon with fluid continuous hands
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

/* ------------------------------
   Types
-------------------------------- */
type TimeConceptIconProps = {
    size?: number;
    title?: string;
};

/* ------------------------------
   Component
-------------------------------- */
export default function TimeConceptIcon({
    size = 64,
    title,
}: TimeConceptIconProps) {
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
            viewBox="0 0 64 64"
            role={isDecorative ? undefined : "img"}
            aria-hidden={isDecorative}
            aria-label={title}
            focusable="false"
            fill="none"
            style={style}
        >
            <circle
                cx="32"
                cy="32"
                r="20"
                stroke="var(--color-accent-primary)"
                strokeWidth="2"
            />

            <path
                d="
                    M32 22
                    V31.2
                    C32 31.75 32.2 32.1 32.65 32.42
                    L39 37
                "
                stroke="var(--color-accent-primary)"
                strokeWidth="2.25"
                strokeLinecap="square"
                strokeLinejoin="bevel"
            />
        </svg>
    );
}