#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import fs from "fs";
import sharp from "sharp";

// Generates time series data from a mathematical expression and range
export function generateTimeSeriesData(expression, rangeStr, numPoints = 10) {
  // Supports expressions: 'y=sin(x)', 'y=cos(x)', 'y=tan(x)', 'y=log(x)', 'y=exp(x)', 'y=x^2', 'y=sqrt(x)', 'y=x^3'
  // Expected range format: "x=start:end"
  const match = rangeStr.match(/^x=([\-\d\.]+):([\-\d\.]+)$/);
  if (!match) {
    throw new Error("Invalid range format. Expected format: x=start:end");
  }
  const start = parseFloat(match[1]);
  const end = parseFloat(match[2]);

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
    } else if (expression === "y=log(x)") {
      // Only compute log if x > 0, otherwise default to 0
      y = x > 0 ? Math.log(x) : 0;
    } else if (expression === "y=exp(x)") {
      y = Math.exp(x);
    } else if (expression === "y=x^2") {
      y = x * x;
    } else if (expression === "y=sqrt(x)") {
      // Compute square root if x is non-negative, otherwise default to 0
      y = x >= 0 ? Math.sqrt(x) : 0;
    } else if (expression === "y=x^3") {
      y = x * x * x;
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

export async function main(args) {
  // Simple argument parser
  let expression, range, outputFile, points;
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
    } else if (arg === "--points") {
      points = parseInt(args[i + 1], 10);
      i++;
    }
  }

  // Default points to 10 if not provided
  if (!points) {
    points = 10;
  }

  if (expression && range && outputFile) {
    if (outputFile.endsWith(".csv")) {
      // Generate time series data and output CSV content to stdout
      try {
        const data = generateTimeSeriesData(expression, range, points);
        const csvContent = serializeTimeSeries(data);
        console.log(csvContent);
      } catch (err) {
        console.error("Error generating CSV content:", err);
      }
    } else if (outputFile.endsWith(".png")) {
      // Generate SVG content and use sharp to convert it to PNG
      const svgContent = `<svg><text x='10' y='20'>Expression: ${expression}</text><text x='10' y='40'>Range: ${range}</text></svg>`;
      try {
        const buffer = await sharp(Buffer.from(svgContent)).png().toBuffer();
        fs.writeFileSync(outputFile, buffer);
        console.log(`PNG file generated: ${outputFile}`);
      } catch (err) {
        console.error(`Error creating PNG file ${outputFile}:`, err);
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
  main(args).catch(err => console.error(err));
}
