#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import { writeFileSync } from "fs";
import sharp from "sharp"; // Importing sharp for PNG conversion

export async function main(args) {
  // If no args provided, default to process.argv.slice(2)
  args = args || process.argv.slice(2);
  const options = parseArgs(args);

  if (!options.expression) {
    console.error("Error: --expression flag is required.");
    return;
  }

  if (options.outputFormat && options.outputFormat !== 'svg' && options.outputFormat !== 'png') {
    console.error("Error: Unsupported output format. Supported formats are 'svg' and 'png'.");
    return;
  }

  // Generate the SVG content based on the provided parameters
  const svg = generateSVG(options.expression, options.range);

  if (options.outputFormat === 'png') {
    if (!options.file) {
      console.error("Error: --file flag is required when --output-format is png.");
      return;
    }
    try {
      const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();
      writeFileSync(options.file, pngBuffer);
      console.log(`PNG written to ${options.file}`);
    } catch (error) {
      console.error(`Failed to convert SVG to PNG: ${error.message}`);
    }
  } else {
    if (options.file) {
      try {
        writeFileSync(options.file, svg);
        console.log(`SVG written to ${options.file}`);
      } catch (error) {
        console.error(`Failed to write file: ${error.message}`);
      }
    } else {
      console.log(svg);
    }
  }
}

function parseArgs(args) {
  const options = {};
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === "--expression" && i + 1 < args.length) {
      options.expression = args[i + 1];
      i++;
    } else if (arg === "--range" && i + 1 < args.length) {
      options.range = args[i + 1];
      i++;
    } else if (arg === "--file" && i + 1 < args.length) {
      options.file = args[i + 1];
      i++;
    } else if (arg === "--output-format" && i + 1 < args.length) {
      options.outputFormat = args[i + 1].toLowerCase();
      i++;
    }
  }
  return options;
}

function generateSVG(expression, range) {
  // For the purpose of this example, we generate a simple SVG string with a text element.
  // In future, more advanced plotting can be implemented using libraries if needed.
  const svgWidth = 640;
  const svgHeight = 400;
  const displayRange = range || "default range";

  return `<svg width="${svgWidth}" height="${svgHeight}" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="#fff" />
    <text x="10" y="20" fill="#000">Plot for: ${expression} | Range: ${displayRange}</text>
  </svg>`;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  main(args);
}
