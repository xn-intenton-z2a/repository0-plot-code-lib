/* File: src/lib/main.js */

import { fileURLToPath } from "url";
import pkg from "../../package.json" with { type: "json" };
import { compile } from "mathjs";

/**
 * Checks if the provided expression is a literal 'NaN', ignoring case and surrounding whitespace.
 * @param {string} expression - The expression to check.
 * @returns {boolean} - Returns true if expression is a literal 'NaN', otherwise false.
 */
export function isLiteralNaN(expression) {
  return expression.trim().toLowerCase() === 'nan';
}

/**
 * Generates an SVG plot for a given mathematical expression over a specific range.
 * Optionally, a custom fallback message can be provided to display when no valid data points are found.
 * 
 * @param {string} expression - The mathematical expression to evaluate.
 * @param {number} start - The starting value of x.
 * @param {number} end - The ending value of x.
 * @param {number} step - The increment step for x.
 * @param {string} [fallbackMessage] - Optional custom fallback message for non-finite evaluations.
 * @returns {string} - SVG string representing the plot or fallback message.
 */
export function generatePlot(expression, start, end, step, fallbackMessage) {
  let points = [];
  
  // Check for literal 'NaN'. If true, skip evaluation to trigger fallback SVG.
  if (isLiteralNaN(expression)) {
    console.warn("Literal 'NaN' input detected, generating fallback SVG output.");
  } else {
    const compiled = compile(expression);
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
  }

  // If no valid points, return fallback SVG with diagnostic details
  if (points.length === 0) {
    if (fallbackMessage) {
      return `<svg width="500" height="300" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="500" height="300" fill="white" stroke="black"/>
      <text x="50%" y="50%" alignment-baseline="middle" text-anchor="middle" fill="red">${fallbackMessage}</text>
    </svg>`;
    } else {
      return `<svg width="500" height="300" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="500" height="300" fill="white" stroke="black"/>
      <text x="50%" y="45%" alignment-baseline="middle" text-anchor="middle" fill="red">No valid data: expression evaluation returned only non-finite values (e.g. NaN, Infinity)</text>
      <text x="50%" y="55%" alignment-baseline="middle" text-anchor="middle" fill="red">Check the input expression for potential issues.</text>
    </svg>`;
    }
  }

  const svgWidth = 500;
  const svgHeight = 300;

  const xValues = points.map(point => point.x);
  const yValues = points.map(point => point.y);
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

// Alias generateSVGPlot to generatePlot for new API usage
export const generateSVGPlot = generatePlot;

/**
 * Generates an SVG plot for multiple mathematical expressions. Each expression is plotted as a distinct polyline with a unique color and a legend is added.
 * 
 * @param {string[]} expressions - Array of mathematical expressions to evaluate.
 * @param {number} start - The starting x value.
 * @param {number} end - The ending x value.
 * @param {number} step - The increment step for x.
 * @param {string} [fallbackMessage] - Optional fallback message if an expression yields no valid points.
 * @returns {string} - SVG string representing the multi-plot or fallback SVG if no valid data points are found for any expression.
 */
export function generateMultiPlot(expressions, start, end, step, fallbackMessage) {
  const svgWidth = 500;
  const svgHeight = 300;
  const colors = ["blue", "red", "green", "orange", "purple", "magenta", "cyan"];
  const series = [];
  let allValidPoints = [];

  // Process each expression
  for (const expr of expressions) {
    let points = [];
    if (isLiteralNaN(expr)) {
      console.warn(`Literal 'NaN' provided in expression '${expr}', generating fallback for this expression.`);
      // Leave points empty to trigger fallback later
    } else {
      const compiled = compile(expr);
      for (let x = start; x <= end; x += step) {
        try {
          const y = compiled.evaluate({ x });
          if (Number.isFinite(y)) {
            points.push({ x, y });
            allValidPoints.push({ x, y });
          }
        } catch (_err) {
          // Ignore evaluation error
        }
      }
    }
    series.push({ expression: expr, points });
  }

  // If no valid points for any expression, return fallback SVG
  if (allValidPoints.length === 0) {
    if (fallbackMessage) {
      return `<svg width="${svgWidth}" height="${svgHeight}" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="${svgWidth}" height="${svgHeight}" fill="white" stroke="black"/>
        <text x="50%" y="50%" alignment-baseline="middle" text-anchor="middle" fill="red">${fallbackMessage}</text>
      </svg>`;
    } else {
      return `<svg width="${svgWidth}" height="${svgHeight}" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="${svgWidth}" height="${svgHeight}" fill="white" stroke="black"/>
        <text x="50%" y="45%" alignment-baseline="middle" text-anchor="middle" fill="red">No valid data: all expressions returned non-finite values.</text>
        <text x="50%" y="55%" alignment-baseline="middle" text-anchor="middle" fill="red">Check the input expressions for potential issues.</text>
      </svg>`;
    }
  }

  // Determine overall y range from all valid points; x range is defined by start and end
  const xRange = end - start || 1;
  const yValues = allValidPoints.map(p => p.y);
  const minY = Math.min(...yValues);
  const maxY = Math.max(...yValues);
  const yRange = maxY - minY || 1;

  // Generate polyline elements for each series
  let polylines = '';
  series.forEach((serie, index) => {
    if (serie.points.length > 0) {
      const svgPoints = serie.points.map(({ x, y }) => {
        const scaledX = ((x - start) / xRange) * (svgWidth - 40) + 20;
        const scaledY = svgHeight - (((y - minY) / yRange) * (svgHeight - 40) + 20);
        return `${scaledX},${scaledY}`;
      }).join(' ');
      const color = colors[index % colors.length];
      polylines += `<polyline points="${svgPoints}" fill="none" stroke="${color}" stroke-width="2"/>
`;
    }
  });

  // Build legend for each expression
  let legendItems = '';
  const legendX = svgWidth - 110;
  let legendY = 20;
  series.forEach((serie, index) => {
    const color = colors[index % colors.length];
    legendItems += `<rect x="${legendX}" y="${legendY - 12}" width="10" height="10" fill="${color}" />
`;
    legendItems += `<text x="${legendX + 15}" y="${legendY - 2}" font-size="10" fill="black">${serie.expression}</text>
`;
    legendY += 15;
  });

  const svgContent = `<svg width="${svgWidth}" height="${svgHeight}" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="${svgWidth}" height="${svgHeight}" fill="white" stroke="black" />
    ${polylines}
    <g class="legend">
      ${legendItems}
    </g>
  </svg>`;

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
    const step = (xmax - xmin) / pointsCount;
    const svg = generateMultiPlot(expressions, xmin, xmax, step, fallbackMessage);
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
      const step = (xmax - xmin) / pointsCount;
      const svg = generateMultiPlot(expressions, xmin, xmax, step, fallbackMessage);
      console.log(svg);
      return;
    } else {
      // Single expression case using new CLI syntax
      const expression = nextArg;
      if (isLiteralNaN(expression)) {
        console.warn("Literal 'NaN' provided in expression, generating fallback SVG output.");
      }
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
      const step = (xmax - xmin) / pointsCount;
      const svg = generateSVGPlot(expression, xmin, xmax, step, fallbackMessage);
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
    if (isLiteralNaN(expression)) {
      console.warn("Literal 'NaN' provided in expression, generating fallback SVG output.");
    }

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

    const svg = generatePlot(expression, start, end, step, fallbackMessage);
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
