#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import { evaluate } from "mathjs";
import express from "express";

export function main(args) {
  if (!args || args.length === 0) {
    printHelp();
    return;
  }
  const [cmd, ...rest] = args;
  if (cmd === "plot") {
    runPlot(rest);
  } else if (cmd === "reseed") {
    runReseed(rest);
  } else if (cmd === "serve") {
    runServer(rest);
  } else {
    console.error(`Unknown command: ${cmd}`);
    printHelp();
    process.exit(1);
  }
}

function printHelp() {
  console.log(`Usage: repository0-plot-code-lib <command> [options]
Available commands:
  plot      Generate plots from data files or mathematical expressions
  reseed    Reset repository files to seed state (dry-run available)
  serve     Start HTTP API server for plot and stats endpoints

Use "repository0-plot-code-lib <command> --help" for command-specific options.`);
}

function runPlot(args) {
  const opts = parsePlotOptions(args);
  let dataPoints;
  if (opts.expression) {
    try {
      dataPoints = generateExpressionData(opts.expression, opts.xmin, opts.xmax, opts.samples);
    } catch (err) {
      console.error(`Error evaluating expression "${opts.expression}": ${err.message}`);
      process.exit(1);
    }
  } else {
    console.log("Data file plotting not implemented");
    return;
  }
  console.log(JSON.stringify(dataPoints));
}

function parsePlotOptions(args) {
  const opts = {
    expression: null,
    xmin: -10,
    xmax: 10,
    samples: 100,
    data: null,
    type: "line",
    width: 640,
    height: 480,
    output: null,
  };
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    switch (arg) {
      case "--expression":
        opts.expression = args[++i];
        break;
      case "--xmin":
        opts.xmin = parseFloat(args[++i]);
        break;
      case "--xmax":
        opts.xmax = parseFloat(args[++i]);
        break;
      case "--samples":
        opts.samples = parseInt(args[++i], 10);
        break;
      case "--data":
        opts.data = args[++i];
        break;
      case "--type":
        opts.type = args[++i];
        break;
      case "--width":
        opts.width = parseInt(args[++i], 10);
        break;
      case "--height":
        opts.height = parseInt(args[++i], 10);
        break;
      case "--output":
        opts.output = args[++i];
        break;
      case "--help":
        printHelp();
        process.exit(0);
      default:
        console.error(`Unknown option: ${arg}`);
        printHelp();
        process.exit(1);
    }
  }
  return opts;
}

function generateExpressionData(expr, xmin, xmax, samples) {
  const data = [];
  if (samples < 2) {
    throw new Error(`samples must be >= 2`);
  }
  const step = (xmax - xmin) / (samples - 1);
  for (let i = 0; i < samples; i++) {
    const x = xmin + step * i;
    const y = evaluate(expr, { x });
    data.push({ x, y });
  }
  return data;
}

function runReseed(args) {
  const dryRun = args.includes("--dry-run");
  if (dryRun) {
    const files = [
      "README.md",
      "MISSION.md",
      "src/lib/main.js",
      "tests/unit/main.test.js",
      "tests/unit/plot-generation.test.js",
      "package.json",
    ];
    files.forEach((file) => {
      console.log(`Would reset ${file}`);
    });
  } else {
    console.log("Reseed command: no mode specified. Use --dry-run or --force");
  }
}

// --- Server Subcommand Implementation ---

/**
 * Parse options for the serve command.
 */
function parseServerOptions(args) {
  const opts = { port: 3000, help: false };
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    switch (arg) {
      case "--port":
        opts.port = parseInt(args[++i], 10);
        break;
      case "--help":
        opts.help = true;
        break;
      default:
        console.error(`Unknown option: ${arg}`);
        opts.help = true;
        break;
    }
  }
  return opts;
}

/**
 * Create and configure the Express server.
 */
