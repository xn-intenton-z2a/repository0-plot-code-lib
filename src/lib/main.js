#!/usr/bin/env node
// src/lib/main.js

// Load environment variables using dotenv and support custom .env file via CLI flag
import dotenv from "dotenv";
import { z } from "zod";
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import express from "express";
import { compile } from "mathjs";
import yaml from "js-yaml";

// Initialize runtime configuration global variable
let runtimeConfig = {};

// Updated helper function to recursively interpolate environment variables in configuration objects,
// automatically convert values to numbers or booleans if applicable, and support default fallback values
// using the syntax ${VAR:defaultValue}.
function interpolateEnv(input) {
  if (typeof input === "string") {
    // Updated regex to capture optional default value with fallback syntax
    const regexFull = /^\$\{([^:}]+)(?::([^}]+))?\}$/;
    const fullMatch = input.trim().match(regexFull);
    if (fullMatch) {
      const varName = fullMatch[1];
      const defaultValue = fullMatch[2] !== undefined ? fullMatch[2] : undefined;
      if (process.env[varName] !== undefined) {
        const envVal = process.env[varName].trim();
        // Convert to boolean if applicable
        if (envVal.toLowerCase() === "true") return true;
        if (envVal.toLowerCase() === "false") return false;
        // Convert to number if valid
        if (envVal !== "" && !isNaN(envVal)) return Number(envVal);
        return envVal;
      } else {
        // If default is provided, use it
        if (defaultValue !== undefined) {
          const trimmed = defaultValue.trim();
          if (trimmed.toLowerCase() === "true") return true;
          if (trimmed.toLowerCase() === "false") return false;
          if (trimmed !== "" && !isNaN(trimmed)) return Number(trimmed);
          return trimmed;
        } else {
          return input;
        }
      }
    }
    // For strings with embedded variables or partial matches, replace all occurrences
    return input.replace(/\$\{([^:}]+)(?::([^}]+))?\}/g, (_, varName, defaultVal) => {
      if (process.env[varName] !== undefined) {
        return process.env[varName];
      } else if (defaultVal !== undefined) {
        return defaultVal;
      } else {
        return "${" + varName + "}";
      }
    });
  } else if (Array.isArray(input)) {
    return input.map(interpolateEnv);
  } else if (typeof input === "object" && input !== null) {
    const output = {};
    for (const key in input) {
      output[key] = interpolateEnv(input[key]);
    }
    return output;
  } else {
    return input;
  }
}

