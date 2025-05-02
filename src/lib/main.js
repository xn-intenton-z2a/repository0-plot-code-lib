#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import fs from "fs";
import sharp from "sharp";

/**
 * Helper function to convert kebab-case string to camelCase.
 * Example: "output-format" => "outputFormat"
 */
function kebabToCamel(str) {
  return str
    .split("-")
    .map((word, index) => {
      return index === 0 ? word : word[0].toUpperCase() + word.slice(1);
    })
    .join("");
}

/**
 * Parses command-line arguments into an options object.
 * Flags in the form --flagName are transformed into camelCase properties.
 */
function parseArgs(args) {
  const options = {};
  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith("--")) {
      // Remove leading '--' and convert to camelCase
      const key = kebabToCamel(args[i].substring(2));
      let value = true;
      // Check if the next argument is a value (and doesn't start with --)
      if (i + 1 < args.length && !args[i + 1].startsWith("--")) {
        value = args[i + 1];
        i++;
      }
      options[key] = value;
    }
  }
  return options;
}

/**
 * Logs error messages with a timestamp.
 */
function logError(message) {
  console.error(`[${new Date().toISOString()}] Error: ${message}`);
}

/**
 * Validates that an option value is not an empty string.
 * Logs an error if the option exists and has an empty string value.
 */
function validateOptionNotEmpty(options, optionName) {
  if (optionName in options && typeof options[optionName] === "string" && options[optionName].trim() === "") {
    logError(`--${optionName} flag provided with empty value.`);
    return false;
  }
  return true;
}

/**
 * Computes the auto segment height based on the expression and provided display flags.
 * Base height is calculated as: 100 + 5 * floor(expression length / 10).
 * Each additional flag (--xlabel, --ylabel, --range, --annotation, --title) adds 20.
 */
function computeAutoSegmentHeight(expr, flags) {
  let base = 100 + Math.floor(expr.length / 10) * 5;
  if (flags.xlabel) base += 20;
  if (flags.ylabel) base += 20;
  if (flags.range) base += 20;
  if (flags.annotation) base += 20;
  if (flags.title) base += 20;
  return base;
}

export function renderSVG({ expressions, width, height, segmentHeight, range, xlabel, ylabel, textColor, lineColor, backgroundColor, autoSegment, annotation, title }) {
  const ns = "http://www.w3.org/2000/svg";
  let svgContent = "";
  let svgHeight;

  // Helper function to render a text element with optional range info.
  const renderExprText = (x, baseY, text, range) => {
    const yPos = range ? baseY - 10 : baseY;
    // Add fill attribute if textColor is provided
    const fillAttr = textColor ? ` fill="${textColor}"` : "";
    let txt = `<text x="${x}" y="${yPos}" font-size="16"${fillAttr}>${text.trim()}</text>`;
    if (range) {
      txt += `<text x="${x}" y="${yPos + 20}" font-size="12" fill="${textColor ? textColor : 'gray'}">Range: ${range}</text>`;
    }
    return txt;
  };

  // Append axis labels if provided.
  const appendAxisLabels = (content, svgWidth, svgHeight, xlabel, ylabel) => {
    let result = content;
    const textFill = textColor ? ` fill="${textColor}"` : "";
    if (xlabel) {
      result += `\n  <text x="${svgWidth / 2}" y="${svgHeight - 10}" text-anchor="middle" font-size="14"${textFill}>${xlabel.trim()}</text>`;
    }
    if (ylabel) {
      result += `\n  <text x="15" y="${svgHeight / 2}" text-anchor="middle" transform="rotate(-90,15,${svgHeight / 2})" font-size="14"${textFill}>${ylabel.trim()}</text>`;
    }
    return result;
  };

  let computedSegmentHeight;
  if (expressions.length > 1) {
    if ((autoSegment === true || autoSegment === "true") && typeof segmentHeight === "undefined") {
      computedSegmentHeight = expressions.reduce((maxH, expr) => {
        const computed = computeAutoSegmentHeight(expr, { xlabel, ylabel, range, annotation, title });
        return Math.max(maxH, computed);
      }, 0);
    } else {
      computedSegmentHeight = typeof segmentHeight !== "undefined" ? segmentHeight : (height ? height : 100);
    }
    svgHeight = computedSegmentHeight * expressions.length;
    expressions.forEach((expr, index) => {
      const baseY = index * computedSegmentHeight + computedSegmentHeight / 2;
      svgContent += `<g id="expr-${index + 1}">` + renderExprText(10, baseY, expr, range) + `</g>`;
    });
  } else {
    // Single expression case: use height or default to 400.
    svgHeight = height || 400;
    const baseY = svgHeight / 2;
    svgContent = `<g id="expr-1">` + renderExprText(10, baseY, expressions[0], range) + `</g>`;
  }

  svgContent = appendAxisLabels(svgContent, width, svgHeight, xlabel, ylabel);

  // Build SVG with optional background rectangle.
  let backgroundRect = "";
  if (backgroundColor) {
    backgroundRect = `<rect width="${width}" height="${svgHeight}" fill="${backgroundColor}"/>
  `;
  }

  // Determine effective line color.
  const effectiveLineColor = lineColor ? lineColor : "black";

  // Add title element if provided, rendered at top center.
  const titleElement = title ? `<text x="${width / 2}" y="30" text-anchor="middle" font-size="18" fill="${textColor ? textColor : 'black'}">${title.trim()}</text>
  ` : "";

  // Adjust annotation element position if title is present to avoid overlap
  const annotationElement = annotation ? `<text x="${width - 100}" y="${title ? 50 : 20}" font-size="14" fill="${textColor ? textColor : 'black'}">${annotation}</text>
  ` : "";

  const svg = `<svg xmlns="${ns}" width="${width}" height="${svgHeight}" viewBox="0 0 ${width} ${svgHeight}">
  ${backgroundRect}${titleElement}${annotationElement}${svgContent}
  <line x1="0" y1="0" x2="${width}" y2="${svgHeight}" stroke="${effectiveLineColor}" />
</svg>`;
  return svg;
}

