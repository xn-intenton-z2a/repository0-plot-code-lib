#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import fs from "fs";

// Helper function to parse and validate the --range option
function parseRange(rangeStr) {
  const rangeParts = rangeStr.split("=");
  if (rangeParts.length !== 2) {
    console.log('Error: Range format invalid. Expected format "x=min:max"');
    return null;
  }
  const bounds = rangeParts[1].split(":");
  if (bounds.length !== 2) {
    console.log('Error: Range bounds invalid. Expected format "x=min:max"');
    return null;
  }
  const min = parseFloat(bounds[0]);
  const max = parseFloat(bounds[1]);
  if (isNaN(min) || isNaN(max)) {
    console.log('Error: Range bounds must be numeric.');
    return null;
  }
  return { min, max };
}

// Helper function to evaluate the mathematical expression and return a function
function getMathFunction(expression) {
  let expr = expression;
  if (expr.startsWith("y=")) {
    expr = expr.substring(2);
  }
  try {
    return new Function("x", "return " + expr);
  } catch (e) {
    console.log("Error: Invalid mathematical expression.");
    return null;
  }
}

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

  // Maintenance check for open maintenance issues
  if (options.maintenance) {
    console.log("Error: Maximum Open Maintenance Issues Reached. Please resolve the existing issues before submitting new maintenance issues.");
    return;
  }

  // If both expression and range are provided
  if (options.expression && options.range) {
    // If file option provided, generate a dummy plot file
    if (options.file) {
      let fileContent;
      if (options.file.endsWith(".svg")) {
        fileContent = `<svg xmlns="http://www.w3.org/2000/svg"><text x="10" y="20">${options.expression} on ${options.range}</text></svg>`;
      } else if (options.file.endsWith(".png")) {
        // For PNG, writing a dummy placeholder content
        fileContent = "PNG content: " + options.expression + " on " + options.range;
      } else {
        console.log("Error: Unsupported file format. Supported formats are .svg and .png.");
        return;
      }
      try {
        fs.writeFileSync(options.file, fileContent);
        console.log(`File ${options.file} generated successfully.`);
      } catch (error) {
        console.log(`Error: Could not write file ${options.file}.`, error);
      }
    } else {
      // Time series data generation using refactored helper functions
      const range = parseRange(options.range);
      if (!range) return;
      const { min, max } = range;

      const mathFunc = getMathFunction(options.expression);
      if (!mathFunc) return;

      // Determine the number of sample points
      let n = 100;
      if (options.samples) {
        const parsedSamples = parseInt(options.samples, 10);
        if (!isNaN(parsedSamples) && parsedSamples > 1) {
          n = parsedSamples;
        }
      }

      // Generate n equally spaced sample points
      const step = (max - min) / (n - 1);
      const series = [];
      for (let i = 0; i < n; i++) {
        const x = min + step * i;
        let y;
        try {
          y = mathFunc(x);
          if (typeof y !== "number" || !Number.isFinite(y)) y = null;
        } catch (e) {
          y = null;
        }
        series.push({ x, y });
      }
      console.log(JSON.stringify(series));
    }
  } else if (Object.keys(options).length > 0) {
    console.log("Error: Missing required options. Provide --expression and --range to generate time series data, or include --file to generate a plot file. Example: node src/lib/main.js --expression 'y=sin(x)' --range 'x=-1:1' --file output.svg");
  } else {
    console.log(`Run with: ${JSON.stringify(args)}`);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  main(args);
}