// New function to compute detailed plot data used for JSON export with adaptive resolution
function computePlotData(expression, range, customLabels = {}) {
  // Advanced expression validation function
  function validateExpression(expr) {
    if (/\d\s+\d/.test(expr)) {
      throw new Error("Error: Detected missing operator between numeric tokens. Please verify your expression format.");
    }
    let balance = 0;
    for (const char of expr) {
      if (char === "(") balance++;
      else if (char === ")") balance--;
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
  const customLabelErrors = [];
  numericParams.forEach((param) => {
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
    throw new Error(
      "Error: --range flag value is malformed. Expected format: x=<min>:<max>,y=<min>:<max> with numeric values."
    );
  }
  const xMin = parseFloat(xMatch[1]);
  const xMax = parseFloat(xMatch[2]);
  if (xMin >= xMax) {
    throw new Error(
      `Error: Invalid range for x (provided: x=${xMin}:${xMax}). Expected format: x=0:10. Ensure that the minimum value is less than the maximum value.`
    );
  }

  const yPattern = /y\s*=\s*(-?\d+(?:\.\d+)?)/;
  const yMatch = yPattern.exec(range);
  if (!yMatch) {
    throw new Error(
      "Error: --range flag value is malformed. Expected format: x=<min>:<max>,y=<min>:<max> with numeric values."
    );
  }
  // To get both y min and max we need to also extract the second number for y
  const yPatternFull = /y\s*=\s*(-?\d+(?:\.\d+)?)\s*:\s*(-?\d+(?:\.\d+)?)/;
  const yMatchFull = yPatternFull.exec(range);
  if (!yMatchFull) {
    throw new Error(
      "Error: --range flag value is malformed. Expected format: x=<min>:<max>,y=<min>:<max> with numeric values."
    );
  }
  const yInputMin = parseFloat(yMatchFull[1]);
  const yInputMax = parseFloat(yMatchFull[2]);
  if (yInputMin >= yInputMax) {
    throw new Error(
      `Error: Invalid range for y (provided: y=${yInputMin}:${yInputMax}). Expected format: y=0:10. Ensure that the minimum value is less than the maximum value.`
    );
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
    const rounded = value < 0 ? -Math.round(Math.abs(value) * factor) : Math.round(value * factor);
    return (rounded / factor).toFixed(precision);
  }

  let xAxisLabelText;
  if (customLabels.xlabel) {
    xAxisLabelText = customLabels.xlabel;
  } else if (xPrecision !== null && locale === "de-DE") {
    let rx = roundHalfAwayFromZero(xMin, xPrecision);
    let rX = roundHalfAwayFromZero(xMax, xPrecision);
    rx = rx.replace(".", ",");
    rX = rX.replace(".", ",");
    xAxisLabelText = `x-axis: ${rx} to ${rX}`;
  } else if (xPrecision !== null && locale) {
    const formatter = new Intl.NumberFormat(locale, {
      minimumFractionDigits: xPrecision,
      maximumFractionDigits: xPrecision
    });
    xAxisLabelText = `x-axis: ${formatter.format(xMin)} to ${formatter.format(xMax)}`;
  } else if (xPrecision !== null) {
    xAxisLabelText = `x-axis: ${roundHalfAwayFromZero(xMin, xPrecision)} to ${roundHalfAwayFromZero(xMax, xPrecision)}`;
  } else {
    xAxisLabelText = `x-axis: ${xMin} to ${xMax}`;
  }

  let yAxisLabelText;
  if (customLabels.ylabel) {
    yAxisLabelText = customLabels.ylabel;
  } else if (yPrecision !== null && locale === "de-DE") {
    // For y-axis in de-DE, use truncation (floor) to display values
    function truncateNumber(value, precision) {
      const factor = Math.pow(10, precision);
      return (Math.floor(value * factor) / factor).toFixed(precision);
    }
    let ry = truncateNumber(yInputMin, yPrecision);
    let rY = truncateNumber(yInputMax, yPrecision);
    ry = ry.replace(".", ",");
    rY = rY.replace(".", ",");
    yAxisLabelText = `y-axis: ${ry} to ${rY}`;
  } else if (yPrecision !== null && locale) {
    const formatter = new Intl.NumberFormat(locale, {
      minimumFractionDigits: yPrecision,
      maximumFractionDigits: yPrecision
    });
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
    axisLabels: { x: xAxisLabelText, y: yAxisLabelText },
    resolution: resolution
  };
}

// Helper function to build a smooth SVG path using quadratic Bezier curves with custom smoothing factor
function buildSmoothPath(points, smoothingFactor = 0.5) {
  if (points.length < 2) return "";
  let d = `M ${points[0].x.toFixed(2)} ${points[0].y.toFixed(2)}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const controlX = prev.x + smoothingFactor * (curr.x - prev.x);
    const controlY = prev.y + smoothingFactor * (curr.y - prev.y);
    d += ` Q ${controlX.toFixed(2)} ${controlY.toFixed(2)} ${curr.x.toFixed(2)} ${curr.y.toFixed(2)}`;
  }
  return d;
}

// Modified createSvgPlot now uses computePlotData and supports smoothing, dynamic color gradients, custom dimensions, marker support, and accessibility attributes
function createSvgPlot(expression, range, customLabels = {}) {
  const plotData = computePlotData(expression, range, customLabels);
  // Set default dimensions
  let svgWidth = 300;
  let svgHeight = 150;
  if (customLabels.width != null) {
    const customWidth = parseFloat(customLabels.width);
    if (Number.isFinite(customWidth) && customWidth > 0) {
      svgWidth = customWidth;
    }
  }
  if (customLabels.height != null) {
    const customHeight = parseFloat(customLabels.height);
    if (Number.isFinite(customHeight) && customHeight > 0) {
      svgHeight = customHeight;
    }
  }

  // Map computed points to SVG coordinate system using dynamic dimensions
  const mappedPoints = plotData.points.map((p) => {
    const mappedX = ((p.x - plotData.computedXRange.min) / (plotData.computedXRange.max - plotData.computedXRange.min)) * svgWidth;
    let mappedY;
    if (plotData.computedYRange.max === plotData.computedYRange.min) {
      mappedY = svgHeight / 2;
    } else {
      mappedY = svgHeight - ((p.y - plotData.computedYRange.min) / (plotData.computedYRange.max - plotData.computedYRange.min)) * svgHeight;
    }
    return { x: mappedX, y: mappedY };
  });

  // Dynamic color gradient and marker support
  let strokeAttr = 'stroke="blue"';
  let defsElements = "";
  // Extended Gradient Configuration
  if (String(customLabels.colorGradient) === "true") {
    if (customLabels.gradientStops != null && customLabels.gradientStops.toString().trim() !== "") {
      let stopsArray;
      try {
        stopsArray = JSON.parse(customLabels.gradientStops);
        if (!Array.isArray(stopsArray) || stopsArray.length === 0) {
          throw new Error();
        }
      } catch (e) {
        throw new Error("Error: Invalid gradientStops format. Expected a JSON array string with at least one stop.");
      }
      let stopsElements = "";
      stopsArray.forEach((stop) => {
        if (stop.offset == null || stop.stopColor == null) {
          throw new Error("Error: Each gradient stop must include offset and stopColor.");
        }
        stopsElements += `<stop offset=\"${stop.offset}\" stop-color=\"${stop.stopColor}\"${stop.stopOpacity != null ? ` stop-opacity=\"${stop.stopOpacity}\"` : ""} />`;
      });
      defsElements += `<linearGradient id=\"dynamicGradient\">${stopsElements}</linearGradient>`;
    } else {
      const gradientStart = customLabels.gradientStartColor || "blue";
      const gradientEnd = customLabels.gradientEndColor || "red";
      defsElements += `<linearGradient id=\"dynamicGradient\"><stop offset=\"0%\" stop-color=\"${gradientStart}\" /><stop offset=\"100%\" stop-color=\"${gradientEnd}\" /></linearGradient>`;
    }
    strokeAttr = 'stroke="url(#dynamicGradient)"';
  }

  // Marker customization support with new parameters
  if (String(customLabels.markerStart).toLowerCase() === "true") {
    const mShape = customLabels.markerShape || "path";
    const mWidth = customLabels.markerWidth != null ? customLabels.markerWidth : "10";
    const mHeight = customLabels.markerHeight != null ? customLabels.markerHeight : "10";
    const mFill = customLabels.markerFill || "black";
    let markerPath = "";
    if (mShape === "path") {
      markerPath = "M0,0 L0,6 L6,3 z";
    } else {
      markerPath = "M0,0 L0,6 L6,3 z"; // default fallback
    }
    defsElements += `<marker id=\"markerStart\" markerWidth=\"${mWidth}\" markerHeight=\"${mHeight}\" refX=\"0\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\"><${mShape} d=\"${markerPath}\" fill=\"${mFill}\" /></marker>`;
  }
  if (String(customLabels.markerEnd).toLowerCase() === "true") {
    const mShape = customLabels.markerShape || "path";
    const mWidth = customLabels.markerWidth != null ? customLabels.markerWidth : "10";
    const mHeight = customLabels.markerHeight != null ? customLabels.markerHeight : "10";
    const mFill = customLabels.markerFill || "black";
    let markerPath = "";
    if (mShape === "path") {
      markerPath = "M0,3 L6,0 L6,6 z";
    } else {
      markerPath = "M0,3 L6,0 L6,6 z";
    }
    defsElements += `<marker id=\"markerEnd\" markerWidth=\"${mWidth}\" markerHeight=\"${mHeight}\" refX=\"10\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\"><${mShape} d=\"${markerPath}\" fill=\"${mFill}\" /></marker>`;
  }

  // Additional marker attributes for the plot element
  let markerAttributes = "";
  if (String(customLabels.markerStart).toLowerCase() === "true") {
    markerAttributes += ' marker-start="url(#markerStart)"';
  }
  if (String(customLabels.markerEnd).toLowerCase() === "true") {
    markerAttributes += ' marker-end="url(#markerEnd)"';
  }

  // New: Support for strokeWidth and strokeDashArray customization
  let additionalStrokeAttrs = "";
  if (customLabels.strokeWidth != null) {
    const strokeWidth = parseFloat(customLabels.strokeWidth);
    if (!Number.isFinite(strokeWidth) || strokeWidth <= 0) {
      throw new Error("Error: Invalid strokeWidth. Expected a positive number.");
    }
    additionalStrokeAttrs += ` stroke-width=\"${strokeWidth}\"`;
  }
  if (customLabels.strokeDashArray != null) {
    if (typeof customLabels.strokeDashArray !== "string" || customLabels.strokeDashArray.trim() === "") {
      throw new Error("Error: Invalid strokeDashArray. Expected a non-empty string.");
    }
    additionalStrokeAttrs += ` stroke-dasharray=\"${customLabels.strokeDashArray}\"`;
  }
  if (customLabels.strokeLinecap != null) {
    const validLineCaps = ['butt', 'round', 'square'];
    if (!validLineCaps.includes(customLabels.strokeLinecap)) {
      throw new Error("Error: Invalid strokeLinecap. Allowed values are 'butt', 'round', or 'square'.");
    }
    additionalStrokeAttrs += ` stroke-linecap=\"${customLabels.strokeLinecap}\"`;
  }

  // Check if smoothing is enabled
  let shapeElement = "";
  if (String(customLabels.smooth).toLowerCase() === "true") {
    let smoothingFactor = 0.5;
    if (customLabels.smoothingFactor != null) {
      const parsed = parseFloat(customLabels.smoothingFactor);
      if (!Number.isFinite(parsed) || parsed < 0 || parsed > 1) {
        throw new Error("Error: Invalid smoothingFactor. Expected a number between 0 and 1.");
      }
      smoothingFactor = parsed;
    }
    const pathData = buildSmoothPath(mappedPoints, smoothingFactor);
    shapeElement = `<path d=\"${pathData}\" ${strokeAttr}${markerAttributes}${additionalStrokeAttrs} fill=\"none\"/>`;
  } else {
    const polylinePoints = mappedPoints.map((p) => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(" ");
    shapeElement = `<polyline points=\"${polylinePoints}\" ${strokeAttr}${markerAttributes}${additionalStrokeAttrs} fill=\"none\" />`;
  }

  // New: Support for Background and Grid styling
  const bgColor = customLabels.bgColor;
  const showGrid = String(customLabels.showGrid || "false").toLowerCase() === "true";
  const gridColor = customLabels.gridColor || "#d3d3d3";
  const gridWidthParam = customLabels.gridWidth != null ? parseFloat(customLabels.gridWidth) : 1;
  if (customLabels.gridWidth != null && (!Number.isFinite(gridWidthParam) || gridWidthParam <= 0)) {
    throw new Error("Error: Invalid gridWidth. Expected a positive number.");
  }

  const bgRect = bgColor ? `<rect x=\"0\" y=\"0\" width=\"${svgWidth}\" height=\"${svgHeight}\" fill=\"${bgColor}\" />` : "";
  const gridElements = showGrid ? (() => {
    let grid = "";
    const gridDivs = 10;
    for (let i = 0; i <= gridDivs; i++) {
      const x_value = plotData.computedXRange.min + i * (plotData.computedXRange.max - plotData.computedXRange.min) / gridDivs;
      const mappedX = ((x_value - plotData.computedXRange.min) / (plotData.computedXRange.max - plotData.computedXRange.min)) * svgWidth;
      grid += `<line x1=\"${mappedX.toFixed(2)}\" y1=\"0\" x2=\"${mappedX.toFixed(2)}\" y2=\"${svgHeight}\" stroke=\"${gridColor}\" stroke-width=\"${gridWidthParam}\" />`;
    }
    for (let i = 0; i <= gridDivs; i++) {
      const y_value = plotData.computedYRange.min + i * (plotData.computedYRange.max - plotData.computedYRange.min) / gridDivs;
      const mappedY = svgHeight - ((y_value - plotData.computedYRange.min) / (plotData.computedYRange.max - plotData.computedYRange.min)) * svgHeight;
      grid += `<line x1=\"0\" y1=\"${mappedY.toFixed(2)}\" x2=\"${svgWidth}\" y2=\"${mappedY.toFixed(2)}\" stroke=\"${gridColor}\" stroke-width=\"${gridWidthParam}\" />`;
    }
    return `<g class=\"grid\">${grid}</g>`;
  })() : "";

  // Determine x-axis label positioning and rotation
  const xLabelX =
    customLabels.xlabelOffsetX != null
      ? customLabels.xlabelOffsetX
      : customLabels.xlabelX != null
      ? customLabels.xlabelX
      : (svgWidth / 2).toFixed(2);
  const xLabelY =
    customLabels.xlabelOffsetY != null
      ? customLabels.xlabelOffsetY
      : customLabels.xlabelY != null
      ? customLabels.xlabelY
      : (svgHeight - 5).toFixed(2);
  let xTransform = "";
  if (customLabels.xlabelRotation != null) {
    xTransform = ` transform=\"rotate(${customLabels.xlabelRotation}, ${xLabelX}, ${xLabelY})\"`;
  }

  // Determine y-axis label positioning and rotation
  let yLabelAttributes;
  const ylabelRotation = customLabels.ylabelRotation != null ? customLabels.ylabelRotation : -90;
  if (customLabels.ylabelOffsetX != null && customLabels.ylabelOffsetY != null) {
    yLabelAttributes = `x=\"${customLabels.ylabelOffsetX}\" y=\"${customLabels.ylabelOffsetY}\" transform=\"rotate(${ylabelRotation}, ${customLabels.ylabelOffsetX}, ${customLabels.ylabelOffsetY})\"`;
  } else if (customLabels.ylabelX != null && customLabels.ylabelY != null) {
    yLabelAttributes = `x=\"${customLabels.ylabelX}\" y=\"${customLabels.ylabelY}\" transform=\"rotate(${ylabelRotation}, ${customLabels.ylabelX}, ${customLabels.ylabelY})\"`;
  } else {
    yLabelAttributes = `x=\"5\" y=\"${(svgHeight / 2).toFixed(2)}\" transform=\"rotate(${ylabelRotation}, 10, ${(svgHeight / 2).toFixed(2)})\"`;
  }

  // ARIA and text anchor attributes with support for custom parameters
  const xAriaLabel = customLabels.xlabelAriaLabel ? customLabels.xlabelAriaLabel : plotData.axisLabels.x;
  const yAriaLabel = customLabels.ylabelAriaLabel ? customLabels.ylabelAriaLabel : plotData.axisLabels.y;
  const xTextAnchor = customLabels.xlabelAnchor ? customLabels.xlabelAnchor : "middle";
  const yTextAnchor = customLabels.ylabelAnchor ? customLabels.ylabelAnchor : "middle";

  const allowedAnchors = ["start", "middle", "end"];
  if (customLabels.xlabelAnchor && !allowedAnchors.includes(customLabels.xlabelAnchor)) {
    throw new Error("Error: Invalid value for xlabelAnchor. Allowed values are 'start', 'middle', or 'end'.");
  }
  if (customLabels.ylabelAnchor && !allowedAnchors.includes(customLabels.ylabelAnchor)) {
    throw new Error("Error: Invalid value for ylabelAnchor. Allowed values are 'start', 'middle', or 'end'.");
  }

  const xFontSizeAttr = customLabels.xlabelFontSize ? ` font-size=\"${customLabels.xlabelFontSize}\"` : "";
  const xFillAttr = customLabels.xlabelColor ? ` fill=\"${customLabels.xlabelColor}\"` : "";
  const yFontSizeAttr = customLabels.ylabelFontSize ? ` font-size=\"${customLabels.ylabelFontSize}\"` : "";
  const yFillAttr = customLabels.ylabelColor ? ` fill=\"${customLabels.ylabelColor}\"` : "";

  // Prepare SVG metadata to be embedded as a data attribute; only for SVG outputs
  const svgMetadata = JSON.stringify({
    expression: plotData.expression,
    range: plotData.range,
    computedXRange: plotData.computedXRange,
    computedYRange: plotData.computedYRange,
    axisLabels: plotData.axisLabels,
    resolution: plotData.resolution,
    customParameters: customLabels
  });
  const metadataEscaped = svgMetadata.replace(/"/g, "&quot;");

  // Accessibility: add role attribute if provided
  let roleAttr = "";
  if (customLabels.svgRole) {
    roleAttr = ` role=\"${String(customLabels.svgRole)}\"`;
  }

  // Wrap defsElements in <defs> if any definitions exist
  if (defsElements !== "") {
    defsElements = `<defs>${defsElements}</defs>`;
  }

  // Construct SVG content in one line to avoid unintended whitespace/newlines
  const svgContent =
    '<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"' +
    svgWidth +
    '\" height=\"' +
    svgHeight +
    '\" viewBox=\"0 0 ' +
    svgWidth +
    ' ' +
    svgHeight +
    '\"' + roleAttr + ' data-metadata=\"' +
    metadataEscaped +
    '\">' +
    bgRect +
    gridElements +
    defsElements +
    '<text x=\"' +
    xLabelX +
    '\" y=\"' +
    xLabelY +
    '\"' +
    xTransform +
    ' aria-label=\"' +
    xAriaLabel +
    '\" text-anchor=\"' +
    xTextAnchor +
    '\"' +
    xFontSizeAttr +
    xFillAttr +
    '>' +
    plotData.axisLabels.x +
    '</text>' +
    '<text ' +
    yLabelAttributes +
    ' aria-label=\"' +
    yAriaLabel +
    '\" text-anchor=\"' +
    yTextAnchor +
    '\"' +
    yFontSizeAttr +
    yFillAttr +
    '>' +
    plotData.axisLabels.y +
    '</text>' +
    '<text x=\"10\" y=\"20\">Plot for: ' +
    expression.trim() +
    ' in range ' +
    range.trim() +
    '</text>' +
    shapeElement +
    '</svg>';
  return svgContent;
}

// Define a helper function to load and merge configuration from a file and CLI options
function loadConfig(cliOptions) {
  if (cliOptions.config) {
    try {
      const configFileContent = fs.readFileSync(cliOptions.config, "utf8");
      let configOptions;
      const ext = path.extname(cliOptions.config).toLowerCase();
      if (ext === ".yaml" || ext === ".yml") {
        configOptions = yaml.load(configFileContent);
      } else {
        configOptions = JSON.parse(configFileContent);
      }
      // Recursively interpolate environment variables in the configuration
      configOptions = interpolateEnv(configOptions);
      const configSchema = z.object({
        expression: z.string().min(1).optional(),
        range: z
          .string()
          .regex(/\s*x\s*=\s*-?\d+(?:\.\d+)?\s*:\s*-?\d+(?:\.\d+)?\s*,\s*y\s*=\s*-?\d+(?:\.\d+)?\s*:\s*-?\d+(?:\.\d+)?\s*$/)
          .optional(),
        resolution: z.preprocess((val) => (val === "" ? undefined : Number(val)), z.number().int().positive()).optional(),
        xlabel: z.string().optional(),
        ylabel: z.string().optional(),
        xlabelPrecision: z.preprocess((val) => Number(val), z.number().int().nonnegative()).optional(),
        ylabelPrecision: z.preprocess((val) => Number(val), z.number().int().nonnegative()).optional(),
        smooth: z.enum(["true", "false"]).optional(),
        xlabelX: z.preprocess((val) => Number(val), z.number()).optional(),
        xlabelY: z.preprocess((val) => Number(val), z.number()).optional(),
        ylabelX: z.preprocess((val) => Number(val), z.number()).optional(),
        ylabelY: z.preprocess((val) => Number(val), z.number()).optional(),
        xlabelRotation: z.preprocess((val) => Number(val), z.number()).optional(),
        ylabelRotation: z.preprocess((val) => Number(val), z.number()).optional(),
        xlabelOffsetX: z.preprocess((val) => Number(val), z.number()).optional(),
        xlabelOffsetY: z.preprocess((val) => Number(val), z.number()).optional(),
        ylabelOffsetX: z.preprocess((val) => Number(val), z.number()).optional(),
        ylabelOffsetY: z.preprocess((val) => Number(val), z.number()).optional(),
        locale: z.string().optional(),
        xlabelAriaLabel: z.string().optional(),
        ylabelAriaLabel: z.string().optional(),
        xlabelAnchor: z.enum(["start", "middle", "end"]).optional(),
        ylabelAnchor: z.enum(["start", "middle", "end"]).optional(),
        xlabelFontSize: z.string().optional(),
        xlabelColor: z.string().optional(),
        ylabelFontSize: z.string().optional(),
        ylabelColor: z.string().optional(),
        colorGradient: z.enum(["true", "false"]).optional(),
        gradientStartColor: z.string().optional(),
        gradientEndColor: z.string().optional(),
        gradientStops: z.string().optional(),
        width: z.preprocess((val) => (val === "" ? undefined : Number(val)), z.number().positive()).optional(),
        height: z.preprocess((val) => (val === "" ? undefined : Number(val)), z.number().positive()).optional(),
        smoothingFactor: z.preprocess((val) => Number(val), z.number().min(0).max(1)).optional(),
        markerStart: z.string().optional(),
        markerEnd: z.string().optional(),
        markerShape: z.string().optional(),
        markerWidth: z.any().optional(),
        markerHeight: z.any().optional(),
        markerFill: z.string().optional(),
        svgRole: z.string().optional(),
        strokeWidth: z.preprocess((val) => (val === "" ? undefined : val), z.any()).optional(),
        strokeDashArray: z.string().optional(),
        strokeLinecap: z.string().optional(),
        display: z.object({
          width: z.preprocess((val) => Number(val), z.number().positive()),
          height: z.preprocess((val) => Number(val), z.number().positive())
        }).optional(),
        // New parameters for background and grid styling
        bgColor: z.string().optional(),
        showGrid: z.string().optional(),
        gridColor: z.string().optional(),
        gridWidth: z.preprocess((val) => (val === "" ? undefined : Number(val)), z.number().positive()).optional()
      });
      const validatedConfig = configSchema.parse(configOptions);
      const mergedOptions = Object.assign({}, validatedConfig, cliOptions);
      if (mergedOptions.resolution === undefined) {
        mergedOptions.resolution = 100;
      }
      if (mergedOptions.width === undefined) {
        mergedOptions.width = 300;
      }
      if (mergedOptions.height === undefined) {
        mergedOptions.height = 150;
      }
      return mergedOptions;
    } catch (e) {
      if (e instanceof z.ZodError) {
        const numericKeys = [
          "resolution",
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
          "ylabelOffsetY",
          "width",
          "height",
          "smoothingFactor"
        ];
        const errorMessages = e.errors.map(err => {
          const key = err.path.join('.');
          if (numericKeys.includes(key)) {
            return `Error: Invalid numeric value for ${key}. ${err.message}`;
          } else {
            return `Error at '${key}': ${err.message}`;
          }
        }).join("; ");
        throw new Error(errorMessages);
      }
      throw new Error("Error: Unable to read or parse configuration file: " + e.message);
    }
  }
  if (cliOptions.resolution === undefined) {
    cliOptions.resolution = 100;
  }
  if (cliOptions.width === undefined) {
    cliOptions.width = 300;
  }
  if (cliOptions.height === undefined) {
    cliOptions.height = 150;
  }
  return cliOptions;
}

const app = express();

// Register /plot endpoint unconditionally so that HTTP tests can access it
app.get("/plot", (req, res) => {
  if (Object.keys(req.query).length === 0) {
    req.query.expression = runtimeConfig.expression || "y=sin(x)";
    req.query.range = runtimeConfig.range || "x=-1:1,y=-1:1";
    req.query.fileType = (req.headers.accept && req.headers.accept.includes("image/png")) ? "png" : "svg";
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
  let accept = req.headers.accept;
  // If the Accept header is a wildcard, treat it as not provided to use fileType fallback
  const effectiveAccept = (accept && accept.includes("*/*")) ? "" : accept;
  if (effectiveAccept) {
    if (effectiveAccept.includes("image/svg+xml")) {
      res.type("svg");
      return res.send(svg);
    } else if (effectiveAccept.includes("image/png")) {
      const dummyPng = Buffer.from("89504e470d0a1a0a", "hex");
      res.type("png");
      return res.send(dummyPng);
    } else if (effectiveAccept.includes("application/json")) {
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
  const envFlagIndexGlobal = process.argv.findIndex((arg) => arg === "--env");
  if (envFlagIndexGlobal !== -1 && process.argv.length > envFlagIndexGlobal + 1) {
    const envPath = process.argv[envFlagIndexGlobal + 1];
    dotenv.config({ path: envPath });
  } else {
    dotenv.config();
  }

  const args = process.argv.slice(2);
  if (args.length === 0) {
    return;
  }

  let options = {};
  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith("--")) {
      const key = args[i].substring(2);
      const value = args[i + 1] || "";
      options[key] = value;
      i++;
    }
  }

  options = loadConfig(options);
  runtimeConfig = options;

  if (Object.keys(options).length === 0) {
    return;
  }

  if (options.serve) {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
    process.on('SIGHUP', () => {
      try {
        runtimeConfig = loadConfig(options);
        console.log("Configuration reloaded successfully.");
      } catch (e) {
        console.error("Configuration reload failed: " + e.message);
      }
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

export { main, app, interpolateEnv };

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main();
}
