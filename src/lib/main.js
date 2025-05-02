#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";

function parseArgs(args) {
  const options = {};
  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith("--")) {
      const key = args[i].substring(2);
      let value = true;
      if (i + 1 < args.length && !args[i + 1].startsWith("--")) {
        value = args[i + 1];
        i++;
      }
      options[key] = value;
    }
  }
  return options;
}

export function renderSVG({ expressions, width, height, segmentHeight }) {
  let svgWidth = width;
  let svgHeight, svgContent = "";
  const ns = "http://www.w3.org/2000/svg";
  
  if (expressions.length > 1) {
    // For multiple expressions, each uses segmentHeight (default to 100 if not provided)
    const segHeight = segmentHeight || 100;
    svgHeight = segHeight * expressions.length;
    // Add a <text> element for each expression as a placeholder
    expressions.forEach((expr, index) => {
      const yPos = index * segHeight + segHeight / 2;
      svgContent += `<text x="10" y="${yPos}" font-size="16">${expr.trim()}</text>`;
    });
  } else {
    // For a single expression, use fixed height of 400 (unless explicitly provided via height parameter)
    svgHeight = height || 400;
    svgContent = `<text x="10" y="${svgHeight / 2}" font-size="16">${expressions[0].trim()}</text>`;
  }
  
  // Include a simple line placeholder
  const svg = `<svg xmlns="${ns}" width="${svgWidth}" height="${svgHeight}">
  ${svgContent}
  <line x1="0" y1="0" x2="${svgWidth}" y2="${svgHeight}" stroke="black" />
</svg>`;
  return svg;
}

export function main(args = []) {
  const options = parseArgs(args);
  
  // If --expression is provided, generate an SVG plot
  if (options.expression) {
    // Split expressions by semicolon for multiple expressions
    const expressions = options.expression.split(";").map(e => e.trim()).filter(e => e);
    // Determine width; default is 640 if not specified
    const width = options.width ? parseInt(options.width, 10) : 640;
    let svgOutput;
    if (expressions.length > 1) {
      // For multiple expressions, use --height as segment height (default 100)
      const segHeight = options.height ? parseInt(options.height, 10) : 100;
      svgOutput = renderSVG({ expressions, width, segmentHeight: segHeight });
    } else {
      // For a single expression, height is fixed at 400
      svgOutput = renderSVG({ expressions, width, height: 400 });
    }
    console.log(svgOutput);
  } else {
    console.log(`Run with: ${JSON.stringify(args)}`);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  main(args);
}
