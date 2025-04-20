#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import fs from "fs";

// Generates time series data from a mathematical expression and range
export function generateTimeSeriesData(expression, rangeStr) {
  // Supports simple expressions: 'y=sin(x)', 'y=cos(x)', and 'y=tan(x)'
  // Expected range format: "x=start:end"
  const match = rangeStr.match(/^x=([\d\.]+):([\d\.]+)$/);
  if (!match) {
    throw new Error("Invalid range format. Expected format: x=start:end");
  }
  const start = parseFloat(match[1]);
  const end = parseFloat(match[2]);

  const numPoints = 10;
  const step = (end - start) / (numPoints - 1);
  const data = [];
  for (let i = 0; i < numPoints; i++) {
    const x = start + i * step;
    let y = 0;
    if (expression === "y=sin(x)") {
      y = Math.sin(x);
    } else if (expression === "y=cos(x)") {
      y = Math.cos(x);
    } else if (expression === "y=tan(x)") {
      y = Math.tan(x);
    } else {
      // Default behavior for unsupported expressions
      y = 0;
    }
    data.push({ x, y });
  }
  return data;
}

// Serializes an array of time series data points into a CSV string
export function serializeTimeSeries(data) {
  let csv = "x,y\n";
  for (const point of data) {
    csv += `${point.x},${point.y}\n`;
  }
  return csv;
}

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

  if (expression && range && outputFile) {
    if (outputFile.endsWith(".csv")) {
      // Generate time series data and output CSV content to stdout
      try {
        const data = generateTimeSeriesData(expression, range);
        const csvContent = serializeTimeSeries(data);
        console.log(csvContent);
      } catch (err) {
        console.error("Error generating CSV content:", err);
      }
    } else {
      // Generate dummy SVG content as before
      const svgContent = `<svg><text x='10' y='20'>Expression: ${expression}</text><text x='10' y='40'>Range: ${range}</text></svg>`;
      try {
        fs.writeFileSync(outputFile, svgContent);
        console.log(`SVG file generated: ${outputFile}`);
      } catch (err) {
        console.error(`Error writing file ${outputFile}:`, err);
      }
    }
  } else {
    console.log(`Run with: ${JSON.stringify(args)}`);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  main(args);
}
