/*
 * OUTFLO — EARTH
 * USGS SOURCE COLLECTION
 *
 * Owner: Earth source collection
 *
 * Pulls real observations from USGS.
 * Preserves raw evidence outside the repository.
 *
 * Does not own admission, Machine mathematics,
 * canonical persistence, or Proof verification.
 */

import { createHash } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import { resolve, join } from "node:path";

const SOURCE =
    "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson";

const OUTPUT =
    resolve(process.cwd(), "../outflo-earth-data");

async function main() {
    console.log("OUTFLO EARTH — SOURCE COLLECTION");

    const response = await fetch(SOURCE, {
        signal: AbortSignal.timeout(30000),
    });

    if (!response.ok) {
        throw new Error(
            `USGS request failed: ${response.status}`,
        );
    }

    const bytes = Buffer.from(
        await response.arrayBuffer(),
    );

    const data = JSON.parse(bytes.toString("utf8"));

    if (
        data.type !== "FeatureCollection" ||
        !Array.isArray(data.features)
    ) {
        throw new Error("Unexpected USGS response.");
    }

    const sha256 = createHash("sha256")
        .update(bytes)
        .digest("hex");

    const retrievedAt = new Date().toISOString();

    const stamp = retrievedAt.replace(/[:.]/g, "-");

    await mkdir(OUTPUT, { recursive: true });

    const filename = `usgs-all-hour-${stamp}.geojson`;

    await writeFile(join(OUTPUT, filename), bytes);

    const receipt = {
        source: "USGS",
        sourceUrl: SOURCE,
        retrievedAt,
        sourceGenerated: data.metadata?.generated ?? null,
        observationCount: data.features.length,
        bytes: bytes.length,
        sha256,
        filename,
    };

    await writeFile(
        join(OUTPUT, `${filename}.receipt.json`),
        JSON.stringify(receipt, null, 2),
    );

    console.log("\n=== COLLECTION RECEIPT ===");
    console.log(JSON.stringify(receipt, null, 2));

    const first = data.features[0];

    if (first) {
        console.log("\n=== FIRST EARTH OBSERVATION ===");
        console.log(JSON.stringify({
            id: first.id,
            occurrenceUnixMs: first.properties.time,
            updatedUnixMs: first.properties.updated,
            magnitude: first.properties.mag,
            magnitudeType: first.properties.magType,
            coordinates: first.geometry?.coordinates,
            status: first.properties.status,
        }, null, 2));
    }
}

main().catch((error) => {
    console.error("Earth collection failed:", error);
    process.exitCode = 1;
});
