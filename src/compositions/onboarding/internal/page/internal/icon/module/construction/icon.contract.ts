/* ==========================================================
   OUTFLO — ONBOARDING PAGE ICON CONTRACT
   File: src/compositions/onboarding/internal/page/internal/icon/module/construction/icon.contract.ts
   Scope: Own the component contract accepted by the onboarding page icon family
   Last Updated:
   - date: 2026-07-29
   - note: establish one shared icon-component boundary for page composition and rendering
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { ComponentType } from "react";

/* ------------------------------
   Types
-------------------------------- */
export type OnboardingPageIconComponent =
    ComponentType<{
        size: number;
        title?: string;
    }>;