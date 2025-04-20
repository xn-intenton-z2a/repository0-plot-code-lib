#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import fs from "fs";

// Generates time series data from a mathematical expression and range
export function generateTimeSeriesData(expression, rangeStr) {
  // Only supports a simple expression: 'y=sin(x)'
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
    } else {
      // Throw error for unsupported expressions
      throw new Error("Unsupported expression: " + expression);
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

// Helper function to parse CLI arguments
export function parseArguments(args) {
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
  if (!expression) {
    throw new Error("Missing required parameter: --expression");
  }
  if (!range) {
    throw new Error("Missing required parameter: --range");
  }
  if (!outputFile) {
    throw new Error("Missing required parameter: --file");
  }
  // Validate range format
  if (!/^x=([\d\.]+):([\d\.]+)$/.test(range)) {
    throw new Error("Invalid range format. Expected format: x=start:end");
  }
  return { expression, range, outputFile };
}

export function main(args) {
  try {
    const { expression, range, outputFile } = parseArguments(args);
    if (outputFile.endsWith(".csv")) {
      // Generate time series data and output CSV content to stdout
      const data = generateTimeSeriesData(expression, range);
      const csvContent = serializeTimeSeries(data);
      console.log(csvContent);
    } else {
      // Generate dummy SVG content
      const svgContent = `<svg><text x='10' y='20'>Expression: ${expression}</text><text x='10' y='40'>Range: ${range}</text></svg>`;
      fs.writeFileSync(outputFile, svgContent);
      console.log(`SVG file generated: ${outputFile}`);
    }
  } catch (err) {
    console.error("Error:", err.message);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  main(args);
}
