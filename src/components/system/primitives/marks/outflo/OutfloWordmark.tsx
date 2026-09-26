/* ==========================================================
   OUTFLO — OUTFLO WORDMARK
   File: src/components/system/primitives/marks/outflo/OutfloWordmark.tsx
   Scope: Render the canonical Outflō wordmark presentation
   ========================================================== */

type OutfloWordmarkProps = {
    sizeRem?: number;
};

export default function OutfloWordmark({
    sizeRem = 2.95,
}: OutfloWordmarkProps) {
    return (
        <span
            style={{
                display: "block",
                margin: 0,

                color: "var(--color-text-primary)",

                fontFamily: "var(--font-family-wordmark)",
                fontSize: `${sizeRem}rem`,
                fontWeight: 400,
                lineHeight: 1,
                letterSpacing: "0.03em",

                textAlign: "center",
            }}
        >
            Outflō
        </span>
    );
}
