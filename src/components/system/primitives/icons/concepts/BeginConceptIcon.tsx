/* ==========================================================
   OUTFLO — BEGIN CONCEPT ICON
   File: src/components/system/primitives/icons/concepts/BeginConceptIcon.tsx
   Scope: Render the reusable canonical Begin concept icon
   Last Updated:
   - date: 2026-07-25
   - note: resolve Begin as an open horizon, rising form, and first light
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
            <path
                d="
                    M15 39
                    H49

                    M32 17
                    V22

                    M20.5 22.5
                    L24 26

                    M43.5 22.5
                    L40 26

                    M16.5 31
                    H21.5

                    M42.5 31
                    H47.5
                "
                stroke="var(--color-accent-primary)"
                strokeWidth="2"
                strokeLinecap="square"
                strokeLinejoin="bevel"
            />

            <path
                d="
                    M23 39
                    A9 9 0 0 1 41 39
                "
                stroke="var(--color-accent-secondary)"
                strokeWidth="2.25"
                strokeLinecap="square"
                strokeLinejoin="bevel"
            />
        </svg>
    );
}