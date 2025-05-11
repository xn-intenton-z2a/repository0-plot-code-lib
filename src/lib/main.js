#!/usr/bin/env node
// src/lib/main.js

import fs from 'fs';
import path from 'path';
import { create, all } from 'mathjs';
import sharp from 'sharp';
import express from 'express';
import { z } from 'zod';
import { fileURLToPath } from 'url';

const math = create(all);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Exported express app for HTTP API testing
export let httpApp;

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
  const pointsAttr = points.map((p) => `${p.x},${p.y}`).join(' ');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">  
  <polyline fill="none" stroke="black" points="${pointsAttr}" />
</svg>`;
}

/**
 * Generate a plot programmatically without file I/O.
 * @param {Object} options Programmatic options for plot generation.
 * @returns {Promise<{type: 'svg', data: string} | {type: 'png', data: Buffer}>}
 */
export async function generatePlot(options) {
  const schema = z.object({
    expression: z.string(),
    range: z.string().regex(/^.+=[^:]+:[^:]+$/, 'range must be in the format axis=min:max'),
    format: z.enum(['svg', 'png']),
    width: z.number().int().positive().optional(),
    height: z.number().int().positive().optional(),
    samples: z.number().int().positive().optional(),
    xLog: z.boolean().optional(),
    yLog: z.boolean().optional(),
    grid: z.boolean().optional(),
    title: z.string().optional(),
    xLabel: z.string().optional(),
    yLabel: z.string().optional(),
  });
  const opts = schema.parse(options);
  const {
    expression,
    range,
    format,
    width = 500,
    height = 500,
    samples = 100,
    xLog = false,
    yLog = false,
  } = opts;
  const rangeObj = parseRange(range);
  let data = generateData(expression, rangeObj, samples);
  if (xLog) {
    data = data.map((p) => {
      if (p.x <= 0) {
        throw new Error('x values must be positive for log scale');
      }
      return { x: Math.log10(p.x), y: p.y };
    });
  }
  if (yLog) {
    data = data.map((p) => {
      if (p.y <= 0) {
        throw new Error('y values must be positive for log scale');
      }
      return { x: p.x, y: Math.log10(p.y) };
    });
  }
  const svg = generateSVG(data, width, height);
  if (format === 'svg') {
    return { type: 'svg', data: svg };
  }
  const buffer = await sharp(Buffer.from(svg)).png().toBuffer();
  return { type: 'png', data: buffer };
}

/**
 * Main entrypoint for the CLI. Parses flags, generates data, and writes SVG or PNG.
 */
export async function main(inputArgs) {
  const args = inputArgs || process.argv.slice(2);

  // Standard discovery flags
  if (args.length === 1) {
    const flag = args[0];
    if (flag === '--help') {
      const usagePath = path.resolve(__dirname, '../../USAGE.md');
      const usageText = fs.readFileSync(usagePath, 'utf-8');
      console.log(usageText);
      process.exit(0);
    }
    if (flag === '--version') {
      const pkgPath = path.resolve(__dirname, '../../package.json');
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
      console.log(pkg.version);
      process.exit(0);
    }
    if (flag === '--mission') {
      const missionPath = path.resolve(__dirname, '../../MISSION.md');
      const missionText = fs.readFileSync(missionPath, 'utf-8');
      console.log(missionText);
      process.exit(0);
    }
  }

  if (args.length === 0) {
    console.log(`Run with: ${JSON.stringify(args)}`);
    return;
  }

  let parsedArgs;
  try {
    parsedArgs = parseArgs(args);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }

  // HTTP server mode
  if (parsedArgs.serve) {
    const port = Number(parsedArgs.serve);
    const app = express();
    httpApp = app;

    app.get('/plot', async (req, res) => {
      try {
        const raw = req.query;
        const opts = {
          expression: raw.expression,
          range: raw.range,
          format: raw.format,
          width: raw.width ? parseInt(raw.width, 10) : undefined,
          height: raw.height ? parseInt(raw.height, 10) : undefined,
          samples: raw.samples ? parseInt(raw.samples, 10) : undefined,
          xLog: raw.xLog === 'true',
          yLog: raw.yLog === 'true',
          grid: raw.grid === 'true',
          title: raw.title,
          xLabel: raw.xLabel,
          yLabel: raw.yLabel,
        };
        const result = await generatePlot(opts);
        if (result.type === 'svg') {
          res.type('image/svg+xml').send(result.data);
        } else {
          res.type('image/png').send(result.data);
        }
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
    });

    app.listen(port, () => console.log(`Listening on port ${port}`));
    return;
  }

  // CLI mode
  let parsed;
  try {
    parsed = cliSchema.parse(parsedArgs);
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
