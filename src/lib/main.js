#!/usr/bin/env node
// src/lib/main.js

import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";
import { z } from "zod";
import { create, all } from "mathjs";
import sharp from "sharp";

const math = create(all);

export function parseArgs(args) {
  const booleanFlags = ["png"];
  const argsSchema = z.object({
    expression: z.string().optional(),
    range: z.string().optional(),
    output: z.string().optional(),
    input: z.string().optional(),
    inputFormat: z.enum(["csv", "json"]).optional(),
    png: z.boolean().optional(),
  });
  const parsed = {};
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg.startsWith("--")) {
      const key = arg.substring(2);
      if (booleanFlags.includes(key)) {
        parsed[key] = true;
      } else {
        const value = args[i + 1];
        if (value && !value.startsWith("--")) {
          parsed[key] = value;
          i++;
        } else {
          throw new Error(`Missing value for argument: ${arg}`);
        }
      }
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

export function parseInputFile(filePath, formatOverride) {
  const ext = path.extname(filePath).toLowerCase().slice(1);
  const format = formatOverride || ext;
  if (!["csv", "json"].includes(format)) {
    throw new Error("Unsupported input format");
  }
  const content = fs.readFileSync(filePath, "utf8");
  let xValues = [];
  let yValues = [];
  if (format === "csv") {
    const lines = content.split(/\r?\n/).filter((line) => line.trim() !== "");
    if (lines.length < 2) {
      throw new Error("CSV file must have at least a header and one data row");
    }
    const header = lines[0].split(",");
    if (header[0].trim() !== "x" || header[1].trim() !== "y") {
      throw new Error("CSV header must be 'x,y'");
    }
    for (let i = 1; i < lines.length; i++) {
      const cols = lines[i].split(",");
      if (cols.length !== 2) throw new Error(`Invalid CSV row: ${lines[i]}`);
      const x = parseFloat(cols[0]);
      const y = parseFloat(cols[1]);
      if (isNaN(x) || isNaN(y)) throw new Error(`Invalid number in CSV at row ${i + 1}`);
      xValues.push(x);
      yValues.push(y);
    }
  } else {
    let parsedJson;
    try {
      parsedJson = JSON.parse(content);
    } catch (err) {
      throw new Error(`Invalid JSON: ${err.message}`);
    }
    if (Array.isArray(parsedJson)) {
      for (const item of parsedJson) {
        if (typeof item.x !== "number" || typeof item.y !== "number") {
          throw new Error("JSON items must have numeric 'x' and 'y' properties");
        }
        xValues.push(item.x);
        yValues.push(item.y);
      }
    } else if (parsedJson.xValues && parsedJson.yValues) {
      if (!Array.isArray(parsedJson.xValues) || !Array.isArray(parsedJson.yValues)) {
        throw new Error("JSON must have 'xValues' and 'yValues' arrays");
      }
      xValues = parsedJson.xValues;
      yValues = parsedJson.yValues;
      if (xValues.length !== yValues.length) {
        throw new Error("Mismatched data lengths");
      }
      if (!xValues.every((x) => typeof x === "number") || !yValues.every((y) => typeof y === "number")) {
        throw new Error("JSON arrays must contain numbers");
      }
    } else {
      throw new Error("JSON must be an array of {x,y} or an object with xValues and yValues");
    }
  }
  if (xValues.length !== yValues.length) {
    throw new Error("Mismatched data lengths");
  }
  return { xValues, yValues };
}

export async function convertSVGtoPNG(svg) {
  return sharp(Buffer.from(svg)).png().toBuffer();
}

export async function main(argsParam) {
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
  let data;
  if (parsed.input) {
    try {
      data = parseInputFile(parsed.input, parsed.inputFormat);
    } catch (err) {
      console.error(err.message);
      process.exit(1);
    }
  } else {
    let rangeObj;
    try {
      rangeObj = parseRange(parsed.range);
    } catch (err) {
      console.error(err.message);
      process.exit(1);
    }
    try {
      data = generateData(parsed.expression, rangeObj);
    } catch (err) {
      console.error(`Error evaluating expression: ${err.message}`);
      process.exit(1);
    }
  }
  const svg = generateSVG(data);
  if (parsed.png) {
    try {
      const buffer = await convertSVGtoPNG(svg);
      if (parsed.output) {
        const outPath = path.isAbsolute(parsed.output)
          ? parsed.output
          : path.resolve(process.cwd(), parsed.output);
        fs.writeFileSync(outPath, buffer);
      } else {
        process.stdout.write(buffer);
      }
    } catch (err) {
      console.error(`Error generating PNG: ${err.message}`);
      process.exit(1);
    }
  } else {
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
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main(process.argv.slice(2));
}
