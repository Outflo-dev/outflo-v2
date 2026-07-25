"use client";

/* ==========================================================
   OUTFLO — LANDING STORY
   File: src/app/(landing)/story/LandingStory.tsx
   Scope: Own the active Guide-facing landing story state and interaction
   Last Updated:
   - date: 2026-07-24
   - note: consume the canonical story sequence and support bounded horizontal swiping
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import {
    useRef,
    useState,
} from "react";

import type {
    CSSProperties,
    PointerEvent as ReactPointerEvent,
} from "react";

import LandingStoryCard from "./landing-story-card/LandingStoryCard";

import {
    LANDING_STORY_RECORDS,
} from "./landing-story.records";

/* ------------------------------
   Constants
-------------------------------- */
const SWIPE_THRESHOLD_PX = 36;

/* ------------------------------
   Styles
-------------------------------- */
const STORY_STYLE: CSSProperties = {
    display: "flex",
    justifyContent: "center",

    width: "100%",

    marginTop: "1.6rem",

    touchAction: "pan-y",
    userSelect: "none",
};

/* ------------------------------
   Component
-------------------------------- */
export default function LandingStory() {
    const [activeIndex, setActiveIndex] = useState(0);

    const pointerStartXRef = useRef<number | null>(null);

    const total = LANDING_STORY_RECORDS.length;
    const activeStory = LANDING_STORY_RECORDS[activeIndex];

    function showPreviousStory() {
        setActiveIndex((currentIndex) =>
            currentIndex === 0
                ? total - 1
                : currentIndex - 1,
        );
    }

    function showNextStory() {
        setActiveIndex((currentIndex) =>
            currentIndex === total - 1
                ? 0
                : currentIndex + 1,
        );
    }

    function handlePointerDown(
        event: ReactPointerEvent<HTMLElement>,
    ) {
        pointerStartXRef.current = event.clientX;
    }

    function handlePointerUp(
        event: ReactPointerEvent<HTMLElement>,
    ) {
        const pointerStartX = pointerStartXRef.current;

        pointerStartXRef.current = null;

        if (pointerStartX === null) {
            return;
        }

        const horizontalTravel =
            event.clientX - pointerStartX;

        if (
            Math.abs(horizontalTravel)
            < SWIPE_THRESHOLD_PX
        ) {
            return;
        }

        if (horizontalTravel < 0) {
            showNextStory();
            return;
        }

        showPreviousStory();
    }

    function handlePointerCancel() {
        pointerStartXRef.current = null;
    }

    return (
        <section
            aria-label="Discover Outflō"
            style={STORY_STYLE}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerCancel}
        >
            <LandingStoryCard
                icon={activeStory.icon}
                title={activeStory.title}
                titleAccent={activeStory.titleAccent}
                support={activeStory.support}
                activeIndex={activeIndex}
                total={total}
            />
        </section>
    );
}