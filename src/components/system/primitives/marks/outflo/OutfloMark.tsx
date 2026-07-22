/* ==========================================================
   OUTFLO — OUTFLO MARK
   File: src/components/system/primitives/marks/outflo/OutfloMark.tsx
   Scope: Own the SVG boundary, accessibility, composition, and canonical paint of the Outflō mark
   Last Updated:
   - date: 2026-07-21
   - note: anchor the shared gradient directly across the canonical mark bounds
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import { useId } from "react";

import OutfloMarkCircle from "./internal/circle/OutfloMarkCircle";
import OutfloMarkMacron from "./internal/macron/OutfloMarkMacron";

/* ------------------------------
   Types
-------------------------------- */
type OutfloMarkProps = {
    size: number;
    title?: string;
};

/* ------------------------------
   Component
-------------------------------- */
export default function OutfloMark({
    size,
    title,
}: OutfloMarkProps) {
    const paintId = useId();
    const gradientId = `${paintId}-gradient`;
    const glowId = `${paintId}-glow`;

    const isDecorative = title === undefined;

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            width={size}
            height={size}
            role={isDecorative ? undefined : "img"}
            aria-hidden={isDecorative}
            aria-label={title}
            focusable="false"
        >
            <defs>
                <linearGradient
                    id={gradientId}
                    gradientUnits="userSpaceOnUse"
                    x1={119}
                    y1={270}
                    x2={393}
                    y2={270}
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

                <filter
                    id={glowId}
                    x="-50%"
                    y="-50%"
                    width="200%"
                    height="200%"
                >
                    <feGaussianBlur
                        in="SourceGraphic"
                        stdDeviation="9"
                        result="markGlow"
                    />

                    <feMerge>
                        <feMergeNode in="markGlow" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            <g
                stroke={`url(#${gradientId})`}
                filter={`url(#${glowId})`}
            >
                <OutfloMarkCircle />
                <OutfloMarkMacron />
            </g>
        </svg>
    );
}