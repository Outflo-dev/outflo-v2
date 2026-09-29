/* ==========================================================
   OUTFLO — COMING SOON PAGE
   File: src/app/(landing)/coming-soon/page.tsx
   Scope: Present the single shared Coming Soon destination
   Last Updated:
   - date: 2026-09-29
   - note: compose the approved Outflō Coming Soon surface
   ========================================================== */

import Link from "next/link";

import type {
    CSSProperties,
} from "react";

import LandingAmbientAtmosphere from "@/app/(landing)/atmosphere/LandingAmbientAtmosphere";
import ComingSoonOrbAtmosphere from "@/app/(landing)/coming-soon/atmosphere/ComingSoonOrbAtmosphere";

import {
    OnboardingPage,
} from "@/components/onboarding/page";

import ArrowIcon from "@/components/system/primitives/icons/navigation/ArrowIcon";
import OutfloMark from "@/components/system/primitives/marks/outflo/OutfloMark";
import OutfloWordmark from "@/components/system/primitives/marks/outflo/OutfloWordmark";

/* ------------------------------
   Atmosphere
-------------------------------- */

const BASE_ATMOSPHERE_STYLE: CSSProperties = {
    position: "fixed",

    left: 0,
    right: 0,
    top: "calc(0px - env(safe-area-inset-top))",
    bottom: "calc(0px - env(safe-area-inset-bottom))",

    background: "var(--color-surface-primary)",

    pointerEvents: "none",
};

/* ------------------------------
   Navigation
-------------------------------- */

const NAVIGATION_STYLE: CSSProperties = {
    display: "flex",
    justifyContent: "center",

    width: "100%",

    paddingTop: "3.25rem",
};

const ARROW_ACTION_STYLE: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",

    width: "2rem",
    height: "2rem",

    color: "var(--color-text-primary)",

    textDecoration: "none",
};

/* ------------------------------
   Composition
-------------------------------- */

const STAGE_STYLE: CSSProperties = {
    position: "relative",
    zIndex: 1,

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    flex: "1 1 auto",

    width: "100%",
    minHeight: 0,

    transform: "translateY(-2.5rem)",
};

const BRAND_STYLE: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
};

const MARK_STYLE: CSSProperties = {
    marginBottom: "-.4rem",
};

const WORDMARK_STYLE: CSSProperties = {
    margin: 0,

    lineHeight: 1,
};

const TAGLINE_STYLE: CSSProperties = {
    margin: 0,
    marginTop: "0.5rem",

    fontFamily: "var(--font-family-system)",
    fontSize: ".975rem",
    fontWeight: 400,
    lineHeight: 1.4,
    letterSpacing: "0em",

    color: "var(--color-text-secondary)",

    textAlign: "center",
};

const SOON_STYLE: CSSProperties = {
    color: "transparent",

    background:
        "linear-gradient(90deg, var(--color-accent-primary) -35%, var(--color-accent-secondary) 85%)",

    backgroundClip: "text",
    WebkitBackgroundClip: "text",
};

/* ------------------------------
   Page
-------------------------------- */

export default function ComingSoonPage() {
    return (
        <OnboardingPage
            atmosphere={
                <>
                    <div
                        aria-hidden="true"
                        style={BASE_ATMOSPHERE_STYLE}
                    />

                    <ComingSoonOrbAtmosphere />
                    <LandingAmbientAtmosphere />
                </>
            }
            navigation={
                <div style={NAVIGATION_STYLE}>
                    <Link
                        href="/"
                        aria-label="Back to landing"
                        style={ARROW_ACTION_STYLE}
                    >
                        <ArrowIcon
                            direction="left"
                            size={24}
                        />
                    </Link>
                </div>
            }
        >
            <div style={STAGE_STYLE}>
                <div style={BRAND_STYLE}>
                    <div style={MARK_STYLE}>
                        <OutfloMark
                            size={125}
                            title="Outflō"
                        />
                    </div>

                    <h1 style={WORDMARK_STYLE}>
                        <OutfloWordmark />
                    </h1>

                    <p style={TAGLINE_STYLE}>
                        Coming{" "}
                        <span style={SOON_STYLE}>
                            soon.
                        </span>
                    </p>
                </div>
            </div>
        </OnboardingPage>
    );
}
