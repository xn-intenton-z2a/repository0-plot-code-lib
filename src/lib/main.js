#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import fs from "fs";
import sharp from "sharp";
import yaml from "js-yaml";
import PDFDocument from "pdfkit";
import svgToPdf from "svg-to-pdfkit";

// Generates time series data from a mathematical expression and range
export function generateTimeSeriesData(expression, rangeStr, numPoints = 10, customFunctions = {}) {
  // Supports expressions such as 'y=sin(x)', etc. and now also piecewise expressions
  // Expected range format: "x=start:end"

  const matchRange = rangeStr.match(/^x=([\-\d\.]+):([\-\d\.]+)$/);
  if (!matchRange) {
    throw new Error("Invalid range format. Expected format: x=start:end");
  }
  const start = parseFloat(matchRange[1]);
  const end = parseFloat(matchRange[2]);

  const step = (end - start) / (numPoints - 1);
  const data = [];

  // Check for piecewise expression support
  if (expression.startsWith("piecewise:")) {
    const piecewiseStr = expression.slice("piecewise:".length).trim();
    const segments = piecewiseStr.split(';').map(seg => seg.trim()).filter(seg => seg);
    const parsedSegments = segments.map(seg => {
      const match = seg.match(/^if\s+(.+?)\s+then\s+(.+)$/i);
      if (!match) {
        throw new Error(`Invalid piecewise segment format: ${seg}`);
      }
      return { condition: match[1].trim(), expr: match[2].trim() };
    });

    for (let i = 0; i < numPoints; i++) {
      const x = start + i * step;
      let y = 0;
      let matched = false;
      for (const segment of parsedSegments) {
        try {
          const condFunc = new Function("x", "sin=Math.sin; cos=Math.cos; tan=Math.tan; log=function(v){return v>0?Math.log(v):0}; exp=Math.exp; sqrt=Math.sqrt; abs=Math.abs; floor=Math.floor; ceil=Math.ceil; return (" + segment.condition + ");");
          if (condFunc(x)) {
            const exprFunc = new Function("x", "sin=Math.sin; cos=Math.cos; tan=Math.tan; log=function(v){return v>0?Math.log(v):0}; exp=Math.exp; sqrt=Math.sqrt; abs=Math.abs; floor=Math.floor; ceil=Math.ceil; return (" + segment.expr + ");");
            y = exprFunc(x);
            matched = true;
            break;
          }
        } catch (e) {
          continue;
        }
      }
      if (!matched) {
        y = 0;
      }
      data.push({ x, y });
    }
    return data;
  }

  // Standard expression handling
  for (let i = 0; i < numPoints; i++) {
    const x = start + i * step;
    let y = 0;
    if (expression === "y=sin(x)") {
      y = Math.sin(x);
    } else if (expression === "y=cos(x)") {
      y = Math.cos(x);
    } else if (expression === "y=tan(x)") {
      y = Math.tan(x);
    } else if (expression === "y=log(x)") {
      y = x > 0 ? Math.log(x) : 0;
    } else if (expression === "y=exp(x)") {
      y = Math.exp(x);
    } else if (expression === "y=x^2") {
      y = x * x;
    } else if (expression === "y=sqrt(x)") {
      y = x >= 0 ? Math.sqrt(x) : 0;
    } else if (expression === "y=x^3") {
      y = x * x * x;
    } else if (expression === "y=sinh(x)") {
      y = Math.sinh(x);
    } else if (expression === "y=cosh(x)") {
      y = Math.cosh(x);
    } else if (expression === "y=tanh(x)") {
      y = Math.tanh(x);
    } else if (expression === "y=abs(x)") {
      y = Math.abs(x);
    } else if (expression === "y=floor(x)") {
      y = Math.floor(x);
    } else if (expression === "y=ceil(x)") {
      y = Math.ceil(x);
    } else {
      const customMatch = expression.match(/^y=([a-zA-Z0-9_]+)\(x\)$/);
      if (customMatch) {
        const funcName = customMatch[1];
        const customFunc = customFunctions[funcName];
        if (typeof customFunc === "function") {
          y = customFunc(x);
        } else if (typeof customFunc === "string") {
          let fn;
          try {
            fn = eval(customFunc);
          } catch (e) {
            fn = null;
          }
          if (fn && typeof fn === "function") {
            y = fn(x);
          } else {
            y = 0;
          }
        } else {
          y = 0;
        }
      } else {
        y = 0;
      }
    }
    data.push({ x, y });
  }
  return data;
}

