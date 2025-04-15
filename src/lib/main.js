#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import { writeFileSync } from "fs";
import { z } from "zod";

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

// Define schema for CLI options using zod
const cliOptionsSchema = z.object({
  expression: z.string().min(1, "Expression cannot be empty"),
  range: z.string().regex(
    /^x=-?\d+(\.\d+)?:-?\d+(\.\d+)?,y=-?\d+(\.\d+)?:-?\d+(\.\d+)?$/,
    "Range must be in the format 'x=min:max,y=min:max'"
  ),
  file: z.string().regex(/\.(svg|png)$/i, "File must have .svg or .png extension"),
});

export function main(args = []) {
  // If no arguments are provided, print usage information and exit.
  if (args.length === 0) {
    console.log("Run with: node src/lib/main.js --expression <expression> --range <range> --file <file>");
    return;
  }

  const cliOptions = parseArgs(args);

  // Validate CLI options
  try {
    cliOptionsSchema.parse(cliOptions);
  } catch (error) {
    console.error(error.errors[0].message);
    return;
  }

  let plotContent;
  const filePath = cliOptions.file;
  if (filePath.endsWith('.svg')) {
    // Generate a minimal valid SVG content with a text element
    plotContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 100">
  <text x="10" y="50">Plot generated for expression: ${cliOptions.expression} with range: ${cliOptions.range}</text>
</svg>`;
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
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  main(args);
}
