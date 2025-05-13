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
 * Compute histogram: divide y-range into equal bins and count points.
 */
export function computeHistogram(points, binCount) {
  if (!Array.isArray(points) || points.length === 0) {
    throw new Error('No data points provided');
  }
  const ys = points.map(p => p.y);
  const min = Math.min(...ys);
  const max = Math.max(...ys);
  const binWidth = (max - min) / binCount;
  const bins = [];
  for (let i = 0; i < binCount; i++) {
    bins.push({
      binStart: min + binWidth * i,
      binEnd: min + binWidth * (i + 1),
      count: 0
    });
  }
  points.forEach((p) => {
    let idx = Math.floor((p.y - min) / binWidth);
    if (idx < 0) idx = 0;
    if (idx >= binCount) idx = binCount - 1;
    bins[idx].count++;
  });
  return bins;
}

/**
 * Compute linear regression (least-squares) slope, intercept, and r2.
 */
export function computeRegression(points) {
  if (!Array.isArray(points) || points.length === 0) {
    throw new Error('No data points provided');
  }
  const n = points.length;
  let sumX = 0;
  let sumY = 0;
  let sumXY = 0;
  let sumX2 = 0;
  let sumY2 = 0;
  points.forEach(({ x, y }) => {
    sumX += x;
    sumY += y;
    sumXY += x * y;
    sumX2 += x * x;
    sumY2 += y * y;
  });
  const meanX = sumX / n;
  const meanY = sumY / n;
  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const intercept = meanY - slope * meanX;
  const ssTot = points.reduce((sum, p) => sum + (p.y - meanY) ** 2, 0);
  const ssRes = points.reduce((sum, p) => sum + (p.y - (slope * p.x + intercept)) ** 2, 0);
  const r2 = ssTot === 0 ? 1 : 1 - ssRes / ssTot;
  return { slope, intercept, r2 };
}

/**
 * CLI subcommand: stats
 */
export async function runStatsCli(argv) {
  // existing stats implementation...
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
  // New flags
  const histFlag = args.histogram && args.histogram !== 'false';
  const binCount = args.bins ? parseInt(args.bins, 10) : 10;
  const trendFlag = args['trendline-stats'] && args['trendline-stats'] !== 'false';

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
    if (trendFlag) {
      const reg = computeRegression(points);
      stats.slope = reg.slope;
      stats.intercept = reg.intercept;
      stats.r2 = reg.r2;
    }
    if (histFlag) {
      stats.histogram = computeHistogram(points, binCount);
    }
    let outStr;
    if (outFormat === 'text') {
      const lines = [];
      for (const [k, v] of Object.entries(stats)) {
        if (k === 'histogram') continue;
        if (['slope', 'intercept', 'r2'].includes(k)) {
          lines.push(`${k}: ${v.toFixed(2)}`);
        } else {
          lines.push(`${k}: ${v.toFixed(2)}`);
        }
      }
      if (histFlag) {
        stats.histogram.forEach(b => {
          lines.push(
            `histogram ${b.binStart.toFixed(2)}-${b.binEnd.toFixed(2)}: ${b.count}`
          );
        });
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

/**
 * CLI subcommand: plot (stubbed implementation)
 */
export async function runPlotCli(argv) {
  console.error('Error: Plot command not implemented');
  process.exitCode = 1;
}

// HTTP server extension
async function createServer(app) {
  app.get('/stats', async (req, res) => {
    // existing stats endpoint...
    res.set('Access-Control-Allow-Origin', '*');
    const schema = z.object({
      expression: z.string().optional(),
      dataFile: z.string().optional(),
      range: z.string().optional(),
      samples: z.string().optional(),
      json: z.string().optional(),
      histogram: z.string().optional(),
      bins: z.string().optional(),
      trendlineStats: z.string().optional()
    });
    let params;
    try {
      params = schema.parse(req.query);
    } catch (e) {
      return res.status(400).json({ error: e.errors.map(er => er.message).join(', ') });
    }
    const { expression, dataFile, range, samples, json: jsonFlag, histogram, bins, trendlineStats } = params;
    const isJson = jsonFlag !== 'false';
    const histFlag = histogram === 'true';
    const trendFlag = trendlineStats === 'true';
    const sampleCount = samples ? parseInt(samples, 10) : 100;
    const binCount = bins ? parseInt(bins, 10) : 10;
    let points;
    try {
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
      if (trendFlag) {
        const reg = computeRegression(points);
        stats.slope = reg.slope;
        stats.intercept = reg.intercept;
        stats.r2 = reg.r2;
      }
      if (histFlag) {
        stats.histogram = computeHistogram(points, binCount);
      }
      if (!isJson) {
        res.type('text/plain');
        const lines = [];
        for (const [k, v] of Object.entries(stats)) {
          if (k === 'histogram') continue;
          lines.push(`${k}: ${typeof v === 'number' ? v.toFixed(2) : v}`);
        }
        if (histFlag) {
          stats.histogram.forEach(b => {
            lines.push(
              `histogram ${b.binStart.toFixed(2)}-${b.binEnd.toFixed(2)}: ${b.count}`
            );
          });
        }
        return res.send(lines.join('\n'));
      }
      return res.json(stats);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  });

  // Stubbed plot endpoint
  app.get('/plot', async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    return res.status(501).send('Plot endpoint not implemented');
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

  if (argv[0] === 'plot') {
    await runPlotCli(argv.slice(1));
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
  // CLI mode not implemented for other commands
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}