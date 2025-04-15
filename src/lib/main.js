#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import { z } from "zod";
import fs from "fs";
import sharp from "sharp";

// Function to convert CLI arguments array to an object mapping flags to values
function parseCliArgs(args) {
  const parsed = {};
  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith("--")) {
      const key = args[i].substring(2);
      if (i + 1 < args.length && !args[i + 1].startsWith("--")) {
        parsed[key] = args[i + 1];
        i++;
      } else {
        parsed[key] = true;
      }
    }
  }
  return parsed;
}

// Define the CLI schema using zod
const cliSchema = z.object({
  expression: z.string().min(1, { message: "Expression is required and cannot be empty" }),
  // Updated regex to allow range in the format 'x=start:end' optionally followed by ',y=start:end'
  range: z.string().regex(/^x=-?\d+:-?\d+(?:,y=-?\d+:-?\d+)?$/, { message: "Range must be in the format 'x=start:end' or 'x=start:end,y=start:end'" }),
  file: z.string().regex(/\.(svg|png|csv)$/, { message: "File must end with .svg, .png, or .csv" }),
  evaluate: z.boolean().optional(),
  color: z.string().min(1, { message: "Color must be a non-empty string" }).optional(),
  stroke: z.preprocess(arg => Number(arg), z.number().positive({ message: "Stroke must be a positive number" })).optional(),
  width: z.preprocess(arg => Number(arg), z.number().int().positive({ message: "Width must be a positive integer" })).optional(),
  height: z.preprocess(arg => Number(arg), z.number().int().positive({ message: "Height must be a positive integer" })).optional(),
  padding: z.preprocess(arg => Number(arg), z.number().int().positive({ message: "Padding must be a positive integer" })).optional(),
  samples: z.preprocess(arg => Number(arg), z.number().int().positive({ message: "Samples must be a positive integer" })).optional(),
  grid: z.boolean().optional()
});

