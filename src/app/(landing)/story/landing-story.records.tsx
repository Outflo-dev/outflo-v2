/* ==========================================================
   OUTFLO — LANDING STORY RECORDS
   File: src/app/(landing)/story/landing-story.records.tsx
   Scope: Own the canonical ordered story states presented on the landing surface
   Last Updated:
   - date: 2026-07-24
   - note: establish the complete Time, Begin, Guide, and Resolution story sequence
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { ReactNode } from "react";

import BeginConceptIcon from "@/components/system/primitives/icons/concepts/BeginConceptIcon";
import GuideConceptIcon from "@/components/system/primitives/icons/concepts/GuideConceptIcon";
import ResolutionConceptIcon from "@/components/system/primitives/icons/concepts/ResolutionConceptIcon";
import TimeConceptIcon from "@/components/system/primitives/icons/concepts/TimeConceptIcon";

/* ------------------------------
   Types
-------------------------------- */
export type LandingStoryRecord = {
    icon: ReactNode;
    title: string;
    titleAccent?: string;
    support: string;
};

/* ------------------------------
   Records
-------------------------------- */
export const LANDING_STORY_RECORDS: readonly LandingStoryRecord[] = [
    {
        icon: <TimeConceptIcon size={56} />,
        title: "This is ",
        titleAccent: "Time.",
        support: "The first living form of Outflō.",
    },
    {
        icon: <BeginConceptIcon size={56} />,
        title: "Everything begins ",
        titleAccent: "somewhere.",
        support: "Outflō remembers where your time began.",
    },
    {
        icon: <GuideConceptIcon size={56} />,
        title: "You are the ",
        titleAccent: "Guide.",
        support: "You decide what Outflō records.",
    },
    {
        icon: <ResolutionConceptIcon size={56} />,
        title: "Your life, in ",
        titleAccent: "time.",
        support: "Outflō resolves what you choose to remember.",
    },
];