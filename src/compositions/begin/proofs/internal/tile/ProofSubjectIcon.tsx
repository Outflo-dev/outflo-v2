import OutfloMark from "@/components/system/primitives/marks/outflo/OutfloMark";

type Props = {
    action: string | null;
};

export default function ProofSubjectIcon({ action }: Props) {
    const subject = action?.trim().toUpperCase();

    if (subject === "SIGN IN") {
        return (
            <svg
                width="34"
                height="34"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
            >
                <path d="M10 17l5-5-5-5" />
                <path d="M15 12H3" />
                <path d="M12 3h6a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3h-6" />
            </svg>
        );
    }

    if (subject === "DATABASE") {
        return (
            <svg
                width="34"
                height="34"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
            >
                <ellipse cx="12" cy="5" rx="8" ry="3" />
                <path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5" />
                <path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
            </svg>
        );
    }

    return <OutfloMark size={34} title="Outflō" />;
}
