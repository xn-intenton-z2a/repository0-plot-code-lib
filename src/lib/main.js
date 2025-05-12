#!/usr/bin/env node
// src/lib/main.js

import fs from "fs";
import path from "path";
import express from "express";
import { z } from "zod";
import { load as yamlLoad } from "js-yaml";
import { fileURLToPath } from "url";
import { create, all } from "mathjs";

const math = create(all);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Exported express app for HTTP API testing
export let httpApp;

/**
 * Parse command-line arguments into a key-value object.
 * Supports boolean flags when no value is provided.
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
    const next = args[i + 1];
    // Boolean flag if no value or next starts with '--'
    if (!next || next.startsWith('--')) {
      result[key] = true;
      continue;
    }
    // Key has a value
    result[key] = next;
    i++;
  }
  return result;
}

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
  const step = (max - min) / samples;
  const points = [];
  for (let i = 0; i <= samples; i++) {
    const x = min + step * i;
    const y = node.evaluate({ x });
    points.push({ x, y });
  }
  return points;
}

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

/**
 * CLI subcommand: stats
 */
export async function runStatsCli(argv) {
  let args;
  try {
    args = parseArgs(argv);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exitCode = 1;
    return;
  }
  const { expression, dataFile, range, samples, format, output } = args;
  const sampleCount = samples ? parseInt(samples, 10) : 100;
  const outFormat = format === 'text' ? 'text' : 'json';
  try {
    let points;
    if (expression) {
      if (!range) throw new Error('range is required when expression is provided');
      const rangeObj = parseRange(range);
      points = generateData(expression, rangeObj, sampleCount);
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
    let outStr;
    if (outFormat === 'text') {
      const lines = [];
      for (const [k, v] of Object.entries(stats)) {
        lines.push(`${k}: ${v.toFixed(2)}`);
      }
      outStr = lines.join('\n');
    } else {
      outStr = JSON.stringify(stats, null, 2);
    }
    if (output) {
      fs.writeFileSync(output, outStr);
    } else {
      process.stdout.write(outStr + (outFormat === 'text' ? '\n' : ''));  
    }
    process.exitCode = 0;
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exitCode = 1;
  }
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

async function setupHttp(app) {
  await createServer(app);
}

/**
 * Main entrypoint handling CLI and server modes.
 */
export async function main(argv = process.argv.slice(2)) {
  if (argv[0] === 'stats') {
    await runStatsCli(argv.slice(1));
    return;
  }

  const parsedArgs = parseArgs(argv);

  // Handle mission statement flag
  if (parsedArgs.mission) {
    try {
      const missionPath = path.resolve(__dirname, '..', '..', 'MISSION.md');
      const content = fs.readFileSync(missionPath, 'utf-8');
      console.log(content);
    } catch (err) {
      console.error(`Error reading mission statement: ${err.message}`);
      process.exitCode = 1;
    }
    return;
  }

  if (parsedArgs.serve) {
    const port = Number(parsedArgs.serve);
    const app = express();
    httpApp = app;
    await setupHttp(app);
    app.listen(port, () => console.log(`Listening on port ${port}`));
    return;
  }
  // CLI mode not implemented for stats endpoint other than stats subcommand
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}
