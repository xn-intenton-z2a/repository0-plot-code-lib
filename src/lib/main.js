#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import fs from "fs";
import { Parser } from "expr-eval";
import { z } from "zod";
import { createCanvas } from "canvas";

export function main(args = process.argv.slice(2)) {
  // If no arguments, do nothing (avoid validation errors)
  if (!args || args.length === 0) {
    return;
  }
  const parsed = parseAndValidateArgs(args);
  // Log parsed options for CLI parsing tests when not exporting
  if (!parsed.exportFormat) {
    console.log(JSON.stringify(parsed));
  }
  try {
    if (parsed.exportFormat) {
      exportTimeSeries(parsed);
    } else {
      generatePlot(parsed);
    }
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}

function generatePlot({ expression, range, format, output }) {
  // Parse numeric ranges for x and optional y
  const { xRange, yRange } = parseRanges(range);
  const { start: xStart, end: xEnd } = xRange;
  // Compile the expression
  const parser = new Parser();
  let expr;
  try {
    expr = parser.parse(expression);
  } catch (err) {
    throw new Error(`Invalid expression: ${expression}`);
  }
  // Sample points
  const points = [];
  const count = 100;
  for (let i = 0; i < count; i++) {
    const x = xStart + (i * (xEnd - xStart)) / (count - 1);
    let y;
    try {
      y = expr.evaluate({ x });
    } catch (err) {
      throw new Error(`Error evaluating expression at x=${x}: ${err.message}`);
    }
    points.push({ x, y });
  }
  // Determine y-range if missing
  let yStart, yEnd;
  if (yRange) {
    yStart = yRange.start;
    yEnd = yRange.end;
  } else {
    const ys = points.map((p) => p.y);
    yStart = Math.min(...ys);
    yEnd = Math.max(...ys);
  }
  const width = 800;
  const height = 600;
  if (format === "png") {
    // Render PNG via canvas
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    points.forEach((p, idx) => {
      const px = ((p.x - xStart) / (xEnd - xStart)) * width;
      const py = height - ((p.y - yStart) / (yEnd - yStart)) * height;
      if (idx === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    });
    ctx.strokeStyle = "black";
    ctx.stroke();
    const buffer = canvas.toBuffer("image/png");
    if (output === "-") {
      process.stdout.write(buffer);
    } else {
      fs.writeFileSync(output, buffer);
    }
  } else {
    // Render SVG
    const pts = points
      .map((p) => {
        const px = ((p.x - xStart) / (xEnd - xStart)) * width;
        const py = height - ((p.y - yStart) / (yEnd - yStart)) * height;
        return `${px},${py}`;
      })
      .join(" ");
    const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <polyline fill="none" stroke="black" points="${pts}" />
</svg>`;
    if (output === "-") {
      process.stdout.write(svg);
    } else {
      fs.writeFileSync(output, svg);
    }
  }
}

function parseRanges(rangeStr) {
  const parts = rangeStr.split(",");
  let xRange;
  let yRange;
  for (const part of parts) {
    let axis;
    let r = part;
    if (part.includes("=")) {
      const [ax, val] = part.split("=");
      axis = ax;
      r = val;
    } else if (parts.length === 1) {
      axis = "x";
    } else {
      throw new Error(`Invalid range format: ${rangeStr}`);
    }
    const [startStr, endStr] = r.split(":");
    if (endStr === undefined) {
      throw new Error(`Invalid range format: ${rangeStr}`);
    }
    const start = Number(startStr);
    const end = Number(endStr);
    if (isNaN(start) || isNaN(end)) {
      throw new Error(`Invalid numeric values in range: ${rangeStr}`);
    }
    if (axis === "x") {
      xRange = { start, end };
    } else if (axis === "y") {
      yRange = { start, end };
    } else {
      throw new Error(`Invalid axis in range: ${axis}`);
    }
  }
  if (!xRange) {
    throw new Error(`Invalid range format: ${rangeStr}`);
  }
  return { xRange, yRange };
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
  // Parse the numeric range (supports optional 'x=' prefix)
  const { start, end } = parseRange(range);
  // Parse and compile the mathematical expression
  const parser = new Parser();
  let expr;
  try {
    expr = parser.parse(expression);
  } catch (err) {
    throw new Error(`Invalid expression: ${expression}`);
  }
  // Reject any variable besides x
  if (typeof expr.variables === 'function') {
    const vars = expr.variables();
    if (vars.some((v) => v !== 'x')) {
      throw new Error(`Invalid expression: ${expression}`);
    }
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
  // Support optional 'x=' prefix
  let r = rangeStr;
  const eqIndex = r.indexOf("=");
  if (eqIndex !== -1) {
    r = r.slice(eqIndex + 1);
  }
  const parts = r.split(":");
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
  -r, --range <start:end> or x=<start:end>  Numeric range for x (e.g., "0:6.28" or "x=0:6.28,y=-1:1")
  -f, --format <svg|png>          Output image format (default: svg)
  -x, --export <csv|json>         Export sampled time series format (default: csv)
  -o, --output, --file <file>     Output file path (default: plot.svg)
  -h, --help                      Show help
`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}