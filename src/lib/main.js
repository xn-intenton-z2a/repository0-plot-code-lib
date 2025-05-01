#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import { writeFileSync, appendFileSync } from "fs";
import sharp from "sharp"; // Importing sharp for PNG conversion

export async function main(args) {
  // If no args provided, default to process.argv.slice(2)
  args = args || process.argv.slice(2);
  const options = parseArgs(args);

  if (options.invalid) {
    return;
  }

  if (!options.expression) {
    logError("Error: --expression flag is required.");
    return;
  }

  if (options.outputFormat && options.outputFormat !== 'svg' && options.outputFormat !== 'png') {
    logError("Error: Unsupported output format. Supported formats are 'svg' and 'png'.");
    return;
  }

  // Check if multiple expressions are provided based on semicolon delimiter
  const rawExpressions = options.expression.split(';').map(e => e.trim()).filter(e => e.length > 0);
  if (rawExpressions.length === 0) {
    logError("Error: No valid expressions provided.");
    return;
  }

  let svg;
  if (rawExpressions.length === 1) {
    // Single expression, use generateSVG with optional custom width
    svg = generateSVG(rawExpressions[0], options.range, options.width);
  } else {
    // Multiple expressions, merge SVG segments with optional custom width and height per segment
    svg = generateMultiSVG(rawExpressions, options.range, options.width, options.height);
  }

  if (options.outputFormat === 'png') {
    if (!options.file) {
      logError("Error: --file flag is required when --output-format is png.");
      return;
    }
    try {
      const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();
      writeFileSync(options.file, pngBuffer);
      console.log(`PNG written to ${options.file}`);
    } catch (error) {
      logError(`Failed to convert SVG to PNG: ${error.message}`);
    }
  } else {
    if (options.file) {
      try {
        writeFileSync(options.file, svg);
        console.log(`SVG written to ${options.file}`);
      } catch (error) {
        logError(`Failed to write file: ${error.message}`);
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
    // Custom dimension flags
    else if (arg === "--width" && i + 1 < args.length) {
      const widthVal = parseFloat(args[i + 1]);
      if (isNaN(widthVal) || widthVal <= 0) {
        logError("Error: --width must be a positive number.");
        options.invalid = true;
      } else {
        options.width = widthVal;
      }
      i++;
    } else if (arg === "--height" && i + 1 < args.length) {
      const heightVal = parseFloat(args[i + 1]);
      if (isNaN(heightVal) || heightVal <= 0) {
        logError("Error: --height must be a positive number.");
        options.invalid = true;
      } else {
        options.height = heightVal;
      }
      i++;
    }
  }
  return options;
}

function generateSVG(expression, range, width) {
  // For a single expression, generate a simple SVG string with a text element.
  // Uses custom width if provided, with default height set to 400.
  const svgWidth = width || 640;
  const svgHeight = 400;
  const displayRange = range || "default range";

  return `<svg width="${svgWidth}" height="${svgHeight}" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="#fff" />
    <text x="10" y="20" fill="#000">Plot for: ${expression} | Range: ${displayRange}</text>
  </svg>`;
}

function generateMultiSVG(expressions, range, width, height) {
  // Each expression will be rendered in its own segment with a vertical offset.
  // Custom width is applied for overall SVG width.
  // Custom height (or default 100) is used for each segment, and total height is recalculated.
  const svgWidth = width || 640;
  const segmentHeight = height || 100; // Fixed height per segment if not provided
  const totalHeight = segmentHeight * expressions.length;
  const displayRange = range || "default range";

  let segments = '';
  expressions.forEach((expr, index) => {
    const yOffset = index * segmentHeight;
    segments += `<g transform="translate(0, ${yOffset})">
      <rect width="100%" height="${segmentHeight}" fill="#fff" />
      <text x="10" y="20" fill="#000">Plot for: ${expr} | Range: ${displayRange}</text>
    </g>`;
  });

  return `<svg width="${svgWidth}" height="${totalHeight}" xmlns="http://www.w3.org/2000/svg">
    ${segments}
  </svg>`;
}

function logError(message) {
  const errorMessage = `[${new Date().toISOString()}] ${message}`;
  console.error(errorMessage);
  if (process.env.LOG_FILE) {
    try {
      appendFileSync(process.env.LOG_FILE, errorMessage + "\n");
    } catch (err) {
      console.error(`Failed to write to log file: ${err.message}`);
    }
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  main(args);
}
