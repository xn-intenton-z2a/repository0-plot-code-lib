#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import { create, all } from "mathjs";

function parseArgs(args) {
  const opts = {};
  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case "--expression":
        opts.expression = args[++i];
        break;
      case "--range":
        opts.range = args[++i];
        break;
      case "--points":
        opts.points = args[++i];
        break;
      default:
        // ignore unknown flags
        break;
    }
  }
  return opts;
}

export function main(args = process.argv.slice(2)) {
  const opts = parseArgs(args);
  const { expression, range, points } = opts;

  if (!expression || !range) {
    console.error('Error: --expression and --range parameters are required.');
    process.exit(1);
  }

  const [startStr, endStr] = range.split(':');
  const start = parseFloat(startStr);
  const end = parseFloat(endStr);
  if (isNaN(start) || isNaN(end) || start >= end) {
    console.error('Error: --range must be in form start:end with start < end.');
    process.exit(1);
  }

  const numPoints = points ? parseInt(points, 10) : 100;
  if (isNaN(numPoints) || numPoints < 2) {
    console.error('Error: --points must be an integer >= 2.');
    process.exit(1);
  }

  const math = create(all);
  let exprStr = expression;
  if (exprStr.startsWith('y=')) {
    exprStr = exprStr.slice(2);
  }

  const exprNode = math.parse(exprStr);
  const compiled = exprNode.compile();
  const step = (end - start) / (numPoints - 1);
  const data = [];

  for (let i = 0; i < numPoints; i++) {
    const x = start + i * step;
    let y;
    try {
      y = compiled.evaluate({ x });
    } catch (err) {
      console.error(`Error evaluating expression at x=${x}: ${err.message}`);
      process.exit(1);
    }
    data.push({ x, y });
  }

  const output = JSON.stringify(data, null, 2);
  console.log(output);
  return data;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}
