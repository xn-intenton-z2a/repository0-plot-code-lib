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
  let pointsArg = 10; // default number of data points

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
    } else if (args[i] === "--points" && i + 1 < args.length) {
      pointsArg = parseInt(args[i + 1], 10);
      i++;
    }
  }

  // Check if required parameters are provided
  if (!expressionArg || !rangeArg) {
    console.log(`Usage: node src/lib/main.js --expression <expression1[,expression2,...]> --range "x=start:end,y=min:max" [--file <filename>] [--width <number>] [--height <number>] [--padding <number>] [--points <number>]`);
    return;
  }

  // Set default dimensions and allow overrides
  let svgWidth = widthArg || 500;
  let svgHeight = heightArg || 300;
  let padding = paddingArg || 20;

  // Parse range argument
  let xRange = null;
  let yRange = null;
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

  // Parse multiple expressions separated by commas
  const exprStrings = expressionArg.split(",").map(s => s.trim());
  const colors = ['blue', 'green', 'red', 'orange', 'purple'];
  const compiledExpressions = [];
  const validExprStrings = [];

  for (const exprStr of exprStrings) {
    const parts = exprStr.split('=');
    if (parts.length < 2) {
      console.log('Invalid expression format. Expected format: "y=expression" for each expression.');
      return;
    }
    const expr = parts.slice(1).join('=');
    try {
      const compiled = compile(expr);
      compiledExpressions.push(compiled);
      validExprStrings.push(exprStr);
    } catch (err) {
      console.error('Error compiling expression:', exprStr, err);
      return;
    }
  }

  // Compute shared x values based on pointsArg
  const numPoints = pointsArg;
  const step = (xRange[1] - xRange[0]) / (numPoints - 1);
  const xValues = [];
  for (let i = 0; i < numPoints; i++) {
    const x = xRange[0] + i * step;
    xValues.push(x);
  }

  // For each expression, compute data points
  const expressionsData = [];
  for (const compiled of compiledExpressions) {
    const dataPoints = [];
    for (const x of xValues) {
      let y;
      try {
        y = compiled.evaluate({ x });
      } catch (err) {
        console.error('Error evaluating expression at x =', x, err);
        return;
      }
      let cy;
      if (yRange) {
        const [yMin, yMax] = yRange;
        const normalY = (y - yMin) / (yMax - yMin);
        cy = padding + (1 - normalY) * (svgHeight - 2 * padding);
      } else {
        cy = svgHeight / 2 - y * 40;
      }
      dataPoints.push({ x, y, cy });
    }
    expressionsData.push(dataPoints);
  }

  // Create an SVG plot using an inlined ejs template with dynamic dimensions and multiple expressions support
  const svgTemplate = `<svg xmlns="http://www.w3.org/2000/svg" width="<%= svgWidth %>" height="<%= svgHeight %>">
  <rect width="100%" height="100%" fill="white"/>
  <% expressions.forEach(function(expr, idx) { %>
    <text x="10" y="<%= 20 + idx * 20 %>" fill="<%= colors[idx % colors.length] %>">Plot <%= idx+1 %>: <%= expr %></text>
  <% }); %>
  <% expressionsData.forEach(function(data, idx) { %>
    <% if (data.length > 0) { %>
      <polyline fill="none" stroke="<%= colors[idx % colors.length] %>" stroke-width="2" points="<%=
        data.map(point => (50 + point.x * 40) + ',' + point.cy).join(' ') %>" />
    <% } %>
    <% data.forEach(function(point) { %>
      <circle cx="<%= 50 + point.x * 40 %>" cy="<%= point.cy %>" r="3" fill="<%= colors[idx % colors.length] %>"/>
    <% }); %>
  <% }); %>
</svg>`;

  const svgContent = ejs.render(svgTemplate, { expressions: validExprStrings, expressionsData, svgWidth, svgHeight, colors, padding });

  // Process file output if --file is provided
  if (fileArg) {
    const ext = fileArg.split('.').pop().toLowerCase();
    if (ext === "svg") {
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
