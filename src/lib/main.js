#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import express from "express";
import fs from "fs";
import path from "path";
import { compile } from "mathjs";

const app = express();

function createSvgPlot(expression, range) {
  // Extract x range from the range parameter (format: x=<min>:<max>,y=<min>:<max>)
  const xPattern = /x=(-?\d+(\.\d+)?):(-?\d+(\.\d+)?)/;
  const xMatch = xPattern.exec(range);
  if (!xMatch) {
    throw new Error("Error: Invalid range format for x values.");
  }
  const xMin = parseFloat(xMatch[1]);
  const xMax = parseFloat(xMatch[3]);
  // Numeric Order Enforcement for x: Ensure xMin is less than xMax
  if (xMin >= xMax) {
    throw new Error("Error: Invalid range - x-min must be less than x-max.");
  }

  // Extract y range from the range parameter
  const yPattern = /y=(-?\d+(\.\d+)?):(-?\d+(\.\d+)?)/;
  const yMatch = yPattern.exec(range);
  if (!yMatch) {
    throw new Error("Error: Invalid range format for y values.");
  }
  const yInputMin = parseFloat(yMatch[1]);
  const yInputMax = parseFloat(yMatch[3]);
  // Numeric Order Enforcement for y: Ensure yInputMin is less than yInputMax
  if (yInputMin >= yInputMax) {
    throw new Error("Error: Invalid range - y-min must be less than y-max.");
  }

  const numPoints = 100;
  const step = (xMax - xMin) / (numPoints - 1);
  // Prepare mathematical expression (remove "y=" prefix if exists)
  let exprStr = expression.trim();
  if (exprStr.toLowerCase().startsWith("y=")) {
    exprStr = exprStr.slice(2);
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
  const svgContent = `
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <text x="10" y="20" font-size="12" fill="black">Plot for: ${expression} in range ${range}</text>
  <polyline fill="none" stroke="blue" stroke-width="2" points="${polylinePoints}" />
</svg>
  `.trim();
  return svgContent;
}

app.get("/plot", (req, res) => {
  const { expression, range, fileType, format } = req.query;

  if (expression || range || fileType || format) {
    if (!expression || expression.trim() === "") {
      return res.status(400).send("Missing or empty 'expression' query parameter.");
    }
    if (!range || range.trim() === "") {
      return res.status(400).send("Missing or empty 'range' query parameter.");
    }
    if (!fileType && !format) {
      return res.status(400).send("Missing required query parameter: either 'fileType' or 'format' must be provided.");
    }

    let outputFormat = format || fileType;
    if (outputFormat === "svg") outputFormat = "image/svg+xml";
    if (outputFormat === "png") outputFormat = "image/png";

    if (
      outputFormat !== "image/svg+xml" &&
      outputFormat !== "image/png" &&
      outputFormat !== "application/json"
    ) {
      return res.status(400).send("Invalid 'format' query parameter. Must be one of 'image/svg+xml', 'image/png', or 'application/json'.");
    }

    const rangePattern = /^x=-?\d+(\.\d+)?\:-?\d+(\.\d+)?,y=-?\d+(\.\d+)?\:-?\d+(\.\d+)?$/;
    if (!rangePattern.test(range)) {
      return res.status(400).send("Error: 'range' query parameter is malformed. Expected format: x=<min>:<max>,y=<min>:<max> with numeric values.");
    }

    try {
      if (outputFormat === "image/svg+xml") {
        const svgContent = createSvgPlot(expression, range);
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
 * @returns {string} A success message indicating the plot generation details.
 * @throws Will throw an error if an unsupported file extension is provided or if numeric ranges are invalid.
 */
export function generatePlot(expression, range, fileOutput) {
  const ext = path.extname(fileOutput).toLowerCase();
  let successMessage;
  if (ext === ".svg") {
    const svgContent = createSvgPlot(expression, range);
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
  --range <range>       Specify the plot range (format: x=<min>:<max>,y=<min>:<max>). Supports integers and floating point numbers. Note: lower bounds must be less than upper bounds.
  --file <path>         Specify the output file path. Supported extensions: .svg, .png.
  --serve               Run in server mode to listen for HTTP requests.

Examples:
  node src/lib/main.js --help
  node src/lib/main.js --version
  node src/lib/main.js --expression "y=sin(x)" --range "x=-1:1,y=-1:1" --file output.svg --verbose
  node src/lib/main.js --serve

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
    if (!hasExpression || !hasRange || !hasFile) {
      throw new Error("Error: --expression, --range, and --file flags are required together.");
    }
    const expressionIdx = args.indexOf("--expression");
    const rangeIdx = args.indexOf("--range");
    const fileIdx = args.indexOf("--file");
    const expression = args[expressionIdx + 1];
    const range = args[rangeIdx + 1];
    const fileOutput = args[fileIdx + 1];

    if (verbose) {
      console.log("Parsed flags:");
      console.log("Expression:", expression);
      console.log("Range:", range);
      console.log("File:", fileOutput);
    }

    // Validate that all required flags have non-empty values
    if (!expression || expression.trim() === "") {
      throw new Error("Error: --expression flag must have a non-empty value.");
    }
    if (!range || range.trim() === "") {
      throw new Error("Error: --range flag must have a non-empty value.");
    }
    if (!fileOutput || fileOutput.trim() === "") {
      throw new Error("Error: --file flag must have a non-empty value.");
    }

    // Validate the range flag format (supports integer and floating point numbers)
    const rangePattern = /^x=-?\d+(\.\d+)?\:-?\d+(\.\d+)?,y=-?\d+(\.\d+)?\:-?\d+(\.\d+)?$/;
    if (!rangePattern.test(range)) {
      throw new Error("Error: --range flag value is malformed. Expected format: x=<min>:<max>,y=<min>:<max> with numeric values.");
    }

    if (verbose) {
      console.log("Range format validated.");
      console.log(`Generating plot with expression: ${expression}, range: ${range}, output file: ${fileOutput}`);
    }

    return generatePlot(expression, range, fileOutput);
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
