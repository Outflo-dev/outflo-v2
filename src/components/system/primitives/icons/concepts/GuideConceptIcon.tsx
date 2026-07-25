/* ==========================================================
   OUTFLO — GUIDE CONCEPT ICON
   File: src/components/system/primitives/icons/concepts/GuideConceptIcon.tsx
   Scope: Render the reusable canonical Guide concept icon
   Last Updated:
   - date: 2026-07-25
   - note: distinguish the Guide from the Outflō form through restrained two-tone paint
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
                cy="33"
                r="19"
                stroke="var(--color-accent-primary)"
                strokeWidth="2"
            />

            <path
                d="M27.5 10.5 H36.5"
                stroke="var(--color-accent-primary)"
                strokeWidth="2.25"
                strokeLinecap="square"
            />

            <circle
                cx="32"
                cy="28"
                r="4.5"
                stroke="var(--color-text-primary)"
                strokeWidth="2.25"
            />

            <path
                d="
                    M23.5 42
                    C24.8 36.9 27.7 34.8 32 34.8
                    C36.3 34.8 39.2 36.9 40.5 42
                "
                stroke="var(--color-text-primary)"
                strokeWidth="2.25"
                strokeLinecap="square"
                strokeLinejoin="bevel"
            />
        </svg>
    );
}