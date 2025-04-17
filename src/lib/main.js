#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import fs from "fs";
import sharp from "sharp";

/**
 * Generates an SVG plot based on given mathematical expression and range.
 * It computes sample points from the function and draws a polyline representing the graph.
 * Optionally includes grid lines if the grid flag is true.
 * @param {string} expression - Mathematical expression (e.g., "y=sin(x)").
 * @param {string} range - Range specification (e.g., "x=-10:10,y=-1:1").
 * @param {string} [strokeColor] - Optional stroke color for the polyline. Defaults to blue.
 * @param {number} [strokeWidth] - Optional stroke width for the polyline. Defaults to 2.
 * @param {number} [width] - Optional width of the SVG. Defaults to 300.
 * @param {number} [height] - Optional height of the SVG. Defaults to 150.
 * @param {boolean} [grid] - Optional flag to include grid lines. Defaults to false.
 * @param {boolean} [logScale] - Optional flag to apply logarithmic scaling on the y-axis. Defaults to false.
 * @returns {string} - SVG content as string.
 */
function generateSVG(expression, range, strokeColor = "blue", strokeWidth = 2, width = 300, height = 150, grid = false, logScale = false) {
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

  // If logarithmic scaling is requested, ensure yMin and yMax are positive
  if (logScale && (yMin <= 0 || yMax <= 0)) {
    return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="${height}" fill="#f0f0f0"/>
  <text x="10" y="50" font-size="14" fill="#333">Error: Logarithmic scaling requires positive y values</text>
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
    if (logScale) {
      if (y <= 0) {
        return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="${height}" fill="#f0f0f0"/>
  <text x="10" y="50" font-size="14" fill="#333">Error: Logarithmic scaling requires positive y values</text>
</svg>`;
      }
      y = Math.log10(y);
    }
    // Map x to svg coordinate
    const svgX = margin + ((x - xMin) / (xMax - xMin)) * (width - 2 * margin);
    // Map y to svg coordinate (inverted y-axis) using either direct or log-transformed scaling
    const yMinTrans = logScale ? Math.log10(yMin) : yMin;
    const yMaxTrans = logScale ? Math.log10(yMax) : yMax;
    const svgY = height - margin - ((y - yMinTrans) / (yMaxTrans - yMinTrans)) * (height - 2 * margin);
    // Only add valid points
    if (!isNaN(svgY)) {
      points.push(`${svgX},${svgY}`);
    }
  }

  // If grid flag is true, compute grid lines
  let gridLines = '';
  if (grid) {
    const numX = 10, numY = 10;
    const dx = (xMax - xMin) / numX;
    const dy = (yMax - yMin) / numY;
    for (let i = 0; i <= numX; i++) {
      const xTick = xMin + i * dx;
      const svgX = margin + ((xTick - xMin) / (xMax - xMin)) * (width - 2 * margin);
      gridLines += `<line x1="${svgX}" y1="${margin}" x2="${svgX}" y2="${height - margin}" stroke="#ccc" stroke-width="1"/>`;
    }
    for (let j = 0; j <= numY; j++) {
      const yTick = yMin + j * dy;
      let yTickTrans = yTick;
      if (logScale) {
        if (yTick <= 0) continue;
        yTickTrans = Math.log10(yTick);
      }
      const yMinTrans = logScale ? Math.log10(yMin) : yMin;
      const yMaxTrans = logScale ? Math.log10(yMax) : yMax;
      const svgY = height - margin - ((yTickTrans - yMinTrans) / (yMaxTrans - yMinTrans)) * (height - 2 * margin);
      gridLines += `<line x1="${margin}" y1="${svgY}" x2="${width - margin}" y2="${svgY}" stroke="#ccc" stroke-width="1"/>`;
    }
  }

  // Build SVG content with background, optional grid lines, and polyline for the graph
  const polyline = `<polyline fill="none" stroke="${strokeColor}" stroke-width="${strokeWidth}" points="${points.join(' ')}" />`;

  // Optionally add a log scale indicator
  const logIndicator = logScale ? `<text x="10" y="15" font-size="10" fill="#333">Log Scale Applied</text>` : '';

  return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="${height}" fill="#f0f0f0"/>
  ${gridLines}
  ${polyline}
  <text x="10" y="${height - 5}" font-size="10" fill="#333">Expression: ${expression}, Range: ${range}</text>
  ${logIndicator}
</svg>`;
}

/**
 * Generates an SVG plot from CSV input containing x and y values.
 * Each line of the CSV should have two comma-separated values, optionally without a header.
 * Optionally includes grid lines if the grid flag is true.
 * @param {string} csv - CSV data as a string.
 * @param {string} [strokeColor] - Optional stroke color for the polyline. Defaults to red.
 * @param {number} [strokeWidth] - Optional stroke width for the polyline. Defaults to 2.
 * @param {number} [width] - Optional width of the SVG. Defaults to 300.
 * @param {number} [height] - Optional height of the SVG. Defaults to 150.
 * @param {boolean} [grid] - Optional flag to include grid lines. Defaults to false.
 * @param {boolean} [logScale] - Optional flag to apply logarithmic scaling on the y-axis. Defaults to false.
 * @returns {string} - SVG content as string.
 */
function generateSVGFromCSV(csv, strokeColor = "red", strokeWidth = 2, width = 300, height = 150, grid = false, logScale = false) {
  const margin = 10;
  let dataPoints = [];
  try {
    const lines = csv.split(/\r?\n/);
    for (const line of lines) {
      if (line.trim().length === 0) continue;
      const parts = line.split(",");
      if (parts.length < 2) continue;
      const x = Number(parts[0].trim());
      const yOrig = Number(parts[1].trim());
      if (isNaN(x) || isNaN(yOrig)) continue;
      if (logScale) {
        if (yOrig <= 0) {
          return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="${height}" fill="#f0f0f0"/>
  <text x="10" y="50" font-size="14" fill="#333">Error: Logarithmic scaling requires positive y values</text>
</svg>`;
        }
        dataPoints.push([x, Math.log10(yOrig)]);
      } else {
        dataPoints.push([x, yOrig]);
      }
    }
    if (dataPoints.length === 0) throw new Error('No valid CSV data found');
  } catch (error) {
    return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="${height}" fill="#f0f0f0"/>
  <text x="10" y="50" font-size="14" fill="#333">Error parsing CSV: ${error.message}</text>
</svg>`;
  }

  // Determine x and y extents from the CSV data
  const xs = dataPoints.map(p => p[0]);
  const ys = dataPoints.map(p => p[1]);
  const xMin = Math.min(...xs);
  const xMax = Math.max(...xs);
  const yMin = Math.min(...ys);
  const yMax = Math.max(...ys);

  // Map CSV points to svg coordinates
  const points = dataPoints.map(([x, y]) => {
    const svgX = margin + ((x - xMin) / ((xMax - xMin) || 1)) * (width - 2 * margin);
    const svgY = height - margin - ((y - yMin) / ((yMax - yMin) || 1)) * (height - 2 * margin);
    return `${svgX},${svgY}`;
  });

  // If grid flag is true, compute grid lines
  let gridLines = '';
  if (grid) {
    const numX = 10, numY = 10;
    const dx = (xMax - xMin) / numX;
    const dy = (yMax - yMin) / numY;
    for (let i = 0; i <= numX; i++) {
      const xTick = xMin + i * dx;
      const svgX = margin + ((xTick - xMin) / ((xMax - xMin) || 1)) * (width - 2 * margin);
      gridLines += `<line x1="${svgX}" y1="${margin}" x2="${svgX}" y2="${height - margin}" stroke="#ccc" stroke-width="1"/>`;
    }
    for (let j = 0; j <= numY; j++) {
      const yTick = yMin + j * dy;
      const svgY = height - margin - ((yTick - yMin) / ((yMax - yMin) || 1)) * (height - 2 * margin);
      gridLines += `<line x1="${margin}" y1="${svgY}" x2="${width - margin}" y2="${svgY}" stroke="#ccc" stroke-width="1"/>`;
    }
  }

  // Build SVG content with background, optional grid lines, and polyline for CSV data
  const polyline = `<polyline fill="none" stroke="${strokeColor}" stroke-width="${strokeWidth}" points="${points.join(' ')}" />`;
  const logIndicator = logScale ? `<text x="10" y="15" font-size="10" fill="#333">Log Scale Applied</text>` : '';
  return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="${height}" fill="#f0f0f0"/>
  ${gridLines}
  ${polyline}
  <text x="10" y="${height - 5}" font-size="10" fill="#333">CSV Plot</text>
  ${logIndicator}
</svg>`;
}

/**
 * Parses CLI arguments for --expression, --range, --file, --csv, --stroke-color, --stroke-width, --width, --height, --grid, and --log-scale options.
 * @param {string[]} args - The command line arguments array.
 * @returns {Object} - Parsed options.
 */
function parseArgs(args) {
  const options = { expression: null, range: null, file: null, csv: null, strokeColor: null, strokeWidth: null, width: null, height: null, grid: false, logScale: false };
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
      case "--csv":
        if (i + 1 < args.length) {
          options.csv = args[i + 1];
          i++;
        }
        break;
      case "--stroke-color":
        if (i + 1 < args.length) {
          options.strokeColor = args[i + 1];
          i++;
        }
        break;
      case "--stroke-width":
        if (i + 1 < args.length) {
          options.strokeWidth = Number(args[i + 1]);
          i++;
        }
        break;
      case "--width":
        if (i + 1 < args.length) {
          options.width = Number(args[i + 1]);
          i++;
        }
        break;
      case "--height":
        if (i + 1 < args.length) {
          options.height = Number(args[i + 1]);
          i++;
        }
        break;
      case "--grid":
        options.grid = true;
        break;
      case "--log-scale":
        options.logScale = true;
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
    let svgContent;
    // Determine custom styling and dimensions
    const customStrokeColor = options.strokeColor;
    const customStrokeWidth = options.strokeWidth;
    const customWidth = options.width || 300;
    const customHeight = options.height || 150;

    if (options.file.endsWith(".svg")) {
      if (options.csv) {
        svgContent = generateSVGFromCSV(options.csv, customStrokeColor || undefined, customStrokeWidth || undefined, customWidth, customHeight, options.grid, options.logScale);
      } else if (options.expression && options.range) {
        svgContent = generateSVG(options.expression, options.range, customStrokeColor || undefined, customStrokeWidth || undefined, customWidth, customHeight, options.grid, options.logScale);
      } else {
        console.error("Error: either --csv or both --expression and --range options are required for SVG generation.");
        return;
      }
      try {
        fs.writeFileSync(options.file, svgContent, "utf8");
        console.log(`SVG file created at: ${options.file}`);
      } catch (error) {
        console.error("Error writing SVG file:", error.message);
      }
    } else if (options.file.endsWith(".png")) {
      if (options.csv) {
        svgContent = generateSVGFromCSV(options.csv, customStrokeColor || undefined, customStrokeWidth || undefined, customWidth, customHeight, options.grid, options.logScale);
      } else if (options.expression && options.range) {
        svgContent = generateSVG(options.expression, options.range, customStrokeColor || undefined, customStrokeWidth || undefined, customWidth, customHeight, options.grid, options.logScale);
      } else {
        console.error("Error: either --csv or both --expression and --range options are required for PNG generation.");
        return;
      }
      try {
        const pngBuffer = await sharp(Buffer.from(svgContent)).png().toBuffer();
        fs.writeFileSync(options.file, pngBuffer);
        console.log(`PNG file created at: ${options.file}`);
      } catch (error) {
        console.error("Error writing PNG file:", error.message);
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
