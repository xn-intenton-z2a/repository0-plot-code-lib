#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import { create, all } from "mathjs";
import { z } from "zod";

const math = create(all);

/**
 * Parse a range specification string of the form "x=start:end[:step]".
 * @param {string} rangeSpec
 * @returns {{ start: number, end: number, step: number }}
 */
export function parseRange(rangeSpec) {
  const parts = rangeSpec.split("=");
  if (parts.length !== 2 || parts[0] !== "x") {
    throw new Error(`Invalid range specification: ${rangeSpec}`);
  }
  const nums = parts[1].split(":").map(Number);
  if (nums.some((n) => Number.isNaN(n))) {
    throw new Error(`Range contains non-numeric values: ${rangeSpec}`);
  }
  const [start, end, step = 1] = nums;
  if (step === 0) {
    throw new Error("Step cannot be zero");
  }
  return { start, end, step };
}

/**
 * Generate a time series by evaluating an expression over a numeric range.
 * @param {string} expression - A mathematical expression in terms of x (e.g., "sin(x)").
 * @param {string} rangeSpec - Range specifier "x=start:end[:step]".
 * @returns {Array<{ x: number, y: number }>}
 */
export function generateTimeSeries(expression, rangeSpec) {
  // Validate inputs
  const exprSchema = z.string().nonempty("Expression must be a non-empty string");
  const rangeSchema = z
    .string()
    .regex(/^x=[+-]?\d+(?:\.\d+)?:[+-]?\d+(?:\.\d+)?(?::[+-]?\d+(?:\.\d+)?)?$/, "Range must match x=start:end[:step]");
  exprSchema.parse(expression);
  rangeSchema.parse(rangeSpec);

  const { start, end, step } = parseRange(rangeSpec);
  const node = math.parse(expression);
  const compiled = node.compile();

  const series = [];
  const eps = Math.abs(step) / 1e9;
  if (step > 0) {
    for (let x = start; x <= end + eps; x += step) {
      const y = compiled.evaluate({ x });
      series.push({ x, y: Number(y) });
    }
  } else {
    for (let x = start; x >= end - eps; x += step) {
      const y = compiled.evaluate({ x });
      series.push({ x, y: Number(y) });
    }
  }
  return series;
}

/**
 * CLI entrypoint.
 * Flags:
 *   --expression <string>
 *   --range <string>
 */
export function main(args = process.argv.slice(2)) {
  const exprIndex = args.indexOf("--expression");
  const rangeIndex = args.indexOf("--range");
  if (exprIndex !== -1 && rangeIndex !== -1) {
    const expression = args[exprIndex + 1];
    const rangeSpec = args[rangeIndex + 1];
    try {
      const series = generateTimeSeries(expression, rangeSpec);
      console.log(JSON.stringify(series, null, 2));
    } catch (err) {
      console.error(`Error: ${err.message}`);
      process.exit(1);
    }
  } else {
    console.log(`Run with: ${JSON.stringify(args)}`);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main(process.argv.slice(2));
}
