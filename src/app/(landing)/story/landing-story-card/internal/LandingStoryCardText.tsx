/* ==========================================================
   OUTFLO — LANDING STORY CARD TEXT
   File: src/app/(landing)/story/landing-story-card/internal/LandingStoryCardText.tsx
   Scope: Render the shared title and supporting copy inside the landing story card
   Last Updated:
   - date: 2026-07-22
   - note: establish the stable text composition shared by every story state
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

/* ------------------------------
   Types
-------------------------------- */
type LandingStoryCardTextProps = {
    title: string;
    titleAccent?: string;
    support: string;
};

/* ------------------------------
   Styles
-------------------------------- */
const TEXT_STYLE: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignSelf: "flex-start",

    minWidth: 0,

    paddingTop: "0.5rem",
    transform: "translateY(0.1rem)",
};

const TITLE_STYLE: CSSProperties = {
    margin: 0,

    color: "var(--color-text-primary)",

    fontSize: "1rem",
    fontWeight: 500,
    lineHeight: 1.2,
    letterSpacing: "-0.015em",
};

const SUPPORT_STYLE: CSSProperties = {
    margin: "0.15rem 0 0",

    color: "var(--color-text-secondary)",

    fontSize: "0.8rem",
    fontWeight: 400,
    lineHeight: 1.42,
};

const TITLE_ACCENT_STYLE: CSSProperties = {
    background: "var(--gradient-brand-primary)",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",

    color: "transparent",
    WebkitTextFillColor: "transparent",
};

/* ------------------------------
   Component
-------------------------------- */
export default function LandingStoryCardText({
    title,
    titleAccent,
    support,
}: LandingStoryCardTextProps) {
    return (
        <div style={TEXT_STYLE}>
            <h2 style={TITLE_STYLE}>
                {title}

                {titleAccent ? (
                    <span style={TITLE_ACCENT_STYLE}>
                        {titleAccent}
                    </span>
                ) : null}
            </h2>

            <p style={SUPPORT_STYLE}>
                {support}
            </p>
        </div>
    );
}