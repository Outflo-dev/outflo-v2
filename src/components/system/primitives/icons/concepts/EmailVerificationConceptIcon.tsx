/* ==========================================================
   OUTFLO — EMAIL VERIFICATION CONCEPT ICON
   File: src/components/system/primitives/icons/concepts/EmailVerificationConceptIcon.tsx
   Scope: Render the reusable canonical Email Verification concept icon
   Last Updated:
   - date: 2026-08-02
   - note: resolve email verification as a cut envelope with gradient signal and restrained glow
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";
import { useId } from "react";

/* ------------------------------
   Types
-------------------------------- */
type EmailVerificationConceptIconProps = {
    size?: number;
    title?: string;
};

/* ------------------------------
   Component
-------------------------------- */
export default function EmailVerificationConceptIcon({
    size = 64,
    title,
}: EmailVerificationConceptIconProps) {
    const isDecorative = title === undefined;

    const gradientId =
        useId().replaceAll(":", "");

    const style: CSSProperties = {
        display: "block",

        width: size,
        height: size,

        flexShrink: 0,
    };

    const envelopePath = `
        M12 18
        H52
        V46
        H12
        Z

        M13 20
        L32 35
        L51 20
    `;

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
                    x1="12"
                    y1="18"
                    x2="52"
                    y2="46"
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

            <path
                d={envelopePath}
                stroke={`url(#${gradientId})`}
                strokeWidth="6"
                strokeLinecap="butt"
                strokeLinejoin="bevel"
                opacity="0.16"
            />

            <path
                d={envelopePath}
                stroke={`url(#${gradientId})`}
                strokeWidth="2.5"
                strokeLinecap="butt"
                strokeLinejoin="bevel"
            />
        </svg>
    );
}