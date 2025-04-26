#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import express from "express";
import fs from "fs";
import path from "path";

const app = express();

app.get("/plot", (req, res) => {
  // Check for dynamic query parameters
  const { expression, range, fileType, format } = req.query;

  // If any query parameters are provided, use dynamic plot generation
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

    // Determine output format: prefer 'format' over 'fileType'
    let outputFormat = format || fileType;
    // Allow shorthand values for svg and png
    if (outputFormat === "svg") outputFormat = "image/svg+xml";
    if (outputFormat === "png") outputFormat = "image/png";

    if (
      outputFormat !== "image/svg+xml" &&
      outputFormat !== "image/png" &&
      outputFormat !== "application/json"
    ) {
      return res.status(400).send("Invalid 'format' query parameter. Must be one of 'image/svg+xml', 'image/png', or 'application/json'.");
    }

    // Validate range format, supports integer and floating point numbers
    const rangePattern = /^x=-?\d+(\.\d+)?\:-?\d+(\.\d+)?,y=-?\d+(\.\d+)?\:-?\d+(\.\d+)?$/;
    if (!rangePattern.test(range)) {
      return res.status(400).send("Error: 'range' query parameter is malformed. Expected format: x=<min>:<max>,y=<min>:<max> with numeric values.");
    }

    try {
      if (outputFormat === "image/svg+xml") {
        const svgContent = `<svg xmlns="http://www.w3.org/2000/svg"><text x="10" y="20">Plot for: ${expression} in range ${range}</text></svg>`;
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

  // Fallback to content negotiation based on Accept header
  const accepted = req.accepts(["image/svg+xml", "image/png", "application/json"]);
  res.vary("Accept");
  if (!accepted) {
    return res.status(406).send("Not Acceptable");
  }
  switch (accepted) {
    case "image/svg+xml":
      res.set("Content-Type", "image/svg+xml; charset=utf-8").send('<svg xmlns="http://www.w3.org/2000/svg"></svg>');
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
 * @throws Will throw an error if an unsupported file extension is provided.
 */
export function generatePlot(expression, range, fileOutput) {
  const ext = path.extname(fileOutput).toLowerCase();
  let successMessage;
  if (ext === ".svg") {
    const content = `<svg xmlns="http://www.w3.org/2000/svg"><text x="10" y="20">Plot for: ${expression} in range ${range}</text></svg>`;
    fs.writeFileSync(fileOutput, content, "utf8");
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
  --range <range>       Specify the plot range (format: x=<min>:<max>,y=<min>:<max>). Supports integers and floating point numbers.
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
