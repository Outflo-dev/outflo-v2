/* ==========================================================
   OUTFLO — APP PHONE SPLIT FRAME
   Scope: Own reusable top, content, and bottom viewport regions.

   The Shell owns the viewport.
   The Split Frame owns vertical geometry.
   Compositions own region contents.
   ========================================================== */

import type { CSSProperties, ReactNode } from "react";

type AppPhoneSplitFrameProps = {
    top?: ReactNode;
    children: ReactNode;
    bottom?: ReactNode;
};

const FRAME: CSSProperties = {
    display: "grid",
    gridTemplateRows: "auto minmax(0, 1fr) auto",

    width: "100%",
    height: "100dvh",
    minWidth: 0,
    minHeight: 0,

    overflow: "hidden",
    boxSizing: "border-box",
};

const TOP: CSSProperties = {
    minWidth: 0,
    paddingTop: "env(safe-area-inset-top, 0px)",
};

const CONTENT: CSSProperties = {
    minWidth: 0,
    minHeight: 0,

    overflowY: "auto",
    overscrollBehavior: "contain",
};

const BOTTOM: CSSProperties = {
    minWidth: 0,
    paddingBottom: "env(safe-area-inset-bottom, 0px)",
};

export default function AppPhoneSplitFrame({
    top,
    children,
    bottom,
}: AppPhoneSplitFrameProps) {
    return (
        <div style={FRAME}>
            {top ? <div style={TOP}>{top}</div> : null}

            <div style={CONTENT}>
                {children}
            </div>

            {bottom ? (
                <div style={BOTTOM}>{bottom}</div>
            ) : null}
        </div>
    );
}