// Serializes an array of time series data points into a CSV string
export function serializeTimeSeries(data) {
  let csv = "x,y\n";
  for (const point of data) {
    csv += `${point.x},${point.y}\n`;
  }
  return csv;
}

// Helper function to generate SVG content based on options
function generateSvgContent({
  data,
  width = 500,
  height = 500,
  margin = 40,
  title,
  xlabel,
  ylabel,
  markerSize,
  markerColor,
  markerShape,
  bgColor,
  gridColor,
  gridDashArray = "4",
  fontFamily,
  fillColor
}) {
  // Support multi-expression overlay plotting: if data is an array of arrays, treat as multiple series
  const multi = Array.isArray(data) && data.length > 0 && Array.isArray(data[0]);
  const allSeries = multi ? data : [data];

  // Compute overall bounds across all series
  let xs = [];
  let ys = [];
  allSeries.forEach(series => {
    series.forEach(p => {
      xs.push(p.x);
      ys.push(p.y);
    });
  });
  const xMin = Math.min(...xs);
  const xMax = Math.max(...xs);
  let yMin = Math.min(...ys);
  let yMax = Math.max(...ys);
  if (yMin === yMax) {
    yMin -= 1;
    yMax += 1;
  }

  // Define scale factors
  const scaleX = (width - 2 * margin) / (xMax - xMin);
  const scaleY = (height - 2 * margin) / (yMax - yMin);

  // Helper function to transform data coordinate to SVG coordinate
  const transform = (x, y) => {
    const tx = margin + (x - xMin) * scaleX;
    const ty = height - margin - (y - yMin) * scaleY;
    return { tx, ty };
  };

  // Determine axis positions
  const origin = transform(0, 0);
  let xAxisY = (yMin <= 0 && yMax >= 0) ? origin.ty : height - margin;
  let yAxisX = (xMin <= 0 && xMax >= 0) ? origin.tx : margin;

  let svgContent = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">`;

  // Background rectangle
  if (bgColor) {
    svgContent += `<rect x="0" y="0" width="${width}" height="${height}" fill="${bgColor}" />`;
  }

  // Grid lines
  if (gridColor) {
    for (let i = 1; i < 4; i++) {
      const xPos = margin + (i * (width - 2 * margin)) / 4;
      svgContent += `<line x1="${xPos}" y1="${margin}" x2="${xPos}" y2="${height - margin}" stroke="${gridColor}" stroke-width="1" stroke-dasharray="${gridDashArray}" />`;
    }
    for (let i = 1; i < 4; i++) {
      const yPos = margin + (i * (height - 2 * margin)) / 4;
      svgContent += `<line x1="${margin}" y1="${yPos}" x2="${width - margin}" y2="${yPos}" stroke="${gridColor}" stroke-width="1" stroke-dasharray="${gridDashArray}" />`;
    }
  }

  // Add title and axis labels
  svgContent += `<text x="${width / 2}" y="20" text-anchor="middle" font-size="16" fill="black" font-family="${fontFamily}">${title}</text>`;
  svgContent += `<line x1="${margin}" y1="${xAxisY}" x2="${width - margin}" y2="${xAxisY}" stroke="black" stroke-width="2" />`;
  svgContent += `<line x1="${yAxisX}" y1="${margin}" x2="${yAxisX}" y2="${height - margin}" stroke="black" stroke-width="2" />`;
  svgContent += `<text x="${width / 2}" y="${height - 5}" text-anchor="middle" font-size="12" fill="black" font-family="${fontFamily}">${xlabel}</text>`;
  svgContent += `<text x="15" y="${height / 2}" text-anchor="middle" font-size="12" fill="black" transform="rotate(-90,15,${height / 2})" font-family="${fontFamily}">${ylabel}</text>`;

  // For each series, draw polyline, markers, and optional filled area
  allSeries.forEach((series, idx) => {
    // Determine style for this series using corresponding customization or fallback
    const currentColor = (Array.isArray(markerColor) && markerColor[idx]) ? markerColor[idx] : (Array.isArray(markerColor) ? markerColor[0] : "blue");
    const currentMarkerSize = (Array.isArray(markerSize) && markerSize[idx]) ? markerSize[idx] : (Array.isArray(markerSize) ? markerSize[0] : 3);
    const currentMarkerShape = (Array.isArray(markerShape) && markerShape[idx]) ? markerShape[idx] : (Array.isArray(markerShape) ? markerShape[0] : "circle");

    const polylinePoints = series
      .map(point => {
        const { tx, ty } = transform(point.x, point.y);
        return `${tx},${ty}`;
      })
      .join(" ");
    svgContent += `<polyline fill="none" stroke="${currentColor}" stroke-width="2" points="${polylinePoints}" />`;

    // Fill under curve if fillColor is provided
    if (fillColor && fillColor.length > 0) {
      const currentFill = (Array.isArray(fillColor) && fillColor[idx]) ? fillColor[idx] : (Array.isArray(fillColor) ? fillColor[0] : fillColor);
      const firstTrans = transform(series[0].x, series[0].y);
      const lastTrans = transform(series[series.length - 1].x, series[series.length - 1].y);
      let polygonPointsArray = series.map(point => {
        const { tx, ty } = transform(point.x, point.y);
        return `${tx},${ty}`;
      });
      polygonPointsArray.push(`${lastTrans.tx},${xAxisY}`);
      polygonPointsArray.push(`${firstTrans.tx},${xAxisY}`);
      const polygonPoints = polygonPointsArray.join(" ");
      svgContent += `<polygon fill="${currentFill}" points="${polygonPoints}" />`;
    }

    // Plot markers for each data point in the series
    series.forEach(point => {
      const { tx, ty } = transform(point.x, point.y);
      if (currentMarkerShape === "square") {
        const size = currentMarkerSize * 2;
        const xPos = tx - currentMarkerSize;
        const yPos = ty - currentMarkerSize;
        svgContent += `<rect x="${xPos}" y="${yPos}" width="${size}" height="${size}" fill="${currentColor}" />`;
      } else {
        svgContent += `<circle cx="${tx}" cy="${ty}" r="${currentMarkerSize}" fill="${currentColor}" />`;
      }
    });
  });

  svgContent += `</svg>`;
  return svgContent;
}

