/* ==========================================================
   OUTFLO — OBSERVE SERVER TEMPORAL PROVENANCE
   File: src/runtime/clock/provenance/observeServerTemporalProvenance.ts
   Scope: Capture the runtime environment that produced a server temporal observation
   Last Updated:
   - date: 2026-10-07
   - note: preserve environment provenance as observed without interpreting it
   ========================================================== */

import os from "node:os";
import {
    performance,
} from "node:perf_hooks";

export type ServerTemporalProvenance =
    Readonly<{
        observer: Readonly<{
            kind: "server";

            runtime: Readonly<{
                name: "Node.js";
                version: string;
                versions: Readonly<
                    NodeJS.ProcessVersions
                >;
            }>;

            platform: Readonly<{
                platform: NodeJS.Platform;
                architecture: string;
                osType: string;
                osRelease: string;
                osVersion: string;
                machine: string;
            }>;

            temporalSources: Readonly<{
                wall: "Date.now";
                monotonic: "performance.now";
                performanceTimeOrigin: number;
            }>;
        }>;

        deployment: Readonly<{
            vercel: string | null;
            environment: string | null;
            region: string | null;
            gitCommitSha: string | null;
        }>;
    }>;

export function observeServerTemporalProvenance():
    ServerTemporalProvenance {
    return {
        observer: {
            kind: "server",

            runtime: {
                name: "Node.js",
                version: process.version,
                versions: {
                    ...process.versions,
                },
            },

            platform: {
                platform:
                    process.platform,
                architecture:
                    process.arch,
                osType:
                    os.type(),
                osRelease:
                    os.release(),
                osVersion:
                    os.version(),
                machine:
                    os.machine(),
            },

            temporalSources: {
                wall:
                    "Date.now",
                monotonic:
                    "performance.now",
                performanceTimeOrigin:
                    performance.timeOrigin,
            },
        },

        deployment: {
            vercel:
                process.env.VERCEL ??
                null,

            environment:
                process.env.VERCEL_ENV ??
                null,

            region:
                process.env.VERCEL_REGION ??
                null,

            gitCommitSha:
                process.env.VERCEL_GIT_COMMIT_SHA ??
                null,
        },
    };
}
