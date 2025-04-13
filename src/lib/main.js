#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import fs from "fs";
import path from "path";
import { compile } from "mathjs";
import sharp from "sharp";
import ejs from "ejs";

export function main(args = process.argv.slice(2)) {
  // Simple argument parser
  let expressionArg = null;
  let rangeArg = null;
  let fileArg = null;

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
    }
  }

  // If no actionable arguments provided, print args and exit
  if (!expressionArg && !rangeArg && !fileArg) {
    console.log(`Run with: ${JSON.stringify(args)}`);
    return;
  }

  // Compute time series data if expression and range are provided
  let dataPoints = [];
  let xRange = null;
  let yRange = null; // new y-range support

  if (expressionArg && rangeArg) {
    // Expect range format: "x=start:end,y=min:max"
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

    if (xRange) {
      // Assume expression format: "y=sin(x)" etc.
      const expr = expressionArg.split('=')[1];
      const compiled = compile(expr);
      const step = (xRange[1] - xRange[0]) / 9;
      for (let i = 0; i < 10; i++) {
        const x = xRange[0] + i * step;
        const y = compiled.evaluate({ x });
        dataPoints.push({ x, y });
      }
    }
  }

  // Define SVG dimensions and padding
  const svgWidth = 500;
  const svgHeight = 300;
  const padding = 20;

  // Compute y coordinate for each data point
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
      cy = 150 - point.y * 40;
    }
    return { ...point, cy };
  });

  // Create an SVG plot using an inlined ejs template
  const svgTemplate = `<svg xmlns="http://www.w3.org/2000/svg" width="500" height="300">
  <rect width="100%" height="100%" fill="white"/>
  <text x="10" y="20" fill="black">Plot: <%= expression %></text>
  <% data.forEach(function(point) { %>
    <circle cx="<%= 50 + point.x * 40 %>" cy="<%= point.cy %>" r="3" fill="red"/>
  <% }) %>
</svg>`;

  const svgContent = ejs.render(svgTemplate, { expression: expressionArg || "N/A", data: dataPoints });

  // Process file output if --file is provided
  if (fileArg) {
    const ext = fileArg.split('.').pop().toLowerCase();
    if (ext === "svg") {
      // Write SVG file
      fs.writeFileSync(fileArg, svgContent);
      console.log(`SVG plot written to ${fileArg}`);
    } else if (ext === "png") {
      // Convert SVG to PNG using sharp
      sharp(Buffer.from(svgContent))
        .png()
        .toBuffer()
        .then(dataBuffer => {
          fs.writeFileSync(fileArg, dataBuffer);
          console.log(`PNG plot written to ${fileArg}`);
        })
        .catch(err => {
          console.error("Error converting SVG to PNG:", err);
        });
    } else {
      console.error("Unsupported file extension. Please use .svg or .png");
    }
  } else {
    console.log(svgContent);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  main(args);
}
