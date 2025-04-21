#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import fs from "fs";
import sharp from "sharp";
import PDFDocument from "pdfkit";

/**
 * Generates an SVG plot based on given mathematical expression and range.
 * It computes sample points from the function and draws a polyline representing the graph.
 * Optionally includes grid lines if the grid flag is true.
 * Adds optional title and axis labels if provided.
 * Optionally adds tooltips (data point markers with a <title> element) for each data point if tooltip is true.
 * Supports optional stroke dash pattern via dashArray, and optional custom tooltip formatting via tooltipFormat.
 * Additionally supports custom tooltip styling via tooltipStyle which appends extra CSS to the tooltip marker.
 * Allows custom axis tick label formatting via xTickFormat and yTickFormat options.
 *
 * New Parameters:
 *   - fontFamily: to set a custom font family for all text elements in the SVG. Defaults to "inherit".
 *   - tooltipShape: to set the shape of the tooltip markers. Supported values: "circle" (default), "square", and "triangle".
 *
 * @param {string} expression - Mathematical expression (e.g., "y=sin(x)").
 * @param {string} range - Range specification (e.g., "x=-10:10,y=-1:1").
 * @param {string} [strokeColor] - Optional stroke color for the polyline. Defaults to blue.
 * @param {number} [strokeWidth] - Optional stroke width for the polyline. Defaults to 2.
 * @param {number} [width] - Optional width of the SVG. Defaults to 300.
 * @param {number} [height] - Optional height of the SVG. Defaults to 150.
 * @param {boolean} [grid] - Optional flag to include grid lines. Defaults to false.
 * @param {boolean} [logScale] - Optional flag to apply logarithmic scaling on the y-axis. Defaults to false.
 * @param {string} [backgroundColor] - Optional background color for the SVG. Defaults to '#f0f0f0'.
 * @param {string} [title] - Optional plot title to be displayed at the top center.
 * @param {string} [xLabel] - Optional label for the x-axis to be displayed at the bottom center.
 * @param {string} [yLabel] - Optional label for the y-axis to be displayed on the left side.
 * @param {boolean} [tooltip] - Optional flag to add tooltip markers at each data point. Defaults to false.
 * @param {string|null} [dashArray] - Optional dash pattern for the polyline.
 * @param {string|null} [tooltipFormat] - Optional tooltip template with placeholders {x} and {y}.
 * @param {string|null} [tooltipStyle] - Optional custom CSS styling for the tooltip marker.
 * @param {string|null} [xTickFormat] - Optional format for x-axis tick labels, with placeholder {value}.
 * @param {string|null} [yTickFormat] - Optional format for y-axis tick labels, with placeholder {value}.
 * @param {string} [fontFamily] - Optional custom font family for all text elements. Defaults to "inherit".
 * @param {string} [tooltipShape] - Optional shape for tooltip markers. Defaults to "circle" (other options: "square", "triangle").
 * @returns {string} - SVG content as string.
 */
