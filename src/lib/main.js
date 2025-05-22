#!/usr/bin/env node
import fs from "fs/promises";
import { fileURLToPath } from "url";
import * as math from "mathjs";

/**
 * Main library function to generate time series points from expression and range.
 * @param {string[]} args - CLI arguments array
 * @returns {object|undefined} Returns an object containing points array and options, or undefined if no args
 */
export function main(args) {
  if (!args || args.length === 0) {
    return;
  }
  const options = parseArgs(args);
  const { expression, range, outputFormat, file } = options;
  const { start, end, steps } = parseRange(range);

  // Compile the expression
  const node = math.parse(expression);
  const code = node.compile();

  // Generate points
  const points = [];
  const stepSize = (end - start) / steps;
  for (let i = 0; i <= steps; i++) {
    const x = start + stepSize * i;
    const y = code.evaluate({ x });
    points.push({ x, y });
  }
  return { points, outputFormat, file };
}

/**
 * Parses CLI arguments into options
 * @param {string[]} args
 * @returns {{expression:string,range:string,outputFormat:string,file:string|null}}
 */
function parseArgs(args) {
  const options = {
    expression: null,
    range: null,
    outputFormat: "json",
    file: null,
  };
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === "--expression" || arg === "-e") {
      i++;
      options.expression = args[i];
    } else if (arg.startsWith("--expression=")) {
      options.expression = arg.split("=")[1];
    } else if (arg === "--range" || arg === "-r") {
      i++;
      options.range = args[i];
    } else if (arg.startsWith("--range=")) {
      options.range = arg.split("=")[1];
    } else if (arg === "--output-format") {
      i++;
      options.outputFormat = args[i];
    } else if (arg.startsWith("--output-format=")) {
      options.outputFormat = arg.split("=")[1];
    } else if (arg === "--file" || arg === "-f") {
      i++;
      options.file = args[i];
    } else if (arg.startsWith("--file=")) {
      options.file = arg.split("=")[1];
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  if (!options.expression) {
    throw new Error("Missing required --expression");
  }
  if (!options.range) {
    throw new Error("Missing required --range");
  }
  return options;
}

/**
 * Parses a range string of form x=start:end[:steps]
 * @param {string} rangeStr
 * @returns {{start:number,end:number,steps:number}}
 */
function parseRange(rangeStr) {
  // match x=0:1 or x=0:1:10
  const m = rangeStr.match(/^[xy]=([^:]+):([^:]+)(?::(\d+))?$/);
  if (!m) {
    throw new Error(`Invalid range format: ${rangeStr}`);
  }
  const start = parseFloat(m[1]);
  const end = parseFloat(m[2]);
  const steps = m[3] !== undefined ? parseInt(m[3], 10) : 100;
  if (Number.isNaN(start) || Number.isNaN(end) || Number.isNaN(steps)) {
    throw new Error(`Invalid range values in: ${rangeStr}`);
  }
  return { start, end, steps };
}

// CLI invocation
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  (async () => {
    try {
      const cliArgs = process.argv.slice(2);
      const result = main(cliArgs);
      if (!result) {
        // nothing to do
        return;
      }
      const { points, outputFormat, file } = result;
      if (outputFormat !== "json") {
        console.error(`Unsupported output format: ${outputFormat}`);
        process.exit(1);
      }
      const output = JSON.stringify(points, null, 2);
      if (file) {
        await fs.writeFile(file, output);
      } else {
        console.log(output);
      }
    } catch (err) {
      console.error(err.message);
      process.exit(1);
    }
  })();
}