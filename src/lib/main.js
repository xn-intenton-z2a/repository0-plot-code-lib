#!/usr/bin/env node
// src/lib/main.js

import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";
import { z } from "zod";
import { create, all } from "mathjs";

const math = create(all);

export function parseArgs(args) {
  const argsSchema = z.object({
    expression: z.string(),
    range: z.string(),
    output: z.string().optional(),
  });
  const parsed = {};
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg.startsWith("--")) {
      const key = arg.substring(2);
      const value = args[i + 1];
      parsed[key] = value;
      i++;
    }
  }
  return argsSchema.parse(parsed);
}

export function parseRange(rangeStr) {
  const [varName, rangePart] = rangeStr.split("=");
  if (!varName || !rangePart) {
    throw new Error(`Invalid range format: ${rangeStr}`);
  }
  const parts = rangePart.split(":").map((p) => parseFloat(p));
  const min = parts[0];
  const max = parts[1];
  const step = parts.length >= 3 && !isNaN(parts[2]) ? parts[2] : 1;
  if (isNaN(min) || isNaN(max) || isNaN(step)) {
    throw new Error(`Invalid range numbers in: ${rangeStr}`);
  }
  return { varName, min, max, step };
}

export function generateData(expression, { varName, min, max, step }) {
  const expr = math.parse(expression).compile();
  const xValues = math.range(min, max, step, true).toArray();
  const yValues = xValues.map((x) => expr.evaluate({ [varName]: x }));
  return { xValues, yValues };
}

export function generateSVG({ xValues, yValues }, options = {}) {
  const width = options.width || 800;
  const height = options.height || 600;
  const margin = options.margin || 40;

  const minX = Math.min(...xValues);
  const maxX = Math.max(...xValues);
  const minY = Math.min(...yValues);
  const maxY = Math.max(...yValues);
  const xScale = (width - 2 * margin) / (maxX - minX || 1);
  const yScale = (height - 2 * margin) / (maxY - minY || 1);

  const points = xValues
    .map((x, i) => {
      const y = yValues[i];
      const px = margin + (x - minX) * xScale;
      const py = height - margin - (y - minY) * yScale;
      return `${px},${py}`;
    })
    .join(" ");

  const axes = [
    `<line x1="${margin}" y1="${margin}" x2="${margin}" y2="${height - margin}" stroke="black"/>`,
    `<line x1="${margin}" y1="${height - margin}" x2="${width - margin}" y2="${height - margin}" stroke="black"/>`,
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  ${axes.join("\n  ")}
  <polyline fill="none" stroke="black" stroke-width="2" points="${points}"/>
</svg>`;
}

export function main(argsParam) {
  const args = argsParam ?? process.argv.slice(2);
  if (!args || args.length === 0) {
    console.log(`Run with: ${JSON.stringify(args)}`);
    return;
  }
  let parsed;
  try {
    parsed = parseArgs(args);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
  let rangeObj;
  try {
    rangeObj = parseRange(parsed.range);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
  let data;
  try {
    data = generateData(parsed.expression, rangeObj);
  } catch (err) {
    console.error(`Error evaluating expression: ${err.message}`);
    process.exit(1);
  }
  const svg = generateSVG(data);
  if (parsed.output) {
    try {
      const outPath = path.isAbsolute(parsed.output)
        ? parsed.output
        : path.resolve(process.cwd(), parsed.output);
      fs.writeFileSync(outPath, svg, "utf8");
    } catch (err) {
      console.error(`Error writing file: ${err.message}`);
      process.exit(1);
    }
  } else {
    console.log(svg);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}
