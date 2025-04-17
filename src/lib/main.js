#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";

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
  console.log(`Run with: ${JSON.stringify(options)}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  main(args);
}
