#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import fs from "fs";
import { compile } from "mathjs";
import sharp from "sharp";
import ejs from "ejs";

// Helper function to parse CLI arguments
function parseCLIArgs(args) {
  const params = {
    expression: null,
    range: null,
    file: null,
    dataFile: null,
    width: null,
    height: null,
    padding: null,
    points: 10,
    colors: null,
    lineStyles: null,
    grid: false,
    xlabel: null,
    ylabel: null,
    title: null,
    logYAxis: false,
    lineWidth: 2,
    legendPosition: null,
    drawMarkers: true,
    bgColor: null,
    outputJson: false,
    tooltip: false
  };
  let i = 0;
  while (i < args.length) {
    const arg = args[i];
    switch (arg) {
      case "--expression":
        params.expression = args[++i];
        break;
      case "--range":
        params.range = args[++i];
        break;
      case "--file":
        params.file = args[++i];
        break;
      case "--dataFile":
        params.dataFile = args[++i];
        break;
      case "--width":
        params.width = parseInt(args[++i], 10);
        break;
      case "--height":
        params.height = parseInt(args[++i], 10);
        break;
      case "--padding":
        params.padding = parseInt(args[++i], 10);
        break;
      case "--points":
        params.points = parseInt(args[++i], 10);
        break;
      case "--colors":
        params.colors = args[++i].split(",").map((s) => s.trim());
        break;
      case "--lineStyles":
        params.lineStyles = args[++i].split(",").map((s) => s.trim());
        break;
      case "--grid":
        params.grid = true;
        break;
      case "--xlabel":
        params.xlabel = args[++i];
        break;
      case "--ylabel":
        params.ylabel = args[++i];
        break;
      case "--title":
        params.title = args[++i];
        break;
      case "--logYAxis":
        params.logYAxis = true;
        break;
      case "--lineWidth":
        params.lineWidth = parseFloat(args[++i]);
        break;
      case "--legendPosition":
        params.legendPosition = args[++i].toLowerCase();
        break;
      case "--noMarkers":
        params.drawMarkers = false;
        break;
      case "--bgColor":
        params.bgColor = args[++i];
        break;
      case "--json":
        params.outputJson = true;
        break;
      case "--tooltip":
        params.tooltip = true;
        break;
      default:
        break;
    }
    i++;
  }
  return params;
}

