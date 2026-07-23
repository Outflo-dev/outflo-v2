/* ==========================================================
   OUTFLO — TIME CONCEPT ICON
   File: src/components/system/primitives/icons/concepts/TimeConceptIcon.tsx
   Scope: Render the reusable canonical Time concept icon
   Last Updated:
   - date: 2026-07-22
   - note: simplify the Time symbol so it supports rather than competes with the Outflō mark
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import { useId } from "react";

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
    const paintId = useId();
    const gradientId = `${paintId}-gradient`;
    const glowId = `${paintId}-glow`;

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
            <defs>
                <linearGradient
                    id={gradientId}
                    gradientUnits="userSpaceOnUse"
                    x1="11"
                    y1="32"
                    x2="53"
                    y2="32"
                >
                    <stop
                        offset="0%"
                        stopColor="var(--color-accent-primary)"
                    />

                    <stop
                        offset="100%"
                        stopColor="var(--color-accent-primary)"
                    />
                </linearGradient>

                <filter
                    id={glowId}
                    x="-40%"
                    y="-40%"
                    width="180%"
                    height="180%"
                >
                    <feGaussianBlur
                        in="SourceGraphic"
                        stdDeviation="1.15"
                        result="timeGlow"
                    />

                    <feMerge>
                        <feMergeNode in="timeGlow" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            <circle
                cx="32"
                cy="32"
                r="20"
                stroke={`url(#${gradientId})`}
                strokeWidth="2"
                filter={`url(#${glowId})`}
            />

            <g
                stroke="var(--color-accent-primary)"
                strokeWidth="2.25"
                strokeLinecap="square"
                strokeLinejoin="miter"
            >
                <path d="M32 32V22" />
                <path d="M32 32L39 37" />
            </g>

            <rect
                x="30.75"
                y="30.75"
                width="2.5"
                height="2.5"
                fill="var(--color-accent-primary)"
            />
        </svg>
    );
}