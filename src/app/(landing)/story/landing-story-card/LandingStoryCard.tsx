/* ==========================================================
   OUTFLO — LANDING STORY CARD
   File: src/app/(landing)/story/landing-story-card/LandingStoryCard.tsx
   Scope: Own and compose the singular landing story card form
   Last Updated:
   - date: 2026-07-22
   - note: own the fixed story-card frame and compose its internal owners
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type {
    CSSProperties,
    ReactNode,
} from "react";

import LandingStoryCardIcon from "./internal/LandingStoryCardIcon";
import LandingStoryCardPagination from "./internal/LandingStoryCardPagination";
import LandingStoryCardText from "./internal/LandingStoryCardText";

/* ------------------------------
   Types
-------------------------------- */
type LandingStoryCardProps = {
    icon: ReactNode;
    title: string;
    support: string;
    activeIndex: number;
    titleAccent?: string;
    total?: number;
};

/* ------------------------------
   Styles
-------------------------------- */
const CARD_STYLE: CSSProperties = {
    position: "relative",

    width: "100%",
    maxWidth: "19.5rem",
    height: "7.55rem",

    boxSizing: "border-box",
    overflow: "hidden",
    isolation: "isolate",

    background: "var(--color-card-surface)",

    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "var(--color-card-border)",
    borderRadius: ".85rem",

    boxShadow:
        "0 18px 50px var(--color-card-shadow), inset 0 1px 0 var(--color-card-highlight)",
};

const CONTENT_STYLE: CSSProperties = {
    display: "grid",
    gridTemplateColumns: "3.3rem minmax(0, 1fr)",
    alignItems: "start",

    width: "100%",
    height: "100%",

    columnGap: "0.2rem",

    padding: "0.9rem 1.2rem 1.65rem",

    boxSizing: "border-box",
};

const PAGINATION_ZONE_STYLE: CSSProperties = {
    position: "absolute",
    left: "50%",
    bottom: "1.25rem",

    transform: "translateX(-50%)",
};
/* ------------------------------
   Component
-------------------------------- */
export default function LandingStoryCard({
    icon,
    title,
    support,
    titleAccent,
    activeIndex,
    total = 4,
}: LandingStoryCardProps) {
    return (
        <div
            role="group"
            aria-label={`${title}${titleAccent ?? ""}, story ${activeIndex + 1} of ${total}`}
            style={CARD_STYLE}
        >
            <div style={CONTENT_STYLE}>
                <LandingStoryCardIcon>
                    {icon}
                </LandingStoryCardIcon>

                <LandingStoryCardText
                    title={title}
                    titleAccent={titleAccent}
                    support={support}
                />
            </div>

            <div style={PAGINATION_ZONE_STYLE}>
                <LandingStoryCardPagination
                    activeIndex={activeIndex}
                    total={total}
                />
            </div>
        </div>
    );
}