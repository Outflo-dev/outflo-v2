/* ==========================================================
   OUTFLO — OUTFLO MARK
   File: src/components/system/primitives/marks/outflo/OutfloMark.tsx
   Scope: Own the SVG boundary, accessibility, and composition of the canonical Outflō mark
   Last Updated:
   - date: 2026-07-20
   - note: restore the canonical mark as a paint-neutral composition primitive
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import OutfloMarkCircle from "./internal/circle/OutfloMarkCircle";
import OutfloMarkMacron from "./internal/macron/OutfloMarkMacron";

/* ------------------------------
   Types
-------------------------------- */
type OutfloMarkProps = {
    size: number;
    title?: string;
};

/* ------------------------------
   Component
-------------------------------- */
export default function OutfloMark({
    size,
    title,
}: OutfloMarkProps) {
    const isDecorative = title === undefined;

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            width={size}
            height={size}
            role={isDecorative ? undefined : "img"}
            aria-hidden={isDecorative}
            aria-label={title}
            focusable="false"
        >
            <OutfloMarkCircle />
            <OutfloMarkMacron />
        </svg>
    );
}