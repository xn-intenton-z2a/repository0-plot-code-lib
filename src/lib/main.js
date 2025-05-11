#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";
import minimist from "minimist";
import { z } from "zod";

// Define a regex to validate individual axis ranges
const rangePattern = /^([a-zA-Z]+)=(-?\d+(?:\.\d+)?):(-?\d+(?:\.\d+)?)$/;

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
 * Main entry point for parsing CLI arguments.
 * @param {string[]} [rawArgs] Optional arguments array for testing.
 * @returns {object|undefined} Returns the validated options or undefined on error.
 */
export function main(rawArgs) {
  const argv = rawArgs || process.argv.slice(2);
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
    const outputDir = fs.existsSync(args.output) && fs.statSync(args.output).isDirectory()
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

// If invoked directly, parse args and print the options
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const options = main();
  if (options) {
    console.log(options);
  }
}
