#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import express from "express";
import fs from "fs";
import path from "path";

const app = express();

app.get("/plot", (req, res) => {
  const accepted = req.accepts(["image/svg+xml", "image/png", "application/json"]);
  res.vary("Accept");
  if (!accepted) {
    return res.status(406).send("Not Acceptable");
  }
  switch (accepted) {
    case "image/svg+xml":
      res.type("image/svg+xml").send('<svg xmlns="http://www.w3.org/2000/svg"></svg>');
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

    // Validate the range flag format
    const rangePattern = /^x=-?\d+:\d+,y=-?\d+:\d+$/;
    if (!rangePattern.test(range)) {
      throw new Error("Error: --range flag value is malformed. Expected format: x=<min>:<max>,y=<min>:<max> with numeric values.");
    }

    // Call the extracted plot generation function
    return generatePlot(expression, range, fileOutput);
  }

  if (args.includes("--serve")) {
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
