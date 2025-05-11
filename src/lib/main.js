#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";
import minimist from "minimist";
import { z } from "zod";
import { Parser } from "expr-eval";

// Define a regex to validate individual axis ranges
the rangePattern = /^([a-zA-Z]+)=(-?\d+(?:\.\d+)?):(\-?\d+(?:\.\d+)?)$/;

// Zod schema for validated options
const optionsSchema = z.object({
  expression: z.string().min(1, "Expression cannot be empty"),
  range: z.record(z.tuple([z.number(), z.number()])),
  points: z.number().int().positive(),
  format: z.enum(["json", "csv"]),
  output: z.string().optional(),
});

// Parse a range string into an object mapping axes to [min, max]
function parseRange(rangeStr) {
  const axes = rangeStr.split(",");
  const result = {};
  for (const axisSpec of axes) {
    const match = rangePattern.exec(axisSpec.trim());
    if (!match) {
      throw new Error("Invalid range format");
    }
    const [, axis, minStr, maxStr] = match;
    result[axis] = [parseFloat(minStr), parseFloat(maxStr)];
  }
  return result;
}

/**
 * Generate a time series from an expression string, ranges, and number of points.
 * @param {string} expressionStr - Expression of the form "y=f(x,...)".
 * @param {object} ranges - Map of axis names to [min, max].
 * @param {number} points - Number of samples per axis.
 * @returns {Array<object>} - Array of sample objects.
 */
export function generateSeries(expressionStr, ranges, points) {
  // Split into output variable and expression
  const parts = expressionStr.split("=");
  if (parts.length !== 2) {
    throw new Error("Expression must be of the form 'y=f(x)' or similar");
  }
  const outputVar = parts[0].trim();
  const expr = parts[1].trim();

  // Prepare parser and compile function
  const parser = new Parser();
  const ast = parser.parse(expr);
  const inputVars = Object.keys(ranges);
  const fn = ast.toJSFunction(inputVars);

  // Build evenly spaced values for each axis
  const axisValues = {};
  for (const axis of inputVars) {
    const [min, max] = ranges[axis];
    const step = points > 1 ? (max - min) / (points - 1) : 0;
    axisValues[axis] = Array.from({ length: points }, (_, i) => min + step * i);
  }

  // Cartesian product of axis values
  const combos = axisValues[inputVars[0]].map((v) => [v]);
  for (let i = 1; i < inputVars.length; i++) {
    const axis = inputVars[i];
    const vals = axisValues[axis];
    const prev = combos.slice();
    combos.length = 0;
    for (const combo of prev) {
      for (const v of vals) {
        combos.push([...combo, v]);
      }
    }
  }

  // Evaluate each combination
  const series = combos.map((combo) => {
    const result = fn(...combo);
    const point = {};
    inputVars.forEach((axis, idx) => {
      point[axis] = combo[idx];
    });
    point[outputVar] = result;
    return point;
  });
  return series;
}

/**
 * Serialize series to pretty JSON.
 * @param {Array<object>} series
 * @returns {string}
 */
export function serializeJson(series) {
  return JSON.stringify(series, null, 2);
}

/**
 * Serialize series to CSV.
 * @param {Array<object>} series
 * @returns {string}
 */
export function serializeCsv(series) {
  if (!Array.isArray(series) || series.length === 0) {
    return "";
  }
  const keys = Object.keys(series[0]);
  const header = keys.join(",");
  const rows = series.map((point) => keys.map((k) => point[k]).join(","));
  return [header, ...rows].join("\n");
}

/**
 * Main entry point for parsing CLI arguments.
 * @param {string[]} [rawArgs]
 * @returns {object|undefined}
 */
export function main(rawArgs) {
  const argv = rawArgs || process.argv.slice(2);

  // If no CLI arguments are provided and not in test, skip validation
  if (!rawArgs && argv.length === 0) {
    return;
  }

  const args = minimist(argv, {
    string: ["expression", "range", "format", "output"],
    alias: { e: "expression", r: "range", p: "points", f: "format", o: "output" },
    default: { points: 1000, format: "json" },
  });

  // Check required flags
  if (!args.expression) {
    console.error("Missing required flag: expression");
    process.exitCode = 1;
    return;
  }
  if (!args.range) {
    console.error("Missing required flag: range");
    process.exitCode = 1;
    return;
  }

  // Parse and validate range
  let rangeObj;
  try {
    rangeObj = parseRange(args.range);
  } catch (err) {
    console.error(err.message);
    process.exitCode = 1;
    return;
  }

  // Validate format
  if (!["json", "csv"].includes(args.format)) {
    console.error("Unsupported format");
    process.exitCode = 1;
    return;
  }

  // Validate output path if provided
  if (args.output) {
    const outputDir =
      fs.existsSync(args.output) && fs.statSync(args.output).isDirectory()
        ? args.output
        : path.dirname(args.output);
    try {
      fs.accessSync(outputDir, fs.constants.W_OK);
    } catch {
      console.error(`Cannot write to output path: ${args.output}`);
      process.exitCode = 1;
      return;
    }
  }

  // Build options object
  const options = {
    expression: args.expression,
    range: rangeObj,
    points: Number(args.points),
    format: args.format,
    output: args.output,
  };

  // Validate with Zod
  const validation = optionsSchema.safeParse(options);
  if (!validation.success) {
    console.error(validation.error.message);
    process.exitCode = 1;
    return;
  }

  return options;
}

// If invoked directly, run the series generation and output logic
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const options = main();
  if (options) {
    try {
      const series = generateSeries(options.expression, options.range, options.points);
      let outputData;
      if (options.format === "json") {
        outputData = serializeJson(series);
      } else {
        outputData = serializeCsv(series);
      }
      if (options.output) {
        fs.writeFileSync(options.output, outputData);
      } else {
        process.stdout.write(outputData + "\n");
      }
    } catch (err) {
      console.error(err.message);
      process.exitCode = 1;
    }
  }
}
