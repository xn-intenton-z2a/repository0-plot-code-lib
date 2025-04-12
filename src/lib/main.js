/* File: src/lib/main.js */

import { fileURLToPath } from "url";
import pkg from "../../package.json" assert { type: "json" };
import { compile } from "mathjs";

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
      <text x="50%" y="50%" alignment-baseline="middle" text-anchor="middle" fill="red">No valid data</text>
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
  -h, --help       display help information
  -v, --version    display version information
  --diagnostics    enable diagnostics mode
  --plot           generate a plot with parameters
  --expr <expression>  expression (required with --plot)
  --start <number>     start value (required with --plot)
  --end <number>       end value (required with --plot)
  --step <number>      step value (optional, default 0.1)
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
  const exprIdx = args.indexOf("--expr");
  const startIdx = args.indexOf("--start");
  const endIdx = args.indexOf("--end");

  if (exprIdx === -1 || startIdx === -1 || endIdx === -1) {
    console.error("Missing required parameters for plotting: --expr, --start, --end");
    process.exit(1);
  }

  const expression = args[exprIdx + 1];
  const start = parseFloat(args[startIdx + 1]);
  if (isNaN(start)) {
    console.error("Invalid numeric value for --start");
    process.exit(1);
  }
  const end = parseFloat(args[endIdx + 1]);
  if (isNaN(end)) {
    console.error("Invalid numeric value for --end");
    process.exit(1);
  }

  if (start >= end) {
    console.error("Invalid range: --start must be less than --end");
    process.exit(1);
  }

  const stepIdx = args.indexOf("--step");
  let step = 0.1;
  if (stepIdx !== -1) {
    step = parseFloat(args[stepIdx + 1]);
    if (isNaN(step)) {
      console.error("Invalid numeric value for --step");
      process.exit(1);
    }
  }

  try {
    const svg = generatePlot(expression, start, end, step);
    console.log(svg);
  } catch (e) {
    console.error("Error generating plot:", e.message);
    process.exit(1);
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
