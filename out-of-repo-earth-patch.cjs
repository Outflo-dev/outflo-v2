const fs = require("node:fs");

const file =
  "src/runtime/earth/admission/admitEarthSeismicCall.cli.ts";

const original = fs.readFileSync(file, "utf8");
let updated = original;

function replaceOnce(before, after) {
  const first = updated.indexOf(before);

  if (
    first === -1 ||
    updated.indexOf(before, first + before.length) !== -1
  ) {
    throw new Error("Expected exactly one match: " + before);
  }

  updated = updated.replace(before, after);
}

replaceOnce(
  "  const event = await response.json();",
  `  const sourceBytes = Buffer.from(await response.arrayBuffer());
  const event = JSON.parse(sourceBytes.toString("utf8"));`
);

replaceOnce(
  "  console.log(JSON.stringify({",
  String.raw`  // Preserve the exact USGS response under the existing Emission ID.
  const emitted = await db
    .from("emissions_earth_seismic_source_data")
    .insert({
      emission_id: emissionId,
      admission_id: inserted.data.admission_id,
      type: event.type,
      properties: event.properties,
      geometry: event.geometry,
      id: event.id,
      source_bytes: "\\x" + sourceBytes.toString("hex"),
    })
    .select("emission_id")
    .single();

  if (emitted.error || emitted.data?.emission_id !== emissionId) {
    throw emitted.error ??
      new Error("Emission insert failed; inspect the Admission");
  }

  const emissionReadback = await db
    .from("emissions_earth_seismic_source_data")
    .select("emission_id,admission_id,type,id,source_bytes")
    .eq("emission_id", emissionId)
    .eq("admission_id", inserted.data.admission_id)
    .single();

  const storedBytes = emissionReadback.data?.source_bytes;

  if (
    emissionReadback.error ||
    emissionReadback.data?.emission_id !== emissionId ||
    emissionReadback.data?.admission_id !== inserted.data.admission_id ||
    emissionReadback.data?.type !== event.type ||
    emissionReadback.data?.id !== event.id ||
    typeof storedBytes !== "string" ||
    !storedBytes.startsWith("\\x") ||
    !Buffer.from(storedBytes.slice(2), "hex").equals(sourceBytes)
  ) {
    throw new Error("Exact Emission readback failed");
  }

  console.log(JSON.stringify({`
);

replaceOnce(
  '    persistence: "confirmed",',
  `    persistence: "confirmed",
    emissionPersistence: "confirmed",
    originalSourceBytes: sourceBytes.length,
    exactEmissionReadback: true,`
);

const backup = file + ".before-emission.bak";

if (fs.existsSync(backup)) {
  throw new Error("Backup already exists; no changes made");
}

fs.copyFileSync(file, backup);
fs.writeFileSync(file, updated);

console.log("Emission connection added.");
console.log("Original CLI preserved at:", backup);
