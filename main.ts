import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const line = readFileSync(new URL("./entry.txt", import.meta.url), "utf8").trim();
if (line.length < 1 || line.length > 200) throw new Error(`entry length ${line.length}, must be 1-200`);
if (line.includes("\n")) throw new Error("entry must be one line");
writeFileSync(`${outDir}/entry.txt`, line, "utf8");
