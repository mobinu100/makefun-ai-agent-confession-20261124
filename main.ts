import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const line = readFileSync(new URL("./entry.txt", import.meta.url), "utf8").trim();
if (line.length < 1 || line.length > 200) throw new Error(`entry length ${line.length}, must be 1-200`);
if (line.includes("\n")) throw new Error("entry must be one line");
if (!/\S/.test(line)) throw new Error("entry must not be blank");
writeFileSync(`${outDir}/entry.txt`, line, "utf8");
// Round-trip verify: read back what was written and confirm it matches exactly.
const written = readFileSync(`${outDir}/entry.txt`, "utf8");
if (written !== line) throw new Error("round-trip verify failed: output differs from entry");
if (Buffer.byteLength(written, "utf8") !== Buffer.byteLength(line, "utf8")) throw new Error("round-trip verify failed: byte length mismatch");
