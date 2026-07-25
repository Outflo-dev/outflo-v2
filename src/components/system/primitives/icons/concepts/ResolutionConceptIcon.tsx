/* ==========================================================
   OUTFLO — RESOLUTION CONCEPT ICON
   File: src/components/system/primitives/icons/concepts/ResolutionConceptIcon.tsx
   Scope: Render the reusable canonical Resolution concept icon
   Last Updated:
   - date: 2026-07-25
   - note: resolve layered truth inward through restrained three-role paint
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

/* ------------------------------
   Types
-------------------------------- */
type ResolutionConceptIconProps = {
    size?: number;
    title?: string;
};

/* ------------------------------
   Component
-------------------------------- */
export default function ResolutionConceptIcon({
    size = 64,
    title,
}: ResolutionConceptIconProps) {
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
                cy="32"
                r="11"
                stroke="var(--color-accent-secondary)"
                strokeWidth="2.25"
            />

            <circle
                cx="32"
                cy="32"
                r="3.5"
                stroke="var(--color-text-primary)"
                strokeWidth="2.25"
            />
        </svg>
    );
}