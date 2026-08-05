/* ==========================================================
   OUTFLO — ONBOARDING PAGE ATMOSPHERE
   File: src/components/onboarding/page/internal/atmosphere/OnboardingPageAtmosphere.tsx
   Scope: Compose the ambient layer within the onboarding page surface
   Last Updated:
   - date: 2026-07-29
   - note: combine explicit attachment, layer, paint, and interaction owners
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import interactionStyles from "./module/behavior/atmosphere.interaction.module.css";

import attachmentStyles from "./module/style/atmosphere.attachment.module.css";
import layerStyles from "./module/style/atmosphere.layer.module.css";
import paintStyles from "./module/style/atmosphere.paint.module.css";

/* ------------------------------
   Component
-------------------------------- */
export default function OnboardingPageAtmosphere() {
    return (
        <div
            aria-hidden="true"
            className={`
                ${attachmentStyles.attachment}
                ${layerStyles.layer}
                ${paintStyles.paint}
                ${interactionStyles.interaction}
            `}
        />
    );
}