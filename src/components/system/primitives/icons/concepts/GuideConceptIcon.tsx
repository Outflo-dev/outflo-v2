/* ==========================================================
   OUTFLO — GUIDE CONCEPT ICON
   File: src/components/system/primitives/icons/concepts/GuideConceptIcon.tsx
   Scope: Render the reusable canonical Guide concept icon
   Last Updated:
   - date: 2026-07-24
   - note: resolve the Guide as a person held within the Outflō form
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

/* ------------------------------
   Types
-------------------------------- */
type GuideConceptIconProps = {
    size?: number;
    title?: string;
};

/* ------------------------------
   Component
-------------------------------- */
export default function GuideConceptIcon({
    size = 64,
    title,
}: GuideConceptIconProps) {
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

            <circle
                cx="32"
                cy="27"
                r="4"
                stroke="var(--color-accent-primary)"
                strokeWidth="2.25"
            />

            <path
                d="
                    M24.5 40
                    C25.7 35.8 28.2 34 32 34
                    C35.8 34 38.3 35.8 39.5 40
                    Z
                "
                stroke="var(--color-accent-primary)"
                strokeWidth="2.25"
                strokeLinecap="square"
                strokeLinejoin="bevel"
            />
        </svg>
    );
}