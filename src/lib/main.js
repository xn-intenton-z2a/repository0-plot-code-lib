#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import { z } from "zod";

export function main(args = process.argv.slice(2)) {
  // If no arguments, do nothing (avoid validation errors)
  if (!args || args.length === 0) {
    return;
  }
  const parsed = parseAndValidateArgs(args);
  // For demonstration, just log parsed options
  console.log(`Parsed options: ${JSON.stringify(parsed)}`);
}

function parseAndValidateArgs(args) {
  const raw = {};
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    switch (arg) {
      case "--expression":
      case "-e":
        raw.expression = args[++i];
        break;
      case "--range":
      case "-r":
        raw.range = args[++i];
        break;
      case "--format":
      case "-f":
        raw.format = args[++i];
        break;
      case "--output":
      case "-o":
      case "--file":
        raw.output = args[++i];
        break;
      case "--help":
      case "-h":
        printHelp();
        process.exit(0);
      default:
        // Ignore unknown flags or values
        break;
    }
  }
  const schema = z.object({
    expression: z.string().nonempty(),
    range: z.string().nonempty(),
    format: z.enum(["svg", "png"]).default("svg"),
    output: z.string().nonempty().default("plot.svg"),
  });
  return schema.parse(raw);
}

function printHelp() {
  console.log(`
Usage: repository0-plot-code-lib [options]

Options:
  -e, --expression <expr>      A mathematical expression in x (e.g., "sin(x)")
  -r, --range <range>          Numeric range for x (e.g., "x=0:6.28")
  -f, --format <svg|png>       Output image format (default: svg)
  -o, --output, --file <file>  Output file path (default: plot.svg)
  -h, --help                   Show help
`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}