export async function main(args = process.argv.slice(2)) {
  const {
    expression,
    range,
    file: fileArg,
    dataFile,
    width,
    height,
    padding,
    points: pointsArg,
    colors: colorsArg,
    lineStyles: lineStylesArg,
    grid: gridArg,
    xlabel: xlabelArg,
    ylabel: ylabelArg,
    title: titleArg,
    logYAxis: logYAxisArg,
    lineWidth: lineWidthArg,
    legendPosition: legendPositionArg,
    drawMarkers,
    bgColor: bgColorArg,
    outputJson,
    tooltip: tooltipArg
  } = parseCLIArgs(args);

  const svgWidth = width || 500;
  const svgHeight = height || 300;
  const pad = padding || 20;

  let expressionsData = [];
  let validExprStrings = [];
  let xRange = null;
  let yRange = null;
  let gridX = [];
  let gridXLeft = 50;
  let gridXRight = 50;

  // If dataFile is provided, use CSV data input and bypass expression and range parsing
  if (dataFile) {
    let csvContent;
    try {
      csvContent = fs.readFileSync(dataFile, "utf8");
    } catch (err) {
      console.error(`Error reading CSV file: ${dataFile}`, err);
      return;
    }
    const lines = csvContent.split(/\r?\n/).filter(line => line.trim() !== '');
    const pointsData = [];
    let startIndex = 0;
    // Check if header exists by trying to parse first value
    const firstLineCols = lines[0].split(",");
    if (isNaN(parseFloat(firstLineCols[0]))) {
      startIndex = 1; // skip header
    }
    for (let i = startIndex; i < lines.length; i++) {
      const cols = lines[i].split(",").map(s => s.trim());
      if (cols.length < 2) continue;
      const xVal = parseFloat(cols[0]);
      const yVal = parseFloat(cols[1]);
      if (isNaN(xVal) || isNaN(yVal)) {
        console.error(`Invalid numeric data at line ${i + 1}: ${lines[i]}`);
        return;
      }
      pointsData.push({ x: xVal, y: yVal });
    }
    if (pointsData.length === 0) {
      console.error('No valid data points found in CSV file.');
      return;
    }
    // Compute x and y ranges from CSV data
    const xValuesFromCSV = pointsData.map(point => point.x);
    const yValuesFromCSV = pointsData.map(point => point.y);
    xRange = [Math.min(...xValuesFromCSV), Math.max(...xValuesFromCSV)];
    yRange = [Math.min(...yValuesFromCSV), Math.max(...yValuesFromCSV)];
    expressionsData.push(pointsData);
    validExprStrings.push('CSV Data');

    // If grid is enabled, generate evenly spaced x-gridlines
    if (gridArg) {
      const numGridLines = 5;
      gridX = [];
      for (let i = 0; i < numGridLines; i++) {
        const xVal = xRange[0] + i * ((xRange[1] - xRange[0]) / (numGridLines - 1));
        gridX.push(xVal);
      }
      gridXLeft = 50 + xRange[0] * 40;
      gridXRight = 50 + xRange[1] * 40;
    }
  } else {
    // Original logic for expressions
    if (!expression || !range) {
      console.log(
        `Usage: node src/lib/main.js --expression <expression1[,expression2,...]> --range "x=start:end[,y=min:max]" [--file <filename>] [--dataFile <csv_filepath>] [--width <number>] [--height <number>] [--padding <number>] [--points <number>] [--colors <color1,color2,...>] [--lineStyles <style1,style2,...>] [--grid] [--xlabel <label>] [--ylabel <label>] [--title <title>] [--logYAxis] [--lineWidth <number>] [--legendPosition <top|bottom|left|right>] [--noMarkers] [--bgColor <color>] [--json]`
      );
      return;
    }
    range.split(",").forEach((part) => {
      const trimmed = part.trim();
      if (trimmed.startsWith("x=")) {
        const xVals = trimmed.substring(2).split(":");
        if (xVals.length === 2) {
          xRange = [parseFloat(xVals[0]), parseFloat(xVals[1])];
        }
      } else if (trimmed.startsWith("y=")) {
        const yVals = trimmed.substring(2).split(":");
        if (yVals.length === 2) {
          yRange = [parseFloat(yVals[0]), parseFloat(yVals[1])];
        }
      }
    });

    if (!xRange) {
      console.log('Invalid range provided. Make sure to include x range in the format "x=start:end".');
      return;
    }

    const exprStrings = expression.split(",").map((s) => s.trim());
    const defaultColors = ["blue", "green", "red", "orange", "purple"];
    const colors = colorsArg && colorsArg.length > 0 ? colorsArg : defaultColors;
    const lineStyles = lineStylesArg && lineStylesArg.length > 0 ? lineStylesArg : [];

    const compiledExpressions = [];
    for (const exprStr of exprStrings) {
      const parts = exprStr.split("=");
      if (parts.length < 2) {
        console.log('Invalid expression format. Expected format: "y=expression" for each expression.');
        return;
      }
      const expr = parts.slice(1).join("=");
      try {
        compiledExpressions.push(compile(expr));
        validExprStrings.push(exprStr);
      } catch (err) {
        console.error("Error compiling expression:", exprStr, err);
        return;
      }
    }

    const numPoints = pointsArg;
    const step = (xRange[1] - xRange[0]) / (numPoints - 1);
    const xValues = [];
    for (let i = 0; i < numPoints; i++) {
      xValues.push(xRange[0] + i * step);
    }

    expressionsData = compiledExpressions.map((compiled) =>
      xValues
        .map((x) => {
          try {
            const y = compiled.evaluate({ x });
            return { x, y };
          } catch (error) {
            console.error("Error evaluating expression at x =", x, error);
            return null;
          }
        })
        .filter((point) => point !== null)
    );

    // If grid is enabled, use xValues for grid lines
    if (gridArg) {
      gridX = xValues;
      gridXLeft = 50 + xRange[0] * 40;
      gridXRight = 50 + xRange[1] * 40;
    }
  }

  const allYValues = expressionsData.flat().map((point) => point.y);

  // Handle logarithmic scaling pre-check
  if (logYAxisArg) {
    if (yRange) {
      const [yMin, yMax] = yRange;
      if (yMin <= 0 || yMax <= 0) {
        console.error("Error: Invalid y-range for logarithmic scaling. Boundaries must be strictly positive.");
        return;
      }
    } else {
      const yMinComputed = Math.min(...allYValues);
      if (yMinComputed <= 0) {
        console.error("Error: Cannot apply logarithmic scaling with non-positive y values computed.");
        return;
      }
    }
  }

  let gridY = [];
  // Determine y scaling values
  let yMinVal, yMaxVal;
  if (yRange) {
    yMinVal = yRange[0];
    yMaxVal = yRange[1];
  } else {
    yMinVal = Math.min(...allYValues);
    yMaxVal = Math.max(...allYValues);
  }

  if (logYAxisArg) {
    // Apply logarithmic scaling; all y values must be positive
    expressionsData.forEach((dataPoints) => {
      dataPoints.forEach((point) => {
        if (point.y <= 0) {
          console.error("Error: Encountered non-positive y value during logarithmic scaling.");
          return;
        }
        const normalized = (Math.log(point.y) - Math.log(yMinVal)) / (Math.log(yMaxVal) - Math.log(yMinVal));
        point.cy = pad + (1 - normalized) * (svgHeight - 2 * pad);
      });
    });
    if (gridArg) {
      const numGridLines = 5;
      for (let i = 0; i < numGridLines; i++) {
        const normalized = i / (numGridLines - 1);
        gridY.push(pad + (1 - normalized) * (svgHeight - 2 * pad));
      }
    }
  } else {
    // Linear scaling
    if (!yRange) {
      expressionsData.forEach((dataPoints) => {
        dataPoints.forEach((point) => {
          point.cy = pad + (1 - (point.y - yMinVal) / ((yMaxVal - yMinVal) || 1)) * (svgHeight - 2 * pad);
        });
      });
      if (gridArg) {
        const numGridLines = 5;
        for (let i = 0; i < numGridLines; i++) {
          const normalized = i / (numGridLines - 1);
          gridY.push(pad + (1 - normalized) * (svgHeight - 2 * pad));
        }
      }
    } else {
      expressionsData.forEach((dataPoints) => {
        dataPoints.forEach((point) => {
          const [yMin, yMax] = yRange;
          point.cy = pad + (1 - (point.y - yMin) / (yMax - yMin)) * (svgHeight - 2 * pad);
        });
      });
      if (gridArg) {
        const numGridLines = 5;
        const [yMin, yMax] = yRange;
        for (let i = 0; i < numGridLines; i++) {
          const normalized = i / (numGridLines - 1);
          gridY.push(pad + (1 - normalized) * (svgHeight - 2 * pad));
        }
      }
    }
  }

  // If --json flag is provided, output JSON data and exit
  if (outputJson) {
    const outputData = {
      expressions: validExprStrings,
      expressionsData,
      xRange,
      yRange
    };
    console.log(JSON.stringify(outputData, null, 2));
    return;
  }

  // EJS template with configurable legend placement
  const svgTemplate = String.raw`<svg xmlns="http://www.w3.org/2000/svg" width="<%= svgWidth %>" height="<%= svgHeight %>">
  <rect width="100%" height="100%" fill="<%= bgColor %>"/>
  <% if (title) { %>
    <text x="50%" y="30" text-anchor="middle" font-size="20" font-weight="bold"><%= title %></text>
  <% } %>
  <% if (grid) { %>
    <% gridX.forEach(function(x) { %>
      <line x1="<%= 50 + x * 40 %>" y1="<%= pad %>" x2="<%= 50 + x * 40 %>" y2="<%= svgHeight - pad %>" stroke="#ccc" stroke-dasharray="2,2" />
    <% }); %>
    <% if (gridY.length > 0) { %>
      <% gridY.forEach(function(y) { %>
        <line x1="<%= gridXLeft %>" y1="<%= y %>" x2="<%= gridXRight %>" y2="<%= y %>" stroke="#ccc" stroke-dasharray="2,2" />
      <% }); %>
    <% } %>
  <% } %>
  <% // Configurable Legend Rendering %>
  <%
    let legendX, legendYStart;
    const numLegends = expressions.length;
    if (legendPosition === 'bottom') {
      legendX = 10;
      legendYStart = svgHeight - pad - (numLegends * 20) + 20;
    } else if (legendPosition === 'right') {
      legendX = svgWidth - pad - 100;
      legendYStart = 20;
    } else if (legendPosition === 'left') {
      legendX = pad;
      legendYStart = 20;
    } else { // default top
      legendX = 10;
      legendYStart = 20;
    }
  %>
  <% expressions.forEach(function(expr, idx) { %>
    <text x="<%= legendX %>" y="<%= legendYStart + idx * 20 %>" fill="<%= colors[idx % colors.length] %>">Plot <%= idx+1 %>: <%= expr %></text>
  <% }); %>
  <% expressionsData.forEach(function(data, idx) { %>
    <% if (data.length > 0) { %>
      <% let dash = ''; %>
      <% if (lineStyles && lineStyles[idx]) { %>
        <% let style = lineStyles[idx].toLowerCase(); %>
        <% if (style === 'dashed') { dash = 'stroke-dasharray="5,5"'; } else if (style === 'dotted') { dash = 'stroke-dasharray="1,5"'; } %>
      <% } %>
      <polyline fill="none" stroke="<%= colors[idx % colors.length] %>" stroke-width="<%= lineWidth %>" <%- dash %> points="<%= data.map(point => (50 + point.x * 40) + ',' + point.cy).join(' ') %>" />
    <% } %>
    <% if (drawMarkers) { %>
      <% data.forEach(function(point) { %>
        <circle cx="<%= 50 + point.x * 40 %>" cy="<%= point.cy %>" r="3" fill="<%= colors[idx % colors.length] %>">
          <% if (tooltip) { %>
            <title>x: <%= point.x %>, y: <%= point.y %></title>
          <% } %>
        </circle>
      <% }); %>
    <% } %>
  <% }); %>
  <% if (xlabel) { %>
    <text x="<%= svgWidth/2 %>" y="<%= svgHeight - pad/4 %>" text-anchor="middle"><%= xlabel %></text>
  <% } %>
  <% if (ylabel) { %>
    <text x="<%= pad/4 %>" y="<%= svgHeight/2 %>" text-anchor="middle" transform="rotate(-90, <%= pad/4 %>, <%= svgHeight/2 %>)"><%= ylabel %></text>
  <% } %>
</svg>`;

  const colors = colorsArg && colorsArg.length > 0 ? colorsArg : ["blue", "green", "red", "orange", "purple"];
  
  const svgContent = ejs.render(svgTemplate, {
    expressions: validExprStrings,
    expressionsData,
    svgWidth,
    svgHeight,
    colors,
    pad,
    lineStyles: lineStylesArg,
    grid: gridArg,
    gridX,
    gridY,
    gridXLeft,
    gridXRight,
    xlabel: xlabelArg,
    ylabel: ylabelArg,
    title: titleArg,
    lineWidth: lineWidthArg,
    legendPosition: legendPositionArg || 'top',
    drawMarkers,
    bgColor: bgColorArg || 'white',
    tooltip: tooltipArg
  });

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
