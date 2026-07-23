/* ==========================================================
   OUTFLO — LANDING BRAND
   File: src/app/(landing)/brand/LandingBrand.tsx
   Scope: Compose the canonical landing mark, wordmark, and tagline
   Last Updated:
   - date: 2026-07-20
   - note: apply the canonical brand-gradient presentation to the landing mark
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import OutfloMark from "@/components/system/primitives/marks/outflo/OutfloMark";

import LandingTagline from "./internal/LandingTagline";
import LandingWordmark from "./internal/LandingWordmark";

/* ------------------------------
   Composition
-------------------------------- */
const MARK_TO_WORDMARK_GAP = "-.4rem";
const WORDMARK_TO_TAGLINE_GAP = "0.5rem";

/* ------------------------------
   Styles
-------------------------------- */
const BRAND_STYLE = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
} as const;

const MARK_STYLE = {
    color: "var(--color-accent-primary)",
    marginBottom: MARK_TO_WORDMARK_GAP,
} as const;

const WORDMARK_SLOT_STYLE = {
    lineHeight: 1,
} as const;

const TAGLINE_SLOT_STYLE = {
    marginTop: WORDMARK_TO_TAGLINE_GAP,
    lineHeight: 1.4,
} as const;

/* ------------------------------
   Component
-------------------------------- */
export default function LandingBrand() {
    return (
        <div style={BRAND_STYLE}>
            <div style={MARK_STYLE}>
                <OutfloMark size={125} />
            </div>

            <div style={WORDMARK_SLOT_STYLE}>
                <LandingWordmark />
            </div>

            <div style={TAGLINE_SLOT_STYLE}>
                <LandingTagline />
            </div>
        </div>
    );
}