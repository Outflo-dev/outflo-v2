/* ==========================================================
   OUTFLO — LANDING AUTH DIVIDER
   File: src/app/(landing)/auth/divider/LandingAuthDivider.tsx
   Scope: Separate provider authentication from email authentication
   Last Updated:
   - date: 2026-07-22
   - note: establish the landing authentication section divider
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

/* ------------------------------
   Styles
-------------------------------- */
const DIVIDER_STYLE: CSSProperties = {
    display: "flex",
    alignItems: "center",

    width: "100%",

    gap: "0.95rem",
};

const LINE_STYLE: CSSProperties = {
    flex: 1,

    height: "1px",

    background:
        "color-mix(in srgb, var(--color-text-secondary) 18%, transparent)",
};

const LABEL_STYLE: CSSProperties = {
    margin: 0,

    color: "var(--color-text-secondary)",

    fontFamily: "var(--font-family-system)",
    fontSize: "0.75rem",
    fontWeight: 400,
    lineHeight: 1,
    letterSpacing: "0.02em",
};

/* ------------------------------
   Component
-------------------------------- */
export default function LandingAuthDivider() {
    return (
        <div
            aria-hidden="true"
            style={DIVIDER_STYLE}
        >
            <span style={LINE_STYLE} />

            <span style={LABEL_STYLE}>
                or
            </span>

            <span style={LINE_STYLE} />
        </div>
    );
}