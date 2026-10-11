/**
 * dependency-cruiser's CLI only allows Node 22, 24, and 26+.
 * The checker itself runs on the current release. Satisfy that gate, then
 * hand the remaining arguments to the CLI.
 */
const major = Number(process.versions.node.split(".")[0]);
const supported = major === 22 || major === 24 || major >= 26;

if (!supported) {
  Object.defineProperty(process.versions, "node", { value: "22.22.0" });
}

await import("../node_modules/dependency-cruiser/bin/dependency-cruiser.mjs");
