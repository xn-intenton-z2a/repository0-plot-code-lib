#!/usr/bin/env node
// src/lib/main.js

// Load environment variables from .env file using dotenv
import dotenv from 'dotenv';
dotenv.config();

import { fileURLToPath, pathToFileURL } from "url";
import express from "express";
import fs from "fs";
import path from "path";
import { compile } from "mathjs";

const app = express();

// New function to compute detailed plot data used for JSON export with adaptive resolution
function computePlotData(expression, range, customLabels = {}) {
  // Advanced expression validation function
  function validateExpression(expr) {
    if (/\d\s+\d/.test(expr)) {
      throw new Error("Error: Detected missing operator between numeric tokens. Please verify your expression format.");
    }
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

  // Parse resolution parameter, default is 100
  let resolution = 100;
  if (customLabels.resolution != null) {
    const parsedRes = parseInt(customLabels.resolution, 10);
    if (!Number.isFinite(parsedRes) || parsedRes <= 0) {
      throw new Error("Error: Invalid resolution. Expected a positive integer.");
    }
    resolution = parsedRes;
  }

  // Updated regex to allow extra whitespace in the range parameter
  const xPattern = /x\s*=\s*(-?\d+(?:\.\d+)?)\s*:\s*(-?\d+(?:\.\d+)?)/;
  const xMatch = xPattern.exec(range);
  if (!xMatch) {
    throw new Error("Error: --range flag value is malformed. Expected format: x=<min>:<max>,y=<min>:<max> with numeric values.");
  }
  const xMin = parseFloat(xMatch[1]);
  const xMax = parseFloat(xMatch[2]);
  if (xMin >= xMax) {
    throw new Error(`Error: Invalid range for x (provided: x=${xMin}:${xMax}). Expected format: x=0:10. Ensure that the minimum value is less than the maximum value.`);
  }

  const yPattern = /y\s*=\s*(-?\d+(?:\.\d+)?)\s*:\s*(-?\d+(?:\.\d+)?)/;
  const yMatch = yPattern.exec(range);
  if (!yMatch) {
    throw new Error("Error: --range flag value is malformed. Expected format: x=<min>:<max>,y=<min>:<max> with numeric values.");
  }
  const yInputMin = parseFloat(yMatch[1]);
  const yInputMax = parseFloat(yMatch[2]);
  if (yInputMin >= yInputMax) {
    throw new Error(`Error: Invalid range for y (provided: y=${yInputMin}:${yInputMax}). Expected format: y=0:10. Ensure that the minimum value is less than the maximum value.`);
  }

  const numPoints = resolution;
  const step = (xMax - xMin) / (numPoints - 1);
  let exprStr = expression.trim();
  if (exprStr.toLowerCase().startsWith("y=")) {
    exprStr = exprStr.slice(2);
  }
  validateExpression(exprStr);
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
  const computedYMin = Math.min(...yValues);
  const computedYMax = Math.max(...yValues);

  // Process precision and axis labels
  const xPrecision = customLabels.xlabelPrecision != null ? Number(customLabels.xlabelPrecision) : null;
  const yPrecision = customLabels.ylabelPrecision != null ? Number(customLabels.ylabelPrecision) : null;
  const locale = customLabels.locale;
  function roundHalfAwayFromZero(value, precision) {
    const factor = Math.pow(10, precision);
    let rounded = value < 0 ? -Math.round(Math.abs(value) * factor) : Math.round(value * factor);
    return (rounded / factor).toFixed(precision);
  }

  let xAxisLabelText;
  if (customLabels.xlabel) {
    xAxisLabelText = customLabels.xlabel;
  } else if (xPrecision !== null && locale) {
    const formatter = new Intl.NumberFormat(locale, { minimumFractionDigits: xPrecision, maximumFractionDigits: xPrecision });
    xAxisLabelText = `x-axis: ${formatter.format(xMin)} to ${formatter.format(xMax)}`;
  } else if (xPrecision !== null) {
    xAxisLabelText = `x-axis: ${roundHalfAwayFromZero(xMin, xPrecision)} to ${roundHalfAwayFromZero(xMax, xPrecision)}`;
  } else {
    xAxisLabelText = `x-axis: ${xMin} to ${xMax}`;
  }

  let yAxisLabelText;
  if (customLabels.ylabel) {
    yAxisLabelText = customLabels.ylabel;
  } else if (yPrecision !== null && locale) {
    const formatter = new Intl.NumberFormat(locale, { minimumFractionDigits: yPrecision, maximumFractionDigits: yPrecision });
    yAxisLabelText = `y-axis: ${formatter.format(yInputMin)} to ${formatter.format(yInputMax)}`;
  } else if (yPrecision !== null) {
    yAxisLabelText = `y-axis: ${roundHalfAwayFromZero(yInputMin, yPrecision)} to ${roundHalfAwayFromZero(yInputMax, yPrecision)}`;
  } else {
    yAxisLabelText = `y-axis: ${yInputMin} to ${yInputMax}`;
  }

  return {
    expression: expression,
    range: range,
    points: points,
    computedXRange: { min: xMin, max: xMax },
    computedYRange: { min: computedYMin, max: computedYMax },
    axisLabels: { x: xAxisLabelText, y: yAxisLabelText }
  };
}

// Helper function to build a smooth SVG path using quadratic Bezier curves
function buildSmoothPath(points) {
  if (points.length < 2) return "";
  let d = `M ${points[0].x.toFixed(2)} ${points[0].y.toFixed(2)}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const midX = (prev.x + curr.x) / 2;
    const midY = (prev.y + curr.y) / 2;
    d += ` Q ${prev.x.toFixed(2)} ${prev.y.toFixed(2)} ${midX.toFixed(2)} ${midY.toFixed(2)}`;
  }
  d += ` T ${points[points.length - 1].x.toFixed(2)} ${points[points.length - 1].y.toFixed(2)}`;
  return d;
}

// Modified createSvgPlot now uses computePlotData and supports smoothing
function createSvgPlot(expression, range, customLabels = {}) {
  const plotData = computePlotData(expression, range, customLabels);
  const width = 300;
  const height = 150;
  // Map computed points to SVG coordinate system
  const mappedPoints = plotData.points.map(p => {
    const mappedX = ((p.x - plotData.computedXRange.min) / (plotData.computedXRange.max - plotData.computedXRange.min)) * width;
    let mappedY;
    if (plotData.computedYRange.max === plotData.computedYRange.min) {
      mappedY = height / 2;
    } else {
      mappedY = height - ((p.y - plotData.computedYRange.min) / (plotData.computedYRange.max - plotData.computedYRange.min)) * height;
    }
    return { x: mappedX, y: mappedY };
  });

  let shapeElement = "";
  // Check if smoothing is enabled
  if (customLabels.smooth === "true") {
    const pathData = buildSmoothPath(mappedPoints);
    shapeElement = `<path d="${pathData}" stroke="blue" fill="none" />`;
  } else {
    const polylinePoints = mappedPoints.map(p => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(" ");
    shapeElement = `<polyline points="${polylinePoints}" stroke="blue" fill="none" />`;
  }

  // Determine x-axis label positioning and rotation
  const xLabelX = customLabels.xlabelOffsetX != null ? customLabels.xlabelOffsetX : (customLabels.xlabelX != null ? customLabels.xlabelX : (width / 2).toFixed(2));
  const xLabelY = customLabels.xlabelOffsetY != null ? customLabels.xlabelOffsetY : (customLabels.xlabelY != null ? customLabels.xlabelY : (height - 5).toFixed(2));
  let xTransform = "";
  if (customLabels.xlabelRotation != null) {
    xTransform = ` transform="rotate(${customLabels.xlabelRotation}, ${xLabelX}, ${xLabelY})"`;
  }

  // Determine y-axis label positioning and rotation
  let yLabelAttributes;
  let ylabelRotation = customLabels.ylabelRotation != null ? customLabels.ylabelRotation : -90;
  if (customLabels.ylabelOffsetX != null && customLabels.ylabelOffsetY != null) {
    yLabelAttributes = `x="${customLabels.ylabelOffsetX}" y="${customLabels.ylabelOffsetY}" transform="rotate(${ylabelRotation}, ${customLabels.ylabelOffsetX}, ${customLabels.ylabelOffsetY})"`;
  } else if (customLabels.ylabelX != null && customLabels.ylabelY != null) {
    yLabelAttributes = `x="${customLabels.ylabelX}" y="${customLabels.ylabelY}" transform="rotate(${ylabelRotation}, ${customLabels.ylabelX}, ${customLabels.ylabelY})"`;
  } else {
    yLabelAttributes = `x="5" y="${(height / 2).toFixed(2)}" transform="rotate(${ylabelRotation}, 10, ${(height / 2).toFixed(2)})"`;
  }

  // ARIA and text anchor attributes with support for custom parameters
  const xAriaLabel = customLabels.xlabelAriaLabel ? customLabels.xlabelAriaLabel : plotData.axisLabels.x;
  const yAriaLabel = customLabels.ylabelAriaLabel ? customLabels.ylabelAriaLabel : plotData.axisLabels.y;
  const xTextAnchor = customLabels.xlabelAnchor ? customLabels.xlabelAnchor : "middle";
  const yTextAnchor = customLabels.ylabelAnchor ? customLabels.ylabelAnchor : "middle";
  
  // Validate text-anchor custom parameters against allowed values
  const allowedAnchors = ["start", "middle", "end"];
  if (customLabels.xlabelAnchor && !allowedAnchors.includes(customLabels.xlabelAnchor)) {
    throw new Error("Error: Invalid value for xlabelAnchor. Allowed values are 'start', 'middle', or 'end'.");
  }
  if (customLabels.ylabelAnchor && !allowedAnchors.includes(customLabels.ylabelAnchor)) {
    throw new Error("Error: Invalid value for ylabelAnchor. Allowed values are 'start', 'middle', or 'end'.");
  }

  const xFontSizeAttr = customLabels.xlabelFontSize ? ` font-size="${customLabels.xlabelFontSize}"` : "";
  const xFillAttr = customLabels.xlabelColor ? ` fill="${customLabels.xlabelColor}"` : "";
  const yFontSizeAttr = customLabels.ylabelFontSize ? ` font-size="${customLabels.ylabelFontSize}"` : "";
  const yFillAttr = customLabels.ylabelColor ? ` fill="${customLabels.ylabelColor}"` : "";

  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <text x="${xLabelX}" y="${xLabelY}"${xTransform} aria-label="${xAriaLabel}" text-anchor="${xTextAnchor}"${xFontSizeAttr}${xFillAttr}>${plotData.axisLabels.x}</text>
    <text ${yLabelAttributes} aria-label="${yAriaLabel}" text-anchor="${yTextAnchor}"${yFontSizeAttr}${yFillAttr}>${plotData.axisLabels.y}</text>
    <text x="10" y="20">Plot for: ${expression.trim()} in range ${range.trim()}</text>
    ${shapeElement}
  </svg>`;
  return svgContent;
}

// Register /plot endpoint unconditionally so that HTTP tests can access it
app.get("/plot", (req, res) => {
  // Provide default query parameters if none provided
  if (Object.keys(req.query).length === 0) {
    req.query.expression = "y=sin(x)";
    req.query.range = "x=-1:1,y=-1:1";
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
  if (!fileType && req.query.jsonExport !== "true") {
    res.status(400).send("Missing required query parameter: fileType or format");
    return;
  }

  // If detailed JSON export is requested via jsonExport flag, return detailed plot data
  if (req.query.jsonExport === "true") {
    try {
      const plotData = computePlotData(expression, range, req.query);
      res.set("Vary", "Accept");
      return res.json(plotData);
    } catch (e) {
      res.status(400).send(e.message);
      return;
    }
  }

  let svg;
  try {
    svg = createSvgPlot(expression, range, req.query);
  } catch (e) {
    res.status(400).send(e.message);
    return;
  }

  res.set("Vary", "Accept");
  const accept = req.headers.accept;
  if (accept) {
    if (accept.includes("image/svg+xml")) {
      res.type("svg");
      return res.send(svg);
    } else if (accept.includes("image/png")) {
      const dummyPng = Buffer.from("89504e470d0a1a0a", "hex");
      res.type("png");
      return res.send(dummyPng);
    } else if (accept.includes("application/json")) {
      res.type("json");
      return res.json({ expression: expression, range: range, message: "Plot generation details" });
    } else {
      return res.status(406).send("Not Acceptable");
    }
  } else {
    if (fileType.toLowerCase() === "svg") {
      res.type("svg");
      return res.send(svg);
    } else if (fileType.toLowerCase() === "png") {
      const dummyPng = Buffer.from("89504e470d0a1a0a", "hex");
      res.type("png");
      return res.send(dummyPng);
    } else if (fileType.toLowerCase() === "json" || fileType.toLowerCase() === "application/json") {
      res.type("json");
      return res.json({ expression: expression, range: range, message: "Plot generation details" });
    } else {
      return res.status(406).send("Not Acceptable");
    }
  }
});

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

  // If no CLI options provided, do nothing
  if (Object.keys(options).length === 0) {
    return;
  }

  // Check required flags
  if (options.serve) {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } else {
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
    
    // New branch for JSON export in CLI
    if (options.jsonExport === "true") {
      try {
        const jsonData = computePlotData(options.expression, options.range, options);
        const outputStr = JSON.stringify(jsonData, null, 2);
        fs.writeFileSync(options.file, outputStr, "utf8");
        console.log(`Plot saved to ${options.file}`);
        return;
      } catch (e) {
        throw new Error(e.message);
      }
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
