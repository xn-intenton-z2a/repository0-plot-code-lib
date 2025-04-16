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

  // New maintenance check: if the --maintenance flag is provided, output an error about open maintenance issues
  if (options.maintenance) {
    console.log("Error: Maximum Open Maintenance Issues Reached. Please resolve the existing issues before submitting new maintenance issues.");
    return;
  }

  // If both expression and range are provided
  if (options.expression && options.range) {
    // If file option provided, maintain existing plot generation message
    if (options.file) {
      console.log(`Generating plot for expression '${options.expression}' with range '${options.range}' and output file '${options.file}'`);
    } else {
      // New functionality: generate time series data and output as JSON
      // Expected range format: "x=min:max"
      const rangeParts = options.range.split("=");
      if (rangeParts.length !== 2) {
        console.log('Error: Range format invalid. Expected format "x=min:max"');
        return;
      }
      const variable = rangeParts[0];
      const bounds = rangeParts[1].split(":");
      if (bounds.length !== 2) {
        console.log('Error: Range bounds invalid. Expected format "x=min:max"');
        return;
      }
      const min = parseFloat(bounds[0]);
      const max = parseFloat(bounds[1]);
      if (isNaN(min) || isNaN(max)) {
        console.log('Error: Range bounds must be numeric.');
        return;
      }
      
      // Process expression: remove leading 'y=' if present
      let expr = options.expression;
      if (expr.startsWith("y=")) {
        expr = expr.substring(2);
      }
      let f;
      try {
        f = new Function("x", "return " + expr);
      } catch (e) {
        console.log("Error: Invalid mathematical expression.");
        return;
      }

      // Generate 100 equally spaced sample points
      const n = 100;
      const step = (max - min) / (n - 1);
      const series = [];
      for (let i = 0; i < n; i++) {
        const x = min + step * i;
        let y;
        try {
          y = f(x);
          // Handle NaN: if f(x) returns NaN or a non-numeric value, set y to null.
          // This substitution ensures that the output remains valid JSON since JSON does not support NaN values.
          if (typeof y !== "number" || isNaN(y)) y = null;
        } catch (e) {
          y = null;
        }
        series.push({ x, y });
      }
      console.log(JSON.stringify(series));
    }
  } else if (Object.keys(options).length > 0) {
    console.log('Error: Missing required options. Usage: node src/lib/main.js --expression <expression> --range <range> --file <file>');
  } else {
    console.log(`Run with: ${JSON.stringify(args)}`);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  main(args);
}
