"use client";

/* ==========================================================
   OUTFLO — LANDING AUTH ACTION
   File: src/components/system/primitives/actions/auth/LandingAuthAction.tsx
   Scope: Own the repeated landing authentication action form
   Last Updated:
   - date: 2026-07-26
   - note: support both authentication buttons and declarative route actions
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import Link from "next/link";

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

type LandingAuthActionBaseProps = {
    children: ReactNode;
    leading?: ReactNode;
    trailing?: ReactNode;
    tone?: LandingAuthActionTone;
    style?: CSSProperties;
};

type LandingAuthActionButtonProps =
    LandingAuthActionBaseProps & {
        href?: undefined;
    } & Omit<
        ButtonHTMLAttributes<HTMLButtonElement>,
        "children" | "style"
    >;

type LandingAuthActionLinkProps =
    LandingAuthActionBaseProps & {
        href: string;
        ariaLabel?: string;
    };

type LandingAuthActionProps =
    | LandingAuthActionButtonProps
    | LandingAuthActionLinkProps;

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
    fontSize: "0.85rem",
    fontWeight: 500,
    lineHeight: 1,
    letterSpacing: "-0.01em",
    textDecoration: "none",

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

    width: "1.6rem",
    height: "1.6rem",

    transform: "translateY(-50%)",
};

const LEADING_STYLE: CSSProperties = {
    ...EDGE_STYLE,
    left: "1rem",
};

const TRAILING_STYLE: CSSProperties = {
    ...EDGE_STYLE,
    right: "1rem",

    transform: "translateY(-50%) scale(0.97)",
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

function LandingAuthActionContent({
    children,
    leading,
    trailing,
}: Pick<
    LandingAuthActionBaseProps,
    "children" | "leading" | "trailing"
>) {
    return (
        <>
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
        </>
    );
}

/* ------------------------------
   Component
-------------------------------- */
export default function LandingAuthAction(
    props: LandingAuthActionProps,
) {
    const {
        children,
        leading,
        trailing,
        tone = "light",
        style,
    } = props;

    const resolvedStyle: CSSProperties = {
        ...ACTION_STYLE,
        ...resolveToneStyle(tone),
        ...style,
    };

    if (props.href !== undefined) {
        return (
            <Link
                href={props.href}
                aria-label={props.ariaLabel}
                style={resolvedStyle}
            >
                <LandingAuthActionContent
                    leading={leading}
                    trailing={trailing}
                >
                    {children}
                </LandingAuthActionContent>
            </Link>
        );
    }

    const {
        type = "button",
        ...buttonProps
    } = props;

    return (
        <button
            {...buttonProps}
            type={type}
            style={resolvedStyle}
        >
            <LandingAuthActionContent
                leading={leading}
                trailing={trailing}
            >
                {children}
            </LandingAuthActionContent>
        </button>
    );
}