function generateSVG(
  expression,
  range,
  strokeColor = "blue",
  strokeWidth = 2,
  width = 300,
  height = 150,
  grid = false,
  logScale = false,
  backgroundColor = "#f0f0f0",
  title = "",
  xLabel = "",
  yLabel = "",
  tooltip = false,
  dashArray = null,
  tooltipFormat = null,
  tooltipStyle = null,
  xTickFormat = null,
  yTickFormat = null,
  fontFamily = "inherit",
  tooltipShape = "circle",
) {
  const margin = 10;
  const sampleCount = 100;

  // Parse expression: extract function body after '=' if exists
  let funcStr = expression;
  if (expression.includes("=")) {
    const parts = expression.split("=");
    funcStr = parts[1].trim();
  }

  // Parse range, expected format: "x=min:max,y=min:max"
  let xMin;
  let xMax;
  let yMin;
  let yMax;
  try {
    const rangeParts = range.split(",");
    const xPart = rangeParts.find((part) => part.trim().startsWith("x="));
    const yPart = rangeParts.find((part) => part.trim().startsWith("y="));
    if (!xPart || !yPart) throw new Error("Invalid range format");

    const xVals = xPart.split("=")[1].split(":").map(Number);
    const yVals = yPart.split("=")[1].split(":").map(Number);
    [xMin, xMax] = xVals;
    [yMin, yMax] = yVals;
    if ([xMin, xMax, yMin, yMax].some(isNaN)) throw new Error("Range values must be numbers");
  } catch (error) {
    return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="${height}" fill="${backgroundColor}"/>
  <text x="10" y="50" font-size="14" fill="#333">Error parsing range: ${error.message}</text>
</svg>`;
  }

  // If logarithmic scaling is requested, ensure yMin and yMax are positive
  if (logScale && (yMin <= 0 || yMax <= 0)) {
    return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="${height}" fill="${backgroundColor}"/>
  <text x="10" y="50" font-size="14" fill="#333">Error: Logarithmic scaling requires positive y values</text>
</svg>`;
  }

  // Create function to evaluate expression using Math context
  let func;
  try {
    func = new Function("x", "with (Math) { return " + funcStr + "; }");
    // Test the function for a sample value
    const testVal = func(xMin);
    if (typeof testVal !== "number" || isNaN(testVal)) {
      throw new Error("Function does not return a number");
    }
  } catch (error) {
    return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="${height}" fill="${backgroundColor}"/>
  <text x="10" y="50" font-size="14" fill="#333">Error in function: ${error.message}</text>
</svg>`;
  }

  // Validate tooltip shape option
  if (
    tooltip &&
    tooltipShape &&
    tooltipShape !== "circle" &&
    tooltipShape !== "square" &&
    tooltipShape !== "triangle"
  ) {
    console.error("Error: Invalid tooltip shape provided. Only 'circle', 'square', and 'triangle' are supported.");
    return;
  }

  // Compute sample points for x and corresponding y values, and optionally tooltip markers
  const points = [];
  let tooltipElements = "";
  const step = (xMax - xMin) / (sampleCount - 1);
  for (let i = 0; i < sampleCount; i++) {
    const x = xMin + i * step;
    let y = func(x);
    if (logScale) {
      if (y <= 0) {
        return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="${height}" fill="${backgroundColor}"/>
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
    if (!isNaN(svgY)) {
      points.push(`${svgX},${svgY}`);
      if (tooltip) {
        const formattedTooltip = tooltipFormat
          ? tooltipFormat.replace("{x}", x.toFixed(2)).replace("{y}", y.toFixed(2))
          : `(${x.toFixed(2)}, ${y.toFixed(2)})`;
        const styleAttr = `cursor: pointer;${tooltipStyle ? " " + tooltipStyle : ""}`;
        if (tooltipShape === "square") {
          // Draw a square (rect) with side 6, centered at (svgX, svgY)
          tooltipElements += `<rect x="${svgX - 3}" y="${svgY - 3}" width="6" height="6" fill="black" style="${styleAttr}"><title>${formattedTooltip}</title></rect>`;
        } else if (tooltipShape === "triangle") {
          // Draw a triangle using polygon with vertices at (svgX, svgY-3), (svgX-3, svgY+3), (svgX+3, svgY+3)
          tooltipElements += `<polygon points="${svgX},${svgY - 3} ${svgX - 3},${svgY + 3} ${svgX + 3},${svgY + 3}" fill="black" style="${styleAttr}"><title>${formattedTooltip}</title></polygon>`;
        } else {
          // Default: circle
          tooltipElements += `<circle cx="${svgX}" cy="${svgY}" r="3" fill="black" style="${styleAttr}"><title>${formattedTooltip}</title></circle>`;
        }
      }
    }
  }

  // If grid flag is true, compute grid lines
  let gridLines = "";
  const numX = 10;
  const numY = 10;
  if (grid) {
    const dx = (xMax - xMin) / numX;
    const dy = (yMax - yMin) / numY;
    for (let i = 0; i <= numX; i++) {
      const xTick = xMin + i * dx;
      const svgX = margin + ((xTick - xMin) / (xMax - xMin)) * (width - 2 * margin);
      gridLines += `<line x1="${svgX}" y1="${margin}" x2="${svgX}" y2="${height - margin}" stroke="#ccc" stroke-width="1"/>`;
    }
    for (let j = 0; j <= numY; j++) {
      const yTick = yMin + (j * (yMax - yMin)) / numY;
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

  // Compute custom axis tick labels if formats are provided
  let xTickLabels = "";
  let yTickLabels = "";
  const numTicksX = 10;
  const numTicksY = 10;
  if (xTickFormat) {
    for (let i = 0; i <= numTicksX; i++) {
      const xTick = xMin + (i * (xMax - xMin)) / numTicksX;
      const svgX = margin + ((xTick - xMin) / (xMax - xMin)) * (width - 2 * margin);
      const label = xTickFormat.replace("{value}", xTick.toFixed(2));
      xTickLabels += `<text x="${svgX}" y="${height - margin + 12}" font-size="10" fill="#333" text-anchor="middle" style="font-family: ${fontFamily};">${label}</text>`;
    }
  }
  if (yTickFormat) {
    for (let j = 0; j <= numTicksY; j++) {
      const yTick = yMin + (j * (yMax - yMin)) / numTicksY;
      let yTickTrans = yTick;
      if (logScale) {
        if (yTick <= 0) continue;
        yTickTrans = Math.log10(yTick);
      }
      const yMinTrans = logScale ? Math.log10(yMin) : yMin;
      const yMaxTrans = logScale ? Math.log10(yMax) : yMax;
      const svgY = height - margin - ((yTickTrans - yMinTrans) / (yMaxTrans - yMinTrans)) * (height - 2 * margin);
      const label = yTickFormat.replace("{value}", yTick.toFixed(2));
      yTickLabels += `<text x="${margin - 5}" y="${svgY + 4}" font-size="10" fill="#333" text-anchor="end" style="font-family: ${fontFamily};">${label}</text>`;
    }
  }

  const dashArrayAttribute = dashArray ? ` stroke-dasharray="${dashArray}"` : "";
  const polyline = `<polyline fill="none" stroke="${strokeColor}" stroke-width="${strokeWidth}"${dashArrayAttribute} points="${points.join(" ")}" />`;
  const logIndicator = logScale ? `<text x="10" y="15" font-size="10" fill="#333">Log Scale Applied</text>` : "";

  // Additional text elements for title and axis labels
  let titleElement = "";
  if (title) {
    titleElement = `<text x="${width / 2}" y="20" font-size="16" fill="#333" text-anchor="middle" style="font-family: ${fontFamily};">${title}</text>`;
  }
  let xLabelElement = "";
  if (xLabel) {
    xLabelElement = `<text x="${width / 2}" y="${height - 5}" font-size="12" fill="#333" text-anchor="middle" style="font-family: ${fontFamily};">${xLabel}</text>`;
  }
  let yLabelElement = "";
  if (yLabel) {
    yLabelElement = `<text x="15" y="${height / 2}" font-size="12" fill="#333" text-anchor="middle" transform="rotate(-90,15,${height / 2})" style="font-family: ${fontFamily};">${yLabel}</text>`;
  }

  // The existing expression text at the bottom (keep for reference if no custom xLabel provided)
  const defaultInfo = !xLabel
    ? `<text x="10" y="${height - 5}" font-size="10" fill="#333" style="font-family: ${fontFamily};">CSV Plot</text>`
    : "";

  return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="${height}" fill="${backgroundColor}"/>
  ${titleElement}
  ${gridLines}
  ${xTickLabels}
  ${yTickLabels}
  ${polyline}
  ${defaultInfo}
  ${xLabelElement}
  ${yLabelElement}
  ${logIndicator}
  ${tooltip ? tooltipElements : ""}
</svg>`;
}

/**
 * Generates an SVG plot from CSV input containing x and y values.
 * Each line of the CSV should have two comma-separated values, optionally without a header.
 * Optionally includes grid lines if the grid flag is true.
 * Adds optional title and axis labels if provided.
 * Optionally adds tooltips (data point markers with a <title> element) for each data point if tooltip is true.
 * Supports optional stroke dash pattern via dashArray, and optional custom tooltip formatting via tooltipFormat.
 * Additionally supports custom tooltip styling via tooltipStyle.
 * Allows custom axis tick label formatting via xTickFormat and yTickFormat options.
 *
 * New Parameters:
 *   - fontFamily: to set a custom font family for all text elements in the SVG. Defaults to "inherit".
 *   - tooltipShape: to set the tooltip marker shape. Supported values: "circle" (default), "square", and "triangle".
 *
 * @param {string} csv - CSV data as a string.
 * @param {string} [strokeColor] - Optional stroke color for the polyline. Defaults to red.
 * @param {number} [strokeWidth] - Optional stroke width for the polyline. Defaults to 2.
 * @param {number} [width] - Optional width of the SVG. Defaults to 300.
 * @param {number} [height] - Optional height of the SVG. Defaults to 150.
 * @param {boolean} [grid] - Optional flag to include grid lines. Defaults to false.
 * @param {boolean} [logScale] - Optional flag to apply logarithmic scaling on the y-axis. Defaults to false.
 * @param {string} [backgroundColor] - Optional background color for the SVG. Defaults to '#f0f0f0'.
 * @param {string} [title] - Optional plot title.
 * @param {string} [xLabel] - Optional x-axis label.
 * @param {string} [yLabel] - Optional y-axis label.
 * @param {boolean} [tooltip] - Optional flag to add tooltip markers for each data point. Defaults to false.
 * @param {string|null} [dashArray] - Optional dash pattern for the polyline.
 * @param {string|null} [tooltipFormat] - Optional tooltip template with placeholders {x} and {y}.
 * @param {string|null} [tooltipStyle] - Optional custom CSS styling for the tooltip marker.
 * @param {string|null} [xTickFormat] - Optional format for x-axis tick labels, with placeholder {value}.
 * @param {string|null} [yTickFormat] - Optional format for y-axis tick labels, with placeholder {value}.
 * @param {string} [fontFamily] - Optional custom font family for all text elements. Defaults to "inherit".
 * @param {string} [tooltipShape] - Optional shape for tooltip markers. Defaults to "circle" (other options: "square", "triangle").
 * @returns {string} - SVG content as string.
 */
function generateSVGFromCSV(
  csv,
  strokeColor = "red",
  strokeWidth = 2,
  width = 300,
  height = 150,
  grid = false,
  logScale = false,
  backgroundColor = "#f0f0f0",
  title = "",
  xLabel = "",
  yLabel = "",
  tooltip = false,
  dashArray = null,
  tooltipFormat = null,
  tooltipStyle = null,
  xTickFormat = null,
  yTickFormat = null,
  fontFamily = "inherit",
  tooltipShape = "circle",
) {
  const margin = 10;
  const dataPoints = [];
  let tooltipElements = "";
  try {
    const lines = csv.split(/\r?\n/);
    let startIndex = 0;
    // Detect if the first line is a header
    if (lines.length > 0) {
      const firstLineParts = lines[0].split(",");
      if (firstLineParts.length >= 2) {
        const firstToken = Number(firstLineParts[0].trim());
        const secondToken = Number(firstLineParts[1].trim());
        if (isNaN(firstToken) || isNaN(secondToken)) {
          startIndex = 1;
        }
      }
    }
    for (let i = startIndex; i < lines.length; i++) {
      const line = lines[i];
      if (line.trim().length === 0) continue;
      const parts = line.split(",");
      if (parts.length < 2) continue;
      const x = Number(parts[0].trim());
      const yOrig = Number(parts[1].trim());
      if (isNaN(x) || isNaN(yOrig)) continue;
      if (logScale) {
        if (yOrig <= 0) {
          return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="${height}" fill="${backgroundColor}"/>
  <text x="10" y="50" font-size="14" fill="#333">Error: Logarithmic scaling requires positive y values</text>
</svg>`;
        }
        dataPoints.push([x, Math.log10(yOrig)]);
      } else {
        dataPoints.push([x, yOrig]);
      }
    }
    if (dataPoints.length === 0) throw new Error("No valid CSV data found");
  } catch (error) {
    return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="${height}" fill="${backgroundColor}"/>
  <text x="10" y="50" font-size="14" fill="#333">Error parsing CSV: ${error.message}</text>
</svg>`;
  }

  // Validate tooltip shape option
  if (
    tooltip &&
    tooltipShape &&
    tooltipShape !== "circle" &&
    tooltipShape !== "square" &&
    tooltipShape !== "triangle"
  ) {
    console.error("Error: Invalid tooltip shape provided. Only 'circle', 'square', and 'triangle' are supported.");
    return;
  }

  // Determine x and y extents
  const xs = dataPoints.map((p) => p[0]);
  const ys = dataPoints.map((p) => p[1]);
  const xMin = Math.min(...xs);
  const xMax = Math.max(...xs);
  const yMin = Math.min(...ys);
  const yMax = Math.max(...ys);

  // Map CSV points to svg coordinates
  const points = dataPoints.map(([x, y]) => {
    const svgX = margin + ((x - xMin) / (xMax - xMin || 1)) * (width - 2 * margin);
    const svgY = height - margin - ((y - yMin) / (yMax - yMin || 1)) * (height - 2 * margin);
    if (tooltip) {
      const formattedTooltip = tooltipFormat
        ? tooltipFormat.replace("{x}", x.toFixed(2)).replace("{y}", y.toFixed(2))
        : `(${x.toFixed(2)}, ${y.toFixed(2)})`;
      const styleAttr = `cursor: pointer;${tooltipStyle ? " " + tooltipStyle : ""}`;
      if (tooltipShape === "square") {
        // Draw a square
        tooltipElements += `<rect x="${svgX - 3}" y="${svgY - 3}" width="6" height="6" fill="black" style="${styleAttr}"><title>${formattedTooltip}</title></rect>`;
      } else if (tooltipShape === "triangle") {
        tooltipElements += `<polygon points="${svgX},${svgY - 3} ${svgX - 3},${svgY + 3} ${svgX + 3},${svgY + 3}" fill="black" style="${styleAttr}"><title>${formattedTooltip}</title></polygon>`;
      } else {
        tooltipElements += `<circle cx="${svgX}" cy="${svgY}" r="3" fill="black" style="${styleAttr}"><title>${formattedTooltip}</title></circle>`;
      }
    }
    return `${svgX},${svgY}`;
  });

  // If grid flag is true, compute grid lines
  let gridLines = "";
  const numX = 10;
  const numY = 10;
  if (grid) {
    const dx = (xMax - xMin) / numX;
    const dy = (yMax - yMin) / numY;
    for (let i = 0; i <= numX; i++) {
      const xTick = xMin + i * dx;
      const svgX = margin + ((xTick - xMin) / (xMax - xMin || 1)) * (width - 2 * margin);
      gridLines += `<line x1="${svgX}" y1="${margin}" x2="${svgX}" y2="${height - margin}" stroke="#ccc" stroke-width="1"/>`;
    }
    for (let j = 0; j <= numY; j++) {
      const yTick = yMin + (j * (yMax - yMin)) / numY;
      const svgY = height - margin - ((yTick - yMin) / (yMax - yMin || 1)) * (height - 2 * margin);
      gridLines += `<line x1="${margin}" y1="${svgY}" x2="${width - margin}" y2="${svgY}" stroke="#ccc" stroke-width="1"/>`;
    }
  }

  // Compute custom axis tick labels if formats are provided
  let xTickLabels = "";
  let yTickLabels = "";
  const numTicksX = 10;
  const numTicksY = 10;
  if (xTickFormat) {
    for (let i = 0; i <= numTicksX; i++) {
      const xTick = xMin + (i * (xMax - xMin)) / numTicksX;
      const svgX = margin + ((xTick - xMin) / (xMax - xMin || 1)) * (width - 2 * margin);
      const label = xTickFormat.replace("{value}", xTick.toFixed(2));
      xTickLabels += `<text x="${svgX}" y="${height - margin + 12}" font-size="10" fill="#333" text-anchor="middle" style="font-family: ${fontFamily};">${label}</text>`;
    }
  }
  if (yTickFormat) {
    for (let j = 0; j <= numTicksY; j++) {
      const yTick = yMin + (j * (yMax - yMin)) / numTicksY;
      const svgY = height - margin - ((yTick - yMin) / (yMax - yMin || 1)) * (height - 2 * margin);
      const label = yTickFormat.replace("{value}", yTick.toFixed(2));
      yTickLabels += `<text x="${margin - 5}" y="${svgY + 4}" font-size="10" fill="#333" text-anchor="end" style="font-family: ${fontFamily};">${label}</text>`;
    }
  }

  const dashArrayAttribute = dashArray ? ` stroke-dasharray="${dashArray}"` : "";
  const polyline = `<polyline fill="none" stroke="${strokeColor}" stroke-width="${strokeWidth}"${dashArrayAttribute} points="${points.join(" ")}" />`;
  const logIndicator = logScale ? `<text x="10" y="15" font-size="10" fill="#333">Log Scale Applied</text>` : "";

  // Additional text elements for title and axis labels
  let titleElement = "";
  if (title) {
    titleElement = `<text x="${width / 2}" y="20" font-size="16" fill="#333" text-anchor="middle" style="font-family: ${fontFamily};">${title}</text>`;
  }
  let xLabelElement = "";
  if (xLabel) {
    xLabelElement = `<text x="${width / 2}" y="${height - 5}" font-size="12" fill="#333" text-anchor="middle" style="font-family: ${fontFamily};">${xLabel}</text>`;
  }
  let yLabelElement = "";
  if (yLabel) {
    yLabelElement = `<text x="15" y="${height / 2}" font-size="12" fill="#333" text-anchor="middle" transform="rotate(-90,15,${height / 2})" style="font-family: ${fontFamily};">${yLabel}</text>`;
  }

  // The existing expression text at the bottom (keep for reference if no custom xLabel provided)
  const defaultInfo = !xLabel
    ? `<text x="10" y="${height - 5}" font-size="10" fill="#333" style="font-family: ${fontFamily};">CSV Plot</text>`
    : "";

  return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="${height}" fill="${backgroundColor}"/>
  ${titleElement}
  ${gridLines}
  ${xTickLabels}
  ${yTickLabels}
  ${polyline}
  ${defaultInfo}
  ${xLabelElement}
  ${yLabelElement}
  ${logIndicator}
  ${tooltip ? tooltipElements : ""}
</svg>`;
}

/**
 * Parses CLI arguments for various options including new tick format options, tooltip shape, and help flag.
 * @param {string[]} args - The command line arguments array.
 * @returns {Object} - Parsed options.
 */
function parseArgs(args) {
  const options = {
    expression: null,
    range: null,
    file: null,
    csv: null,
    strokeColor: null,
    strokeWidth: null,
    width: null,
    height: null,
    grid: false,
    logScale: false,
    backgroundColor: null,
    title: null,
    xLabel: null,
    yLabel: null,
    tooltip: false,
    dashArray: null,
    tooltipFormat: null,
    tooltipStyle: null,
    xTickFormat: null,
    yTickFormat: null,
    fontFamily: null,
    tooltipShape: null,
    help: false,
    minify: false,
  };
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
          const num = Number(args[i + 1]);
          if (!isNaN(num)) options.strokeWidth = num;
          i++;
        }
        break;
      case "--width":
        if (i + 1 < args.length) {
          const num = Number(args[i + 1]);
          if (!isNaN(num)) options.width = num;
          i++;
        }
        break;
      case "--height":
        if (i + 1 < args.length) {
          const num = Number(args[i + 1]);
          if (!isNaN(num)) options.height = num;
          i++;
        }
        break;
      case "--grid":
        options.grid = true;
        break;
      case "--log-scale":
        options.logScale = true;
        break;
      case "--background-color":
        if (i + 1 < args.length) {
          options.backgroundColor = args[i + 1];
          i++;
        }
        break;
      case "--title":
        if (i + 1 < args.length) {
          options.title = args[i + 1];
          i++;
        }
        break;
      case "--x-label":
        if (i + 1 < args.length) {
          options.xLabel = args[i + 1];
          i++;
        }
        break;
      case "--y-label":
        if (i + 1 < args.length) {
          options.yLabel = args[i + 1];
          i++;
        }
        break;
      case "--tooltip":
        options.tooltip = true;
        break;
      case "--dash-array":
        if (i + 1 < args.length) {
          options.dashArray = args[i + 1];
          i++;
        }
        break;
      case "--tooltip-format":
        if (i + 1 < args.length) {
          options.tooltipFormat = args[i + 1];
          i++;
        }
        break;
      case "--tooltip-style":
        if (i + 1 < args.length) {
          options.tooltipStyle = args[i + 1];
          i++;
        }
        break;
      case "--x-tick-format":
        if (i + 1 < args.length) {
          options.xTickFormat = args[i + 1];
          i++;
        }
        break;
      case "--y-tick-format":
        if (i + 1 < args.length) {
          options.yTickFormat = args[i + 1];
          i++;
        }
        break;
      case "--font-family":
        if (i + 1 < args.length) {
          options.fontFamily = args[i + 1];
          i++;
        }
        break;
      case "--minify":
        options.minify = true;
        break;
      case "--tooltip-shape":
        if (i + 1 < args.length) {
          options.tooltipShape = args[i + 1];
          i++;
        }
        break;
      case "--help":
        options.help = true;
        break;
      default:
        // Ignore unrecognized arguments
        break;
    }
  }
  return options;
}

// Help message string
const helpMessage = `Usage: node src/lib/main.js [options]

Options:
  --expression         A mathematical expression (e.g., "y=sin(x)").
  --range              A range specification for variables (e.g., "x=-10:10,y=-1:1").
  --csv                CSV-formatted time series data with two comma-separated values (x,y) per line. When this option is provided, the --expression and --range options are ignored.
  --file               The output filename for the generated plot. 
                       - If the file has a .svg extension, an SVG plot with the rendered graph will be generated.
                       - If the file has a .png extension, the tool will generate a PNG plot by converting the SVG output.
                       - If the file has a .pdf extension, the tool will generate a PDF file by embedding the plot image into a PDF document using PDFKit.
                       - If the file has a .json extension, the CLI exports the computed plot data as JSON.
                       - If the file has a .csv extension, the CLI exports the computed plot data as CSV with a header row.
                       - If the file has a .xml extension, the CLI exports the computed plot data as XML.
  --stroke-color       (Optional) Custom stroke color for the plot's polyline. Defaults to blue for function plots and red for CSV plots.
  --stroke-width       (Optional) Custom stroke width for the plot's polyline. Defaults to 2.
  --width              (Optional) Custom width for the output plot (default: 300).
  --height             (Optional) Custom height for the output plot (default: 150).
  --grid               (Optional) Include grid lines in the plot.
  --log-scale          (Optional) Apply logarithmic scaling on the y-axis. When enabled, y-values are transformed using base-10 logarithm. All y values must be positive; otherwise, an error is shown.
  --background-color   (Optional) Set a custom background color for the plot.
  --title              (Optional) Sets a custom title for the plot.
  --x-label            (Optional) Sets a custom label for the x-axis.
  --y-label            (Optional) Sets a custom label for the y-axis.
  --tooltip            (Optional) Add tooltips to each data point in the plot.
  --tooltip-format     (Optional) Customize the tooltip text format when --tooltip is enabled. Use a template string with placeholders {x} and {y} (e.g., "X: {x}, Y: {y}").
  --dash-array         (Optional) Custom dash pattern for the plotted polyline (e.g., "5,5").
  --tooltip-style      (Optional) Provide custom CSS styling for tooltip markers.
  --x-tick-format      (Optional) Customize the x-axis tick labels (use {value} as placeholder).
  --y-tick-format      (Optional) Customize the y-axis tick labels (use {value} as placeholder).
  --font-family        (Optional) Custom font family for all text elements in the SVG (e.g., "Arial, sans-serif"). Defaults to inherit.
  --minify             (Optional) When provided, the generated SVG output is minified by removing unnecessary whitespace and newlines.
  --tooltip-shape      (Optional) Set the tooltip marker shape. Accepted values: "circle" (default), "square", or "triangle".
  --help               (Optional) Display detailed usage information and a summary of all available CLI options, then exit.

Note: The --csv option and the --expression/--range options are mutually exclusive.
`;

export async function main(args) {
  const options = parseArgs(args);

  // Validate mutually exclusive input modes
  if (options.csv && (options.expression || options.range)) {
    console.error("Error: Cannot use --csv together with --expression/--range. Please provide only one input mode.");
    return;
  }

  // Validate tooltip shape option
  if (
    options.tooltipShape &&
    options.tooltipShape !== "circle" &&
    options.tooltipShape !== "square" &&
    options.tooltipShape !== "triangle"
  ) {
    console.error("Error: Invalid tooltip shape provided. Only 'circle', 'square', and 'triangle' are supported.");
    return;
  }

  if (options.help) {
    console.log(helpMessage);
    return;
  }
  if (options.file) {
    let svgContent;
    // Determine custom styling and dimensions
    const customStrokeColor = options.strokeColor;
    const customStrokeWidth = options.strokeWidth;
    const customWidth = options.width || 300;
    const customHeight = options.height || 150;
    const customBackgroundColor = options.backgroundColor || "#f0f0f0";
    const customTitle = options.title || "";
    const customXLabel = options.xLabel || "";
    const customYLabel = options.yLabel || "";
    const customTooltip = options.tooltip;
    const customDashArray = options.dashArray;
    const customTooltipFormat = options.tooltipFormat;
    const customTooltipStyle = options.tooltipStyle;
    const customXTickFormat = options.xTickFormat;
    const customYTickFormat = options.yTickFormat;
    const customFontFamily = options.fontFamily || "inherit";
    const customTooltipShape = options.tooltipShape || "circle";

    if (options.file.endsWith(".svg")) {
      if (options.csv) {
        svgContent = generateSVGFromCSV(
          options.csv,
          customStrokeColor || undefined,
          customStrokeWidth || undefined,
          customWidth,
          customHeight,
          options.grid,
          options.logScale,
          customBackgroundColor,
          customTitle,
          customXLabel,
          customYLabel,
          customTooltip,
          customDashArray,
          customTooltipFormat,
          customTooltipStyle,
          customXTickFormat,
          customYTickFormat,
          customFontFamily,
          customTooltipShape,
        );
      } else if (options.expression && options.range) {
        svgContent = generateSVG(
          options.expression,
          options.range,
          customStrokeColor || undefined,
          customStrokeWidth || undefined,
          customWidth,
          customHeight,
          options.grid,
          options.logScale,
          customBackgroundColor,
          customTitle,
          customXLabel,
          customYLabel,
          customTooltip,
          customDashArray,
          customTooltipFormat,
          customTooltipStyle,
          customXTickFormat,
          customYTickFormat,
          customFontFamily,
          customTooltipShape,
        );
      } else {
        console.error("Error: either --csv or both --expression and --range options are required for SVG generation.");
        return;
      }
      if (options.minify) {
        svgContent = svgContent.replace(/>\s+</g, "><").trim();
      }
      try {
        fs.writeFileSync(options.file, svgContent, "utf8");
        console.log(`SVG file created at: ${options.file}`);
      } catch (error) {
        console.error("Error writing SVG file:", error.message);
      }
    } else if (options.file.endsWith(".png")) {
      if (options.csv) {
        svgContent = generateSVGFromCSV(
          options.csv,
          customStrokeColor || undefined,
          customStrokeWidth || undefined,
          customWidth,
          customHeight,
          options.grid,
          options.logScale,
          customBackgroundColor,
          customTitle,
          customXLabel,
          customYLabel,
          customTooltip,
          customDashArray,
          customTooltipFormat,
          customTooltipStyle,
          customXTickFormat,
          customYTickFormat,
          customFontFamily,
          customTooltipShape,
        );
      } else if (options.expression && options.range) {
        svgContent = generateSVG(
          options.expression,
          options.range,
          customStrokeColor || undefined,
          customStrokeWidth || undefined,
          customWidth,
          customHeight,
          options.grid,
          options.logScale,
          customBackgroundColor,
          customTitle,
          customXLabel,
          customYLabel,
          customTooltip,
          customDashArray,
          customTooltipFormat,
          customTooltipStyle,
          customXTickFormat,
          customYTickFormat,
          customFontFamily,
          customTooltipShape,
        );
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
    } else if (options.file.endsWith(".pdf")) {
      if (options.csv) {
        svgContent = generateSVGFromCSV(
          options.csv,
          customStrokeColor || undefined,
          customStrokeWidth || undefined,
          customWidth,
          customHeight,
          options.grid,
          options.logScale,
          customBackgroundColor,
          customTitle,
          customXLabel,
          customYLabel,
          customTooltip,
          customDashArray,
          customTooltipFormat,
          customTooltipStyle,
          customXTickFormat,
          customYTickFormat,
          customFontFamily,
          customTooltipShape,
        );
      } else if (options.expression && options.range) {
        svgContent = generateSVG(
          options.expression,
          options.range,
          customStrokeColor || undefined,
          customStrokeWidth || undefined,
          customWidth,
          customHeight,
          options.grid,
          options.logScale,
          customBackgroundColor,
          customTitle,
          customXLabel,
          customYLabel,
          customTooltip,
          customDashArray,
          customTooltipFormat,
          customTooltipStyle,
          customXTickFormat,
          customYTickFormat,
          customFontFamily,
          customTooltipShape,
        );
      } else {
        console.error("Error: either --csv or both --expression and --range options are required for PDF generation.");
        return;
      }
      if (options.minify) {
        svgContent = svgContent.replace(/>\s+</g, "><").trim();
      }
      try {
        const pngBuffer = await sharp(Buffer.from(svgContent)).png().toBuffer();
        const doc = new PDFDocument({ autoFirstPage: false });
        doc.addPage({ size: [customWidth, customHeight] });
        doc.image(pngBuffer, 0, 0, { width: customWidth, height: customHeight });
        const pdfBuffer = await new Promise((resolve, reject) => {
          const chunks = [];
          doc.on("data", (chunk) => chunks.push(chunk));
          doc.on("end", () => resolve(Buffer.concat(chunks)));
          doc.on("error", reject);
          doc.end();
        });
        fs.writeFileSync(options.file, pdfBuffer);
        console.log(`PDF file created at: ${options.file}`);
      } catch (error) {
        console.error("Error writing PDF file:", error.message);
      }
    } else if (options.file.endsWith(".json")) {
      // JSON export branch
      let plotData;
      const margin = 10;
      if (options.csv) {
        const dataPoints = [];
        try {
          const lines = options.csv.split(/\r?\n/);
          let startIndex = 0;
          if (lines.length > 0) {
            const firstLineParts = lines[0].split(",");
            if (firstLineParts.length >= 2) {
              const firstToken = Number(firstLineParts[0].trim());
              const secondToken = Number(firstLineParts[1].trim());
              if (isNaN(firstToken) || isNaN(secondToken)) {
                startIndex = 1;
              }
            }
          }
          for (let i = startIndex; i < lines.length; i++) {
            const line = lines[i];
            if (line.trim() === "") continue;
            const parts = line.split(",");
            if (parts.length < 2) continue;
            const x = Number(parts[0].trim());
            const yOrig = Number(parts[1].trim());
            if (isNaN(x) || isNaN(yOrig)) continue;
            if (options.logScale) {
              if (yOrig <= 0) {
                console.error("Error: Logarithmic scaling requires positive y values");
                return;
              }
              dataPoints.push([x, Math.log10(yOrig)]);
            } else {
              dataPoints.push([x, yOrig]);
            }
          }
          if (dataPoints.length === 0) throw new Error("No valid CSV data found");
        } catch (error) {
          console.error("Error parsing CSV: " + error.message);
          return;
        }
        const xs = dataPoints.map((p) => p[0]);
        const ys = dataPoints.map((p) => p[1]);
        const xMin = Math.min(...xs);
        const xMax = Math.max(...xs);
        const yMin = Math.min(...ys);
        const yMax = Math.max(...ys);
        plotData = dataPoints.map(([x, y]) => {
          const svgX = margin + ((x - xMin) / (xMax - xMin || 1)) * ((options.width || 300) - 2 * margin);
          const svgY =
            (options.height || 150) -
            margin -
            ((y - yMin) / (yMax - yMin || 1)) * ((options.height || 150) - 2 * margin);
          return { x, y, svgX, svgY };
        });
      } else if (options.expression && options.range) {
        let funcStr = options.expression;
        if (options.expression.includes("=")) {
          const parts = options.expression.split("=");
          funcStr = parts[1].trim();
        }
        let xMin;
        let xMax;
        let yMin;
        let yMax;
        try {
          const rangeParts = options.range.split(",");
          const xPart = rangeParts.find((part) => part.trim().startsWith("x="));
          const yPart = rangeParts.find((part) => part.trim().startsWith("y="));
          if (!xPart || !yPart) throw new Error("Invalid range format");

          const xVals = xPart.split("=")[1].split(":").map(Number);
          const yVals = yPart.split("=")[1].split(":").map(Number);
          [xMin, xMax] = xVals;
          [yMin, yMax] = yVals;
          if ([xMin, xMax, yMin, yMax].some(isNaN)) throw new Error("Range values must be numbers");
        } catch (error) {
          console.error("Error parsing range: " + error.message);
          return;
        }
        if (options.logScale && (yMin <= 0 || yMax <= 0)) {
          console.error("Error: Logarithmic scaling requires positive y values");
          return;
        }
        let func;
        try {
          func = new Function("x", "with (Math) { return " + funcStr + "; }");
          const testVal = func(xMin);
          if (typeof testVal !== "number" || isNaN(testVal)) {
            throw new Error("Function does not return a number");
          }
        } catch (error) {
          console.error("Error in function: " + error.message);
          return;
        }
        const sampleCount = 100;
        const points = [];
        const step = (xMax - xMin) / (sampleCount - 1);
        for (let i = 0; i < sampleCount; i++) {
          const x = xMin + i * step;
          let y = func(x);
          if (options.logScale) {
            if (y <= 0) {
              console.error("Error: Logarithmic scaling requires positive y values");
              return;
            }
            y = Math.log10(y);
          }
          const svgX = margin + ((x - xMin) / (xMax - xMin)) * ((options.width || 300) - 2 * margin);
          const yMinTrans = options.logScale ? Math.log10(yMin) : yMin;
          const yMaxTrans = options.logScale ? Math.log10(yMax) : yMax;
          const svgY =
            (options.height || 150) -
            margin -
            ((y - yMinTrans) / (yMaxTrans - yMinTrans || 1)) * ((options.height || 150) - 2 * margin);
          points.push({ x, y, svgX, svgY });
        }
        plotData = points;
      } else {
        console.error("Error: either --csv or both --expression and --range options are required for JSON export.");
        return;
      }
      try {
        fs.writeFileSync(options.file, JSON.stringify(plotData, null, 2), "utf8");
        console.log(`JSON data file created at: ${options.file}`);
      } catch (error) {
        console.error("Error writing JSON file:" + error.message);
      }
    } else if (options.file.endsWith(".xml")) {
      // XML export branch
      let plotData;
      const margin = 10;
      if (options.csv) {
        const dataPoints = [];
        try {
          const lines = options.csv.split(/\r?\n/);
          let startIndex = 0;
          if (lines.length > 0) {
            const firstLineParts = lines[0].split(",");
            if (firstLineParts.length >= 2) {
              const firstToken = Number(firstLineParts[0].trim());
              const secondToken = Number(firstLineParts[1].trim());
              if (isNaN(firstToken) || isNaN(secondToken)) {
                startIndex = 1;
              }
            }
          }
          for (let i = startIndex; i < lines.length; i++) {
            const line = lines[i];
            if (line.trim() === "") continue;
            const parts = line.split(",");
            if (parts.length < 2) continue;
            const x = Number(parts[0].trim());
            const yOrig = Number(parts[1].trim());
            if (isNaN(x) || isNaN(yOrig)) continue;
            if (options.logScale) {
              if (yOrig <= 0) {
                console.error("Error: Logarithmic scaling requires positive y values");
                return;
              }
              dataPoints.push([x, Math.log10(yOrig)]);
            } else {
              dataPoints.push([x, yOrig]);
            }
          }
          if (dataPoints.length === 0) throw new Error("No valid CSV data found");
        } catch (error) {
          console.error("Error parsing CSV: " + error.message);
          return;
        }
        const xs = dataPoints.map((p) => p[0]);
        const ys = dataPoints.map((p) => p[1]);
        const xMin = Math.min(...xs);
        const xMax = Math.max(...xs);
        const yMin = Math.min(...ys);
        const yMax = Math.max(...ys);
        plotData = dataPoints.map(([x, y]) => {
          const svgX = margin + ((x - xMin) / (xMax - xMin || 1)) * ((options.width || 300) - 2 * margin);
          const svgY =
            (options.height || 150) -
            margin -
            ((y - yMin) / (yMax - yMin || 1)) * ((options.height || 150) - 2 * margin);
          return { x, y, svgX, svgY };
        });
      } else if (options.expression && options.range) {
        let funcStr = options.expression;
        if (options.expression.includes("=")) {
          const parts = options.expression.split("=");
          funcStr = parts[1].trim();
        }
        let xMin;
        let xMax;
        let yMin;
        let yMax;
        try {
          const rangeParts = options.range.split(",");
          const xPart = rangeParts.find((part) => part.trim().startsWith("x="));
          const yPart = rangeParts.find((part) => part.trim().startsWith("y="));
          if (!xPart || !yPart) throw new Error("Invalid range format");

          const xVals = xPart.split("=")[1].split(":").map(Number);
          const yVals = yPart.split("=")[1].split(":").map(Number);
          [xMin, xMax] = xVals;
          [yMin, yMax] = yVals;
          if ([xMin, xMax, yMin, yMax].some(isNaN)) throw new Error("Range values must be numbers");
        } catch (error) {
          console.error("Error parsing range: " + error.message);
          return;
        }
        if (options.logScale && (yMin <= 0 || yMax <= 0)) {
          console.error("Error: Logarithmic scaling requires positive y values");
          return;
        }
        let func;
        try {
          func = new Function("x", "with (Math) { return " + funcStr + "; }");
          const testVal = func(xMin);
          if (typeof testVal !== "number" || isNaN(testVal)) {
            throw new Error("Function does not return a number");
          }
        } catch (error) {
          console.error("Error in function: " + error.message);
          return;
        }
        const sampleCount = 100;
        const points = [];
        const step = (xMax - xMin) / (sampleCount - 1);
        for (let i = 0; i < sampleCount; i++) {
          const x = xMin + i * step;
          let y = func(x);
          if (options.logScale) {
            if (y <= 0) {
              console.error("Error: Logarithmic scaling requires positive y values");
              return;
            }
            y = Math.log10(y);
          }
          const svgX = margin + ((x - xMin) / (xMax - xMin)) * ((options.width || 300) - 2 * margin);
          const yMinTrans = options.logScale ? Math.log10(yMin) : yMin;
          const yMaxTrans = options.logScale ? Math.log10(yMax) : yMax;
          const svgY =
            (options.height || 150) -
            margin -
            ((y - yMinTrans) / (yMaxTrans - yMinTrans || 1)) * ((options.height || 150) - 2 * margin);
          points.push({ x, y, svgX, svgY });
        }
        plotData = points;
      } else {
        console.error("Error: either --csv or both --expression and --range options are required for XML export.");
        return;
      }
      let xmlContent = `<plotData>\n`;
      plotData.forEach((point) => {
        xmlContent += `  <point x=\"${point.x}\" y=\"${point.y}\" svgX=\"${point.svgX}\" svgY=\"${point.svgY}\" />\n`;
      });
      xmlContent += `</plotData>`;
      try {
        fs.writeFileSync(options.file, xmlContent, "utf8");
        console.log(`XML file created at: ${options.file}`);
      } catch (error) {
        console.error("Error writing XML file:", error.message);
      }
    } else if (options.file.endsWith(".csv")) {
      // CSV export branch
      let plotData;
      const margin = 10;
      if (options.csv) {
        const dataPoints = [];
        try {
          const lines = options.csv.split(/\r?\n/);
          let startIndex = 0;
          if (lines.length > 0) {
            const firstLineParts = lines[0].split(",");
            if (firstLineParts.length >= 2) {
              const firstToken = Number(firstLineParts[0].trim());
              const secondToken = Number(firstLineParts[1].trim());
              if (isNaN(firstToken) || isNaN(secondToken)) {
                startIndex = 1;
              }
            }
          }
          for (let i = startIndex; i < lines.length; i++) {
            const line = lines[i].trim();
            if (line === "") continue;
            const parts = line.split(",");
            if (parts.length < 2) continue;
            const x = Number(parts[0].trim());
            const yOrig = Number(parts[1].trim());
            if (isNaN(x) || isNaN(yOrig)) continue;
            if (options.logScale) {
              if (yOrig <= 0) {
                console.error("Error: Logarithmic scaling requires positive y values");
                return;
              }
              dataPoints.push([x, Math.log10(yOrig)]);
            } else {
              dataPoints.push([x, yOrig]);
            }
          }
          if (dataPoints.length === 0) throw new Error("No valid CSV data found");
        } catch (error) {
          console.error("Error parsing CSV: " + error.message);
          return;
        }
        const xs = dataPoints.map((p) => p[0]);
        const ys = dataPoints.map((p) => p[1]);
        const xMin = Math.min(...xs);
        const xMax = Math.max(...xs);
        const yMin = Math.min(...ys);
        const yMax = Math.max(...ys);
        plotData = dataPoints.map(([x, y]) => {
          const svgX = margin + ((x - xMin) / (xMax - xMin || 1)) * ((options.width || 300) - 2 * margin);
          const svgY =
            (options.height || 150) -
            margin -
            ((y - yMin) / (yMax - yMin || 1)) * ((options.height || 150) - 2 * margin);
          return { x, y, svgX, svgY };
        });
      } else if (options.expression && options.range) {
        let funcStr = options.expression;
        if (options.expression.includes("=")) {
          const parts = options.expression.split("=");
          funcStr = parts[1].trim();
        }
        let xMin;
        let xMax;
        let yMin;
        let yMax;
        try {
          const rangeParts = options.range.split(",");
          const xPart = rangeParts.find((part) => part.trim().startsWith("x="));
          const yPart = rangeParts.find((part) => part.trim().startsWith("y="));
          if (!xPart || !yPart) throw new Error("Invalid range format");

          const xVals = xPart.split("=")[1].split(":").map(Number);
          const yVals = yPart.split("=")[1].split(":").map(Number);
          [xMin, xMax] = xVals;
          [yMin, yMax] = yVals;
          if ([xMin, xMax, yMin, yMax].some(isNaN)) throw new Error("Range values must be numbers");
        } catch (error) {
          console.error("Error parsing range: " + error.message);
          return;
        }
        if (options.logScale && (yMin <= 0 || yMax <= 0)) {
          console.error("Error: Logarithmic scaling requires positive y values");
          return;
        }
        let func;
        try {
          func = new Function("x", "with (Math) { return " + funcStr + "; }");
          const testVal = func(xMin);
          if (typeof testVal !== "number" || isNaN(testVal)) {
            throw new Error("Function does not return a number");
          }
        } catch (error) {
          console.error("Error in function: " + error.message);
          return;
        }
        const sampleCount = 100;
        const points = [];
        const step = (xMax - xMin) / (sampleCount - 1);
        for (let i = 0; i < sampleCount; i++) {
          const x = xMin + i * step;
          let y = func(x);
          if (options.logScale) {
            if (y <= 0) {
              console.error("Error: Logarithmic scaling requires positive y values");
              return;
            }
            y = Math.log10(y);
          }
          const svgX = margin + ((x - xMin) / (xMax - xMin)) * ((options.width || 300) - 2 * margin);
          const yMinTrans = options.logScale ? Math.log10(yMin) : yMin;
          const yMaxTrans = options.logScale ? Math.log10(yMax) : yMax;
          const svgY =
            (options.height || 150) -
            margin -
            ((y - yMinTrans) / (yMaxTrans - yMinTrans || 1)) * ((options.height || 150) - 2 * margin);
          points.push({ x, y, svgX, svgY });
        }
        plotData = points;
      } else {
        console.error("Error: either --csv or both --expression and --range options are required for CSV export.");
        return;
      }
      let csvContent = "x,y,svgX,svgY\n";
      plotData.forEach((point) => {
        csvContent += `${point.x},${point.y},${point.svgX},${point.svgY}\n`;
      });
      try {
        fs.writeFileSync(options.file, csvContent, "utf8");
        console.log(`CSV data file created at: ${options.file}`);
      } catch (error) {
        console.error("Error writing CSV file:" + error.message);
      }
    } else {
      console.error("Error: Only .svg, .png, .pdf, .json, .xml, and .csv files are supported for plot generation.");
    }
  } else {
    console.log(`Run with: ${JSON.stringify(options)}`);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  main(args);
}
