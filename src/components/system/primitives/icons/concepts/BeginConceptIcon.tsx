/* ==========================================================
   OUTFLO — BEGIN CONCEPT ICON
   File: src/components/system/primitives/icons/concepts/BeginConceptIcon.tsx
   Scope: Render the reusable canonical Begin concept icon
   Last Updated:
   - date: 2026-07-24
   - note: resolve Begin as a flat matte horizon and rising form
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

/* ------------------------------
   Types
-------------------------------- */
type BeginConceptIconProps = {
    size?: number;
    title?: string;
};

/* ------------------------------
   Component
-------------------------------- */
export default function BeginConceptIcon({
    size = 64,
    title,
}: BeginConceptIconProps) {
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
                    M20 37
                    H44

                    M25 37
                    A7 7 0 0 1 39 37
                "
                stroke="var(--color-accent-primary)"
                strokeWidth="2.25"
                strokeLinecap="square"
                strokeLinejoin="bevel"
            />
        </svg>
    );
}