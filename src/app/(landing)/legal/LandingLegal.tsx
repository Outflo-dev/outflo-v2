/* ==========================================================
   OUTFLO — LANDING LEGAL
   File: src/app/(landing)/legal/LandingLegal.tsx
   Scope: Render the signed-out landing agreement and legal navigation
   Last Updated:
   - date: 2026-07-23
   - note: establish the legal footer beneath the landing story
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import Link from "next/link";

/* ------------------------------
   Styles
-------------------------------- */
const LEGAL_STYLE: CSSProperties = {
    width: "100%",
    maxWidth: "19.5rem",

    marginTop: "2rem",

    color: "var(--color-text-secondary)",

    fontSize: "0.75rem",
    fontWeight: 400,
    lineHeight: 1.55,
    textAlign: "center",
};

const LINE_STYLE: CSSProperties = {
    display: "block",
};

const TERMS_STYLE: CSSProperties = {
    color: "var(--color-accent-primary)",
    fontWeight: 500,
    textDecoration: "none",
};

const PRIVACY_STYLE: CSSProperties = {
    color: "var(--color-accent-secondary)",
    fontWeight: 500,
    textDecoration: "none",
};

/* ------------------------------
   Component
-------------------------------- */
export default function LandingLegal() {
    return (
        <footer style={LEGAL_STYLE}>
            <span style={LINE_STYLE}>
                By continuing, you agree to Outflō’s
            </span>

            <span style={LINE_STYLE}>
                <Link
                    href="/terms"
                    style={TERMS_STYLE}
                >
                    Terms of Service
                </Link>

                {" and "}

                <Link
                    href="/privacy"
                    style={PRIVACY_STYLE}
                >
                    Privacy Policy
                </Link>

                {"."}
            </span>
        </footer>
    );
}