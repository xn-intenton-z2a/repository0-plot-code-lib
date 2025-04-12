/* File: src/lib/main.js */

import { fileURLToPath } from "url";
import pkg from "../../package.json" with { type: "json" };
import { compile } from "mathjs";
import { generateSVGPlot } from "./plotSVG.js";

export function generatePlot(expression, start, end, step) {
  const compiled = compile(expression);
  const points = [];

  for (let x = start; x <= end; x += step) {
    try {
      const y = compiled.evaluate({ x });
      if (Number.isFinite(y)) {
        points.push({ x, y });
      }
    } catch (_err) {
      // Ignoring evaluation error
    }
  }

  if (points.length === 0) {
    return `<svg width="500" height="300" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="500" height="300" fill="white" stroke="black"/>
      <text x="50%" y="45%" alignment-baseline="middle" text-anchor="middle" fill="red">No valid data</text>
      <text x="50%" y="55%" alignment-baseline="middle" text-anchor="middle" fill="red">Expression evaluation returned only non-finite values</text>
    </svg>`;
  }

  const svgWidth = 500;
  const svgHeight = 300;

  const xValues = points.map((point) => point.x);
  const yValues = points.map((point) => point.y);
  const minX = Math.min(...xValues);
  const maxX = Math.max(...xValues);
  const minY = Math.min(...yValues);
  const maxY = Math.max(...yValues);

  const xRange = maxX - minX || 1;
  const yRange = maxY - minY || 1;

  const svgPoints = points
    .map(({ x, y }) => {
      const scaledX = ((x - minX) / xRange) * (svgWidth - 40) + 20;
      const scaledY = svgHeight - (((y - minY) / yRange) * (svgHeight - 40) + 20);
      return `${scaledX},${scaledY}`;
    })
    .join(" ");

  const svgContent = `<svg width="${svgWidth}" height="${svgHeight}" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="${svgWidth}" height="${svgHeight}" fill="white" stroke="black"/>
    <polyline points="${svgPoints}" fill="none" stroke="blue" stroke-width="2"/>
  </svg>`;

  return svgContent;
}

function showHelp() {
  console.log(`repository0-plot-code-lib: A versatile CLI tool for plotting mathematical functions.
    
Usage: node src/lib/main.js [options]

Options:
  -h, --help          display help information
  -v, --version       display version information
  --diagnostics       enable diagnostics mode
  --plot              generate a plot. Use either legacy parameters (--expr, --start, --end, [--step]) or the new syntax:
                      --plot "<expression>" --xmin <number> --xmax <number> --points <integer greater than 1>
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
  // Determine if using new CLI syntax: --plot <expression> --xmin ...
  const plotIndex = args.indexOf("--plot");
  const nextArg = args[plotIndex + 1];
  if (nextArg && !nextArg.startsWith("--")) {
    // New syntax for SVG plot generation
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
    if (isNaN(xmin)) {
      console.error("Invalid numeric value for --xmin");
      process.exit(1);
      return;
    }
    const xmax = parseFloat(args[xmaxIdx + 1]);
    if (isNaN(xmax)) {
      console.error("Invalid numeric value for --xmax");
      process.exit(1);
      return;
    }
    if (xmin >= xmax) {
      console.error("Invalid range: --xmin must be less than --xmax");
      process.exit(1);
      return;
    }
    const pointsCount = parseInt(args[pointsIdx + 1], 10);
    if (isNaN(pointsCount) || pointsCount <= 1) {
      console.error("Invalid numeric value for --points. It must be an integer greater than 1.");
      process.exit(1);
      return;
    }
    const svg = generateSVGPlot(expression, xmin, xmax, pointsCount);
    console.log(svg);
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
    if (isNaN(start)) {
      console.error("Invalid numeric value for --start");
      process.exit(1);
      return;
    }
    const end = parseFloat(args[endIdx + 1]);
    if (isNaN(end)) {
      console.error("Invalid numeric value for --end");
      process.exit(1);
      return;
    }

    if (start >= end) {
      console.error("Invalid range: --start must be less than --end");
      process.exit(1);
      return;
    }

    const stepIdx = args.indexOf("--step");
    let step = 0.1;
    if (stepIdx !== -1) {
      step = parseFloat(args[stepIdx + 1]);
      if (isNaN(step)) {
        console.error("Invalid numeric value for --step");
        process.exit(1);
        return;
      }
    }

    const svg = generatePlot(expression, start, end, step);
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
  if (args.includes("--plot")) {
    handlePlot(args);
    return;
  }
  console.log(`Run with: ${JSON.stringify(args)}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  main(args);
}

/* ======================================================================== */
/* File: src/lib/plotSVG.js */

import { compile } from "mathjs";

export function generateSVGPlot(expression, xmin, xmax, pointsCount) {
  const compiled = compile(expression);
  const points = [];
  const step = (xmax - xmin) / (pointsCount - 1);

  for (let x = xmin; x <= xmax; x += step) {
    try {
      const y = compiled.evaluate({ x });
      if (Number.isFinite(y)) {
        points.push({ x, y });
      }
    } catch (_err) {
      // Ignoring evaluation error
    }
  }

  if (points.length === 0) {
    return `<svg width="500" height="300" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="500" height="300" fill="white" stroke="black"/>
      <text x="50%" y="45%" alignment-baseline="middle" text-anchor="middle" fill="red">No valid data</text>
      <text x="50%" y="55%" alignment-baseline="middle" text-anchor="middle" fill="red">Expression evaluation returned only non-finite values</text>
    </svg>`;
  }

  const svgWidth = 500;
  const svgHeight = 300;
  const xValues = points.map(p => p.x);
  const yValues = points.map(p => p.y);
  const minX = Math.min(...xValues);
  const maxX = Math.max(...xValues);
  const minY = Math.min(...yValues);
  const maxY = Math.max(...yValues);
  const xRange = maxX - minX || 1;
  const yRange = maxY - minY || 1;
  const svgPoints = points.map(({ x, y }) => {
    const scaledX = ((x - minX) / xRange) * (svgWidth - 40) + 20;
    const scaledY = svgHeight - (((y - minY) / yRange) * (svgHeight - 40) + 20);
    return `${scaledX},${scaledY}`;
  }).join(" ");
  return `<svg width="${svgWidth}" height="${svgHeight}" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="${svgWidth}" height="${svgHeight}" fill="white" stroke="black"/>
    <polyline points="${svgPoints}" fill="none" stroke="blue" stroke-width="2"/>
  </svg>`;
}
