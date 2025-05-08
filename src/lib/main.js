#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import minimist from "minimist";

export function main(inputArgs = []) {
  // If no explicit args provided, use CLI args from process.argv
  const cliArgs = process.argv.slice(2);
  const args = inputArgs.length === 0 && cliArgs.length > 0 ? cliArgs : inputArgs;

  const argv = minimist(args, {
    boolean: ["flow-sync"],
    default: { start: 0 },
  });
  const { "flow-sync": flowSync, start, end, step, _: exprs } = argv;

  if (flowSync) {
    if (end === undefined || step === undefined) {
      console.error(
        "Error: --end and --step are required when using --flow-sync"
      );
      process.exit(1);
    }
    const s = Number(start);
    const e = Number(end);
    const st = Number(step);
    const timestamps = [];
    for (let t = s; t <= e; t += st) {
      timestamps.push(t);
    }
    const series = exprs.map((expr) => {
      // eslint-disable-next-line no-new-func
      const fn = new Function("x", `with (Math) { return ${expr}; }`);
      const values = timestamps.map((t) => fn(t));
      return { expression: expr, values };
    });
    console.log(JSON.stringify({ timestamps, series }));
  } else {
    console.log(`Run with: ${JSON.stringify(args)}`);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}
