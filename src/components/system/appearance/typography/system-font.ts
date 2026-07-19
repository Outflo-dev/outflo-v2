/* ==========================================================
   OUTFLO — SYSTEM FONT
   File: src/components/system/appearance/typography/system-font.ts
   Scope: Own loading and CSS-variable registration for canonical Outflō typography
   Last Updated:
   - date: 2026-07-18
   - note: establish IBM Plex Sans for system typography and Montserrat for the Outflō wordmark
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import {
    IBM_Plex_Sans,
    Montserrat,
} from "next/font/google";

/* ------------------------------
   Fonts
-------------------------------- */
export const systemFont = IBM_Plex_Sans({
    subsets: ["latin"],
    weight: [
        "300",
        "400",
        "500",
        "600",
        "700",
    ],
    style: ["normal"],
    display: "swap",
    variable: "--font-system",
});

export const wordmarkFont = Montserrat({
    subsets: ["latin"],
    weight: [
        "300",
        "400",
        "500",
        "600",
        "700",
        "800",
        "900",
    ],
    style: ["normal"],
    display: "swap",
    variable: "--font-wordmark",
});