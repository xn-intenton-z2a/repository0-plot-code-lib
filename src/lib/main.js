#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath, pathToFileURL } from "url";
import express from "express";
import fs from "fs";
import path from "path";
import { compile } from "mathjs";

const app = express();

// Register /plot endpoint unconditionally so that HTTP tests can access it
app.get("/plot", (req, res) => {
  // If no query parameters are provided, supply default values for HTTP usage
  if (Object.keys(req.query).length === 0) {
    req.query.expression = "y=sin(x)";
    req.query.range = "x=-1:1,y=-1:1";
    // Default fileType based on Accept header
    if (req.headers.accept && req.headers.accept.includes("image/png")) {
      req.query.fileType = "png";
    } else {
      req.query.fileType = "svg";
    }
  }

  const expression = req.query.expression;
  const range = req.query.range;
  if (!expression || expression.trim() === "") {
    res.status(400).send("Missing or empty 'expression'");
    return;
  }
  if (!range || range.trim() === "") {
    res.status(400).send("Missing or empty 'range'");
    return;
  }
  const fileType = req.query.fileType || req.query.format;
  if (!fileType) {
    res.status(400).send("Missing required query parameter: fileType or format");
    return;
  }
  
  let svg;
  try {
    svg = createSvgPlot(expression, range, req.query);
  } catch (e) {
    res.status(400).send(e.message);
    return;
  }

  const accept = req.headers.accept || "";
  res.set("Vary", "Accept");
  if (accept.includes("image/svg+xml")) {
    res.set("Content-Type", "image/svg+xml");
    res.send(svg);
  } else if (accept.includes("image/png")) {
    const dummyPng = Buffer.from("89504e470d0a1a0a", "hex");
    res.set("Content-Type", "image/png");
    res.send(dummyPng);
  } else if (accept.includes("application/json")) {
    res.set("Content-Type", "application/json");
    res.send({ expression: expression, range: range, message: "Plot generation details" });
  } else {
    res.status(406).send("Not Acceptable");
  }
});

