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
  let colorsArg = null; // custom colors from CLI
  let lineStylesArg = null; // custom line styles from CLI
  let gridArg = false; // flag for gridlines
  let xlabelArg = null; // label for x-axis
  let ylabelArg = null; // label for y-axis
  let titleArg = null; // title for the plot

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
    } else if (args[i] === "--colors" && i + 1 < args.length) {
      colorsArg = args[i + 1].split(",").map((s) => s.trim());
      i++;
    } else if (args[i] === "--lineStyles" && i + 1 < args.length) {
      lineStylesArg = args[i + 1].split(",").map((s) => s.trim());
      i++;
    } else if (args[i] === "--grid") {
      gridArg = true;
    } else if (args[i] === "--xlabel" && i + 1 < args.length) {
      xlabelArg = args[i + 1];
      i++;
    } else if (args[i] === "--ylabel" && i + 1 < args.length) {
      ylabelArg = args[i + 1];
      i++;
    } else if (args[i] === "--title" && i + 1 < args.length) {
      titleArg = args[i + 1];
      i++;
    }
  }

  // Check if required parameters are provided
  if (!expressionArg || !rangeArg) {
    console.log(
      `Usage: node src/lib/main.js --expression <expression1[,expression2,...]> --range "x=start:end[,y=min:max]" [--file <filename>] [--width <number>] [--height <number>] [--padding <number>] [--points <number>] [--colors <color1,color2,...>] [--lineStyles <style1,style2,...>] [--grid] [--xlabel <label>] [--ylabel <label>] [--title <title>]`
    );
    return;
  }

  // Set default dimensions and allow overrides
  const svgWidth = widthArg || 500;
  const svgHeight = heightArg || 300;
  const padding = paddingArg || 20;

  // Parse range argument
  let xRange = null;
  let yRange = null;
  // Expected range formats: "x=start:end" and optionally "y=min:max"
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
  const exprStrings = expressionArg.split(",").map((s) => s.trim());
  // Use custom colors if provided, else default palette
  const colors = colorsArg && colorsArg.length > 0 ? colorsArg : ["blue", "green", "red", "orange", "purple"];
  // Use custom line styles if provided, else default to solid (empty string represents solid line)
  const lineStyles = lineStylesArg && lineStylesArg.length > 0 ? lineStylesArg : [];

  const compiledExpressions = [];
  const validExprStrings = [];

  for (const exprStr of exprStrings) {
    const parts = exprStr.split("=");
    if (parts.length < 2) {
      console.log('Invalid expression format. Expected format: "y=expression" for each expression.');
      return;
    }
    const expr = parts.slice(1).join("=");
    try {
      const compiled = compile(expr);
      compiledExpressions.push(compiled);
      validExprStrings.push(exprStr);
    } catch (err) {
      console.error("Error compiling expression:", exprStr, err);
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

  // Compute data points for each expression and collect all y values if yRange is not provided
  let allYValues = [];
  const expressionsData = compiledExpressions.map(compiled => {
    const dataPoints = xValues.map(x => {
      let y;
      try {
        y = compiled.evaluate({ x });
      } catch (err) {
        console.error("Error evaluating expression at x =", x, err);
        return;
      }
      if (!yRange) {
        allYValues.push(y);
      }
      return { x, y };
    });
    return dataPoints;
  });

  // If yRange not provided, compute dynamic range and update cy for each data point
  let dynamicYRange = false;
  if (!yRange) {
    dynamicYRange = true;
    const yMinComputed = Math.min(...allYValues);
    const yMaxComputed = Math.max(...allYValues);
    // Prevent division by zero
    const yRangeSpan = yMaxComputed - yMinComputed || 1;

    // Update each data point with computed cy using dynamic y range
    expressionsData.forEach(dataPoints => {
      dataPoints.forEach(point => {
        point.cy = padding + (1 - (point.y - yMinComputed) / yRangeSpan) * (svgHeight - 2 * padding);
      });
    });

    // If gridlines are enabled, update gridY based on dynamic y range
    if (gridArg) {
      var gridY = [];
      const numGridLines = 5;
      for (let i = 0; i < numGridLines; i++) {
        const normalized = i / (numGridLines - 1);
        const ySVG = padding + (1 - normalized) * (svgHeight - 2 * padding);
        gridY.push(ySVG);
      }
    }
  } else {
    // Use provided yRange to compute cy
    expressionsData.forEach(dataPoints => {
      dataPoints.forEach(point => {
        const [yMin, yMax] = yRange;
        point.cy = padding + (1 - (point.y - yMin) / (yMax - yMin)) * (svgHeight - 2 * padding);
      });
    });

    if (gridArg && yRange) {
      var gridY = [];
      const numGridLines = 5;
      const [yMin, yMax] = yRange;
      for (let i = 0; i < numGridLines; i++) {
        const normalized = i / (numGridLines - 1);
        const ySVG = padding + (1 - normalized) * (svgHeight - 2 * padding);
        gridY.push(ySVG);
      }
    }
  }

  // Calculate gridlines for x if grid is enabled
  let gridX = [];
  let gridXLeft = 50;
  let gridXRight = 50;
  if (gridArg) {
    gridX = xValues;
    gridXLeft = 50 + xRange[0] * 40;
    gridXRight = 50 + xRange[1] * 40;
  }

  // Create an SVG plot using an inlined ejs template with dynamic dimensions and multiple expressions support
  const svgTemplate = `<svg xmlns="http://www.w3.org/2000/svg" width="<%= svgWidth %>" height="<%= svgHeight %>">
  <rect width="100%" height="100%" fill="white"/>
  <% if (title) { %>
    <text x="50%" y="30" text-anchor="middle" font-size="20" font-weight="bold"><%= title %></text>
  <% } %>
  <% if (grid) { %>
    <% gridX.forEach(function(x) { %>
      <line x1="<%= 50 + x * 40 %>" y1="<%= padding %>" x2="<%= 50 + x * 40 %>" y2="<%= svgHeight - padding %>" stroke="#ccc" stroke-dasharray="2,2" />
    <% }); %>
    <% if (gridY && gridY.length > 0) { %>
      <% gridY.forEach(function(y) { %>
        <line x1="<%= gridXLeft %>" y1="<%= y %>" x2="<%= gridXRight %>" y2="<%= y %>" stroke="#ccc" stroke-dasharray="2,2" />
      <% }); %>
    <% } %>
  <% } %>
  <% expressions.forEach(function(expr, idx) { %>
    <text x="10" y="<%= 20 + idx * 20 %>" fill="<%= colors[idx % colors.length] %>">Plot <%= idx+1 %>: <%= expr %></text>
  <% }); %>
  <% expressionsData.forEach(function(data, idx) { %>
    <% if (data.length > 0) { %>
      <% let dash = ''; %>
      <% if (lineStyles && lineStyles[idx]) { %>
        <% let style = lineStyles[idx].toLowerCase(); %>
        <% if (style === 'dashed') { dash = 'stroke-dasharray="5,5"'; } else if (style === 'dotted') { dash = 'stroke-dasharray="1,5"'; } %>
      <% } %>
      <polyline fill="none" stroke="<%= colors[idx % colors.length] %>" stroke-width="2" <%- dash %> points="<%= data.map(point => (50 + point.x * 40) + ',' + point.cy).join(' ') %>" />
    <% } %>
    <% data.forEach(function(point) { %>
      <circle cx="<%= 50 + point.x * 40 %>" cy="<%= point.cy %>" r="3" fill="<%= colors[idx % colors.length] %>"/>
    <% }); %>
  <% }); %>
  <% if (xlabel) { %>
    <text x="<%= svgWidth/2 %>" y="<%= svgHeight - padding/4 %>" text-anchor="middle"><%= xlabel %></text>
  <% } %>
  <% if (ylabel) { %>
    <text x="<%= padding/4 %>" y="<%= svgHeight/2 %>" text-anchor="middle" transform="rotate(-90, <%= padding/4 %>, <%= svgHeight/2 %>)"><%= ylabel %></text>
  <% } %>
</svg>`;

  const svgContent = ejs.render(svgTemplate, {
    expressions: validExprStrings,
    expressionsData,
    svgWidth,
    svgHeight,
    colors,
    padding,
    lineStyles,
    grid: gridArg,
    gridX,
    gridY: gridArg ? gridY : [],
    gridXLeft,
    gridXRight,
    xlabel: xlabelArg,
    ylabel: ylabelArg,
    title: titleArg,
  });

  // Process file output if --file is provided
  if (fileArg) {
    const ext = fileArg.split(".").pop().toLowerCase();
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
  main(args).catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
