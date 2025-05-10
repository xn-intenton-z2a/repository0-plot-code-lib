#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import { evaluate } from "mathjs";

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

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  main(args);
}
