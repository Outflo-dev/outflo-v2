/*
 * OUTFLO — EARTH
 * First source-to-Machine temporal inspection.
 *
 * Earth owns source interpretation.
 * Machine owns canonical mathematics.
 *
 * No persistence. No Proof claim.
 */

import { readFile, readdir } from "node:fs/promises";
import { createHash } from "node:crypto";
import { join, resolve } from "node:path";
import { machine } from "../../../machine";

const directory = resolve("../outflo-earth-data");

const modernUtcStart = Date.parse(
  "2017-01-01T00:00:00.000Z"
);

function resolveEarthTimestamp(
  label: string,
  milliseconds: unknown
) {
  if (
    typeof milliseconds !== "number" ||
    !Number.isSafeInteger(milliseconds)
  ) {
    throw new Error(`${label}: invalid Unix milliseconds`);
  }

  if (milliseconds < modernUtcStart) {
    throw new Error(
      `${label}: historical TAI-UTC resolution required`
    );
  }

  const instant =
    machine.clock.resolveUnixMillisecondObservation128(
      BigInt(milliseconds)
    );

  return {
    unixMilliseconds: milliseconds,
    utc: new Date(milliseconds).toISOString(),
    temporalInstant128:
      machine.clock.serializeTemporalInstant128(instant),
  };
}

async function main() {
  const receipts = (await readdir(directory))
    .filter(name => name.endsWith(".receipt.json"))
    .sort();

  const receiptFile = receipts.at(-1);

  if (!receiptFile) {
    throw new Error("No preserved Earth receipt found");
  }

  const receipt = JSON.parse(
    await readFile(join(directory, receiptFile), "utf8")
  );

  const bytes = await readFile(
    join(directory, receipt.filename)
  );

  const sha256 = createHash("sha256")
    .update(bytes)
    .digest("hex");

  if (sha256 !== receipt.sha256) {
    throw new Error("Earth source checksum mismatch");
  }

  const source = JSON.parse(bytes.toString("utf8"));

  if (
    source.type !== "FeatureCollection" ||
    !Array.isArray(source.features) ||
    source.features.length !== receipt.observationCount
  ) {
    throw new Error("Earth source structure/count mismatch");
  }

  const event = source.features[0];

  if (!event || event.type !== "Feature") {
    throw new Error("No valid Earth event found");
  }

  const occurrence = resolveEarthTimestamp(
    "occurrence",
    event.properties.time
  );

  const updated = resolveEarthTimestamp(
    "source update",
    event.properties.updated
  );

  const sourceRevisionGap =
    machine.clock.measureTemporalDurationBetweenInstants(
      machine.clock.resolveUnixMillisecondObservation128(
        BigInt(occurrence.unixMilliseconds)
      ),
      machine.clock.resolveUnixMillisecondObservation128(
        BigInt(updated.unixMilliseconds)
      )
    );

  console.log(
    JSON.stringify({
      operation: "earth-source-to-machine-001",
      source: "USGS",
      sourceSha256: sha256,
      eventId: event.id,
      magnitude: event.properties.mag,
      location: event.properties.place,
      occurrence,
      sourceUpdate: updated,
      sourceRevisionGap: {
        elapsedUnixMilliseconds:
          updated.unixMilliseconds - occurrence.unixMilliseconds,
        temporalDuration128:
          machine.clock.serializeTemporalDuration128(
            sourceRevisionGap
          )
      },
      persistence: false,
      independentlyVerifiedProof: false
    }, null, 2)
  );
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
