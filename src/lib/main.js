#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";

export function main(args = []) {
  // Simple argument parser: converts CLI arguments into an options object
  const options = {};
  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith("--")) {
      const key = args[i].substring(2);
      const value = (i + 1 < args.length && !args[i + 1].startsWith("--")) ? args[i + 1] : true;
      if (value !== true) {
        i++;
      }
      options[key] = value;
    }
  }

  // Check if the expected options are provided
  if (options.expression && options.range && options.file) {
    console.log(`Generating plot for expression '${options.expression}' with range '${options.range}' and output file '${options.file}'`);
  } else if (Object.keys(options).length > 0) {
    console.log('Usage: node src/lib/main.js --expression <expression> --range <range> --file <file>');
  } else {
    console.log(`Run with: ${JSON.stringify(args)}`);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  main(args);
}
