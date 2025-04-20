#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import fs from "fs";

export function main(args) {
  // Simple argument parser
  let expression, range, outputFile;
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === "--expression") {
      expression = args[i + 1];
      i++;
    } else if (arg === "--range") {
      range = args[i + 1];
      i++;
    } else if (arg === "--file") {
      outputFile = args[i + 1];
      i++;
    }
  }

  // If all options provided, generate SVG file
  if (expression && range && outputFile) {
    const svgContent = `<svg><text x='10' y='20'>Expression: ${expression}</text><text x='10' y='40'>Range: ${range}</text></svg>`;
    try {
      fs.writeFileSync(outputFile, svgContent);
      console.log(`SVG file generated: ${outputFile}`);
    } catch (err) {
      console.error(`Error writing file ${outputFile}:`, err);
    }
  } else {
    console.log(`Run with: ${JSON.stringify(args)}`);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  main(args);
}
