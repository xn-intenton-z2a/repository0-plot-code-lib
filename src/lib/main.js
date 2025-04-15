#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import { writeFileSync } from "fs";
import { z } from "zod";
import { evaluate } from "mathjs";

/**
 * Parses CLI arguments to extract --expression, --range, --file, --json, and --csv options.
 * @param {string[]} args - Array of command-line arguments
 * @returns {object} An object with expression, range, file, json, and csv if present
 */
function parseArgs(args) {
  const result = {};
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === "--expression") {
      result.expression = args[i + 1];
      i++;
    } else if (arg === "--range") {
      result.range = args[i + 1];
      i++;
    } else if (arg === "--file") {
      result.file = args[i + 1];
      i++;
    } else if (arg === "--json") {
      result.json = true;
    } else if (arg === "--csv") {
      result.csv = true;
    }
  }
  return result;
}

// Define schema for CLI options using zod
const cliOptionsSchema = z.object({
  expression: z.string().min(1, "Expression cannot be empty"),
  range: z.string().regex(
    /^x=-?\d+(\.\d+)?:-?\d+(\.\d+)?,y=-?\d+(\.\d+)?:-?\d+(\.\d+)?$/,
    "Range must be in the format 'x=min:max,y=min:max'"
  ),
  file: z.string().regex(/\.(svg|png)$/i, "File must have .svg or .png extension"),
  json: z.boolean().optional(),
  csv: z.boolean().optional()
});

/**
 * Generates time series data from a mathematical expression and a range string.
 * The range string format should be "x=min:max,y=min:max".
 * It generates 5 evenly spaced x-values between min and max of x and computes y using mathjs.
 * @param {string} expression - The mathematical expression (e.g., "y=sin(x)")
 * @param {string} rangeStr - The range string (e.g., "x=-1:1,y=-1:1")
 * @returns {string} - JSON string of the computed time series data
 */
function generateTimeSeriesData(expression, rangeStr) {
  const xRangeMatch = rangeStr.match(/x=(-?\d+(?:\.\d+)?):(-?\d+(?:\.\d+)?)/);
  if (!xRangeMatch) {
    throw new Error("Invalid range format for x values");
  }
  const xMin = parseFloat(xRangeMatch[1]);
  const xMax = parseFloat(xRangeMatch[2]);
  const numPoints = 5;
  const step = (xMax - xMin) / (numPoints - 1);
  let points = [];
  // Remove possible 'y=' part from the expression
  let expr = expression.trim().replace(/^y\s*=\s*/, "");
  for (let i = 0; i < numPoints; i++) {
    const xVal = xMin + step * i;
    let yVal;
    try {
      yVal = evaluate(expr, { x: xVal });
    } catch (e) {
      yVal = null;
    }
    points.push({ x: xVal, y: yVal });
  }
  return JSON.stringify(points, null, 2);
}

/**
 * Generates a polyline for SVG plot from the mathematical expression and range.
 * Samples 100 points over the x-range and maps computed y using y-range to SVG coordinates.
 * @param {string} expression - The mathematical expression (e.g., "y=sin(x)")
 * @param {string} rangeStr - The range string (e.g., "x=-1:1,y=-1:1")
 * @param {number} width - SVG width (default 200)
 * @param {number} height - SVG height (default 100)
 * @returns {string} - A string representing the polyline points for SVG.
 */
