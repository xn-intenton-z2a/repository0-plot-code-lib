#!/usr/bin/env node
// src/lib/main.js

import fs from "fs";
import path from "path";
import { create, all } from "mathjs";
import sharp from "sharp";
import express from "express";
import { z } from "zod";
import { dump as yamlDump, load as yamlLoad } from "js-yaml";
import { fileURLToPath } from "url";

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
  range: z.string().regex(/^[a-zA-Z]+=-?\d+(\.\d+)?:-?\d+(\.\d+)?$/, 'range must be in the format axis=min:max'),
  format: z.enum(["svg", "png"]),
  output: z.string(),
  derivative: z.string().regex(/^(true|false)$/, 'derivative must be true or false').optional(),
  // TRENDLINE_FITTING flags
  'trendline-stats': z.string().regex(/^(true|false)$/, 'trendline-stats must be true or false').optional(),
  'overlay-trendline': z.string().regex(/^(true|false)$/, 'overlay-trendline must be true or false').optional(),
  // Plot styling options
  width: z.string().regex(/^\d+$/, 'width must be a positive integer').optional(),
  height: z.string().regex(/^\d+$/, 'height must be a positive integer').optional(),
  title: z.string().optional(),
  'x-label': z.string().optional(),
  'y-label': z.string().optional(),
  grid: z.string().regex(/^(true|false)$/, 'grid must be true or false').optional(),
  palette: z.enum(["default", "pastel", "dark", "highContrast"]).optional(),
  colors: z.string().optional(),
  'export-data': z.string().optional(),
  'export-format': z.enum(["csv","json","yaml"]).optional()
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

// ... existing code for generateDerivativeData, computeTrendlineStats, convertDataToString, generateSVG, generatePlot, main ...

/**
 * Compute summary statistics: min, max, mean, median, stddev.
 */
export function computeSummaryStats(points) {
  if (!Array.isArray(points) || points.length === 0) {
    throw new Error('No data points provided');
  }
  const ys = points.map(p => p.y);
  const n = ys.length;
  const sorted = [...ys].sort((a, b) => a - b);
  const min = sorted[0];
  const max = sorted[n - 1];
  const mean = ys.reduce((a, b) => a + b, 0) / n;
  const median = n % 2 === 1
    ? sorted[(n - 1) / 2]
    : (sorted[n / 2 - 1] + sorted[n / 2]) / 2;
  const variance = ys.reduce((sum, y) => sum + (y - mean) ** 2, 0) / n;
  const stddev = Math.sqrt(variance);
  return { min, max, mean, median, stddev };
}

// HTTP server extension
async function createServer(app) {
  app.get('/stats', async (req, res) => {
    // CORS header
    res.set('Access-Control-Allow-Origin', '*');
    const schema = z.object({
      expression: z.string().optional(),
      dataFile: z.string().optional(),
      range: z.string().optional(),
      samples: z.string().optional(),
      json: z.string().optional()
    });
    let params;
    try {
      params = schema.parse(req.query);
    } catch (e) {
      return res.status(400).json({ error: e.errors.map(er => er.message).join(', ') });
    }
    const { expression, dataFile, range, samples, json: jsonFlag } = params;
    const isJson = jsonFlag !== 'false';
    let points;
    try {
      const count = samples ? parseInt(samples, 10) : 100;
      if (expression) {
        if (!range) throw new Error('range is required when expression is provided');
        const rangeObj = parseRange(range);
        points = generateData(expression, rangeObj, count);
      } else if (dataFile) {
        const ext = path.extname(dataFile).toLowerCase();
        const raw = fs.readFileSync(dataFile, 'utf-8');
        if (ext === '.json') {
          points = JSON.parse(raw);
        } else if (ext === '.yaml' || ext === '.yml') {
          points = yamlLoad(raw);
        } else if (ext === '.csv') {
          points = raw.trim().split('\n').slice(1).map(line => {
            const [x, y] = line.split(',').map(Number);
            return { x, y };
          });
        } else {
          throw new Error('Unsupported dataFile format');
        }
      } else {
        throw new Error('expression or dataFile is required');
      }
      const stats = computeSummaryStats(points);
      if (!isJson) {
        res.type('text/plain');
        const lines = [];
        for (const [k, v] of Object.entries(stats)) {
          lines.push(`${k}: ${v.toFixed(2)}`);
        }
        return res.send(lines.join('\n'));
      }
      return res.json(stats);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  });
}

// integrate with existing server logic
async function setupHttp(app) {
  await createServer(app);
}

// ... in main, where HTTP server is configured ...
// replace the HTTP server block:

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
        derivative: raw.derivative === 'true',
        palette: raw.palette,
        colors: raw.colors,
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

  await setupHttp(app);

  app.listen(port, () => console.log(`Listening on port ${port}`));
  return;
}

// rest unchanged... (omit unchanged parts for brevity)

// CLI mode and file I/O unchanged

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}