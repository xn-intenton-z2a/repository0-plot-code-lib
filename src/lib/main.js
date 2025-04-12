/* File: src/lib/main.js */

import { fileURLToPath } from "url";
import pkg from "../../package.json" with { type: "json" };
import { compile } from "mathjs";

// In-memory cache for SVG outputs
const svgCache = new Map();

/**
 * Generates an SVG plot for a given mathematical expression over a specific range.
 * Optionally, a custom fallback message can be provided to display when no valid data points are found.
 * Additionally, optional logarithmic scaling can be applied to the x and/or y axes.
 * 
 * The plot now includes enhanced visual features: x and y axis lines, tick marks with numeric labels, and grid lines.
 * 
 * @param {string} expression - The mathematical expression to evaluate.
 * @param {number} start - The starting value of x.
 * @param {number} end - The ending value of x.
 * @param {number} step - The increment step for x.
 * @param {string} [fallbackMessage] - Optional custom fallback message for non-finite evaluations.
 * @param {boolean} [logScaleX=false] - If true, apply logarithmic scaling on the x-axis (requires x > 0).
 * @param {boolean} [logScaleY=false] - If true, apply logarithmic scaling on the y-axis (requires y > 0).
 * @returns {string} - SVG string representing the plot or fallback message.
 */
export function generatePlot(expression, start, end, step, fallbackMessage, logScaleX = false, logScaleY = false) {
  // Create a cache key based on the function arguments
  const cacheKey = JSON.stringify(["generatePlot", expression, start, end, step, fallbackMessage, logScaleX, logScaleY]);
  if (svgCache.has(cacheKey)) {
    return svgCache.get(cacheKey);
  }

  let points = [];
  const margin = 20;
  const svgWidth = 500;
  const svgHeight = 300;
  
  const compiled = compile(expression);
  for (let x = start; x <= end; x += step) {
    try {
      const y = compiled.evaluate({ x });
      if (Number.isFinite(y)) {
        // If logarithmic scale is enabled, skip non-positive values
        if (logScaleX && x <= 0) continue;
        if (logScaleY && y <= 0) continue;
        points.push({ x, y });
      }
    } catch (_err) {
      // Ignoring evaluation error
    }
  }

  // If no valid points, return fallback SVG with diagnostic details
  if (points.length === 0) {
    let fallbackSVG;
    if (fallbackMessage) {
      fallbackSVG = `<svg width="500" height="300" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="500" height="300" fill="white" stroke="black"/>
      <text x="50%" y="50%" alignment-baseline="middle" text-anchor="middle" fill="red">${fallbackMessage}</text>
    </svg>`;
    } else {
      fallbackSVG = `<svg width="500" height="300" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="500" height="300" fill="white" stroke="black"/>
      <text x="50%" y="45%" alignment-baseline="middle" text-anchor="middle" fill="red">No valid data: expression evaluation returned.</text>
      <text x="50%" y="55%" alignment-baseline="middle" text-anchor="middle" fill="red">Check the input expression for potential issues.</text>
    </svg>`;
    }
    svgCache.set(cacheKey, fallbackSVG);
    return fallbackSVG;
  }

  // Apply logarithmic transformation if enabled
  const transformedXValues = points.map(p => logScaleX ? Math.log10(p.x) : p.x);
  const transformedYValues = points.map(p => logScaleY ? Math.log10(p.y) : p.y);
  const minXTrans = Math.min(...transformedXValues);
  const maxXTrans = Math.max(...transformedXValues);
  const minYTrans = Math.min(...transformedYValues);
  const maxYTrans = Math.max(...transformedYValues);
  const xRange = maxXTrans - minXTrans || 1;
  const yRange = maxYTrans - minYTrans || 1;

  // Build polyline for the data points
  const svgPoints = points
    .map(({ x, y }) => {
      const tx = logScaleX ? Math.log10(x) : x;
      const ty = logScaleY ? Math.log10(y) : y;
      const scaledX = ((tx - minXTrans) / xRange) * (svgWidth - 2 * margin) + margin;
      const scaledY = svgHeight - (((ty - minYTrans) / yRange) * (svgHeight - 2 * margin) + margin);
      return `${scaledX},${scaledY}`;
    })
    .join(" ");

  // Create grid lines, axis lines and tick marks with labels
  let gridLines = "";
  let tickMarks = "";

  // X-axis ticks and grid lines
  if (logScaleX) {
    // Determine ticks as powers of 10
    const minExp = Math.floor(minXTrans);
    const maxExp = Math.ceil(maxXTrans);
    for (let exp = minExp; exp <= maxExp; exp++) {
      const tickValue = Math.pow(10, exp);
      const scaledX = ((exp - minXTrans) / xRange) * (svgWidth - 2 * margin) + margin;
      gridLines += `<line class="grid-line" x1="${scaledX}" y1="${margin}" x2="${scaledX}" y2="${svgHeight - margin}" stroke="lightgray" stroke-dasharray="2,2" />\n`;
      tickMarks += `<line class="tick-mark" x1="${scaledX}" y1="${svgHeight - margin}" x2="${scaledX}" y2="${svgHeight - margin + 5}" stroke="black" />\n`;
      tickMarks += `<text class="tick-label" x="${scaledX}" y="${svgHeight - margin + 15}" text-anchor="middle" font-size="10">${tickValue.toFixed(2)}</text>\n`;
    }
  } else {
    const tickCount = 5;
    const xTickInterval = (maxXTrans - minXTrans) / tickCount;
    for (let i = 0; i <= tickCount; i++) {
      const xTickValue = minXTrans + i * xTickInterval;
      const scaledX = ((xTickValue - minXTrans) / xRange) * (svgWidth - 2 * margin) + margin;
      gridLines += `<line class="grid-line" x1="${scaledX}" y1="${margin}" x2="${scaledX}" y2="${svgHeight - margin}" stroke="lightgray" stroke-dasharray="2,2" />\n`;
      tickMarks += `<line class="tick-mark" x1="${scaledX}" y1="${svgHeight - margin}" x2="${scaledX}" y2="${svgHeight - margin + 5}" stroke="black" />\n`;
      tickMarks += `<text class="tick-label" x="${scaledX}" y="${svgHeight - margin + 15}" text-anchor="middle" font-size="10">${!logScaleX ? xTickValue.toFixed(2) : ''}</text>\n`;
    }
  }

  // Y-axis ticks and grid lines
  if (logScaleY) {
    const minExp = Math.floor(minYTrans);
    const maxExp = Math.ceil(maxYTrans);
    for (let exp = minExp; exp <= maxExp; exp++) {
      const tickValue = Math.pow(10, exp);
      const scaledY = svgHeight - (((exp - minYTrans) / yRange) * (svgHeight - 2 * margin) + margin);
      gridLines += `<line class="grid-line" x1="${margin}" y1="${scaledY}" x2="${svgWidth - margin}" y2="${scaledY}" stroke="lightgray" stroke-dasharray="2,2" />\n`;
      tickMarks += `<line class="tick-mark" x1="${margin - 5}" y1="${scaledY}" x2="${margin}" y2="${scaledY}" stroke="black" />\n`;
      tickMarks += `<text class="tick-label" x="${margin - 7}" y="${scaledY + 3}" text-anchor="end" font-size="10">${tickValue.toFixed(2)}</text>\n`;
    }
  } else {
    const tickCount = 5;
    const yTickInterval = (maxYTrans - minYTrans) / tickCount;
    for (let i = 0; i <= tickCount; i++) {
      const yTickValue = minYTrans + i * yTickInterval;
      const scaledY = svgHeight - (((yTickValue - minYTrans) / yRange) * (svgHeight - 2 * margin) + margin);
      gridLines += `<line class="grid-line" x1="${margin}" y1="${scaledY}" x2="${svgWidth - margin}" y2="${scaledY}" stroke="lightgray" stroke-dasharray="2,2" />\n`;
      tickMarks += `<line class="tick-mark" x1="${margin - 5}" y1="${scaledY}" x2="${margin}" y2="${scaledY}" stroke="black" />\n`;
      tickMarks += `<text class="tick-label" x="${margin - 7}" y="${scaledY + 3}" text-anchor="end" font-size="10">${yTickValue.toFixed(2)}</text>\n`;
    }
  }

  // Axis lines
  const xAxisLine = `<line class="axis x-axis" x1="${margin}" y1="${svgHeight - margin}" x2="${svgWidth - margin}" y2="${svgHeight - margin}" stroke="black" stroke-width="2" />`;
  const yAxisLine = `<line class="axis y-axis" x1="${margin}" y1="${margin}" x2="${margin}" y2="${svgHeight - margin}" stroke="black" stroke-width="2" />`;

  // Build the final SVG content
  const svgContent = `<svg width="${svgWidth}" height="${svgHeight}" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="${svgWidth}" height="${svgHeight}" fill="white" stroke="black"/>
    <g class="grid">\n${gridLines}</g>
    <g class="axes">\n${xAxisLine}\n${yAxisLine}</g>
    <g class="ticks">\n${tickMarks}</g>
    <polyline points="${svgPoints}" fill="none" stroke="blue" stroke-width="2"/>
  </svg>`;

  svgCache.set(cacheKey, svgContent);
  return svgContent;
}

