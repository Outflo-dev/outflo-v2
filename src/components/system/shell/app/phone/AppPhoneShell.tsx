/* ==========================================================
   OUTFLO — APP PHONE SHELL
   File: src/components/system/shell/app/phone/AppPhoneShell.tsx
   Scope: Own the phone application surface and compose the shared phone frame
   Last Updated:
   - date: 2026-07-17
   - note: establish the initial phone application shell
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type {
    CSSProperties,
    ReactNode,
} from "react";

import AppPhoneFrame from "./AppPhoneFrame";

/* ------------------------------
   Types
-------------------------------- */
type AppPhoneShellProps = {
    children: ReactNode;
};

/* ------------------------------
   Styles
-------------------------------- */
const SHELL_STYLE: CSSProperties = {
    position: "relative",
    isolation: "isolate",

    width: "100%",
    minHeight: "100dvh",
};

/* ------------------------------
   Component
-------------------------------- */
export default function AppPhoneShell({
    children,
}: AppPhoneShellProps) {
    return (
        <main style={SHELL_STYLE}>
            <AppPhoneFrame>
                {children}
            </AppPhoneFrame>
        </main>
    );
}