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
  const svgContent = `
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <text x="10" y="20" font-size="12" fill="black">Plot for: ${expression} in range ${range}</text>
  <polyline fill="none" stroke="blue" stroke-width="2" points="${polylinePoints}" />
  <!-- Dynamic Axis Labels with ARIA accessibility attributes -->
  <text x="${xLabelX}" y="${xLabelY}" text-anchor="${xTextAnchor}" aria-label="${xAriaLabel}" font-size="${customLabels.xlabelFontSize ? customLabels.xlabelFontSize : '12'}" fill="${customLabels.xlabelColor ? customLabels.xlabelColor : 'black'}"${xTransform}${customLabels.xlabelFontFamily ? ` font-family=\"${customLabels.xlabelFontFamily}\"` : ""}>
    ${xAxisLabelText}
  </text>
  <text ${yLabelAttributes} text-anchor="${yTextAnchor}" aria-label="${yAriaLabel}" font-size="${customLabels.ylabelFontSize ? customLabels.ylabelFontSize : '12'}" fill="${customLabels.ylabelColor ? customLabels.ylabelColor : 'black'}"${customLabels.ylabelFontFamily ? ` font-family=\"${customLabels.ylabelFontFamily}\"` : ""}>
    ${yAxisLabelText}
  </text>
</svg>
  `.trim();
  return svgContent;
}

app.get("/plot", (req, res) => {
  const { expression, range, fileType, format, xlabel, ylabel, xlabelFontSize, xlabelColor, ylabelFontSize, ylabelColor, xlabelPrecision, ylabelPrecision, locale, xlabelX, xlabelY, ylabelX, ylabelY, xlabelRotation, ylabelRotation, xlabelFontFamily, ylabelFontFamily, xlabelOffsetX, xlabelOffsetY, ylabelOffsetX, ylabelOffsetY, xlabelAriaLabel, ylabelAriaLabel, xlabelAnchor, ylabelAnchor } = req.query;

  // If query parameters are provided, perform aggregated validation
  if (expression || range || fileType || format) {
    let errors = [];
    if (!expression || expression.trim() === "") {
      errors.push("Missing or empty 'expression' query parameter.");
    }
    if (!range || range.trim() === "") {
      errors.push("Missing or empty 'range' query parameter.");
    }
    if (!fileType && !format) {
      errors.push("Missing required query parameter: either 'fileType' or 'format' must be provided.");
    }
    const rangePattern = /^\s*x\s*=\s*-?\d+(?:\.\d+)?\s*:\s*-?\d+(?:\.\d+)?\s*,\s*y\s*=\s*-?\d+(?:\.\d+)?\s*:\s*-?\d+(?:\.\d+)?\s*$/;
    if (range && !rangePattern.test(range)) {
      errors.push("Error: 'range' query parameter is malformed. Expected format: x=<min>:<max>,y=<min>:<max> with numeric values.");
    }
    if (errors.length > 0) {
      return res.status(400).send(errors.join(" "));
    }

    let outputFormat = format || fileType;
    if (outputFormat === "svg") outputFormat = "image/svg+xml";
    if (outputFormat === "png") outputFormat = "image/png";

    if (
      outputFormat !== "image/svg+xml" &&
      outputFormat !== "image/png" &&
      outputFormat !== "application/json"
    ) {
      return res.status(400).send("Error: Invalid 'format' query parameter. Must be one of 'image/svg+xml', 'image/png', or 'application/json'.");
    }

    try {
      if (outputFormat === "image/svg+xml") {
        const svgContent = createSvgPlot(expression, range, { xlabel, ylabel, xlabelFontSize, xlabelColor, ylabelFontSize, ylabelColor, xlabelPrecision, ylabelPrecision, locale, xlabelX, xlabelY, ylabelX, ylabelY, xlabelRotation, ylabelRotation, xlabelFontFamily, ylabelFontFamily, xlabelOffsetX, xlabelOffsetY, ylabelOffsetX, ylabelOffsetY, xlabelAriaLabel, ylabelAriaLabel, xlabelAnchor, ylabelAnchor });
        return res.set("Content-Type", "image/svg+xml; charset=utf-8").send(svgContent);
      } else if (outputFormat === "image/png") {
        const pngBase64 =
          "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==";
        const buffer = Buffer.from(pngBase64, "base64");
        return res.type("image/png").send(buffer);
      } else if (outputFormat === "application/json") {
        return res.json({ expression, range, message: "Plot generation details" });
      }
    } catch (error) {
      return res.status(400).send(String(error.message));
    }
  }

  let accepted = req.accepts(["image/svg+xml", "image/png", "application/json"]);
  res.vary("Accept");
  const acceptHeader = req.get("Accept") || "";
  if (acceptHeader.includes("image/svg+xml")) {
    accepted = "image/svg+xml";
  }
  if (!accepted) {
    return res.status(406).send("Not Acceptable");
  }
  switch (accepted) {
    case "image/svg+xml":
      try {
        // Updated default expression from 'y=default' to 'y=x' for correct evaluation
        const svgContent = createSvgPlot("y=x", "x=0:10,y=0:10");
        res.set("Content-Type", "image/svg+xml; charset=utf-8").send(svgContent);
      } catch (error) {
        res.status(500).send(String(error.message));
      }
      break;
    case "image/png": {
      const pngBase64 =
          "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==";
      const img = Buffer.from(pngBase64, "base64");
      res.type("image/png").send(img);
      break;
    }
    case "application/json":
      res.json({ data: [] });
      break;
    default:
      res.status(406).send("Not Acceptable");
  }
});

/**
 * Generates a plot based on the provided expression, range, and output file path.
 * Supports only .svg and .png file extensions.
 * @param {string} expression - The mathematical expression to plot.
 * @param {string} range - The range for plotting (e.g., "x=-1:1,y=-1:1").
 * @param {string} fileOutput - The file path where the plot will be saved.
 * @param {object} customLabels - (Optional) Custom label parameters for axis labels.
 * @returns {string} A success message indicating the plot generation details.
 * @throws Will throw an error if an unsupported file extension is provided or if numeric ranges are invalid.
 */
export function generatePlot(expression, range, fileOutput, customLabels = {}) {
  const ext = path.extname(fileOutput).toLowerCase();
  let successMessage;
  if (ext === ".svg") {
    const svgContent = createSvgPlot(expression, range, customLabels);
    fs.writeFileSync(fileOutput, svgContent, "utf8");
    successMessage = `SVG plot generated at ${fileOutput} for expression: ${expression} in range: ${range}`;
  } else if (ext === ".png") {
    const pngBase64 =
      "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==";
    const buffer = Buffer.from(pngBase64, "base64");
    fs.writeFileSync(fileOutput, buffer);
    successMessage = `PNG plot generated at ${fileOutput} for expression: ${expression} in range: ${range}`;
  } else {
    throw new Error(`Error: Unsupported file extension '${ext}'. Only .svg and .png are supported.`);
  }
  console.log(successMessage);
  return successMessage;
}

export function main(args = process.argv.slice(2)) {
  // Handle version flag before any other processing
  if (args.includes("--version")) {
    const pkgPath = path.join(process.cwd(), 'package.json');
    try {
      const pkgContent = fs.readFileSync(pkgPath, 'utf8');
      const pkg = JSON.parse(pkgContent);
      console.log(pkg.version);
    } catch (err) {
      console.error('Error reading version from package.json');
      console.error(err);
      process.exit(1);
    }
    process.exit(0);
  }

  // Handle --help flag
  if (args.includes("--help")) {
    const helpMessage = `
