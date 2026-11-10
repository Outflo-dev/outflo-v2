/*
 * OUTFLO — STUDY
 *
 * Owner: Study application entry
 *
 * Current state:
 * Study is established but not yet publicly available.
 *
 * Reuses the existing Coming Soon destination.
 */

import { redirect } from "next/navigation";

export default function StudyPage() {
    redirect("/coming-soon");
}
