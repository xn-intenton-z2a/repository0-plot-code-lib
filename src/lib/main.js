/*
File: src/lib/main.js
*/
#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import { generatePlot } from "./plot.js";

export function main(args = []) {
  if (args.includes("--plot")) {
    const exprIdx = args.indexOf("--expr");
    const startIdx = args.indexOf("--start");
    const endIdx = args.indexOf("--end");

    if (exprIdx === -1 || startIdx === -1 || endIdx === -1) {
      console.error("Missing required parameters for plotting: --expr, --start, --end");
      process.exit(1);
    }

    const expression = args[exprIdx + 1];
    const start = parseFloat(args[startIdx + 1]);
    const end = parseFloat(args[endIdx + 1]);
    const stepIdx = args.indexOf("--step");
    const step = stepIdx !== -1 ? parseFloat(args[stepIdx + 1]) : 0.1;

    try {
      const svg = generatePlot(expression, start, end, step);
      console.log(svg);
    } catch (e) {
      console.error("Error generating plot:", e.message);
      process.exit(1);
    }
  } else {
    console.log(`Run with: ${JSON.stringify(args)}`);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  main(args);
}

/*
File: src/lib/plot.js
A new module that implements a basic generatePlot function returning an SVG string.
*/

export function generatePlot(expression, start, end, step) {
  // Generate a series of points.
  const points = [];
  for (let x = start; x <= end; x += step) {
    let y = 0;
    // A very simple parser for common expressions; extend as needed.
    // Currently supports "sin(x)" and "cos(x)"; otherwise returns 0.
    if (expression === "sin(x)") {
      y = Math.sin(x);
    } else if (expression === "cos(x)") {
      y = Math.cos(x);
    } else {
      // For any unsupported expression, try evaluating using Function (not safe for production)
      try {
        // Warning: using eval-like techniques can be dangerous; proper parsing is recommended.
        y = Function('x', 'return ' + expression)(x);
      } catch (error) {
        throw new Error(`Invalid expression: ${expression}`);
      }
    }
    points.push({ x, y });
  }

  // Construct a simple SVG polyline plot.
  const width = 500;
  const height = 500;
  const margin = 20;
  const plotWidth = width - 2 * margin;
  const plotHeight = height - 2 * margin;

  // Scaling functions
  const scaleX = (x) => margin + ((x - start) / (end - start)) * plotWidth;
  // Assume y is in the range [-1, 1] for simple functions; adjust as needed
  const scaleY = (y) => margin + ((1 - (y + 1) / 2) * plotHeight);

  const pointsAttr = points.map(p => `${scaleX(p.x)},${scaleY(p.y)}`).join(" ");
  const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">` +
              `<polyline fill="none" stroke="black" stroke-width="2" points="${pointsAttr}" />` +
              `</svg>`;
  return svg;
}
