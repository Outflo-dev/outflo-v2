/* ==========================================================
   OUTFLO — LANDING STORY CARD ICON
   File: src/app/(landing)/story/landing-story-card/internal/LandingStoryCardIcon.tsx
   Scope: Own the shared icon zone inside the landing story card
   Last Updated:
   - date: 2026-07-22
   - note: establish stable placement for every landing story concept icon
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type {
    CSSProperties,
    ReactNode,
} from "react";

/* ------------------------------
   Types
-------------------------------- */
type LandingStoryCardIconProps = {
    children: ReactNode;
};

/* ------------------------------
   Styles
-------------------------------- */
const ICON_ZONE_STYLE: CSSProperties = {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",

    width: "4.5rem",
    minWidth: "4.5rem",
    minHeight: "4.75rem",

    flexShrink: 0,

    transform: "translate(-.4rem, -0.125rem)",
};

/* ------------------------------
   Component
-------------------------------- */
export default function LandingStoryCardIcon({
    children,
}: LandingStoryCardIconProps) {
    return (
        <div
            aria-hidden="true"
            style={ICON_ZONE_STYLE}
        >
            {children}
        </div>
    );
}