function generateSvgPolyline(expression, rangeStr, width = 200, height = 100) {
  const xRangeMatch = rangeStr.match(/x=(-?\d+(?:\.\d+)?):(-?\d+(?:\.\d+)?)/);
  const yRangeMatch = rangeStr.match(/y=(-?\d+(?:\.\d+)?):(-?\d+(?:\.\d+)?)/);
  if (!xRangeMatch || !yRangeMatch) {
    throw new Error("Invalid range format");
  }
  const xMin = parseFloat(xRangeMatch[1]);
  const xMax = parseFloat(xRangeMatch[2]);
  const yMin = parseFloat(yRangeMatch[1]);
  const yMax = parseFloat(yRangeMatch[2]);

  const numPoints = 100;
  const step = (xMax - xMin) / (numPoints - 1);
  let pointsArray = [];
  let expr = expression.trim().replace(/^y\s*=\s*/, "");
  for (let i = 0; i < numPoints; i++) {
    const xVal = xMin + step * i;
    let yVal;
    try {
      yVal = evaluate(expr, { x: xVal });
    } catch (e) {
      yVal = 0;
    }
    // Map xVal to SVG coordinate
    const svgX = ((xVal - xMin) / (xMax - xMin)) * width;
    // Map yVal to SVG coordinate; invert y-axis (yMax maps to 0, yMin maps to height)
    const svgY = (1 - ((yVal - yMin) / (yMax - yMin))) * height;
    pointsArray.push(`${svgX},${svgY}`);
  }
  return pointsArray.join(" ");
}

function jsonToCSV(jsonData) {
  let data;
  try {
    data = JSON.parse(jsonData);
  } catch (e) {
    throw new Error("Invalid JSON data");
  }
  const header = "x,y";
  const rows = data.map(point => `${point.x},${point.y}`);
  return [header, ...rows].join("\n");
}

export function main(args = []) {
  // If no arguments are provided, print usage information and exit.
  if (args.length === 0) {
    console.log("Run with: node src/lib/main.js --expression <expression> --range <range> --file <file> [--json] [--csv]");
    return;
  }

  const cliOptions = parseArgs(args);

  // Validate CLI options
  try {
    cliOptionsSchema.parse(cliOptions);
  } catch (error) {
    console.error(error.errors[0].message);
    return;
  }

  let timeSeriesData;
  try {
    timeSeriesData = generateTimeSeriesData(cliOptions.expression, cliOptions.range);
  } catch (e) {
    console.error(`Failed to generate time series data: ${e.message}`);
    return;
  }

  // If --csv flag is provided, output CSV to stdout and bypass file writing
  if (cliOptions.csv) {
    try {
      const csvOutput = jsonToCSV(timeSeriesData);
      console.log(csvOutput);
    } catch (e) {
      console.error(`Failed to export CSV: ${e.message}`);
    }
    return;
  }

  // If --json flag is provided, output JSON object to stdout and bypass file writing
  if (cliOptions.json) {
    const outputObj = {
      message: "Plot generated",
      expression: cliOptions.expression,
      range: cliOptions.range,
      file: cliOptions.file,
      timeSeriesData: JSON.parse(timeSeriesData)
    };
    console.log(JSON.stringify(outputObj));
    return;
  }

  let plotContent;
  const filePath = cliOptions.file;
  if (filePath.endsWith('.svg')) {
    // Generate a minimal valid SVG content with embedded polyline for time series data
    let polylinePoints;
    try {
      polylinePoints = generateSvgPolyline(cliOptions.expression, cliOptions.range);
    } catch (e) {
      console.error(`Failed to generate SVG polyline: ${e.message}`);
      return;
    }
    plotContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 100">
  <text x="10" y="20">Plot generated for expression: ${cliOptions.expression} with range: ${cliOptions.range}</text>
  <polyline
    points="${polylinePoints}"
    stroke="blue" stroke-width="2" fill="none" />
</svg>`;
  } else if (filePath.endsWith('.png')) {
    plotContent = `PNG Plot generated for expression: ${cliOptions.expression} with range: ${cliOptions.range}\nTime Series Data: ${timeSeriesData}`;
  } else {
    plotContent = `Plot generated for expression: ${cliOptions.expression} with range: ${cliOptions.range}\nTime Series Data: ${timeSeriesData}`;
  }
  try {
    writeFileSync(filePath, plotContent, "utf-8");
    console.log(`Plot written to file ${filePath}`);
  } catch (error) {
    console.error(`Failed to write plot to file: ${error.message}`);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  main(args);
}
