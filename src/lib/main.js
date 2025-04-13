#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import fs from "fs";
import path from "path";
import { compile } from "mathjs";
import sharp from "sharp";
import ejs from "ejs";

export async function main(args = process.argv.slice(2)) {
  // Simple argument parser
  let expressionArg = null;
  let rangeArg = null;
  let fileArg = null;
  let widthArg = null;
  let heightArg = null;
  let paddingArg = null;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--expression" && i + 1 < args.length) {
      expressionArg = args[i + 1];
      i++;
    } else if (args[i] === "--range" && i + 1 < args.length) {
      rangeArg = args[i + 1];
      i++;
    } else if (args[i] === "--file" && i + 1 < args.length) {
      fileArg = args[i + 1];
      i++;
    } else if (args[i] === "--width" && i + 1 < args.length) {
      widthArg = parseInt(args[i + 1], 10);
      i++;
    } else if (args[i] === "--height" && i + 1 < args.length) {
      heightArg = parseInt(args[i + 1], 10);
      i++;
    } else if (args[i] === "--padding" && i + 1 < args.length) {
      paddingArg = parseInt(args[i + 1], 10);
      i++;
    }
  }

  // Check if required parameters are provided
  if (!expressionArg || !rangeArg) {
    console.log(`Usage: node src/lib/main.js --expression <expression> --range "x=start:end,y=min:max" [--file <filename>] [--width <number>] [--height <number>] [--padding <number>]`);
    return;
  }

  // Set default dimensions and allow overrides
  let svgWidth = widthArg || 500;
  let svgHeight = heightArg || 300;
  let padding = paddingArg || 20;

  // Compute time series data if expression and range are provided
  let dataPoints = [];
  let xRange = null;
  let yRange = null; // new y-range support

  // Expected range format: "x=start:end,y=min:max"
  const rangeParts = rangeArg.split(",");
  for (const part of rangeParts) {
    const trimmed = part.trim();
    if (trimmed.startsWith("x=")) {
      const xVals = trimmed.substring(2).split(":");
      if (xVals.length === 2) {
        const start = parseFloat(xVals[0]);
        const end = parseFloat(xVals[1]);
        xRange = [start, end];
      }
    } else if (trimmed.startsWith("y=")) {
      const yVals = trimmed.substring(2).split(":");
      if (yVals.length === 2) {
        const yMin = parseFloat(yVals[0]);
        const yMax = parseFloat(yVals[1]);
        yRange = [yMin, yMax];
      }
    }
  }

  if (!xRange) {
    console.log('Invalid range provided. Make sure to include x range in the format "x=start:end".');
    return;
  }

  // Evaluate the expression. Expect expression format: "y=sin(x)" etc.
  const exprParts = expressionArg.split('=');
  if (exprParts.length < 2) {
    console.log('Invalid expression format. Expected format: "y=expression"');
    return;
  }
  const expr = exprParts.slice(1).join('=');
  let compiled;
  try {
    compiled = compile(expr);
  } catch (err) {
    console.error('Error compiling expression:', err);
    return;
  }

  // Compute 10 data points along the x-range
  const step = (xRange[1] - xRange[0]) / 9;
  for (let i = 0; i < 10; i++) {
    const x = xRange[0] + i * step;
    let y;
    try {
      y = compiled.evaluate({ x });
    } catch (err) {
      console.error('Error evaluating expression at x =', x, err);
      return;
    }
    dataPoints.push({ x, y });
  }

  // Compute y coordinate for each data point for plotting
  dataPoints = dataPoints.map(point => {
    let cy;
    if (yRange) {
      const [yMin, yMax] = yRange;
      // Normalize point.y according to provided y-range
      const normalY = (point.y - yMin) / (yMax - yMin);
      // Invert y-axis: yMin -> bottom, yMax -> top
      cy = padding + (1 - normalY) * (svgHeight - 2 * padding);
    } else {
      // Fallback scaling
      cy = svgHeight / 2 - point.y * 40;
    }
    return { ...point, cy };
  });

  // Create an SVG plot using an inlined ejs template with dynamic dimensions
  // The SVG includes both a polyline that connects data points and circles at each point
  const svgTemplate = `<svg xmlns="http://www.w3.org/2000/svg" width="<%= svgWidth %>" height="<%= svgHeight %>">
  <rect width="100%" height="100%" fill="white"/>
  <text x="10" y="20" fill="black">Plot: <%= expression %></text>
  <% if (data.length > 0) { %>
    <polyline fill="none" stroke="blue" stroke-width="2" points="<%=
      data.map(point => (50 + point.x * 40) + "," + point.cy).join(' ') %>" />
  <% } %>
  <% data.forEach(function(point) { %>
    <circle cx="<%= 50 + point.x * 40 %>" cy="<%= point.cy %>" r="3" fill="red"/>
  <% }) %>
</svg>`;

  const svgContent = ejs.render(svgTemplate, { expression: expressionArg, data: dataPoints, svgWidth, svgHeight });

  // Process file output if --file is provided
  if (fileArg) {
    const ext = fileArg.split('.').pop().toLowerCase();
    if (ext === "svg") {
      // Write SVG file
      fs.writeFileSync(fileArg, svgContent);
      console.log(`SVG plot written to ${fileArg}`);
    } else if (ext === "png") {
      try {
        const dataBuffer = await sharp(Buffer.from(svgContent)).png().toBuffer();
        fs.writeFileSync(fileArg, dataBuffer);
        console.log(`PNG plot written to ${fileArg}`);
      } catch (err) {
        console.error("Error converting SVG to PNG:", err);
      }
    } else {
      console.error("Unsupported file extension. Please use .svg or .png");
    }
  } else {
    console.log(svgContent);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  main(args).catch(err => {
    console.error(err);
    process.exit(1);
  });
}