export function createServer(opts) {
  const app = express();

  // /plot endpoint
  app.get("/plot", (req, res) => {
    const expr = req.query.expression;
    if (!expr) {
      return res.status(400).json({ error: "Expression parameter is required" });
    }
    const xmin = parseFloat(req.query.xmin ?? -10);
    const xmax = parseFloat(req.query.xmax ?? 10);
    const samples = parseInt(req.query.samples ?? 100, 10);
    if (Number.isNaN(samples) || samples < 2) {
      return res.status(400).json({ error: "samples must be >= 2" });
    }
    let data;
    try {
      data = generateExpressionData(expr, xmin, xmax, samples);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }

    const format = req.query.outputFormat === "ascii" ? "ascii" : "json";
    if (format === "ascii") {
      const chart = renderAsciiChart(data, {
        type: req.query.type || "line",
        width: parseInt(req.query.width ?? 80, 10),
        height: parseInt(req.query.height ?? 24, 10),
      });
      res.type("text/plain").status(200).send(chart);
    } else {
      res.type("application/json").status(200).json(data);
    }
  });

  // /stats endpoint
  app.get("/stats", (req, res) => {
    const expr = req.query.expression;
    if (!expr) {
      return res.status(400).json({ error: "Expression parameter is required" });
    }
    const xmin = parseFloat(req.query.xmin ?? -10);
    const xmax = parseFloat(req.query.xmax ?? 10);
    const samples = parseInt(req.query.samples ?? 100, 10);
    if (Number.isNaN(samples) || samples < 2) {
      return res.status(400).json({ error: "samples must be >= 2" });
    }
    let data;
    try {
      data = generateExpressionData(expr, xmin, xmax, samples);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
    const stats = computeStatistics(data);
    res.type("application/json").status(200).json(stats);
  });

  return app;
}

/**
 * Run the HTTP server.
 */
function runServer(args) {
  const opts = parseServerOptions(args);
  if (opts.help) {
    console.log("Usage: repository0-plot-code-lib serve [--port <number>] [--help]");
    process.exit(0);
  }
  const app = createServer(opts);
  const port = opts.port;
  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
}

/**
 * Render ASCII chart from data points.
 */
function renderAsciiChart(data, { type, width, height }) {
  const xs = data.map((p) => p.x);
  const ys = data.map((p) => p.y);
  const xmin = Math.min(...xs);
  const xmax = Math.max(...xs);
  const ymin = Math.min(...ys);
  const ymax = Math.max(...ys);
  const xScale = (xmax - xmin) / (width - 1) || 1;
  const yScale = (ymax - ymin) / (height - 1) || 1;
  const grid = Array.from({ length: height }, () => Array(width).fill(' '));
  data.forEach(({ x, y }) => {
    const ix = Math.round((x - xmin) / xScale);
    const iy = Math.round((y - ymin) / yScale);
    const row = height - 1 - iy;
    const col = ix;
    if (row >= 0 && row < height && col >= 0 && col < width) {
      grid[row][col] = '*';
    }
  });
  return grid.map((row) => row.join('')).join('\n');
}

/**
 * Compute descriptive statistics for data points.
 */
function computeStatistics(data) {
  const xs = data.map((p) => p.x).sort((a, b) => a - b);
  const ys = data.map((p) => p.y).sort((a, b) => a - b);
  const len = data.length;
  const mean = (arr) => arr.reduce((a, b) => a + b, 0) / len;
  const stddev = (arr, m) => Math.sqrt(arr.reduce((sum, v) => sum + (v - m) ** 2, 0) / len);
  const median = (arr) => (len % 2 === 1
    ? arr[(len - 1) / 2]
    : (arr[len / 2 - 1] + arr[len / 2]) / 2);
  const xMean = mean(xs);
  const yMean = mean(ys);
  return {
    x_min: xs[0],
    x_max: xs[len - 1],
    x_mean: parseFloat(xMean.toFixed(4)),
    x_median: parseFloat(median(xs).toFixed(4)),
    x_stddev: parseFloat(stddev(xs, xMean).toFixed(4)),
    y_min: ys[0],
    y_max: ys[len - 1],
    y_mean: parseFloat(yMean.toFixed(4)),
    y_median: parseFloat(median(ys).toFixed(4)),
    y_stddev: parseFloat(stddev(ys, yMean).toFixed(4)),
  };
}

// If run as script
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  main(args);
}
