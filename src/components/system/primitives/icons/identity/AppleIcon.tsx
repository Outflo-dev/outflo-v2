/* ==========================================================
   OUTFLO — APPLE ICON
   File: src/components/system/primitives/icons/identity/AppleIcon.tsx
   Scope: Own the canonical Apple identity mark
   Last Updated:
   - date: 2026-09-23
   - note: extract Apple identity from landing-local presentation
   ========================================================== */

type AppleIconProps = {
    size?: number;
    title?: string;
};

export default function AppleIcon({
    size = 24,
    title,
}: AppleIconProps) {
    return (
        <svg
            aria-hidden={title ? undefined : true}
            role={title ? "img" : undefined}
            viewBox="0 0 24 24"
            width={size}
            height={size}
        >
            {title ? <title>{title}</title> : null}

            <path
                fill="currentColor"
                d="M16.365 1.43c0 1.14-.415 2.207-1.105 3.01-.74.865-1.94 1.53-3.01 1.445-.135-1.1.395-2.27 1.075-2.99.75-.81 2.03-1.39 3.04-1.465ZM20.08 17.16c-.48 1.1-.71 1.59-1.33 2.56-.865 1.33-2.085 2.99-3.6 3-1.345.015-1.69-.88-3.515-.87-1.825.01-2.205.89-3.55.875-1.515-.015-2.67-1.51-3.535-2.84-2.42-3.72-2.675-8.09-1.18-10.41 1.065-1.65 2.745-2.615 4.325-2.615 1.61 0 2.625.885 3.955.885 1.29 0 2.075-.89 3.94-.89 1.41 0 2.905.77 3.97 2.1-3.49 1.915-2.925 6.9.52 8.205Z"
            />
        </svg>
    );
}
