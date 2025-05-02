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

// Helper function to log error with timestamp
function logError(message) {
  console.error(`[${new Date().toISOString()}] Error: ${message}`);
}

export function renderSVG({ expressions, width, height, segmentHeight, range, xlabel, ylabel, textColor, lineColor, backgroundColor, autoSegment, annotation }) {
  const ns = "http://www.w3.org/2000/svg";
  let svgContent = "";
  let svgHeight;

  // Helper function to render a text element with optional range info.
  const renderExprText = (x, baseY, text, range) => {
    const yPos = range ? baseY - 10 : baseY;
    // If textColor is provided, add fill attribute
    const fillAttr = textColor ? ` fill=\"${textColor}\"` : "";
    let txt = `<text x=\"${x}\" y=\"${yPos}\" font-size=\"16\"${fillAttr}>${text.trim()}</text>`;
    if (range) {
      txt += `<text x=\"${x}\" y=\"${yPos + 20}\" font-size=\"12\" fill=\"${textColor ? textColor : 'gray'}\">Range: ${range}</text>`;
    }
    return txt;
  };

  // Helper function to append optional axis labels.
  const appendAxisLabels = (content, svgWidth, svgHeight, xlabel, ylabel) => {
    let result = content;
    const textFill = textColor ? ` fill=\"${textColor}\"` : "";
    if (xlabel) {
      result += `\n  <text x=\"${svgWidth / 2}\" y=\"${svgHeight - 10}\" text-anchor=\"middle\" font-size=\"14\"${textFill}>${xlabel.trim()}</text>`;
    }
    if (ylabel) {
      result += `\n  <text x=\"15\" y=\"${svgHeight / 2}\" text-anchor=\"middle\" transform=\"rotate(-90,15,${svgHeight / 2})\" font-size=\"14\"${textFill}>${ylabel.trim()}</text>`;
    }
    return result;
  };

  if (expressions.length > 1) {
    // Determine segment height based on --autoSegment flag
    let segHeight;
    // Use segmentHeight if provided, otherwise fallback to height
    if (typeof segmentHeight !== 'undefined') {
      segHeight = segmentHeight;
    } else {
      segHeight = height ? height : 100;
    }
    
    // autoSegment flag can be boolean true or string "true"
    const autoSeg = autoSegment === true || autoSegment === "true";
    if (autoSeg) {
      // Compute dynamic segment height using heuristic
      segHeight = expressions.reduce((maxH, expr) => {
        let computed = 100 + Math.floor(expr.length / 10) * 5;
        if (xlabel) computed += 20;
        if (ylabel) computed += 20;
        if (range) computed += 20;
        return Math.max(maxH, computed);
      }, 0);
    }
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

  // Build SVG content with optional background rectangle
  let backgroundRect = "";
  if (backgroundColor) {
    backgroundRect = `<rect width=\"${width}\" height=\"${svgHeight}\" fill=\"${backgroundColor}\"/>\n  `;
  }

  // Use provided lineColor for the line element if given, default to black
  const effectiveLineColor = lineColor ? lineColor : "black";

  // Add annotation if provided
  const annotationElement = annotation ? `<text x=\"${width - 100}\" y=\"20\" font-size=\"14\" fill=\"${textColor ? textColor : 'black'}\">${annotation}</text>\n  ` : "";

  const svg = `<svg xmlns=\"${ns}\" width=\"${width}\" height=\"${svgHeight}\">\n  ${backgroundRect}${annotationElement}${svgContent}\n  <line x1=\"0\" y1=\"0\" x2=\"${width}\" y2=\"${svgHeight}\" stroke=\"${effectiveLineColor}\" />\n</svg>`;
  return svg;
}

export async function main(args = []) {
  const options = parseArgs(args);

  if (!options.expression) {
    logError("--expression flag is required.");
    return;
  }

  // Validate axis labels
  if ("xlabel" in options && typeof options.xlabel === "string" && options.xlabel.trim() === "") {
    logError("--xlabel flag provided with empty value.");
    return;
  }
  if ("ylabel" in options && typeof options.ylabel === "string" && options.ylabel.trim() === "") {
    logError("--ylabel flag provided with empty value.");
    return;
  }
  if ("textColor" in options && typeof options.textColor === "string" && options.textColor.trim() === "") {
    logError("--textColor flag provided with empty value.");
    return;
  }
  if ("lineColor" in options && typeof options.lineColor === "string" && options.lineColor.trim() === "") {
    logError("--lineColor flag provided with empty value.");
    return;
  }
  if ("backgroundColor" in options && typeof options.backgroundColor === "string" && options.backgroundColor.trim() === "") {
    logError("--backgroundColor flag provided with empty value.");
    return;
  }

  // Validate numeric flags: width, height, segmentHeight (if provided)
  const numericFlags = ["width", "height", "segmentHeight"];
  for (const flag of numericFlags) {
    if (flag in options) {
      // Accept only positive integers
      if (!/^[1-9]\d*$/.test(options[flag])) {
        logError(`--${flag} must be a positive number.`);
        return;
      }
    }
  }

  // Validate PNG conversion parameters
  if (options.outputFormat && options.outputFormat.toLowerCase() === "png" && !options.file) {
    logError("--file flag is required when using png output format.");
    return;
  }

  // Split expressions by semicolon for multiple expressions
  const expressions = options.expression.split(";").map(e => e.trim()).filter(e => e);
  const width = options.width ? parseInt(options.width, 10) : 640;
  const range = options.range ? options.range : null;
  const xlabel = options.xlabel ? options.xlabel : null;
  const ylabel = options.ylabel ? options.ylabel : null;
  const textColor = options.textColor ? options.textColor : null;
  const lineColor = options.lineColor ? options.lineColor : null;
  const backgroundColor = options.backgroundColor ? options.backgroundColor : null;
  const annotation = options.annotation ? options.annotation : null;
  const autoSegment = options.autoSegment === true || options.autoSegment === "true";
  let svgOutput;

  if (expressions.length > 1) {
    let segHeight;
    // If segmentHeight is provided, use it; otherwise fallback to height or default 100
    if (options.segmentHeight) {
      segHeight = parseInt(options.segmentHeight, 10);
    } else {
      segHeight = options.height ? parseInt(options.height, 10) : 100;
    }

    if (autoSegment) {
      segHeight = expressions.reduce((maxH, expr) => {
        let computed = 100 + Math.floor(expr.length / 10) * 5;
        if (xlabel) computed += 20;
        if (ylabel) computed += 20;
        if (range) computed += 20;
        return Math.max(maxH, computed);
      }, 0);
    }
    
    svgOutput = renderSVG({ expressions, width, segmentHeight: segHeight, range, xlabel, ylabel, textColor, lineColor, backgroundColor, autoSegment, annotation });
  } else {
    const heightVal = options.height ? parseInt(options.height, 10) : 400;
    svgOutput = renderSVG({ expressions, width, height: heightVal, range, xlabel, ylabel, textColor, lineColor, backgroundColor, annotation });
  }

  if (options.outputFormat && options.outputFormat.toLowerCase() === "png") {
    try {
      const pngBuffer = await sharp(Buffer.from(svgOutput)).png().toBuffer();
      fs.writeFileSync(options.file, pngBuffer);
      console.log(`PNG saved to ${options.file}`);
    } catch (error) {
      logError(`PNG conversion failed: ${error.message}`);
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
