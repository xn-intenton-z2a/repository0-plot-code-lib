#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import fs from "fs";
import sharp from "sharp";

function parseArgs(args) {
  const options = {};
  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith("--")) {
      const rawKey = args[i].substring(2);
      // Convert kebab-case to camelCase (e.g., output-format -> outputFormat)
      const key = rawKey.split("-").map((word, index) => index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)).join("");
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

export function renderSVG({ expressions, width, height, segmentHeight, range }) {
  const ns = "http://www.w3.org/2000/svg";
  let svgContent = "";
  let svgHeight;

  if (expressions.length > 1) {
    const segHeight = segmentHeight || 100;
    svgHeight = segHeight * expressions.length;
    expressions.forEach((expr, index) => {
      let baseY = index * segHeight + segHeight / 2;
      // Adjust position if range is provided to accommodate extra text line
      const yPos = range ? baseY - 10 : baseY;
      svgContent += `<text x="10" y="${yPos}" font-size="16">${expr.trim()}</text>`;
      if (range) {
        svgContent += `<text x="10" y="${yPos + 20}" font-size="12" fill="gray">Range: ${range}</text>`;
      }
    });
  } else {
    svgHeight = height || 400;
    const baseY = svgHeight / 2;
    const yPos = range ? baseY - 10 : baseY;
    svgContent = `<text x="10" y="${yPos}" font-size="16">${expressions[0].trim()}</text>`;
    if (range) {
      svgContent += `<text x="10" y="${yPos + 20}" font-size="12" fill="gray">Range: ${range}</text>`;
    }
  }

  const svg = `<svg xmlns="${ns}" width="${width}" height="${svgHeight}">
  ${svgContent}
  <line x1="0" y1="0" x2="${width}" y2="${svgHeight}" stroke="black" />
</svg>`;
  return svg;
}

export async function main(args = []) {
  const options = parseArgs(args);

  if (!options.expression) {
    console.error(`[${new Date().toISOString()}] Error: --expression flag is required.`);
    return;
  }

  // Split expressions by semicolon for multiple expressions
  const expressions = options.expression.split(";").map(e => e.trim()).filter(e => e);
  const width = options.width ? parseInt(options.width, 10) : 640;
  const range = options.range ? options.range : null;
  let svgOutput;

  if (expressions.length > 1) {
    const segHeight = options.height ? parseInt(options.height, 10) : 100;
    svgOutput = renderSVG({ expressions, width, segmentHeight: segHeight, range });
  } else {
    const height = options.height ? parseInt(options.height, 10) : 400;
    svgOutput = renderSVG({ expressions, width, height, range });
  }

  if (options.outputFormat && options.outputFormat.toLowerCase() === "png") {
    if (!options.file) {
      const errorMsg = `[${new Date().toISOString()}] Error: --file flag is required when using png output format.`;
      console.error(errorMsg);
      return;
    }
    try {
      const pngBuffer = await sharp(Buffer.from(svgOutput)).png().toBuffer();
      fs.writeFileSync(options.file, pngBuffer);
      console.log(`PNG saved to ${options.file}`);
    } catch (error) {
      console.error(`[${new Date().toISOString()}] PNG conversion failed: ${error.message}`);
      return;
    }
  } else {
    console.log(svgOutput);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  await main(args);
}