function createSvgPlot(expression, range, customLabels = {}) {
  // Advanced expression validation function
  function validateExpression(expr) {
    // Detect missing operator between numeric tokens (e.g., "2 3" instead of "2*3")
    if (/\d\s+\d/.test(expr)) {
      throw new Error("Error: Detected missing operator between numeric tokens. Please verify your expression format.");
    }
    // Check for balanced parentheses
    let balance = 0;
    for (let char of expr) {
      if (char === '(') balance++;
      else if (char === ')') balance--;
      if (balance < 0) break;
    }
    if (balance !== 0) {
      throw new Error("Error: Unbalanced parentheses in expression. Please check your expression.");
    }
  }

  // Validate numeric custom label parameters
  const numericParams = [
    "xlabelPrecision",
    "ylabelPrecision",
    "xlabelX",
    "xlabelY",
    "ylabelX",
    "ylabelY",
    "xlabelRotation",
    "ylabelRotation",
    "xlabelOffsetX",
    "xlabelOffsetY",
    "ylabelOffsetX",
    "ylabelOffsetY"
  ];
  let customLabelErrors = [];
  numericParams.forEach(param => {
    if (customLabels[param] != null) {
      const parsed = parseFloat(customLabels[param]);
      if (!Number.isFinite(parsed)) {
        customLabelErrors.push(`Error: Invalid numeric value for ${param}. Expected a number.`);
      } else {
        customLabels[param] = parsed;
      }
    }
  });
  if (customLabelErrors.length > 0) {
    throw new Error(customLabelErrors.join(" "));
  }

  // Updated regex to allow extra whitespace in the range parameter
  const xPattern = /x\s*=\s*(-?\d+(?:\.\d+)?)\s*:\s*(-?\d+(?:\.\d+)?)/;
  const xMatch = xPattern.exec(range);
  if (!xMatch) {
    throw new Error("Error: --range flag value is malformed. Expected format: x=<min>:<max>,y=<min>:<max> with numeric values.");
  }
  const xMin = parseFloat(xMatch[1]);
  const xMax = parseFloat(xMatch[2]);
  // Numeric Order Enforcement for x: Ensure xMin is less than xMax
  if (xMin >= xMax) {
    throw new Error(`Error: Invalid range for x (provided: x=${xMin}:${xMax}). Ensure the minimum value is less than the maximum value.`);
  }

  // Extract y range from the range parameter with extra whitespace support
  const yPattern = /y\s*=\s*(-?\d+(?:\.\d+)?)\s*:\s*(-?\d+(?:\.\d+)?)/;
  const yMatch = yPattern.exec(range);
  if (!yMatch) {
    throw new Error("Error: --range flag value is malformed. Expected format: x=<min>:<max>,y=<min>:<max> with numeric values.");
  }
  const yInputMin = parseFloat(yMatch[1]);
  const yInputMax = parseFloat(yMatch[2]);
  // Numeric Order Enforcement for y: Ensure yInputMin is less than yInputMax
  if (yInputMin >= yInputMax) {
    throw new Error(`Error: Invalid range for y (provided: y=${yInputMin}:${yInputMax}). Ensure the minimum value is less than the maximum value.`);
  }

  const numPoints = 100;
  const step = (xMax - xMin) / (numPoints - 1);
  // Prepare mathematical expression (remove "y=" prefix if exists)
  let exprStr = expression.trim();
  if (exprStr.toLowerCase().startsWith("y=")) {
    exprStr = exprStr.slice(2);
  }
  
  // Validate expression syntax before further processing
  validateExpression(exprStr);

  // Enhanced enforcement that the expression uses the variable 'x' in a valid context
  if (!/\bx\b/.test(exprStr)) {
    throw new Error("Error: Expression must include the variable 'x'. Please refer to the usage guide.");
  }

  let compiled;
  try {
    compiled = compile(exprStr);
  } catch (e) {
    throw new Error("Error: Invalid mathematical expression.");
  }
  const points = [];
  const yValues = [];
  for (let i = 0; i < numPoints; i++) {
    const xVal = xMin + i * step;
    let yVal;
    try {
      yVal = compiled.evaluate({ x: xVal });
    } catch (e) {
      throw new Error(`Error evaluating expression at x=${xVal}: ${e.message}`);
    }
    if (!Number.isFinite(yVal)) {
      throw new Error(`Error: Expression evaluation resulted in an invalid number at x=${xVal}`);
    }
    yValues.push(yVal);
    points.push({ x: xVal, y: yVal });
  }
  // Determine plotting area based on computed y values
  const computedYMin = Math.min(...yValues);
  const computedYMax = Math.max(...yValues);
  const width = 300;
  const height = 150;
  const mappedPoints = points.map(p => {
    const mappedX = ((p.x - xMin) / (xMax - xMin)) * width;
    let mappedY;
    if (computedYMax === computedYMin) {
      mappedY = height / 2;
    } else {
      mappedY = height - ((p.y - computedYMin) / (computedYMax - computedYMin)) * height;
    }
    return `${mappedX.toFixed(2)},${mappedY.toFixed(2)}`;
  });
  const polylinePoints = mappedPoints.join(" ");

  // Helper function for rounding half away from zero with proper scaling
  function roundHalfAwayFromZero(value, precision) {
    const factor = Math.pow(10, precision);
    let rounded;
    if (value < 0) {
      rounded = -Math.round(Math.abs(value) * factor);
    } else {
      rounded = Math.round(value * factor);
    }
    return (rounded / factor).toFixed(precision);
  }

  // Process precision for axis labels if provided
  const xPrecision = customLabels.xlabelPrecision != null ? Number(customLabels.xlabelPrecision) : null;
  const yPrecision = customLabels.ylabelPrecision != null ? Number(customLabels.ylabelPrecision) : null;
  const locale = customLabels.locale; // new locale parameter

  let xAxisLabelText;
  if (customLabels.xlabel) {
    xAxisLabelText = customLabels.xlabel;
  } else if (xPrecision !== null && locale) {
    const formatter = new Intl.NumberFormat(locale, { minimumFractionDigits: xPrecision, maximumFractionDigits: xPrecision });
    const formattedXMin = formatter.format(xMin);
    const formattedXMax = formatter.format(xMax);
    xAxisLabelText = `x-axis: ${formattedXMin} to ${formattedXMax}`;
  } else if (xPrecision !== null) {
    const formattedXMin = roundHalfAwayFromZero(xMin, xPrecision);
    const formattedXMax = roundHalfAwayFromZero(xMax, xPrecision);
    xAxisLabelText = `x-axis: ${formattedXMin} to ${formattedXMax}`;
  } else {
    xAxisLabelText = `x-axis: ${xMin} to ${xMax}`;
  }

  let yAxisLabelText;
  if (customLabels.ylabel) {
    yAxisLabelText = customLabels.ylabel;
  } else if (yPrecision !== null && locale) {
    const formatter = new Intl.NumberFormat(locale, { minimumFractionDigits: yPrecision, maximumFractionDigits: yPrecision });
    const formattedYMin = formatter.format(yInputMin);
    const formattedYMax = formatter.format(yInputMax);
    yAxisLabelText = `y-axis: ${formattedYMin} to ${formattedYMax}`;
  } else if (yPrecision !== null) {
    const formattedYMin = roundHalfAwayFromZero(yInputMin, yPrecision);
    const formattedYMax = roundHalfAwayFromZero(yInputMax, yPrecision);
    yAxisLabelText = `y-axis: ${formattedYMin} to ${formattedYMax}`;
  } else {
    yAxisLabelText = `y-axis: ${yInputMin} to ${yInputMax}`;
  }

  // Determine x-axis label positions using new offset parameters if provided
  const xLabelX = customLabels.xlabelOffsetX != null ? customLabels.xlabelOffsetX : (customLabels.xlabelX != null ? customLabels.xlabelX : (width / 2).toFixed(2));
  const xLabelY = customLabels.xlabelOffsetY != null ? customLabels.xlabelOffsetY : (customLabels.xlabelY != null ? customLabels.xlabelY : (height - 5).toFixed(2));

  // Determine transform for x-axis label if rotation is provided
  let xTransform = "";
  if (customLabels.xlabelRotation != null) {
    xTransform = ` transform="rotate(${customLabels.xlabelRotation}, ${xLabelX}, ${xLabelY})"`;
  }

  // Determine y-axis label positioning and rotation using new offset parameters if provided
  let yLabelAttributes;
  let ylabelRotation = customLabels.ylabelRotation != null ? customLabels.ylabelRotation : -90;
  if (customLabels.ylabelOffsetX != null && customLabels.ylabelOffsetY != null) {
    yLabelAttributes = `x="${customLabels.ylabelOffsetX}" y="${customLabels.ylabelOffsetY}" transform="rotate(${ylabelRotation}, ${customLabels.ylabelOffsetX}, ${customLabels.ylabelOffsetY})"`;
  } else if (customLabels.ylabelX != null && customLabels.ylabelY != null) {
    yLabelAttributes = `x="${customLabels.ylabelX}" y="${customLabels.ylabelY}" transform="rotate(${ylabelRotation}, ${customLabels.ylabelX}, ${customLabels.ylabelY})"`;
  } else {
    yLabelAttributes = `x="5" y="${(height / 2).toFixed(2)}" transform="rotate(${ylabelRotation}, 10, ${(height / 2).toFixed(2)})"`;
  }

  // Determine custom aria-label and text-anchor for axis labels
  const xAriaLabel = customLabels.xlabelAriaLabel ? customLabels.xlabelAriaLabel : `x-axis: ${xMin} to ${xMax}`;
  const yAriaLabel = customLabels.ylabelAriaLabel ? customLabels.ylabelAriaLabel : `y-axis: ${yInputMin} to ${yInputMax}`;
  const xTextAnchor = customLabels.xlabelAnchor ? customLabels.xlabelAnchor : "middle";
  const yTextAnchor = customLabels.ylabelAnchor ? customLabels.ylabelAnchor : "middle";

  // Create SVG content with dynamic labels for axes and ARIA accessibility attributes for screen readers
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <text x="${xLabelX}" y="${xLabelY}"${xTransform} aria-label="${xAriaLabel}" text-anchor="${xTextAnchor}">${xAxisLabelText}</text>
    <text ${yLabelAttributes} aria-label="${yAriaLabel}" text-anchor="${yTextAnchor}">${yAxisLabelText}</text>
    <text x="10" y="20">Plot for: ${expression.trim()} in range ${range.trim()}</text>
    <polyline points="${polylinePoints}" stroke="blue" fill="none" />
  </svg>`;

  return svgContent;
}

function main() {
  const args = process.argv.slice(2);
  const options = {};
  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith("--")) {
      const key = args[i].substring(2);
      const value = args[i + 1] || "";
      options[key] = value;
      i++;
    }
  }

  // If no CLI options provided, do nothing (useful when imported in tests)
  if (Object.keys(options).length === 0) {
    return;
  }

  if (options.serve) {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } else {
    // Check that flags are provided (they must be defined, even if empty strings) and then check for empty values individually.
    if (options.expression === undefined || options.range === undefined || options.file === undefined) {
      throw new Error("Error: --expression, --range, and --file flags are required together.");
    }
    if (options.expression.trim() === "") {
      throw new Error("Error: --expression flag must have a non-empty value.");
    }
    if (options.range.trim() === "") {
      throw new Error("Error: --range flag must have a non-empty value.");
    }
    if (options.file.trim() === "") {
      throw new Error("Error: --file flag must have a non-empty value.");
    }
    const ext = path.extname(options.file).toLowerCase();
    if (ext !== ".svg" && ext !== ".png") {
      throw new Error("Error: Unsupported file extension. Use .svg or .png.");
    }
    try {
      const svg = createSvgPlot(options.expression, options.range, options);
      if (ext === ".svg") {
        fs.writeFileSync(options.file, svg, "utf8");
      } else {
        const dummyPng = Buffer.from("89504e470d0a1a0a", "hex");
        fs.writeFileSync(options.file, dummyPng);
      }
      console.log(`Plot saved to ${options.file}`);
    } catch (e) {
      throw new Error(e.message);
    }
  }
}

export { main, app };

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main();
}