export async function main(args = []) {
  if (args.includes("--help")) {
    console.log("Usage: node src/lib/main.js --expression <exp> --range <range> --file <filepath> [--evaluate] [--diagnostics] [--color <color>] [--stroke <number>] [--width <number>] [--height <number>] [--padding <number>] [--samples <number>] [--grid]");
    return;
  }
  if (args.length === 0) {
    console.log("No arguments provided. Use --help to see usage instructions.");
    return;
  }

  const parsedArgs = parseCliArgs(args);

  // If diagnostics flag is provided, output raw parsed arguments
  if (parsedArgs.diagnostics) {
    console.log("Diagnostics - Raw CLI arguments:", JSON.stringify(parsedArgs, null, 2));
  }

  const result = cliSchema.safeParse(parsedArgs);
  if (!result.success) {
    console.error("Error: Invalid arguments.");
    result.error.errors.forEach(err => {
      console.error(err.message);
    });
    process.exit(1);
  }

  // Arguments are valid; log validated arguments
  console.log(`Validated arguments: ${JSON.stringify(result.data)}`);

  // Destructure parameters
  const { expression, range, file, evaluate, color, stroke, width, height, padding, samples, grid } = result.data;

  // Simulate plot generation message
  console.log(`Generating plot for expression: ${expression} with range: ${range}`);

  // Determine styling options with defaults
  const strokeColor = color || "black";
  const strokeWidth = stroke || 2;

  // Determine canvas dimensions and padding with defaults
  const canvasWidth = width || 500;
  const canvasHeight = height || 500;
  const canvasPadding = padding || 20;

  // Parse range parameter. Allow format: 'x=min:max' optionally followed by ',y=min:max'.
  const rangeParts = range.split(",");
  const xRangePart = rangeParts.find(part => part.startsWith("x="));
  const yRangePart = rangeParts.find(part => part.startsWith("y="));

  if (!xRangePart) {
    console.error("Invalid range format. x-range is required.");
    process.exit(1);
  }

  const [xMinStr, xMaxStr] = xRangePart.substring(2).split(":");
  let xMin = parseFloat(xMinStr);
  let xMax = parseFloat(xMaxStr);

  // Adjust degenerate x range
  if (xMin === xMax) {
    xMin = xMin - 1;
    xMax = xMax + 1;
  }

  // Process expression: remove leading 'y=' if present and translate basic math functions
  let procExpr = expression;
  if (procExpr.startsWith("y=")) {
    procExpr = procExpr.substring(2);
  }
  // Replace common math functions with JavaScript's Math equivalents
  procExpr = procExpr.replace(/sin\(/g, "Math.sin(")
                     .replace(/cos\(/g, "Math.cos(")
                     .replace(/tan\(/g, "Math.tan(")
                     .replace(/sqrt\(/g, "Math.sqrt(")
                     .replace(/log\(/g, "Math.log(")
                     .replace(/exp\(/g, "Math.exp(");

  let func;
  try {
    func = new Function("x", "return " + procExpr);
  } catch (err) {
    console.error("Error creating function from expression:", err);
    process.exit(1);
  }

  // Use provided samples value or default to 100
  const totalSamples = samples || 100;

  // Generate sample points for plotting and time series
  const xValues = [];
  const yValues = [];
  const step = (xMax - xMin) / (totalSamples - 1);
  for (let i = 0; i < totalSamples; i++) {
    const xVal = xMin + i * step;
    let yVal;
    try {
      yVal = func(xVal);
    } catch (err) {
      console.error("Error evaluating expression at x =", xVal, err);
      process.exit(1);
    }
    xValues.push(xVal);
    yValues.push(yVal);
  }

  // Create time series data as an array of objects
  const timeSeriesData = xValues.map((x, i) => ({ x, y: yValues[i] }));

  // If --evaluate flag provided, output the time series data as JSON
  if (evaluate && !file.endsWith(".csv")) {
    console.log("Time series data:", JSON.stringify(timeSeriesData));
  }

  // Check if output should be CSV export
  if (file.endsWith(".csv")) {
    const csvContent = "x,y\n" + timeSeriesData.map(({ x, y }) => `${x},${y}`).join("\n");
    fs.writeFileSync(file, csvContent, "utf8");
    console.log(`Time series CSV exported to ${file}`);
    return;
  }

  // Determine y range boundaries
  let computedYMin, computedYMax;
  if (yRangePart) {
    const [yMinStr, yMaxStr] = yRangePart.substring(2).split(":");
    let yMinProvided = parseFloat(yMinStr);
    let yMaxProvided = parseFloat(yMaxStr);
    if (yMinProvided === yMaxProvided) {
      yMinProvided = yMinProvided - 1;
      yMaxProvided = yMaxProvided + 1;
    }
    computedYMin = yMinProvided;
    computedYMax = yMaxProvided;
  } else {
    computedYMin = Math.min(...yValues);
    computedYMax = Math.max(...yValues);
  }

  // Map x and y values to canvas coordinates
  const mapX = (x) => canvasPadding + ((x - xMin) / (xMax - xMin)) * (canvasWidth - 2 * canvasPadding);
  const mapY = (y) => canvasHeight - canvasPadding - ((y - computedYMin) / (computedYMax - computedYMin)) * (canvasHeight - 2 * canvasPadding);

  // Create polyline points string
  const points = xValues.map((x, i) => `${mapX(x)},${mapY(yValues[i])}`).join(" ");

  // Build gridlines if --grid flag is provided and output is SVG/PNG
  let gridLines = "";
  if (grid) {
    const numGrid = 5;
    const verticalSpacing = (canvasWidth - 2 * canvasPadding) / (numGrid + 1);
    for (let i = 1; i <= numGrid; i++) {
      const xPos = canvasPadding + i * verticalSpacing;
      gridLines += `<line x1="${xPos}" y1="${canvasPadding}" x2="${xPos}" y2="${canvasHeight - canvasPadding}" stroke="#ddd" stroke-width="1"/>`;
    }
    const horizontalSpacing = (canvasHeight - 2 * canvasPadding) / (numGrid + 1);
    for (let i = 1; i <= numGrid; i++) {
      const yPos = canvasPadding + i * horizontalSpacing;
      gridLines += `<line x1="${canvasPadding}" y1="${yPos}" x2="${canvasWidth - canvasPadding}" y2="${yPos}" stroke="#ddd" stroke-width="1"/>`;
    }
  }

  // Build SVG content
  const svgContent = `<svg width="${canvasWidth}" height="${canvasHeight}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="white"/>
  ${gridLines}
  <polyline points="${points}" fill="none" stroke="${strokeColor}" stroke-width="${strokeWidth}"/>
</svg>`;

  // Write file depending on the extension
  if (file.endsWith(".png")) {
    try {
      const pngBuffer = await sharp(Buffer.from(svgContent)).png().toBuffer();
      fs.writeFileSync(file, pngBuffer);
      console.log(`Plot saved to ${file}`);
    } catch (err) {
      console.error("Error converting SVG to PNG:", err);
      process.exit(1);
    }
  } else {
    fs.writeFileSync(file, svgContent, "utf8");
    console.log(`Plot saved to ${file}`);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  main(args).catch(err => {
    console.error(err);
    process.exit(1);
  });
}