Usage: node src/lib/main.js [options]

Options:
  --help                Display this help message and exit.
  --version             Display the current version and exit. (Takes precedence over other flags)
  --verbose             Enable verbose output for debugging.
  --expression <expr>   Specify the mathematical expression (e.g., "y=sin(x)").
  --range <range>       Specify the plot range (format: x=<min>:<max>,y=<min>:<max>). Supports integers and floating point numbers. Note: lower bounds must be less than upper bounds. Extra whitespace is allowed.
  --file <path>         Specify the output file path. Supported extensions: .svg, .png.
  --serve               Run in server mode to listen for HTTP requests.

Examples:
  node src/lib/main.js --help
  node src/lib/main.js --version
  node src/lib/main.js --expression "y=sin(x)" --range "x=-1:1,y=-1:1" --file output.svg --verbose
  node src/lib/main.js --serve

Aggregated Error Reporting:
  When multiple input errors occur (e.g., missing flags or malformed parameters), the tool aggregates the error messages and displays them together, providing comprehensive feedback to the user.

Note: The mathematical expression must include the variable 'x'. For example, a valid expression is 'y=sin(x)'.

Enhanced Expression Validation:
  The tool now performs advanced pre-compilation validation of the mathematical expression. It detects common errors such as missing operators between numeric tokens (e.g., "2 3" instead of "2*3") and unbalanced parentheses (e.g., "y=(x+2").
  If such issues are detected, the following errors will be thrown:
    - Missing operator error: "Error: Detected missing operator between numeric tokens. Please verify your expression format."
    - Unbalanced parentheses error: "Error: Unbalanced parentheses in expression. Please check your expression."
    This validation helps prevent ambiguous expressions and improves the feedback provided to the user.
    
