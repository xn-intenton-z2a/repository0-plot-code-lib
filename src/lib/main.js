#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import { generatePlot } from "./plot.js";

export function main(args = []) {
  if (args.includes("--plot")) {
    const exprIdx = args.indexOf("--expr");
    const startIdx = args.indexOf("--start");
    const endIdx = args.indexOf("--end");

    if (exprIdx === -1 || startIdx === -1 || endIdx === -1) {
      console.error("Missing required parameters for plotting: --expr, --start, --end");
      process.exit(1);
    }

    const expression = args[exprIdx + 1];
    const start = parseFloat(args[startIdx + 1]);
    const end = parseFloat(args[endIdx + 1]);
    const stepIdx = args.indexOf("--step");
    const step = stepIdx !== -1 ? parseFloat(args[stepIdx + 1]) : 0.1;

    try {
      const svg = generatePlot(expression, start, end, step);
      console.log(svg);
    } catch (e) {
      console.error("Error generating plot:", e.message);
      process.exit(1);
    }
  } else {
    console.log(`Run with: ${JSON.stringify(args)}`);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  main(args);
}
