/*
 * OUTFLO — EARTH PROOF WORKFLOW
 *
 * One Earth emission -> one complete Proof lifecycle.
 * Earth orchestrates. Existing owners perform their operations.
 * Machine mathematics and independent Proof verification are unchanged.
 */

import { spawnSync } from "node:child_process";
import { randomUUID } from "node:crypto";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve, join } from "node:path";

const eventId = process.argv[2];

if (!eventId || !/^[A-Za-z0-9_-]+$/.test(eventId)) {
  throw new Error("Expected one USGS event ID");
}

const outputDir = resolve("../outflo-earth-data");
mkdirSync(outputDir, { recursive: true });

function run(
  stage: string,
  script: string,
  args: string[]
): string {
  console.log(`\n=== EARTH: ${stage} ===`);

  const result = spawnSync(
    process.execPath,
    [
      "--env-file=.env.local",
      "--conditions=react-server",
      "--import",
      "tsx",
      script,
      ...args
    ],
    {
      cwd: process.cwd(),
      encoding: "utf8",
      maxBuffer: 64 * 1024 * 1024
    }
  );

  if (result.error || result.status !== 0) {
    if (result.stdout) {
      console.error(result.stdout.slice(-12000));
    }
    if (result.stderr) {
      console.error(result.stderr);
    }

    throw result.error ??
      new Error(`${stage} failed with exit ${result.status}`);
  }

  return result.stdout.trim();
}

const source = "src/runtime/earth/source/";
const admission = "src/runtime/earth/admission/";
const time = "src/runtime/earth/time/";

try {
  const capture = run(
    "CAPTURE",
    source + "persistUsgsEventEvidence.cli.ts",
    [eventId]
  );

  const collectionIds = [
    ...capture.matchAll(
      /collectionId:\s*['"]([0-9a-f-]{36})['"]/gi
    )
  ];

  const collectionId = collectionIds.at(-1)?.[1];

  if (!collectionId) {
    throw new Error("Capture did not return a collection ID");
  }

  run(
    "VERIFY SOURCE",
    source + "verifyPersistedUsgsEvidence.cli.ts",
    [eventId, collectionId]
  );

  run(
    "ADMIT EVENT",
    admission + "admitStoredUsgsEvent.cli.ts",
    [eventId, collectionId]
  );

  run(
    "ADMIT SCIENTIFIC EVIDENCE",
    admission + "admitStoredUsgsScientificUnits.cli.ts",
    [eventId, collectionId, "--commit"]
  );

  const composed = JSON.parse(run(
    "COMPOSE TIME",
    time + "composeAdmittedEarthTime.cli.ts",
    [eventId, collectionId]
  ));

  if (
    composed.verdict !== "verified-temporal-relationships" ||
    composed.proofPersisted !== false ||
    composed.eventId !== eventId ||
    composed.collectionId !== collectionId ||
    !Array.isArray(composed.intervals) ||
    composed.intervals.length === 0 ||
    composed.intervals.length !== composed.verifiedIntervals
  ) {
    throw new Error("Earth temporal composition did not verify");
  }

  const executionId = randomUUID();

  const prefix = join(
    outputDir,
    `earth-${eventId}-${executionId}`
  );

  const compositionFile = prefix + "-composition.json";

  writeFileSync(
    compositionFile,
    JSON.stringify(composed, null, 2)
  );

  const recorded = JSON.parse(run(
    "RECORD PROOF",
    time + "recordAdmittedEarthProof.cli.ts",
    [eventId, collectionId, compositionFile]
  ));

  writeFileSync(
    prefix + "-record.json",
    JSON.stringify(recorded, null, 2)
  );

  if (
    recorded.verdict !== "persisted-and-read-back" ||
    recorded.eventId !== eventId ||
    recorded.collectionId !== collectionId ||
    typeof recorded.proofId !== "string"
  ) {
    throw new Error("Earth Proof recording did not verify");
  }

  const replayed = JSON.parse(run(
    "INDEPENDENT REPLAY",
    time + "replayAdmittedEarthProof.cli.ts",
    [recorded.proofId]
  ));

  if (
    replayed.verdict !== "independently-reproduced" ||
    replayed.databaseWrites !== false ||
    replayed.proofId !== recorded.proofId ||
    replayed.manifestSha256 !== recorded.manifestSha256 ||
    replayed.reproducedIntervals !== recorded.verifiedIntervals ||
    replayed.passingChecks !== recorded.passingChecks
  ) {
    throw new Error("Independent Earth Proof replay mismatch");
  }

  const result = {
    operation: "earth-proof-workflow-v1",
    eventId,
    collectionId,
    proofId: recorded.proofId,
    manifestSha256: recorded.manifestSha256,
    sourceReceipts: replayed.sourceReceiptsVerified,
    sourceBytesVerified: replayed.sourceBytesVerified,
    scientificIdentities: replayed.scientificIdentities,
    scientificClaims: replayed.admittedClaims,
    reproducedIntervals: replayed.reproducedIntervals,
    passingChecks: replayed.passingChecks,
    verdict: "independently-reproduced"
  };

  writeFileSync(
    prefix + "-result.json",
    JSON.stringify(result, null, 2)
  );

  console.log("\n=== EARTH PROOF COMPLETE ===");
  console.log(JSON.stringify(result, null, 2));

} catch (error) {
  console.error("\nEARTH WORKFLOW FAILED:", error);
  process.exitCode = 1;
}
