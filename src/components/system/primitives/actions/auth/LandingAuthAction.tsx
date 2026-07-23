"use client";

/* ==========================================================
   OUTFLO — LANDING AUTH ACTION
   File: src/components/system/primitives/actions/auth/LandingAuthAction.tsx
   Scope: Own the repeated landing authentication action form
   Last Updated:
   - date: 2026-07-22
   - note: support leading identity, centered labels, trailing direction, and theme-bound action tones
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type {
    ButtonHTMLAttributes,
    CSSProperties,
    ReactNode,
} from "react";

/* ------------------------------
   Types
-------------------------------- */
type LandingAuthActionTone =
    | "light"
    | "gradient"
    | "outline";

type LandingAuthActionProps = {
    children: ReactNode;
    leading?: ReactNode;
    trailing?: ReactNode;
    tone?: LandingAuthActionTone;
} & Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "children"
>;

/* ------------------------------
   Styles
-------------------------------- */
const ACTION_STYLE: CSSProperties = {
    position: "relative",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    width: "100%",
    minHeight: "2.875rem",

    paddingInline: "3.5rem",

    borderWidth: "1px",
    borderStyle: "solid",
    borderRadius: "0.75rem",

    fontFamily: "var(--font-family-system)",
    fontSize: "0.95rem",
    fontWeight: 600,
    lineHeight: 1,
    letterSpacing: "-0.01em",

    cursor: "pointer",
    boxSizing: "border-box",
};

const LIGHT_STYLE: CSSProperties = {
    color: "var(--color-surface-primary)",
    background: "var(--color-text-primary)",
    borderColor: "var(--color-text-primary)",
};

const GRADIENT_STYLE: CSSProperties = {
    color: "var(--color-text-primary)",
    background: "var(--gradient-brand-primary)",
    borderColor: "transparent",
};

const OUTLINE_STYLE: CSSProperties = {
    color: "var(--color-text-primary)",
    background: "transparent",
    borderColor:
        "color-mix(in srgb, var(--color-accent-primary) 30%, transparent)",
};

const EDGE_STYLE: CSSProperties = {
    position: "absolute",
    top: "50%",

    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",

    width: "1.4rem",
    height: "1.4rem",

    transform: "translateY(-50%)",
};

const LEADING_STYLE: CSSProperties = {
    ...EDGE_STYLE,
    left: "1rem",
};

const TRAILING_STYLE: CSSProperties = {
    ...EDGE_STYLE,
    right: "1rem",
};

const LABEL_STYLE: CSSProperties = {
    display: "block",
    textAlign: "center",
};

/* ------------------------------
   Helpers
-------------------------------- */
function resolveToneStyle(
    tone: LandingAuthActionTone,
): CSSProperties {
    if (tone === "gradient") {
        return GRADIENT_STYLE;
    }

    if (tone === "outline") {
        return OUTLINE_STYLE;
    }

    return LIGHT_STYLE;
}

/* ------------------------------
   Component
-------------------------------- */
export default function LandingAuthAction({
    children,
    leading,
    trailing,
    tone = "light",
    style,
    type = "button",
    ...buttonProps
}: LandingAuthActionProps) {
    return (
        <button
            {...buttonProps}
            type={type}
            style={{
                ...ACTION_STYLE,
                ...resolveToneStyle(tone),
                ...style,
            }}
        >
            {leading ? (
                <span style={LEADING_STYLE}>
                    {leading}
                </span>
            ) : null}

            <span style={LABEL_STYLE}>
                {children}
            </span>

            {trailing ? (
                <span style={TRAILING_STYLE}>
                    {trailing}
                </span>
            ) : null}
        </button>
    );
}