export async function main(args = []) {
  const options = parseArgs(args);

  // Validate required flag --expression.
  if (!options.expression) {
    logError("--expression flag is required.");
    return;
  }

  // Validate that certain options are not provided as empty strings.
  const flagsToValidate = ["xlabel", "ylabel", "textColor", "lineColor", "backgroundColor"];
  for (const flag of flagsToValidate) {
    if (!validateOptionNotEmpty(options, flag)) return;
  }

  // Validate numeric flags: width, height, segmentHeight.
  const numericFlags = ["width", "height", "segmentHeight"];
  for (const flag of numericFlags) {
    if (flag in options) {
      if (!/^[1-9]\d*$/.test(options[flag])) {
        logError(`--${flag} must be a positive number.`);
        return;
      }
    }
  }

  // For PNG conversion, ensure --file is provided.
  if (options.outputFormat && options.outputFormat.toLowerCase() === "png" && !options.file) {
    logError("--file flag is required when using png output format.");
    return;
  }

  // Split expressions by semicolon, trim spaces.
  const expressions = options.expression.split(";").map(e => e.trim()).filter(e => e);
  const width = options.width ? parseInt(options.width, 10) : 640;
  const range = options.range ? options.range : null;
  const xlabel = options.xlabel ? options.xlabel : null;
  const ylabel = options.ylabel ? options.ylabel : null;
  const textColor = options.textColor ? options.textColor : null;
  const lineColor = options.lineColor ? options.lineColor : null;
  const backgroundColor = options.backgroundColor ? options.backgroundColor : null;
  const annotation = options.annotation ? options.annotation : null;
  const title = options.title ? options.title : null;
  const autoSegment = options.autoSegment === true || options.autoSegment === "true";
  let svgOutput;
  
  if (expressions.length > 1) {
    let segHeight;
    // If explicit segmentHeight is provided, use it; else if autoSegment enabled compute dynamically; otherwise fallback to --height or default 100.
    if (options.segmentHeight) {
      segHeight = parseInt(options.segmentHeight, 10);
    } else if (autoSegment) {
      segHeight = expressions.reduce((maxH, expr) => Math.max(maxH, computeAutoSegmentHeight(expr, { xlabel, ylabel, range, annotation, title })), 0);
    } else {
      segHeight = options.height ? parseInt(options.height, 10) : 100;
    }

    svgOutput = renderSVG({ expressions, width, segmentHeight: segHeight, range, xlabel, ylabel, textColor, lineColor, backgroundColor, autoSegment, annotation, title });
  } else {
    const heightVal = options.height ? parseInt(options.height, 10) : 400;
    svgOutput = renderSVG({ expressions, width, height: heightVal, range, xlabel, ylabel, textColor, lineColor, backgroundColor, annotation, title });
  }

  // Handle PNG conversion if outputFormat is png, otherwise print SVG.
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
