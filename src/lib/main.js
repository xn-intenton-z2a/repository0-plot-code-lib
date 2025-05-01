#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import { writeFileSync } from "fs";
import * as d3 from "d3"; // Importing d3 for future advanced plotting capabilities

export function main(args) {
  // If no args provided, default to process.argv.slice(2)
  args = args || process.argv.slice(2);
  const options = parseArgs(args);

  if (!options.expression) {
    console.error("Error: --expression flag is required.");
    return;
  }

  // Generate the SVG content based on the provided parameters
  const svg = generateSVG(options.expression, options.range);

  if (options.file) {
    try {
      writeFileSync(options.file, svg);
      console.log(`SVG written to ${options.file}`);
    } catch (error) {
      console.error(`Failed to write file: ${error.message}`);
    }
  } else {
    console.log(svg);
  }
}

function parseArgs(args) {
  const options = {};
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === "--expression" && i + 1 < args.length) {
      options.expression = args[i + 1];
      i++;
    } else if (arg === "--range" && i + 1 < args.length) {
      options.range = args[i + 1];
      i++;
    } else if (arg === "--file" && i + 1 < args.length) {
      options.file = args[i + 1];
      i++;
    }
  }
  return options;
}

function generateSVG(expression, range) {
  // For the purpose of this example, we generate a simple SVG string with a text element.
  // In future, d3 can be used to programmatically generate more complex SVG plots.
  const svgWidth = 640;
  const svgHeight = 400;
  const displayRange = range || "default range";

  // This is a simple static SVG construction as a placeholder for d3-driven plotting.
  return `<svg width="${svgWidth}" height="${svgHeight}" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="#fff" />
    <text x="10" y="20" fill="#000">Plot for: ${expression} | Range: ${displayRange}</text>
  </svg>`;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  main(args);
}
