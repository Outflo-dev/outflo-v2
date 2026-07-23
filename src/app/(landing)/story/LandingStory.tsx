/* ==========================================================
   OUTFLO — LANDING STORY
   File: src/app/(landing)/story/LandingStory.tsx
   Scope: Compose the Guide-facing landing story experience
   Last Updated:
   - date: 2026-07-22
   - note: establish the first Time story state before carousel behavior
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import TimeConceptIcon from "@/components/system/primitives/icons/concepts/TimeConceptIcon";

import LandingStoryCard from "./landing-story-card/LandingStoryCard";

/* ------------------------------
   Styles
-------------------------------- */
const STORY_STYLE: CSSProperties = {
    display: "flex",
    justifyContent: "center",

    width: "100%",

    marginTop: "1.35rem",
};

/* ------------------------------
   Component
-------------------------------- */
export default function LandingStory() {
    return (
        <section
            aria-label="Discover Outflō"
            style={STORY_STYLE}
        >
            <LandingStoryCard
                icon={<TimeConceptIcon size={60} />}
                title="This is "
                titleAccent="Time."
                support="The first living form of Outflō."
                activeIndex={0}
                total={4}
            />
        </section>
    );
}