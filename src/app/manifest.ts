/* ==========================================================
   OUTFLO — APPLICATION MANIFEST
   File: src/app/manifest.ts
   Scope: Own installable application metadata and app icon registration
   Last Updated:
   - date: 2026-07-19
   - note: establish the initial standalone Outflō application manifest
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type {
    MetadataRoute,
} from "next";

/* ------------------------------
   Manifest
-------------------------------- */
export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Outflō",
        short_name: "Outflō",
        description: "Your life, in time.",

        start_url: "/",
        display: "standalone",

        background_color: "#070706",
        theme_color: "#070706",

        icons: [
            {
                src: "/app-icons/outflo/icon-192.png",
                sizes: "192x192",
                type: "image/png",
            },
            {
                src: "/app-icons/outflo/icon-512.png",
                sizes: "512x512",
                type: "image/png",
            },
        ],
    };
}