#!/usr/bin/env node
// src/lib/main.js

import fs from 'fs';
import { create, all } from 'mathjs';
import sharp from 'sharp';
import { z } from 'zod';
import { fileURLToPath } from 'url';

const math = create(all);

/**
 * Parse command-line arguments into a key-value object.
 */
export function parseArgs(inputArgs) {
  const args = inputArgs || process.argv.slice(2);
  const result = {};
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (!arg.startsWith('--')) {
      throw new Error(`Unknown argument: ${arg}`);
    }
    const key = arg.slice(2);
    const value = args[i + 1];
    if (!value || value.startsWith('--')) {
      throw new Error(`Missing value for argument: ${arg}`);
    }
    i++;
    result[key] = value;
  }
  return result;
}

const cliSchema = z.object({
  expression: z.string(),
  range: z.string().regex(/^.+=[^:]+:[^:]+$/, 'range must be in the format axis=min:max'),
  format: z.enum(['svg', 'png']),
  output: z.string(),
});

/**
 * Parse a range string of the form axis=min:max.
 */
export function parseRange(rangeStr) {
  const [axis, values] = rangeStr.split('=');
  const [minStr, maxStr] = values.split(':');
  const min = Number(minStr);
  const max = Number(maxStr);
  if (Number.isNaN(min) || Number.isNaN(max)) {
    throw new Error(`Invalid range values: ${values}`);
  }
  return { axis, min, max };
}

/**
 * Generate time series data points for the provided expression and range.
 * @param {string} expression Expression string, can include 'y=' prefix.
 * @param {{min:number,max:number}} range Range object.
 * @param {number} samples Number of segments (default 100).
 */
export function generateData(expression, range, samples = 100) {
  const expr = expression.includes('=') ? expression.split('=')[1].trim() : expression;
  const node = math.compile(expr);
  const { min, max } = range;
  const count = samples;
  const step = (max - min) / count;
  const points = [];
  for (let i = 0; i <= count; i++) {
    const x = min + step * i;
    const y = node.evaluate({ x });
    points.push({ x, y });
  }
  return points;
}

/**
 * Generate a basic SVG string containing a polyline for the data points.
 */
export function generateSVG(points, width = 500, height = 500) {
  const pointsAttr = points.map(p => `${p.x},${p.y}`).join(' ');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
  <polyline fill="none" stroke="black" points="${pointsAttr}" />
</svg>`;
}

/**
 * Main entrypoint for the CLI. Parses flags, generates data, and writes SVG or PNG.
 */
export async function main(inputArgs) {
  const args = inputArgs || process.argv.slice(2);
  if (args.length === 0) {
    console.log(`Run with: ${JSON.stringify(args)}`);
    return;
  }

  let parsed;
  try {
    const result = parseArgs(args);
    parsed = cliSchema.parse(result);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }

  const { expression, range, format, output } = parsed;
  const rangeObj = parseRange(range);
  const data = generateData(expression, rangeObj, 100);

  if (format === 'svg') {
    const svg = generateSVG(data);
    fs.writeFileSync(output, svg);
  } else {
    const svg = generateSVG(data);
    const buffer = await sharp(Buffer.from(svg)).png().toBuffer();
    fs.writeFileSync(output, buffer);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}
