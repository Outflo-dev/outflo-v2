/* ==========================================================
   OUTFLO — GUIDE NAME CONCEPT ICON
   File: src/components/system/primitives/icons/concepts/GuideNameConceptIcon.tsx
   Scope: Render the Guide identity concept for Guide Name onboarding
   Last Updated:
   - date: 2026-08-08
   - note: resolve the Guide identity through a thin canonical gradient circle and restrained person form
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";
import { useId } from "react";

/* ------------------------------
   Types
-------------------------------- */
type GuideNameConceptIconProps = {
    size?: number;
    title?: string;
};

/* ------------------------------
   Component
-------------------------------- */
export default function GuideNameConceptIcon({
    size = 64,
    title,
}: GuideNameConceptIconProps) {
    const isDecorative = title === undefined;

    const gradientId =
        useId().replaceAll(":", "");

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
            <defs>
                <linearGradient
                    id={gradientId}
                    x1="13"
                    y1="13"
                    x2="51"
                    y2="51"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop
                        offset="0%"
                        stopColor="var(--color-accent-primary)"
                    />

                    <stop
                        offset="100%"
                        stopColor="var(--color-accent-secondary)"
                    />
                </linearGradient>
            </defs>

            <circle
                cx="32"
                cy="32"
                r="19"
                stroke={`url(#${gradientId})`}
                strokeWidth="1.25"
            />

            <circle
                cx="32"
                cy="27"
                r="4.5"
                stroke={`url(#${gradientId})`}
                strokeWidth="1.25"
            />

            <path
                d="
                    M23.5 41
                    C24.8 35.9 27.7 33.8 32 33.8
                    C36.3 33.8 39.2 35.9 40.5 41
                "
                stroke={`url(#${gradientId})`}
                strokeWidth="1.25"
                strokeLinecap="square"
                strokeLinejoin="bevel"
            />
        </svg>
    );
}