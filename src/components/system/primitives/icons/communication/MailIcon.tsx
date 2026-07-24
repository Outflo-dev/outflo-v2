/* ==========================================================
   OUTFLO — MAIL ICON
   File: src/components/system/primitives/icons/communication/MailIcon.tsx
   Scope: Render the shared paint-neutral email indicator
   Last Updated:
   - date: 2026-07-23
   - note: refine the authentication mail icon with an open-side envelope form
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

/* ------------------------------
   Types
-------------------------------- */
type MailIconProps = {
    size?: number;
};

/* ------------------------------
   Component
-------------------------------- */
export default function MailIcon({
    size = 22,
}: MailIconProps) {
    const style: CSSProperties = {
        display: "block",

        width: size,
        height: size,

        transform: "translate(-0.05rem, -0.02rem)",
    };

    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            style={style}
        >
            <path
                d="
                    M3 6H21
                    M3 6V10.25
                    M21 6V10.25
                    M3 13.25V18H21V13.25
                "
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="square"
                strokeLinejoin="miter"
            />

            <path
                d="M3.75 6.75L12 13L20.25 6.75"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="square"
                strokeLinejoin="miter"
            />
        </svg>
    );
}