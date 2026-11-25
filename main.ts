// Famous Last Words: The Funniest Epitaph — make.fun bounty entry.
//
// The program writes one line to /output/entry.txt: the funniest possible
// famous last words as a single tombstone epitaph. The speaker spent his
// whole life rehearsing a profound farewell — and this underwhelming
// sentence is all that actually came out. The joke is the gap between the
// grand last words he promised himself and the flat line carved in stone.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE = "My final words were going to be profound. These will have to do.";

// The gate only accepts UTF-8 text of 1 to 150 characters, not only
// whitespace, on a single line: refuse to write anything that would fail it.
// Single-line means no line break of either kind: a stray "\r" would split
// the epitaph across lines on some readers, so reject it too.
if (
  LINE.length < 1 ||
  LINE.length > 150 ||
  LINE.trim() === "" ||
  LINE.includes("\n") ||
  LINE.includes("\r")
) {
  throw new Error(
    `entry line fails the gate: ${LINE.length} characters, ` +
      `single-line=${!LINE.includes("\n") && !LINE.includes("\r")}`,
  );
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
