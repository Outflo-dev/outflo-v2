/* ==========================================================
   OUTFLO — ROOT LAYOUT
   File: src/app/layout.tsx
   Scope: Own the root document boundary, application metadata, font registration, and phone shell composition
   Last Updated:
   - date: 2026-07-18
   - note: register canonical system and wordmark font variables at the document boundary
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type {
  Metadata,
} from "next";

import type {
  ReactNode,
} from "react";

import {
  systemFont,
  wordmarkFont,
} from "@/components/system/appearance/typography/system-font";

import AppPhoneShell from "@/components/system/shell/app/phone/AppPhoneShell";

import "./globals.css";

/* ------------------------------
   Metadata
-------------------------------- */
export const metadata: Metadata = {
  title: "Outflō",
  description: "Your life, in time.",
};

/* ------------------------------
   Types
-------------------------------- */
type RootLayoutProps = {
  children: ReactNode;
};

/* ------------------------------
   Component
-------------------------------- */
export default function RootLayout({
  children,
}: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={`${systemFont.variable} ${wordmarkFont.variable}`}
    >
      <body>
        <AppPhoneShell>
          {children}
        </AppPhoneShell>
      </body>
    </html>
  );
}