// Alias generateSVGPlot to generatePlot for new API usage
export const generateSVGPlot = generatePlot;

/**
 * Generates an SVG plot for multiple mathematical expressions. Each expression is plotted as a distinct polyline with a unique color and a legend is added.
 * Additionally, optional logarithmic scaling can be applied to the axes.
 * 
 * @param {string[]} expressions - Array of mathematical expressions to evaluate.
 * @param {number} start - The starting x value.
 * @param {number} end - The ending x value.
 * @param {number} step - The increment step for x.
 * @param {string} [fallbackMessage] - Optional fallback message if an expression yields no valid points.
 * @param {boolean} [logScaleX=false] - If true, apply logarithmic scaling on the x-axis (requires x > 0).
 * @param {boolean} [logScaleY=false] - If true, apply logarithmic scaling on the y-axis (requires y > 0).
 * @returns {string} - SVG string representing the multi-plot or fallback SVG if no valid data points are found for any expression.
 */
export function generateMultiPlot(expressions, start, end, step, fallbackMessage, logScaleX = false, logScaleY = false) {
  // Create a cache key based on the arguments
  const cacheKey = JSON.stringify(["generateMultiPlot", expressions, start, end, step, fallbackMessage, logScaleX, logScaleY]);
  if (svgCache.has(cacheKey)) {
    return svgCache.get(cacheKey);
  }

  const svgWidth = 500;
  const svgHeight = 300;
  const margin = 20;
  const tickCount = 5;
  const colors = ["blue", "red", "green", "orange", "purple", "magenta", "cyan"];
  const series = [];
  let allValidPoints = [];

  // Process each expression
  for (const expr of expressions) {
    let points = [];
    const compiled = compile(expr);
    for (let x = start; x <= end; x += step) {
      try {
        const y = compiled.evaluate({ x });
        if (Number.isFinite(y)) {
          if (logScaleX && x <= 0) continue;
          if (logScaleY && y <= 0) continue;
          points.push({ x, y });
          allValidPoints.push({ x, y });
        }
      } catch (_err) {
        // Ignore evaluation error
      }
    }
    series.push({ expression: expr, points });
  }

  // If no valid points for any expression, return fallback SVG
  if (allValidPoints.length === 0) {
    let fallbackSVG;
    if (fallbackMessage) {
      fallbackSVG = `<svg width="${svgWidth}" height="${svgHeight}" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="${svgWidth}" height="${svgHeight}" fill="white" stroke="black"/>
        <text x="50%" y="50%" alignment-baseline="middle" text-anchor="middle" fill="red">${fallbackMessage}</text>
      </svg>`;
    } else {
      fallbackSVG = `<svg width="${svgWidth}" height="${svgHeight}" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="${svgWidth}" height="${svgHeight}" fill="white" stroke="black"/>
        <text x="50%" y="45%" alignment-baseline="middle" text-anchor="middle" fill="red">No valid data: all expressions returned non-finite values.</text>
        <text x="50%" y="55%" alignment-baseline="middle" text-anchor="middle" fill="red">Check the input expressions for potential issues.</text>
      </svg>`;
    }
    svgCache.set(cacheKey, fallbackSVG);
    return fallbackSVG;
  }

  // Determine overall transformed ranges
  const transformedXValues = allValidPoints.map(p => logScaleX ? Math.log10(p.x) : p.x);
  const xRange = (Math.max(...transformedXValues) - Math.min(...transformedXValues)) || 1;
  const transformedYValues = allValidPoints.map(p => logScaleY ? Math.log10(p.y) : p.y);
  const minYTrans = Math.min(...transformedYValues);
  const maxYTrans = Math.max(...transformedYValues);
  const yRange = (maxYTrans - minYTrans) || 1;

  // Generate polyline elements for each series
  let polylines = "";
  series.forEach((serie, index) => {
    if (serie.points.length > 0) {
      const svgPoints = serie.points.map(({ x, y }) => {
        const tx = logScaleX ? Math.log10(x) : x;
        const ty = logScaleY ? Math.log10(y) : y;
        const scaledX = ((tx - Math.min(...transformedXValues)) / xRange) * (svgWidth - 2 * margin) + margin;
        const scaledY = svgHeight - (((ty - minYTrans) / yRange) * (svgHeight - 2 * margin) + margin);
        return `${scaledX},${scaledY}`;
      }).join(' ');
      const color = colors[index % colors.length];
      polylines += `<polyline points="${svgPoints}" fill="none" stroke="${color}" stroke-width="2"/>
`;
    }
  });

  // Create grid lines, axes and tick marks based on overall data range
  let gridLines = "";
  let tickMarks = "";

  // X-axis ticks and grid lines
  if (logScaleX) {
    const minXTrans = Math.min(...transformedXValues);
    const maxXTrans = Math.max(...transformedXValues);
    const minExp = Math.floor(minXTrans);
    const maxExp = Math.ceil(maxXTrans);
    for (let exp = minExp; exp <= maxExp; exp++) {
      const tickValue = Math.pow(10, exp);
      const scaledX = ((exp - minXTrans) / (maxXTrans - minXTrans || 1)) * (svgWidth - 2 * margin) + margin;
      gridLines += `<line class="grid-line" x1="${scaledX}" y1="${margin}" x2="${scaledX}" y2="${svgHeight - margin}" stroke="lightgray" stroke-dasharray="2,2" />\n`;
      tickMarks += `<line class="tick-mark" x1="${scaledX}" y1="${svgHeight - margin}" x2="${scaledX}" y2="${svgHeight - margin + 5}" stroke="black" />\n`;
      tickMarks += `<text class="tick-label" x="${scaledX}" y="${svgHeight - margin + 15}" text-anchor="middle" font-size="10">${tickValue.toFixed(2)}</text>\n`;
    }
  } else {
    const minXTrans = Math.min(...transformedXValues);
    const maxXTrans = Math.max(...transformedXValues);
    const xTickInterval = (maxXTrans - minXTrans) / tickCount;
    for (let i = 0; i <= tickCount; i++) {
      const xTickValue = minXTrans + i * xTickInterval;
      const scaledX = ((xTickValue - minXTrans) / (maxXTrans - minXTrans || 1)) * (svgWidth - 2 * margin) + margin;
      gridLines += `<line class="grid-line" x1="${scaledX}" y1="${margin}" x2="${scaledX}" y2="${svgHeight - margin}" stroke="lightgray" stroke-dasharray="2,2" />\n`;
      tickMarks += `<line class="tick-mark" x1="${scaledX}" y1="${svgHeight - margin}" x2="${scaledX}" y2="${svgHeight - margin + 5}" stroke="black" />\n`;
      tickMarks += `<text class="tick-label" x="${scaledX}" y="${svgHeight - margin + 15}" text-anchor="middle" font-size="10">${!logScaleX ? xTickValue.toFixed(2) : ''}</text>\n`;
    }
  }

  // Y-axis ticks and grid lines
  if (logScaleY) {
    const minExp = Math.floor(minYTrans);
    const maxExp = Math.ceil(maxYTrans);
    for (let exp = minExp; exp <= maxExp; exp++) {
      const tickValue = Math.pow(10, exp);
      const scaledY = svgHeight - (((exp - minYTrans) / yRange) * (svgHeight - 2 * margin) + margin);
      gridLines += `<line class="grid-line" x1="${margin}" y1="${scaledY}" x2="${svgWidth - margin}" y2="${scaledY}" stroke="lightgray" stroke-dasharray="2,2" />\n`;
      tickMarks += `<line class="tick-mark" x1="${margin - 5}" y1="${scaledY}" x2="${margin}" y2="${scaledY}" stroke="black" />\n`;
      tickMarks += `<text class="tick-label" x="${margin - 7}" y="${scaledY + 3}" text-anchor="end" font-size="10">${tickValue.toFixed(2)}</text>\n`;
    }
  } else {
    const minYTransCalc = Math.min(...transformedYValues);
    const maxYTransCalc = Math.max(...transformedYValues);
    const yTickInterval = (maxYTransCalc - minYTransCalc) / tickCount;
    for (let i = 0; i <= tickCount; i++) {
      const yTickValue = minYTransCalc + i * yTickInterval;
      const scaledY = svgHeight - (((yTickValue - minYTransCalc) / (maxYTransCalc - minYTransCalc || 1)) * (svgHeight - 2 * margin) + margin);
      gridLines += `<line class="grid-line" x1="${margin}" y1="${scaledY}" x2="${svgWidth - margin}" y2="${scaledY}" stroke="lightgray" stroke-dasharray="2,2" />\n`;
      tickMarks += `<line class="tick-mark" x1="${margin - 5}" y1="${scaledY}" x2="${margin}" y2="${scaledY}" stroke="black" />\n`;
      tickMarks += `<text class="tick-label" x="${margin - 7}" y="${scaledY + 3}" text-anchor="end" font-size="10">${yTickValue.toFixed(2)}</text>\n`;
    }
  }

  // Axis lines
  const xAxisLine = `<line class="axis x-axis" x1="${margin}" y1="${svgHeight - margin}" x2="${svgWidth - margin}" y2="${svgHeight - margin}" stroke="black" stroke-width="2" />`;
  const yAxisLine = `<line class="axis y-axis" x1="${margin}" y1="${margin}" x2="${margin}" y2="${svgHeight - margin}" stroke="black" stroke-width="2" />`;

  // Build the final SVG content
  const svgContent = `<svg width="${svgWidth}" height="${svgHeight}" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="${svgWidth}" height="${svgHeight}" fill="white" stroke="black" />
    <g class="grid">\n${gridLines}</g>
    <g class="axes">\n${xAxisLine}\n${yAxisLine}</g>
    <g class="ticks">\n${tickMarks}</g>
    ${polylines}
    <g class="legend">
      ${series.map((serie, index) => {
        const color = colors[index % colors.length];
        const legendX = svgWidth - 110;
        const legendY = 20 + index * 15;
        return `<rect x="${legendX}" y="${legendY - 12}" width="10" height="10" fill="${color}" />\n<text x="${legendX + 15}" y="${legendY - 2}" font-size="10" fill="black">${serie.expression}</text>`;
      }).join("\n")}
    </g>
  </svg>`;

  svgCache.set(cacheKey, svgContent);
  return svgContent;
}

