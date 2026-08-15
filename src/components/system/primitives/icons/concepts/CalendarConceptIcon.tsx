/* ==========================================================
   OUTFLO — CALENDAR CONCEPT ICON
   File: src/components/system/primitives/icons/concepts/CalendarConceptIcon.tsx
   Scope: Render the reusable canonical calendar concept icon
   Last Updated:
   - date: 2026-08-15
   - note: allow Begin to opt into canonical accent-gradient paint
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import {
    useId,
    type CSSProperties,
} from "react";

/* ------------------------------
   Types
-------------------------------- */
type CalendarConceptIconProps = {
    size?: number;
    title?: string;
    gradient?: boolean;
};

/* ------------------------------
   Component
-------------------------------- */
export default function CalendarConceptIcon({
    size = 64,
    title,
    gradient = false,
}: CalendarConceptIconProps) {
    const isDecorative = title === undefined;
    const gradientId = useId();

    const style: CSSProperties = {
        display: "block",

        width: size,
        height: size,

        flexShrink: 0,
    };

    const stroke = gradient
        ? `url(#${gradientId})`
        : "var(--color-accent-primary)";

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
            {gradient && (
                <defs>
                    <linearGradient
                        id={gradientId}
                        x1="12"
                        y1="12"
                        x2="52"
                        y2="52"
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
            )}

            <rect
                x="16"
                y="18"
                width="32"
                height="28"
                rx="2"
                stroke={stroke}
                strokeWidth="2"
            />

            <path
                d="
                    M24 14
                    V22

                    M40 14
                    V22

                    M16 26
                    H48
                "
                stroke={stroke}
                strokeWidth="2"
                strokeLinecap="square"
                strokeLinejoin="bevel"
            />

            <path
                d="
                    M27 34
                    H37

                    M27 38
                    H34
                "
                stroke={stroke}
                strokeWidth="2.25"
                strokeLinecap="square"
                strokeLinejoin="bevel"
            />
        </svg>
    );
}