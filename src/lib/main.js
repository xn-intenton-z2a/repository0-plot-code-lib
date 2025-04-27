#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import express from "express";
import fs from "fs";
import path from "path";
import { compile } from "mathjs";

const app = express();

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
    // Additional ambiguous symbol checks can be added here if needed
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
    throw new Error("Error: Invalid x-range format. Expected format: x=<min>:<max> with numeric values.");
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
    throw new Error("Error: Invalid y-range format. Expected format: y=<min>:<max> with numeric values.");
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
  const svgContent = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"" + width + "\" height=\"" + height + "\" viewBox=\"0 0 " + width + " " + height + "\">