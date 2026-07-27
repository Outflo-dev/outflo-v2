/* ==========================================================
   OUTFLO — SECURITY ICON
   File: src/components/system/primitives/icons/security/SecurityIcon.tsx
   Scope: Render the reusable canonical security guidance icon
   Last Updated:
   - date: 2026-07-27
   - note: establish a distinct security symbol for password guidance
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

/* ------------------------------
   Types
-------------------------------- */
type SecurityIconProps = {
    size?: number;
    title?: string;
};

/* ------------------------------
   Component
-------------------------------- */
export default function SecurityIcon({
    size = 16,
    title,
}: SecurityIconProps) {
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
            viewBox="0 0 24 24"
            width={size}
            height={size}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden={isDecorative}
            aria-label={title}
            role={isDecorative ? undefined : "img"}
            style={style}
        >
            <path d="M12 3L19 6V11.5C19 15.8 16.2 19.6 12 21C7.8 19.6 5 15.8 5 11.5V6L12 3Z" />
            <path d="M9 12L11 14L15 10" />
        </svg>
    );
}