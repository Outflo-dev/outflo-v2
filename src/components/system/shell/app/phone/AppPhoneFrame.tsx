/* ==========================================================
   OUTFLO — APP PHONE FRAME
   File: src/components/system/shell/app/phone/AppPhoneFrame.tsx
   Scope: Own the centered phone-width boundary, horizontal gutter, and horizontal safe-area accommodation
   Last Updated:
   - date: 2026-07-17
   - note: establish the initial phone application frame
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type {
    CSSProperties,
    ReactNode,
} from "react";

import {
    APP_PHONE_FRAME,
} from "./app-phone-frame.constants";

/* ------------------------------
   Types
-------------------------------- */
type AppPhoneFrameProps = {
    children: ReactNode;
};

/* ------------------------------
   Styles
-------------------------------- */
const FRAME_STYLE: CSSProperties = {
    width: "100%",
    maxWidth: APP_PHONE_FRAME.maxWidthPx,
    marginInline: "auto",
    paddingLeft:
        `calc(${APP_PHONE_FRAME.gutterXPx}px + env(safe-area-inset-left))`,
    paddingRight:
        `calc(${APP_PHONE_FRAME.gutterXPx}px + env(safe-area-inset-right))`,
    boxSizing: "border-box",
};

/* ------------------------------
   Component
-------------------------------- */
export default function AppPhoneFrame({
    children,
}: AppPhoneFrameProps) {
    return (
        <div style={FRAME_STYLE}>
            {children}
        </div>
    );
}