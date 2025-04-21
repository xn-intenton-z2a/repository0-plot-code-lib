#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import fs from "fs";
import sharp from "sharp";

// Generates time series data from a mathematical expression and range
export function generateTimeSeriesData(expression, rangeStr, numPoints = 10) {
  // Supports expressions: 'y=sin(x)', 'y=cos(x)', 'y=tan(x)', 'y=log(x)', 'y=exp(x)', 'y=x^2', 'y=sqrt(x)', 'y=x^3'
  // Expected range format: "x=start:end"
  const match = rangeStr.match(/^x=([\-\d\.]+):([\-\d\.]+)$/);
  if (!match) {
    throw new Error("Invalid range format. Expected format: x=start:end");
  }
  const start = parseFloat(match[1]);
  const end = parseFloat(match[2]);

  const step = (end - start) / (numPoints - 1);
  const data = [];
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
      // Only compute log if x > 0, otherwise default to 0
      y = x > 0 ? Math.log(x) : 0;
    } else if (expression === "y=exp(x)") {
      y = Math.exp(x);
    } else if (expression === "y=x^2") {
      y = x * x;
    } else if (expression === "y=sqrt(x)") {
      // Compute square root if x is non-negative, otherwise default to 0
      y = x >= 0 ? Math.sqrt(x) : 0;
    } else if (expression === "y=x^3") {
      y = x * x * x;
    } else {
      // Default behavior for unsupported expressions
      y = 0;
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

export async function main(args) {
  // Simple argument parser
  let expression, range, outputFile, points;
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
    }
  }

  // Default points to 10 if not provided
  if (!points) {
    points = 10;
  }

  if (expression && range && outputFile) {
    if (outputFile.endsWith(".csv")) {
      // Generate time series data and output CSV content to stdout
      try {
        const data = generateTimeSeriesData(expression, range, points);
        const csvContent = serializeTimeSeries(data);
        console.log(csvContent);
      } catch (err) {
        console.error("Error generating CSV content:", err);
      }
    } else {
      // For SVG or PNG, generate an enhanced plot with axes, data points, and a connecting polyline
      try {
        const data = generateTimeSeriesData(expression, range, points);

        // Define SVG canvas dimensions and margins
        const width = 500;
        const height = 500;
        const margin = 40;

        // Compute data bounds
        const xs = data.map(p => p.x);
        const ys = data.map(p => p.y);
        let xMin = Math.min(...xs);
        let xMax = Math.max(...xs);
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
        let xAxisY;
        if (yMin <= 0 && yMax >= 0) {
          xAxisY = transform(0, 0).ty;
        } else {
          xAxisY = height - margin;
        }
        let yAxisX;
        if (xMin <= 0 && xMax >= 0) {
          yAxisX = transform(0, 0).tx;
        } else {
          yAxisX = margin;
        }

        // Create polyline points string for connecting data points
        const polylinePoints = data.map(point => {
          const { tx, ty } = transform(point.x, point.y);
          return `${tx},${ty}`;
        }).join(" ");

        // Build the enhanced SVG content
        let svgContent = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">`;

        // Add plot title
        svgContent += `<text x="${width / 2}" y="20" text-anchor="middle" font-size="16" fill="black">Plot: ${expression}</text>`;

        // Draw X and Y axes
        svgContent += `<line x1="${margin}" y1="${xAxisY}" x2="${width - margin}" y2="${xAxisY}" stroke="black" stroke-width="2" />`;
        svgContent += `<line x1="${yAxisX}" y1="${margin}" x2="${yAxisX}" y2="${height - margin}" stroke="black" stroke-width="2" />`;

        // Add axis labels
        svgContent += `<text x="${width / 2}" y="${height - 5}" text-anchor="middle" font-size="12" fill="black">X Axis</text>`;
        svgContent += `<text x="15" y="${height / 2}" text-anchor="middle" font-size="12" fill="black" transform="rotate(-90,15,${height / 2})">Y Axis</text>`;

        // Draw connecting line (polyline) through data points
        svgContent += `<polyline fill="none" stroke="blue" stroke-width="2" points="${polylinePoints}" />`;

        // Plot each data point as a circle marker
        data.forEach(point => {
          const { tx, ty } = transform(point.x, point.y);
          svgContent += `<circle cx="${tx}" cy="${ty}" r="3" fill="red" />`;
        });

        svgContent += `</svg>`;

        // Output based on file extension: PNG or SVG
        if (outputFile.endsWith(".png")) {
          const buffer = await sharp(Buffer.from(svgContent)).png().toBuffer();
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
    console.log(`Run with: ${JSON.stringify(args)}`);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  main(args).catch(err => console.error(err));
}
