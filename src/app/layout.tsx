/* ==========================================================
   OUTFLO — ROOT LAYOUT
   File: src/app/layout.tsx
   Scope: Own the root document boundary, application metadata, and phone shell composition
   Last Updated:
   - date: 2026-07-17
   - note: replace the generated Next.js layout with the initial Outflō root boundary
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
   Layout
-------------------------------- */
export default function RootLayout({
  children,
}: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <AppPhoneShell>
          {children}
        </AppPhoneShell>
      </body>
    </html>
  );
}