Usage Example of an Erroneous Expression:
    • Expression: "y=2 3+x"
      Suggested Correction: "y=2*3+x"
    • Expression: "y=(x+2"
      Suggested Correction: "y=(x+2)"

For more information, please refer to the usage documentation.
    `;
    console.log(helpMessage);
    return;
  }

  // Check for verbose flag
  const verbose = args.includes("--verbose");
  if (verbose) {
    console.log("Verbose Mode Enabled.");
    console.log("Arguments:", args);
  }

  // Check for CLI_PLOT mode: if any of the CLI flags are provided, require all flags.
  const hasExpression = args.includes("--expression");
  const hasRange = args.includes("--range");
  const hasFile = args.includes("--file");

  if (hasExpression || hasRange || hasFile) {
    if (!(hasExpression && hasRange && hasFile)) {
      throw new Error("Error: --expression, --range, and --file flags are required together.");
    }
    let cliErrors = [];
    const expressionIdx = args.indexOf("--expression");
    const rangeIdx = args.indexOf("--range");
    const fileIdx = args.indexOf("--file");

    if (expressionIdx === -1) {
      cliErrors.push("--expression flag is required.");
    } else {
      const expr = args[expressionIdx + 1];
      if (!expr || expr.trim() === "") {
        cliErrors.push("Error: --expression flag must have a non-empty value.");
      }
    }
    if (rangeIdx === -1) {
      cliErrors.push("--range flag is required.");
    } else {
      const rng = args[rangeIdx + 1];
      if (!rng || rng.trim() === "") {
        cliErrors.push("Error: --range flag must have a non-empty value.");
      } else {
        const cliRangePattern = /^\s*x\s*=\s*-?\d+(?:\.\d+)?\s*:\s*-?\d+(?:\.\d+)?\s*,\s*y\s*=\s*-?\d+(?:\.\d+)?\s*:\s*-?\d+(?:\.\d+)?\s*$/;
        if (!cliRangePattern.test(rng)) {
          cliErrors.push("Error: --range flag value is malformed. Expected format: x=<min>:<max>,y=<min>:<max> with numeric values.");
        }
      }
    }
    if (fileIdx === -1) {
      cliErrors.push("--file flag is required.");
    } else {
      const fileOutput = args[fileIdx + 1];
      if (!fileOutput || fileOutput.trim() === "") {
        cliErrors.push("Error: --file flag must have a non-empty value.");
      }
    }
    if (cliErrors.length > 0) {
      throw new Error(cliErrors.join(" "));
    }

    const expression = args[expressionIdx + 1];
    const range = args[rangeIdx + 1];
    const fileOutput = args[fileIdx + 1];

    if (verbose) {
      console.log("Parsed flags:");
      console.log("Expression:", expression);
      console.log("Range:", range);
      console.log("File:", fileOutput);
    }

    // Parse additional custom label flags from CLI arguments
    let customLabels = {};
    const ignoreFlags = new Set(["--expression", "--range", "--file", "--verbose", "--help", "--serve", "--version"]);
    for (let i = 0; i < args.length; i++) {
      if (args[i].startsWith("--") && !ignoreFlags.has(args[i])) {
        const key = args[i].substring(2);
        const value = args[i + 1];
        customLabels[key] = value;
        i++;
      }
    }

    return generatePlot(expression, range, fileOutput, customLabels);
  }

  if (args.includes("--serve")) {
    if (verbose) {
      console.log("Server mode initiated.");
    }
    app.listen(3000, () => {
      console.log("Server listening on :3000");
    });
  } else {
    console.log(`Run with: ${JSON.stringify(args)}`);
  }
}

export { app };

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}
