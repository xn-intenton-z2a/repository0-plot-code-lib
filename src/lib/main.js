#!/usr/bin/env node
// src/lib/main.js

import fs from 'fs';
import { fileURLToPath } from 'url';
import { evaluate } from 'mathjs';
import { z } from 'zod';

/**
 * Parse a range string into an array of numbers.
 * Formats: "start:end" or "start:end:step".
 * When step is omitted, uses points evenly spaced.
 */
export function parseRange(rangeStr, points = 100) {
  const parts = rangeStr.split(':');
  if (parts.length === 2) {
    const start = Number(parts[0]);
    const end = Number(parts[1]);
    if (Number.isNaN(start) || Number.isNaN(end)) {
      throw new Error('Invalid range numbers');
    }
    if (points < 2) {
      return [start];
    }
    const step = (end - start) / (points - 1);
    return Array.from({ length: points }, (_, i) => start + step * i);
  } else if (parts.length === 3) {
    const [startStr, endStr, stepStr] = parts;
    const start = Number(startStr);
    const end = Number(endStr);
    const step = Number(stepStr);
    if ([start, end, step].some((n) => Number.isNaN(n))) {
      throw new Error('Invalid range numbers');
    }
    if (step === 0) {
      throw new Error('Step cannot be zero');
    }
    const arr = [];
    if (step > 0) {
      for (let x = start; x <= end + 1e-12; x += step) {
        arr.push(parseFloat(x.toFixed(12)));
      }
    } else {
      for (let x = start; x >= end - 1e-12; x += step) {
        arr.push(parseFloat(x.toFixed(12)));
      }
    }
    return arr;
  } else {
    throw new Error('Invalid range format');
  }
}

/**
 * Evaluate expression for each x value.
 */
export function evaluateExpression(expression, xValues) {
  return xValues.map((x) => {
    let y;
    try {
      y = evaluate(expression, { x });
    } catch (err) {
      throw new Error(`Expression evaluation error: ${err.message}`);
    }
    if (typeof y !== 'number' || Number.isNaN(y)) {
      throw new Error('Expression did not evaluate to a number');
    }
    return { x, y };
  });
}

/**
 * Serialize data array to CSV string.
 */
export function serializeCSV(data) {
  const lines = ['x,y', ...data.map((d) => `${d.x},${d.y}`)];
  return lines.join('\n');
}

/**
 * Serialize data array to JSON string.
 */
export function serializeJSON(data) {
  return JSON.stringify(data, null, 2);
}

/**
 * Main CLI logic. Returns the output string or throws on error.
 */
export function mainCLI(argv = process.argv.slice(2)) {
  const flags = {};
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg.startsWith('--')) {
      const key = arg.slice(2);
      const value = argv[i + 1];
      if (!value || value.startsWith('--')) {
        throw new Error(`Missing value for flag --${key}`);
      }
      flags[key] = value;
      i++;
    }
  }
  // Map CLI keys to schema keys
  const toParse = {
    expression: flags.expression,
    range: flags.range,
    points: flags.points,
    format: flags.format,
    outputFile: flags['output-file'],
  };
  const schema = z.object({
    expression: z.string({ required_error: 'Missing required flag --expression' }),
    range: z.string({ required_error: 'Missing required flag --range' }),
    points: z.coerce.number().int().positive().default(100),
    format: z.enum(['csv', 'json']).default('csv'),
    outputFile: z.string().optional(),
  });
  let args;
  try {
    args = schema.parse(toParse);
  } catch (err) {
    const zErr = err;
    throw new Error(zErr.errors.map((e) => e.message).join('; '));
  }
  const xValues = parseRange(args.range, args.points);
  const data = evaluateExpression(args.expression, xValues);
  const output = args.format === 'csv' ? serializeCSV(data) : serializeJSON(data);
  if (args.outputFile) {
    fs.writeFileSync(args.outputFile, output);
  }
  return output;
}

/**
 * Wrapper for direct invocation.
 */
export function main(argv = process.argv.slice(2)) {
  // If no CLI args provided, exit gracefully
  if (argv.length === 0) {
    return;
  }
  try {
    const out = mainCLI(argv);
    if (!argv.includes('--output-file')) {
      process.stdout.write(out);
    }
    process.exit(0);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}
