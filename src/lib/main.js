#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import { create, all } from "mathjs";

const math = create(all);

export function main(providedArgs) {
  const direct = process.argv[1] === fileURLToPath(import.meta.url);
  const args = providedArgs !== undefined ? providedArgs : process.argv.slice(2);

  const expressionIndex = args.findIndex((arg) => arg === "--expression");
  const rangeIndex = args.findIndex((arg) => arg === "--range");
  const pointsIndex = args.findIndex((arg) => arg === "--points");

  const expression = expressionIndex >= 0 && args[expressionIndex + 1] ? args[expressionIndex + 1] : undefined;
  const range = rangeIndex >= 0 && args[rangeIndex + 1] ? args[rangeIndex + 1] : undefined;
  const pointsStr = pointsIndex >= 0 && args[pointsIndex + 1] ? args[pointsIndex + 1] : undefined;

  if (!expression || !range) {
    if (direct) {
      console.error(
        "Usage: repository0-plot-code-lib --expression <expr> --range <var>=<start>:<end> [--points <number>]"
      );
      process.exit(1);
    }
    return [];
  }

  // sanitize expression: remove leading "y=" or "Y="
  const expr = expression.trim().replace(/^y\s*=\s*/i, "");

  // parse range
  const [varName, rest] = range.split("=");
  if (!rest) {
    throw new Error("Invalid range format, expected <var>=<start>:<end>");
  }
  const [startStr, endStr] = rest.split(":");
  if (endStr === undefined) {
    throw new Error("Invalid range format, expected <var>=<start>:<end>");
  }
  const start = Number(startStr);
  const end = Number(endStr);
  if (Number.isNaN(start) || Number.isNaN(end)) {
    throw new Error("Range start and end must be valid numbers");
  }

  const points = pointsStr !== undefined ? Number(pointsStr) : 100;
  if (Number.isNaN(points) || points < 1) {
    throw new Error("Points must be a positive integer");
  }

  const compiled = math.compile(expr);
  const result = [];
  for (let i = 0; i < points; i++) {
    const x =
      points === 1
        ? start
        : start + ((end - start) * i) / (points - 1);
    const scope = { [varName]: x };
    const y = compiled.evaluate(scope);
    result.push({ x, y });
  }

  if (direct) {
    console.log(JSON.stringify(result, null, 2));
  }
  return result;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}
