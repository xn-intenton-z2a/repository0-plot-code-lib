#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import fs from "fs";
import { Parser } from "expr-eval";
import { z } from "zod";

export function main(args = process.argv.slice(2)) {
  // If no arguments, do nothing (avoid validation errors)
  if (!args || args.length === 0) {
    return;
  }
  const parsed = parseAndValidateArgs(args);
  // If export flag is provided, generate time series export
  if (parsed.exportFormat) {
    try {
      exportTimeSeries(parsed);
    } catch (err) {
      console.error(err.message);
      process.exit(1);
    }
    return;
  }
  // Fallback: plot generation (stubbed)
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
      case "--export":
      case "-x":
        raw.exportFormat = args[++i];
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
    exportFormat: z.enum(["csv", "json"]).optional(),
    output: z.string().nonempty().default("plot.svg"),
  });
  return schema.parse(raw);
}

function exportTimeSeries({ expression, range, exportFormat, output }) {
  // Parse the numeric range
  const { start, end } = parseRange(range);
  // Parse and compile the mathematical expression
  const parser = new Parser();
  let expr;
  try {
    expr = parser.parse(expression);
  } catch (err) {
    throw new Error(`Invalid expression: ${expression}`);
  }
  // Sample the function at 100 evenly spaced points
  const points = [];
  const count = 100;
  for (let i = 0; i < count; i++) {
    const x = start + (i * (end - start)) / (count - 1);
    let y;
    try {
      y = expr.evaluate({ x });
    } catch (err) {
      throw new Error(`Error evaluating expression at x=${x}: ${err.message}`);
    }
    points.push({ x, y });
  }
  // Serialize data
  let content;
  if (exportFormat === "csv") {
    const rows = ["x,y", ...points.map((p) => `${p.x},${p.y}`)];
    content = rows.join("\n");
  } else {
    content = JSON.stringify(points, null, 2);
  }
  // Write to file or stdout
  if (output === "-") {
    process.stdout.write(content);
  } else {
    fs.writeFileSync(output, content);
  }
}

function parseRange(rangeStr) {
  const parts = rangeStr.split(":");
  if (parts.length !== 2) {
    throw new Error(`Invalid range format: ${rangeStr}`);
  }
  const start = Number(parts[0]);
  const end = Number(parts[1]);
  if (isNaN(start) || isNaN(end)) {
    throw new Error(`Invalid numeric values in range: ${rangeStr}`);
  }
  return { start, end };
}

function printHelp() {
  console.log(`
Usage: repository0-plot-code-lib [options]

Options:
  -e, --expression <expr>         A mathematical expression in x (e.g., "sin(x)")
  -r, --range <range>             Numeric range for x (e.g., "0:6.28")
  -f, --format <svg|png>          Output image format (default: svg)
  -x, --export <csv|json>         Export sampled time series format (default: csv)
  -o, --output, --file <file>     Output file path (default: plot.svg)
  -h, --help                      Show help
`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}
