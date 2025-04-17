#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import fs from "fs";
import sharp from "sharp";

/**
 * Generates an SVG plot based on given mathematical expression and range.
 * It computes sample points from the function and draws a polyline representing the graph.
 * @param {string} expression - Mathematical expression (e.g., "y=sin(x)").
 * @param {string} range - Range specification (e.g., "x=-10:10,y=-1:1").
 * @returns {string} - SVG content as string.
 */
function generateSVG(expression, range) {
  // Set SVG dimensions and margin
  const width = 300;
  const height = 150;
  const margin = 10;
  const sampleCount = 100;

  // Parse expression: extract function body after '=' if exists
  let funcStr = expression;
  if (expression.includes('=')) {
    const parts = expression.split('=');
    funcStr = parts[1].trim();
  }

  // Parse range, expected format: "x=min:max,y=min:max"
  let xMin, xMax, yMin, yMax;
  try {
    const rangeParts = range.split(",");
    const xPart = rangeParts.find(part => part.trim().startsWith('x='));
    const yPart = rangeParts.find(part => part.trim().startsWith('y='));
    if (!xPart || !yPart) throw new Error('Invalid range format');

    const xVals = xPart.split('=')[1].split(":").map(Number);
    const yVals = yPart.split('=')[1].split(":").map(Number);
    [xMin, xMax] = xVals;
    [yMin, yMax] = yVals;
    if ([xMin, xMax, yMin, yMax].some(isNaN)) throw new Error('Range values must be numbers');
  } catch (error) {
    return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="${height}" fill="#f0f0f0"/>
  <text x="10" y="50" font-size="14" fill="#333">Error parsing range: ${error.message}</text>
</svg>`;
  }

  // Create function to evaluate expression using Math context
  let func;
  try {
    func = new Function('x', 'with (Math) { return ' + funcStr + '; }');
    // Test the function for a sample value
    const testVal = func(xMin);
    if (typeof testVal !== 'number' || isNaN(testVal)) {
      throw new Error('Function does not return a number');
    }
  } catch (error) {
    return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="${height}" fill="#f0f0f0"/>
  <text x="10" y="50" font-size="14" fill="#333">Error in function: ${error.message}</text>
</svg>`;
  }

  // Compute sample points for x and corresponding y values
  const points = [];
  const step = (xMax - xMin) / (sampleCount - 1);
  for (let i = 0; i < sampleCount; i++) {
    const x = xMin + i * step;
    let y = func(x);
    if (typeof y !== 'number' || !isFinite(y)) {
      y = NaN;
    }
    // Map x to svg coordinate
    const svgX = margin + ((x - xMin) / (xMax - xMin)) * (width - 2 * margin);
    // Map y to svg coordinate (inverted y-axis)
    const svgY = height - margin - ((y - yMin) / (yMax - yMin)) * (height - 2 * margin);
    // Only add valid points
    if (!isNaN(svgY)) {
      points.push(`${svgX},${svgY}`);
    }
  }

  // Build SVG content with background and polyline for the graph
  const polyline = `<polyline fill="none" stroke="blue" stroke-width="2" points="${points.join(' ')}" />`;

  return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="${height}" fill="#f0f0f0"/>
  ${polyline}
  <text x="10" y="${height - 5}" font-size="10" fill="#333">Expression: ${expression}, Range: ${range}</text>
</svg>`;
}

/**
 * Parses CLI arguments for --expression, --range, and --file options.
 * @param {string[]} args - The command line arguments array.
 * @returns {Object} - Parsed options.
 */
function parseArgs(args) {
  const options = { expression: null, range: null, file: null };
  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case "--expression":
        if (i + 1 < args.length) {
          options.expression = args[i + 1];
          i++;
        }
        break;
      case "--range":
        if (i + 1 < args.length) {
          options.range = args[i + 1];
          i++;
        }
        break;
      case "--file":
        if (i + 1 < args.length) {
          options.file = args[i + 1];
          i++;
        }
        break;
      default:
        // Ignore unrecognized arguments
        break;
    }
  }
  return options;
}

export async function main(args) {
  const options = parseArgs(args);
  if (options.file) {
    if (options.file.endsWith(".svg")) {
      if (options.expression && options.range) {
        const svgContent = generateSVG(options.expression, options.range);
        try {
          fs.writeFileSync(options.file, svgContent, "utf8");
          console.log(`SVG file created at: ${options.file}`);
        } catch (error) {
          console.error("Error writing SVG file:", error.message);
        }
      } else {
        console.error("Error: --expression and --range options are required for SVG generation.");
      }
    } else if (options.file.endsWith(".png")) {
      if (options.expression && options.range) {
        const svgContent = generateSVG(options.expression, options.range);
        try {
          const pngBuffer = await sharp(Buffer.from(svgContent)).png().toBuffer();
          fs.writeFileSync(options.file, pngBuffer);
          console.log(`PNG file created at: ${options.file}`);
        } catch (error) {
          console.error("Error writing PNG file:", error.message);
        }
      } else {
        console.error("Error: --expression and --range options are required for PNG generation.");
      }
    } else {
      console.error("Error: Only .svg and .png files are supported for plot generation.");
    }
  } else {
    console.log(`Run with: ${JSON.stringify(options)}`);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  main(args);
}