export async function main(args) {
  let expression, range, outputFile, points, title, xlabel, ylabel;
  let markerSize, markerColor, markerShape, bgColor, gridColor, gridDashArray, fontFamily, fillColor;
  let width = 500, height = 500;
  let customFunctions;
  gridDashArray = "4"; // default dash pattern

  // First, check for YAML configuration
  let yamlOptions = {};
  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--config-yaml") {
      const yamlPath = args[i + 1];
      i++;
      try {
        const fileContent = fs.readFileSync(yamlPath, "utf8");
        const parsedYaml = yaml.load(fileContent);
        yamlOptions = parsedYaml || {};
      } catch (err) {
        console.error("Error reading YAML config:", err);
        process.exit(1);
      }
    }
  }

  // Process CLI options
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === "--expression") {
      expression = args[i + 1];
      i++;
    } else if (arg === "--range") {
      range = args[i + 1];
      i++;
    } else if (arg === "--file") {
      outputFile = args[i + 1];
      i++;
    } else if (arg === "--points") {
      points = parseInt(args[i + 1], 10);
      i++;
    } else if (arg === "--title") {
      title = args[i + 1];
      i++;
    } else if (arg === "--xlabel" || arg === "--xLabel") {
      xlabel = args[i + 1];
      i++;
    } else if (arg === "--ylabel" || arg === "--yLabel") {
      ylabel = args[i + 1];
      i++;
    } else if (arg === "--marker-size") {
      let ms = args[i + 1];
      i++;
      // Check for multi-value
      if (ms.includes(",")) {
        markerSize = ms.split(",").map(s => parseInt(s.trim(), 10));
      } else {
        markerSize = [parseInt(ms, 10)];
      }
    } else if (arg === "--marker-color") {
      let mc = args[i + 1];
      i++;
      if (mc.includes(",")) {
        markerColor = mc.split(",").map(s => s.trim());
      } else {
        markerColor = [mc];
      }
    } else if (arg === "--marker-shape") {
      let msShape = args[i + 1];
      i++;
      if (msShape.includes(",")) {
        markerShape = msShape.split(",").map(s => s.trim());
      } else {
        markerShape = [msShape];
      }
    } else if (arg === "--bgColor") {
      bgColor = args[i + 1];
      i++;
    } else if (arg === "--gridColor") {
      gridColor = args[i + 1];
      i++;
    } else if (arg === "--font-family") {
      fontFamily = args[i + 1];
      i++;
    } else if (arg === "--grid-dasharray") {
      gridDashArray = args[i + 1];
      i++;
    } else if (arg === "--width") {
      width = parseInt(args[i + 1], 10);
      i++;
    } else if (arg === "--height") {
      height = parseInt(args[i + 1], 10);
      i++;
    } else if (arg === "--custom-functions") {
      try {
        customFunctions = JSON.parse(args[i + 1]);
      } catch (e) {
        console.error("Error parsing custom functions JSON:", e);
        customFunctions = {};
      }
      i++;
    } else if (arg === "--fillColor") {
      let fc = args[i + 1];
      i++;
      if (fc.includes(",")) {
        fillColor = fc.split(",").map(s => s.trim());
      } else {
        fillColor = [fc];
      }
    }
  }

  // Merge YAML options (YAML overrides CLI if provided)
  if (yamlOptions.expression !== undefined) expression = yamlOptions.expression;
  if (yamlOptions.range !== undefined) range = yamlOptions.range;
  if (yamlOptions.file !== undefined) outputFile = yamlOptions.file;
  if (yamlOptions.points !== undefined) points = yamlOptions.points;
  if (yamlOptions.title !== undefined) title = yamlOptions.title;
  if (yamlOptions.xlabel !== undefined) xlabel = yamlOptions.xlabel;
  if (yamlOptions.ylabel !== undefined) ylabel = yamlOptions.ylabel;
  if (yamlOptions['marker-size'] !== undefined) {
    const ms = yamlOptions['marker-size'].toString();
    markerSize = ms.includes(",") ? ms.split(",").map(s => parseInt(s.trim(), 10)) : [parseInt(ms, 10)];
  }
  if (yamlOptions['marker-color'] !== undefined) {
    const mc = yamlOptions['marker-color'].toString();
    markerColor = mc.includes(",") ? mc.split(",").map(s => s.trim()) : [mc];
  }
  if (yamlOptions['marker-shape'] !== undefined) {
    const msShape = yamlOptions['marker-shape'].toString();
    markerShape = msShape.includes(",") ? msShape.split(",").map(s => s.trim()) : [msShape];
  }
  if (yamlOptions.bgColor !== undefined) bgColor = yamlOptions.bgColor;
  if (yamlOptions.gridColor !== undefined) gridColor = yamlOptions.gridColor;
  if (yamlOptions['grid-dasharray'] !== undefined) gridDashArray = yamlOptions['grid-dasharray'];
  if (yamlOptions['font-family'] !== undefined) fontFamily = yamlOptions['font-family'];
  if (yamlOptions.width !== undefined) width = parseInt(yamlOptions.width, 10);
  if (yamlOptions.height !== undefined) height = parseInt(yamlOptions.height, 10);
  if (yamlOptions['custom-functions'] !== undefined) customFunctions = yamlOptions['custom-functions'];
  if (yamlOptions.fillColor !== undefined) {
    const fc = yamlOptions.fillColor.toString();
    fillColor = fc.includes(",") ? fc.split(",").map(s => s.trim()) : [fc];
  }

  // Set defaults if still undefined
  if (!points) {
    points = 10;
  }
  title = title || `Plot: ${expression}`;
  xlabel = xlabel || "X Axis";
  ylabel = ylabel || "Y Axis";
  fontFamily = fontFamily || "sans-serif";
  if (!markerSize) markerSize = [3];
  if (!markerColor) markerColor = ["red"];
  if (!markerShape) markerShape = ["circle"];
  customFunctions = customFunctions || {};

  if (expression && range && outputFile) {
    // Determine if multiple expressions are provided (separated by semicolon)
    let expressions = expression.split(';').map(exp => exp.trim()).filter(exp => exp);

    // Generation message
    const genMessage = `Generating plot for expression ${expression} with range ${range} to file ${outputFile}.`;

    if (outputFile.endsWith(".csv")) {
      // For CSV, if multiple expressions, use only the first series
      const data = generateTimeSeriesData(expressions[0], range, points, customFunctions);
      const csvContent = serializeTimeSeries(data);
      console.error(genMessage);
      console.log("");
      console.log(csvContent);
    } else if (outputFile.endsWith(".pdf")) {
      console.log(genMessage);
      try {
        let data;
        if (expressions.length > 1) {
          data = expressions.map(exp => generateTimeSeriesData(exp, range, points, customFunctions));
        } else {
          data = generateTimeSeriesData(expressions[0], range, points, customFunctions);
        }
        const svgContent = generateSvgContent({
          data,
          width,
          height,
          title,
          xlabel,
          ylabel,
          markerSize,
          markerColor,
          markerShape,
          bgColor,
          gridColor,
          gridDashArray,
          fontFamily,
          fillColor
        });
        const doc = new PDFDocument({ size: [width, height] });
        const chunks = [];
        doc.on('data', chunk => chunks.push(chunk));
        const pdfPromise = new Promise(resolve => {
          doc.on('end', () => {
            const buffer = Buffer.concat(chunks);
            fs.writeFileSync(outputFile, buffer);
            console.log(`PDF file generated: ${outputFile}`);
            resolve();
          });
        });
        svgToPdf(doc, svgContent, 0, 0, { preserveAspectRatio: 'xMinYMin meet' });
        doc.end();
        await pdfPromise;
      } catch (err) {
        console.error(`Error generating PDF for file ${outputFile}:`, err);
      }
    } else {
      console.log(genMessage);
      try {
        let data;
        if (expressions.length > 1) {
          data = expressions.map(exp => generateTimeSeriesData(exp, range, points, customFunctions));
        } else {
          data = generateTimeSeriesData(expressions[0], range, points, customFunctions);
        }
        const svgContent = generateSvgContent({
          data,
          width,
          height,
          title,
          xlabel,
          ylabel,
          markerSize,
          markerColor,
          markerShape,
          bgColor,
          gridColor,
          gridDashArray,
          fontFamily,
          fillColor
        });
        if (outputFile.endsWith(".png")) {
          const buffer = await sharp(Buffer.from(svgContent)).resize(width, height).png().toBuffer();
          fs.writeFileSync(outputFile, buffer);
          console.log(`PNG file generated: ${outputFile}`);
        } else {
          fs.writeFileSync(outputFile, svgContent);
          console.log(`SVG file generated: ${outputFile}`);
        }
      } catch (err) {
        console.error(`Error generating plot for file ${outputFile}:`, err);
      }
    }
  } else {
    console.log(JSON.stringify({ expression, range, outputFile, points }));
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  main(args).catch(err => console.error(err));
}
