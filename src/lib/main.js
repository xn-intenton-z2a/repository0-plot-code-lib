#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import { writeFileSync } from "fs";

/**
 * Parses CLI arguments to extract --expression, --range, and --file options.
 * @param {string[]} args - Array of command-line arguments
 * @returns {object} An object with expression, range, and file if present
 */
function parseArgs(args) {
  const result = {};
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === "--expression") {
      result.expression = args[i + 1];
      i++;
    } else if (arg === "--range") {
      result.range = args[i + 1];
      i++;
    } else if (arg === "--file") {
      result.file = args[i + 1];
      i++;
    }
  }
  return result;
}

export function main(args = []) {
  const cliOptions = parseArgs(args);
  if (cliOptions.expression && cliOptions.range && cliOptions.file) {
    let plotContent;
    const filePath = cliOptions.file;
    if (filePath.endsWith('.svg')) {
      plotContent = `SVG Plot generated for expression: ${cliOptions.expression} with range: ${cliOptions.range}`;
    } else if (filePath.endsWith('.png')) {
      plotContent = `PNG Plot generated for expression: ${cliOptions.expression} with range: ${cliOptions.range}`;
    } else {
      plotContent = `Plot generated for expression: ${cliOptions.expression} with range: ${cliOptions.range}`;
    }
    try {
      writeFileSync(filePath, plotContent, "utf-8");
      console.log(`Plot written to file ${filePath}`);
    } catch (error) {
      console.error(`Failed to write plot to file: ${error.message}`);
    }
  } else {
    console.log(`Run with: ${JSON.stringify(args)}`);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  main(args);
}
