/* ==========================================================
   OUTFLO — LANDING STORY CARD PAGINATION
   File: src/app/(landing)/story/landing-story-card/internal/LandingStoryCardPagination.tsx
   Scope: Render the shared position indicators inside the landing story card
   Last Updated:
   - date: 2026-07-22
   - note: establish stable four-state pagination for the landing story
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

/* ------------------------------
   Types
-------------------------------- */
type LandingStoryCardPaginationProps = {
    activeIndex: number;
    total?: number;
};

/* ------------------------------
   Styles
-------------------------------- */
const PAGINATION_STYLE: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    gap: "1rem",
};

const DOT_STYLE: CSSProperties = {
    display: "block",

    width: 9.5,
    height: 9.5,

    borderRadius: "50%",
};

const ACTIVE_DOT_STYLE: CSSProperties = {
    width: 9.5,
    height: 9.5,

    background: "var(--color-accent-primary)",
    boxShadow: "0 0 8px var(--color-accent-primary)",
};

const INACTIVE_DOT_STYLE: CSSProperties = {
    background: "var(--color-text-secondary)",
    opacity: 0.42,
};

/* ------------------------------
   Component
-------------------------------- */
export default function LandingStoryCardPagination({
    activeIndex,
    total = 4,
}: LandingStoryCardPaginationProps) {
    return (
        <div
            aria-hidden="true"
            style={PAGINATION_STYLE}
        >
            {Array.from({ length: total }, (_, index) => {
                const isActive = index === activeIndex;

                return (
                    <span
                        key={index}
                        style={{
                            ...DOT_STYLE,
                            ...(isActive
                                ? ACTIVE_DOT_STYLE
                                : INACTIVE_DOT_STYLE),
                        }}
                    />
                );
            })}
        </div>
    );
}