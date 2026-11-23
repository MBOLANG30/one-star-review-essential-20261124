// One-Star Review of Something Essential — a deadpan one-star review of sleep.
//
// The program writes one single line of text, between 1 and 160 characters,
// to <outputDir>/entry.txt. The sealed scorer only accepts a valid entry, so
// the line is checked here first and the program fails loudly when the
// contract is broken. The output directory comes from MAKEFUN_OUTPUT_DIR
// when the grader sets it, and defaults to /output otherwise. Nothing in
// the output directory is ever removed: the grader may mount it, so we only
// add our file to it.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const REVIEW =
  "Sleep: I give it eight hours every night and it still returns me tired. No refund, no customer service.";

function main(): void {
  const chars = [...REVIEW].length;
  if (chars < 1 || chars > 160) {
    throw new Error(`Review must be 1-160 characters, got ${chars}.`);
  }
  if (REVIEW.trim().length === 0) {
    throw new Error("Review must not be only whitespace.");
  }
  if (/[\r\n]/.test(REVIEW)) {
    throw new Error("Review must be a single line.");
  }
  const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outputDir, { recursive: true });
  const target = join(outputDir, "entry.txt");
  writeFileSync(target, REVIEW, "utf8");
  console.log(`Wrote a ${chars}-character one-star review to ${target}.`);
}

main();
