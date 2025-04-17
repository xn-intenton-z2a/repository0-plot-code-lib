#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import fs from "fs";

/**
 * Generates an SVG plot based on given expression and range.
 * @param {string} expression - Mathematical expression.
 * @param {string} range - Range specification.
 * @returns {string} - SVG content as string.
 */
function generateSVG(expression, range) {
  return `<svg width="200" height="100" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="100" fill="#f0f0f0"/>
  <text x="10" y="50" font-size="14" fill="#333">Expression: ${expression}, Range: ${range}</text>
</svg>`;
}

/**
 * Parses CLI arguments for --expression, --range, and --file options.
 * @param {string[]} args - The command line arguments array.
 * @returns {Object} - Parsed options.
 */
function parseArgs(args) {
  const options = { expression: null, range: null, file: null };
  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case "--expression":
        if (i + 1 < args.length) {
          options.expression = args[i + 1];
          i++;
        }
        break;
      case "--range":
        if (i + 1 < args.length) {
          options.range = args[i + 1];
          i++;
        }
        break;
      case "--file":
        if (i + 1 < args.length) {
          options.file = args[i + 1];
          i++;
        }
        break;
      default:
        // Ignore unrecognized arguments
        break;
    }
  }
  return options;
}

export function main(args) {
  const options = parseArgs(args);
  if (options.file) {
    if (options.file.endsWith(".svg")) {
      if (options.expression && options.range) {
        const svgContent = generateSVG(options.expression, options.range);
        try {
          fs.writeFileSync(options.file, svgContent, "utf8");
          console.log(`SVG file created at: ${options.file}`);
        } catch (error) {
          console.error("Error writing SVG file:", error.message);
        }
      } else {
        console.error("Error: --expression and --range options are required for SVG generation.");
      }
    } else {
      console.error("Error: Only .svg files are supported for plot generation.");
    }
  } else {
    console.log(`Run with: ${JSON.stringify(options)}`);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  main(args);
}