// CLI related helper functions
function showHelp() {
  console.log(`repository0-plot-code-lib: A versatile CLI tool for plotting mathematical functions.
    
Usage: node src/lib/main.js [options]

Options:
  -h, --help          display help information
  -v, --version       display version information
  --diagnostics       enable diagnostics mode
  --plot              generate a plot. Use either legacy parameters (--expr, --start, --end, [--step]) or the new syntax:
                      --plot "<expression>" --xmin <number> --xmax <number> --points <integer greater than 1> [--fallback "custom message"]
  --plots             generate a multi-plot with multiple comma-separated expressions.
  --fallback          (optional) specify a custom fallback message for cases where expression evaluation yields non-finite values
  --logscale-x        (optional) apply logarithmic scale to the x-axis (requires positive x values)
  --logscale-y        (optional) apply logarithmic scale to the y-axis (requires positive y values)
`);
}

function showVersion() {
  console.log(pkg.version);
}

function showDiagnostics(args) {
  console.log("Diagnostics Mode Enabled");
  console.log("Parsed Arguments:", args);
  console.log("Node.js Version:", process.version);
  console.log("Current Working Directory:", process.cwd());
}

function handlePlot(args) {
  // Check for custom fallback message flag
  let fallbackMessage;
  const fallbackIdx = args.indexOf("--fallback");
  if (fallbackIdx !== -1 && args.length > fallbackIdx + 1) {
    fallbackMessage = args[fallbackIdx + 1];
  }

  // Check for logarithmic scale flags
  const logScaleX = args.includes("--logscale-x");
  const logScaleY = args.includes("--logscale-y");

  // New flag for multi-plot (--plots) takes precedence
  const plotsFlagIdx = args.indexOf("--plots");
  if (plotsFlagIdx !== -1 && args.length > plotsFlagIdx + 1) {
    const expressionsArg = args[plotsFlagIdx + 1];
    const expressions = expressionsArg.split(",").map(e => e.trim());
    const xminIdx = args.indexOf("--xmin");
    const xmaxIdx = args.indexOf("--xmax");
    const pointsIdx = args.indexOf("--points");
    if (xminIdx === -1 || xmaxIdx === -1 || pointsIdx === -1) {
      console.error("Missing required parameters for SVG plotting: --xmin, --xmax, --points");
      process.exit(1);
      return;
    }
    const xmin = parseFloat(args[xminIdx + 1]);
    const xmax = parseFloat(args[xmaxIdx + 1]);
    if (xmin >= xmax) {
      console.error("Invalid range: --xmin must be less than --xmax");
      process.exit(1);
      return;
    }
    const pointsCount = parseInt(args[pointsIdx + 1], 10);
    const step = (xmax - xmin) / pointsCount;
    const svg = generateMultiPlot(expressions, xmin, xmax, step, fallbackMessage, logScaleX, logScaleY);
    console.log(svg);
    return;
  }

  // Determine if using new CLI syntax: --plot <expression> ...
  const plotIndex = args.indexOf("--plot");
  const nextArg = args[plotIndex + 1];
  if (nextArg && !nextArg.startsWith("--")) {
    // Check if multiple expressions are provided via comma separation
    if (nextArg.indexOf(",") !== -1) {
      const expressions = nextArg.split(",").map(e => e.trim());
      const xminIdx = args.indexOf("--xmin");
      const xmaxIdx = args.indexOf("--xmax");
      const pointsIdx = args.indexOf("--points");
      if (xminIdx === -1 || xmaxIdx === -1 || pointsIdx === -1) {
        console.error("Missing required parameters for SVG plotting: --xmin, --xmax, --points");
        process.exit(1);
        return;
      }
      const xmin = parseFloat(args[xminIdx + 1]);
      const xmax = parseFloat(args[xmaxIdx + 1]);
      if (xmin >= xmax) {
        console.error("Invalid range: --xmin must be less than --xmax");
        process.exit(1);
        return;
      }
      const pointsCount = parseInt(args[pointsIdx + 1], 10);
      const step = (xmax - xmin) / pointsCount;
      const svg = generateMultiPlot(expressions, xmin, xmax, step, fallbackMessage, logScaleX, logScaleY);
      console.log(svg);
      return;
    } else {
      // Single expression case using new CLI syntax
      const expression = nextArg;
      const xminIdx = args.indexOf("--xmin");
      const xmaxIdx = args.indexOf("--xmax");
      const pointsIdx = args.indexOf("--points");
      if (xminIdx === -1 || xmaxIdx === -1 || pointsIdx === -1) {
        console.error("Missing required parameters for SVG plotting: --xmin, --xmax, --points");
        process.exit(1);
        return;
      }
      const xmin = parseFloat(args[xminIdx + 1]);
      const xmax = parseFloat(args[xmaxIdx + 1]);
      if (xmin >= xmax) {
        console.error("Invalid range: --xmin must be less than --xmax");
        process.exit(1);
        return;
      }
      const pointsCount = parseInt(args[pointsIdx + 1], 10);
      const step = (xmax - xmin) / pointsCount;
      const svg = generateSVGPlot(expression, xmin, xmax, step, fallbackMessage, logScaleX, logScaleY);
      console.log(svg);
      return;
    }
  } else {
    // Legacy syntax using --expr, --start, --end, and optional --step
    const exprIdx = args.indexOf("--expr");
    const startIdx = args.indexOf("--start");
    const endIdx = args.indexOf("--end");

    if (exprIdx === -1 || startIdx === -1 || endIdx === -1) {
      console.error("Missing required parameters for plotting: --expr, --start, --end");
      process.exit(1);
      return;
    }

    const expression = args[exprIdx + 1];

    const start = parseFloat(args[startIdx + 1]);
    const end = parseFloat(args[endIdx + 1]);

    if (start >= end) {
      console.error("Invalid range: --start must be less than --end");
      process.exit(1);
      return;
    }

    const stepIdx = args.indexOf("--step");
    let step = 0.1;
    if (stepIdx !== -1) {
      step = parseFloat(args[stepIdx + 1]);
    }

    const svg = generatePlot(expression, start, end, step, fallbackMessage, logScaleX, logScaleY);
    console.log(svg);
  }
}

export function main(args = []) {
  if (args.includes("--help") || args.includes("-h")) {
    showHelp();
    return;
  }
  if (args.includes("--version") || args.includes("-v")) {
    showVersion();
    return;
  }
  if (args.includes("--diagnostics")) {
    showDiagnostics(args);
    return;
  }
  if (args.includes("--plot") || args.includes("--plots")) {
    handlePlot(args);
    return;
  }
  console.log(`Run with: ${JSON.stringify(args)}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  main(args);
}
