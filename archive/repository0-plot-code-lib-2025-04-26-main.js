#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import fs from "fs";
import sharp from "sharp";

export async function main(args) {
  // Check for --help flag and display usage message if found
  if (args.includes("--help")) {
    const usage = `Usage: node src/lib/main.js [options]

Options:
  --file <output>             Specify output file for the plot. If the filename ends with ".png", a PNG file is generated; otherwise, an SVG file is created.
  --expression <expr>         Specify the mathematical expression to plot. Must be a non-empty string.
  --range <range>             Specify the range for the plot in the format "x=start:end,y=start:end".
  --color <color>             Specify the background color for the plot's rectangle. Defaults to "lightblue".
  --dimensions <width:height> Specify the dimensions of the plot. Both width and height must be positive numbers.
  --help                      Display this help message and exit.

Examples:
  node src/lib/main.js --file output.svg
  node src/lib/main.js --expression "y=sin(x)" --range "x=-1:1,y=-1:1" --file plot.png
  node src/lib/main.js --file output.svg --color "coral" --dimensions "400:300"
`;
    console.log(usage);
    process.exit(0);
  }

  let outputFile = null;
  let expressionVal = "";
  let rangeVal = "";
  let colorVal = "lightblue";
  let width = 300;
  let height = 200;

  // Parse arguments to find flags and their values
  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--file" && i + 1 < args.length) {
      outputFile = args[i + 1];
      i++;
    } else if (args[i] === "--expression" && i + 1 < args.length) {
      expressionVal = args[i + 1];
      i++;
    } else if (args[i] === "--range" && i + 1 < args.length) {
      rangeVal = args[i + 1];
      i++;
    } else if (args[i] === "--color" && i + 1 < args.length) {
      colorVal = args[i + 1];
      i++;
    } else if (args[i] === "--dimensions" && i + 1 < args.length) {
      const dimensions = args[i + 1];
      i++;
      const dimRegex = /^(\d+):(\d+)$/;
      const match = dimensions.match(dimRegex);
      if (!match) {
        console.error('Error: --dimensions requires a value in the format "width:height" with positive numbers.');
        process.exit(1);
      }
      width = parseInt(match[1], 10);
      height = parseInt(match[2], 10);
      if (width <= 0 || height <= 0) {
        console.error("Error: --dimensions values must be positive numbers.");
        process.exit(1);
      }
    }
  }

  // Input Validation for --expression flag
  if (args.includes("--expression")) {
    if (!expressionVal || expressionVal.trim() === "") {
      console.error("Error: --expression requires a non-empty value.");
      process.exit(1);
    }
  }

  // Input Validation for --range flag
  if (args.includes("--range")) {
    if (!rangeVal || rangeVal.trim() === "") {
      console.error('Error: --range requires a non-empty value in the format "x=start:end,y=start:end".');
      process.exit(1);
    }
    // Validate range format: x=start:end,y=start:end
    const rangeRegex = /^x=-?\d+(\.\d+)?:-?\d+(\.\d+)?,y=-?\d+(\.\d+)?:-?\d+(\.\d+)?$/;
    if (!rangeRegex.test(rangeVal.trim())) {
      console.error('Error: --range flag invalid format. Expected format: "x=start:end,y=start:end".');
      process.exit(1);
    }
  }

  // Build dynamic SVG content with optional expression and range details
  const expressionText = expressionVal
    ? `<text x="10" y="20" font-size="12" fill="black">Expression: ${expressionVal}</text>`
    : "";
  const rangeText = rangeVal ? `<text x="10" y="40" font-size="12" fill="black">Range: ${rangeVal}</text>` : "";

  const svgData = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
  <rect width="100%" height="100%" fill="${colorVal}" />
  <circle cx="${width / 2}" cy="${height / 2}" r="${Math.min(width, height) / 4}" fill="green" />
  ${expressionText}
  ${rangeText}
</svg>`;

  if (outputFile) {
    if (outputFile.endsWith(".png")) {
      try {
        // Convert SVG data to PNG using sharp
        const pngBuffer = await sharp(Buffer.from(svgData)).png().toBuffer();
        fs.writeFileSync(outputFile, pngBuffer);
        console.log(`PNG file written to ${outputFile}`);
      } catch (error) {
        console.error("Error converting SVG to PNG:", error);
        process.exit(1);
      }
    } else {
      // Write SVG data directly to file
      fs.writeFileSync(outputFile, svgData);
      console.log(`SVG file written to ${outputFile}`);
    }
  } else {
    console.log(`SVG Output:\n${svgData}`);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  // Call main and handle promise rejections
  main(args).catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
