#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";

export function main(args = []) {
  if (args.includes("--help")) {
    console.log("Usage: node src/lib/main.js --expression <exp> --range <range> --file <filepath>");
  } else if (args.length === 0) {
    console.log("No arguments provided. Use --help to see usage instructions.");
  } else {
    console.log(`Run with: ${JSON.stringify(args)}`);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  main(args);
}
