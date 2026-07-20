/* ==========================================================
   OUTFLO — APP PHONE SHELL
   File: src/components/system/shell/app/phone/AppPhoneShell.tsx
   Scope: Own the application viewport and compose the shared phone frame
   Last Updated:
   - date: 2026-07-19
   - note: clarify the shell as the canonical application viewport owner
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

    display: "flex",

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