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

export function renderSVG({ expressions, width, height, segmentHeight, range, xlabel, ylabel }) {
  const ns = "http://www.w3.org/2000/svg";
  let svgContent = "";
  let svgHeight;

  // Helper function to render a text element with optional range info.
  const renderExprText = (x, baseY, text, range) => {
    const yPos = range ? baseY - 10 : baseY;
    let txt = `<text x=\"${x}\" y=\"${yPos}\" font-size=\"16\">${text.trim()}</text>`;
    if (range) {
      txt += `<text x=\"${x}\" y=\"${yPos + 20}\" font-size=\"12\" fill=\"gray\">Range: ${range}</text>`;
    }
    return txt;
  };

  // Helper function to append optional axis labels.
  const appendAxisLabels = (content, svgWidth, svgHeight, xlabel, ylabel) => {
    let result = content;
    if (xlabel) {
      result += `\n  <text x=\"${svgWidth / 2}\" y=\"${svgHeight - 10}\" text-anchor=\"middle\" font-size=\"14\">${xlabel.trim()}</text>`;
    }
    if (ylabel) {
      result += `\n  <text x=\"15\" y=\"${svgHeight / 2}\" text-anchor=\"middle\" transform=\"rotate(-90,15,${svgHeight / 2})\" font-size=\"14\">${ylabel.trim()}</text>`;
    }
    return result;
  };

  if (expressions.length > 1) {
    // For multiple expressions, use segmentHeight flag if provided or fallback to height flag or default to 100.
    const segHeight = segmentHeight ? parseInt(segmentHeight, 10) : (height ? parseInt(height, 10) : 100);
    svgHeight = segHeight * expressions.length;
    expressions.forEach((expr, index) => {
      const baseY = index * segHeight + segHeight / 2;
      svgContent += renderExprText(10, baseY, expr, range);
    });
  } else {
    svgHeight = height || 400;
    const baseY = svgHeight / 2;
    svgContent = renderExprText(10, baseY, expressions[0], range);
  }

  svgContent = appendAxisLabels(svgContent, width, svgHeight, xlabel, ylabel);

  const svg = `<svg xmlns=\"${ns}\" width=\"${width}\" height=\"${svgHeight}\">\n  ${svgContent}\n  <line x1=\"0\" y1=\"0\" x2=\"${width}\" y2=\"${svgHeight}\" stroke=\"black\" />\n</svg>`;
  return svg;
}

export async function main(args = []) {
  const options = parseArgs(args);

  if (!options.expression) {
    console.error(`[${new Date().toISOString()}] Error: --expression flag is required.`);
    return;
  }

  if ("xlabel" in options && typeof options.xlabel === "string" && options.xlabel.trim() === "") {
    console.error(`[${new Date().toISOString()}] Error: --xlabel flag provided with empty value.`);
    return;
  }
  if ("ylabel" in options && typeof options.ylabel === "string" && options.ylabel.trim() === "") {
    console.error(`[${new Date().toISOString()}] Error: --ylabel flag provided with empty value.`);
    return;
  }

  // Split expressions by semicolon for multiple expressions
  const expressions = options.expression.split(";").map(e => e.trim()).filter(e => e);
  const width = options.width ? parseInt(options.width, 10) : 640;
  const range = options.range ? options.range : null;
  const xlabel = options.xlabel ? options.xlabel : null;
  const ylabel = options.ylabel ? options.ylabel : null;
  let svgOutput;

  if (expressions.length > 1) {
    // For multi-expression, use segmentHeight flag if provided; otherwise fallback to --height or default 100
    const segHeight = options.segmentHeight ? parseInt(options.segmentHeight, 10) : (options.height ? parseInt(options.height, 10) : 100);
    svgOutput = renderSVG({ expressions, width, segmentHeight: segHeight, range, xlabel, ylabel });
  } else {
    const height = options.height ? parseInt(options.height, 10) : 400;
    svgOutput = renderSVG({ expressions, width, height, range, xlabel, ylabel });
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
