#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import fs from "fs";
import { z } from "zod";

const USAGE_MESSAGE = `Usage: node src/lib/main.js --expression "y=sin(x)" --range "x=-10:10" [--file output.svg] [--width 500 --height 300]`;

/**
 * Exit the process with an error message.
 * @param {string} message - The error message to display.
 */
function exitWithError(message) {
  console.error(message + "\n" + USAGE_MESSAGE);
  process.exit(1);
}

/**
 * Parse raw CLI arguments into an object.
 * @param {string[]} args - Raw CLI arguments.
 * @returns {object} Parsed arguments object.
 */
function parseArguments(args) {
  const result = {};
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === "--help" || arg === "-h") {
      console.log(USAGE_MESSAGE);
      process.exit(0);
    }
    if (arg.startsWith("--")) {
      const key = arg.slice(2);
      result[key] = args[i + 1];
      i++;
    }
  }
  return result;
}

// Define a schema for range argument using Zod with custom refinement
const rangeSchema = z.string().superRefine((val, ctx) => {
  const parts = val.split(",");
  for (const part of parts) {
    const trimmed = part.trim();
    // Expect format: axis=low:high, where axis is x or y, and low/high are numbers
    if (!/^[xy]=[-+]?\d*\.?\d+:[-+]?\d*\.?\d+$/.test(trimmed)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Error: invalid range format for part '${trimmed}'. Expected format axis=low:high. Example: x=-10:10`
      });
      return;
    }
  }
});

// Define a schema for the --file argument
const fileSchema = z.string().refine(
  (val) => val.endsWith(".svg") || val.endsWith(".png"),
  { message: "Error: --file must have a .svg or .png extension. Example: output.svg or output.png" }
);

// Add optional width and height flags with default values and validation
const dimensionSchema = z.optional(
  z.preprocess(
    (val) => Number(val),
    z.number().positive({ message: "Error: --width must be a positive number." })
  )
).default(500);

const heightSchema = z.optional(
  z.preprocess(
    (val) => Number(val),
    z.number().positive({ message: "Error: --height must be a positive number." })
  )
).default(300);

// Define the CLI schema using Zod
const cliSchema = z.object({
  expression: z.string({ required_error: "Error: --expression and --range are required arguments." })
    .nonempty({
      message: "Error: --expression and --range are required arguments."
    })
    .refine(val => val.startsWith("y="), { message: "Error: Expression must be in the format 'y=sin(x)' or 'y=cos(x)'. Example: y=sin(x)" }),
  range: z.string({ required_error: "Error: --expression and --range are required arguments." })
    .nonempty({
      message: "Error: --expression and --range are required arguments."
    })
    .pipe(rangeSchema),
  file: z.optional(fileSchema),
  width: dimensionSchema,
  height: heightSchema
});

/**
 * Validate CLI arguments using Zod schema.
 * @param {object} argsObj - Parsed arguments object.
 * @returns {object} Validated arguments.
 */
function validateArguments(argsObj) {
  try {
    return cliSchema.parse(argsObj);
  } catch (e) {
    if (e instanceof z.ZodError) {
      exitWithError(e.errors[0].message);
    } else {
      exitWithError(e.toString());
    }
  }
}

/**
 * Process the range string into numeric boundaries.
 * @param {string} rangeStr - The range string from CLI.
 * @returns {object} Object containing xRange and yRange.
 */
function processRange(rangeStr) {
  let xRange = null;
  let yRange = null;
  const parts = rangeStr.split(",");
  for (const part of parts) {
    const [axis, bounds] = part.split("=");
    const [lowStr, highStr] = bounds.split(":");
    const low = parseFloat(lowStr);
    const high = parseFloat(highStr);
    if (axis.trim().toLowerCase() === "x") {
      xRange = { low, high };
    } else if (axis.trim().toLowerCase() === "y") {
      yRange = { low, high };
    } else {
      exitWithError(`Error: unsupported axis '${axis}'. Only 'x' and 'y' are allowed.`);
    }
  }
  if (!xRange) {
    exitWithError("Error: x range must be specified in --range.");
  }
  return { xRange, yRange };
}

export function main(args = process.argv.slice(2)) {
  // If no arguments, display usage and terminate without error
  if (args.length === 0) {
    console.log(USAGE_MESSAGE);
    return;
  }

  // Parse and validate CLI arguments
  const parsedArgs = parseArguments(args);
  const validatedArgs = validateArguments(parsedArgs);
  const { expression, range, file: fileOutput, width, height } = validatedArgs;

  // Process range into xRange and yRange objects
  const { xRange, yRange } = processRange(range);

  // Parse expression (support only y=sin(x) or y=cos(x))
  let func = null;
  const funcStr = expression.slice(2).trim();
  if (funcStr === "sin(x)") {
    func = Math.sin;
  } else if (funcStr === "cos(x)") {
    func = Math.cos;
  } else {
    exitWithError(`Error: Unsupported expression '${expression}'. Only 'y=sin(x)' and 'y=cos(x)' are supported. Example: y=sin(x)`);
  }

  // Compute time series data (sample 20 points between xRange.low and xRange.high)
  const points = [];
  const steps = 20;
  const stepSize = (xRange.high - xRange.low) / (steps - 1);
  for (let i = 0; i < steps; i++) {
    const x = xRange.low + i * stepSize;
    const y = func(x);
    points.push({ x, y });
  }

  // Dual output functionality
  if (fileOutput) {
    if (fileOutput.endsWith(".svg")) {
      // Generate simple SVG content with custom width and height
      let svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
`;
      // Determine y boundaries
      const yMin = yRange ? yRange.low : Math.min(...points.map(p => p.y));
      const yMax = yRange ? yRange.high : Math.max(...points.map(p => p.y));
      const polylinePoints = points.map(p => {
        const svgX = ((p.x - xRange.low) / (xRange.high - xRange.low)) * width;
        const svgY = height - ((p.y - yMin) / (yMax - yMin)) * height;
        return `${svgX},${svgY}`;
      }).join(" ");
      svgContent += `<polyline points="${polylinePoints}" fill="none" stroke="black" />
`;
      svgContent += `</svg>`;
      try {
        fs.writeFileSync(fileOutput, svgContent);
        console.log(`SVG plot generated and saved to ${fileOutput}`);
      } catch (e) {
        exitWithError(`Error writing file: ${e.message}`);
      }
    } else if (fileOutput.endsWith(".png")) {
      // Simulate PNG output with placeholder text including custom dimensions
      let pngContent = `PNG PLOT DATA (Width: ${width}, Height: ${height})\nExpression: ${expression}\nPoints:\n`;
      points.forEach(p => {
        pngContent += `(${p.x.toFixed(2)}, ${p.y.toFixed(2)})\n`;
      });
      try {
        fs.writeFileSync(fileOutput, pngContent);
        console.log(`PNG plot generated and saved to ${fileOutput}`);
      } catch (e) {
        exitWithError(`Error writing file: ${e.message}`);
      }
    }
  } else {
    // No file provided: output text preview to console
    console.log("Text Preview of Plot:");
    points.forEach(p => {
      console.log(`x: ${p.x.toFixed(2)}, y: ${p.y.toFixed(2)}`);
    });
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  main(args);
}
