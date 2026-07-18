/* ==========================================================
   OUTFLO — LANDING BRAND
   File: src/app/(landing)/brand/LandingBrand.tsx
   Scope: Compose the canonical landing mark, wordmark, and tagline
   Last Updated:
   - date: 2026-07-18
   - note: establish the landing identity composition
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import OutfloMark from "@/components/system/primitives/marks/outflo/OutfloMark";

import LandingTagline from "./LandingTagline";
import LandingWordmark from "./LandingWordmark";

/* ------------------------------
   Styles
-------------------------------- */
const BRAND_STYLE = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.75rem",
} as const;

/* ------------------------------
   Component
-------------------------------- */
export default function LandingBrand() {
    return (
        <div style={BRAND_STYLE}>
            <OutfloMark
                size={132}
                title="Outflō"
            />

            <LandingWordmark />

            <LandingTagline />
        </div>
    );
}