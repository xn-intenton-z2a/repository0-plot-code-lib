///////////////////////////////
// File: src/lib/main.js
///////////////////////////////

import { fileURLToPath } from "url";

function errorExit(message) {
  console.error(message);
  process.exit(1);
}

// Enhanced implementation of numeric parameter conversion utility using regex validation
// Now supports alternative NaN aliases: "nan", "not a number", "notanumber", and "na" (case-insensitive, whitespace-tolerant).
// All recognized NaN tokens are uniformly converted to the string "NaN" for consistency across CLI and advanced mode.
// Adds conditional debug logging if DEBUG_NUMERIC environment variable is set.
function parseNumericParams(paramStr) {
  const tokens = paramStr.split(",");
  const result = [];
  // Regex to match valid numbers: integer, decimal, scientific notation, or NaN and its aliases
  const numberRegex = /^\s*([-+]?(?:(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?|nan|not\s*a\s*number|notanumber|na))\s*$/i;
  
  for (const token of tokens) {
    const trimmed = token.trim();
    // Check for near-miss tokens such as "n/a"
    const normalized = trimmed.toLowerCase().replace(/\s/g, '');
    if (normalized === "n/a") {
      errorExit(`Invalid numeric parameter '${trimmed}'. Did you mean one of the accepted tokens: 'NaN', 'not a number', 'notanumber', or 'na'?`);
    }
    if (!numberRegex.test(trimmed)) {
      errorExit(`Invalid numeric parameter '${trimmed}'`);
    }
    const lower = trimmed.toLowerCase();
    if (lower === "nan" || lower === "not a number" || lower === "notanumber" || lower === "na") {
      if (process.env.DEBUG_NUMERIC) {
        console.debug(`Normalized token '${trimmed}' to "NaN"`);
      }
      result.push("NaN");
    } else {
      result.push(Number(trimmed));
    }
  }
  return result;
}

export function main(args = []) {
  // Check if the --advanced flag is provided
  if (args.includes("--advanced")) {
    const filteredArgs = args.filter(arg => arg !== "--advanced");
    const [plotType, params] = filteredArgs;
    // If parameters contain a comma, parse them using the numeric utility
    let parsedParams = params;
    if (params && params.includes(",")) {
      parsedParams = parseNumericParams(params);
    }
    switch (plotType) {
      case "spiral":
        console.log("Advanced Plot: Spiral");
        advancedPlots.spiral(parsedParams);
        break;
      case "polarHeatmap":
        console.log("Advanced Plot: Polar Heatmap");
        advancedPlots.polarHeatmap(parsedParams);
        break;
      case "dualAxis":
        console.log("Advanced Plot: Dual Axis");
        advancedPlots.dualAxis(parsedParams);
        break;
      case "boxPlot":
        console.log("Advanced Plot: Box Plot");
        advancedPlots.boxPlot(parsedParams);
        break;
      case "violinPlot":
        console.log("Advanced Plot: Violin Plot");
        advancedPlots.violinPlot(parsedParams);
        break;
      case "cumulativeAverage":
        console.log("Advanced Plot: Cumulative Average");
        advancedPlots.cumulativeAverage(parsedParams);
        break;
      case "inverse":
        console.log("Advanced Plot: Inverse Function");
        advancedPlots.inverse(parsedParams);
        break;
      case "modulatedSine":
        console.log("Advanced Plot: Modulated Sine");
        advancedPlots.modulatedSine(parsedParams);
        break;
      case "extended3D":
        console.log("Advanced Plot: Extended 3D Plot");
        advancedPlots.extended3D(parsedParams);
        break;
      case "testPlot":
        console.log("Advanced Plot: Test Plot");
        advancedPlots.testPlot(parsedParams);
        break;
      case "contourPlot":
        console.log("Advanced Plot: Contour Plot");
        advancedPlots.contourPlot(parsedParams);
        break;
      default:
        errorExit("Error: Unknown advanced plot type.");
    }
    return;
  }

  // For non-advanced mode, standardize numeric conversion on parameters that include comma-separated tokens.
  const finalArgs = args.map(arg => {
    if (arg.includes(",")) {
      if (arg.includes(":")) {
        return arg.split(":").map(segment => {
          return segment.includes(",") ? parseNumericParams(segment) : segment;
        });
      } else {
        return parseNumericParams(arg);
      }
    }
    return arg;
  });

  console.log(`Run with: ${JSON.stringify(finalArgs)}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  main(args);
}

// Inlined advanced plotting implementations
const advancedPlots = {
  spiral: function(params) {
    console.log("Plotting spiral with params:", params);
  },
  polarHeatmap: function(params) {
    console.log("Plotting polar heatmap with params:", params);
  },
  dualAxis: function(params) {
    console.log("Plotting dual axis with params:", params);
  },
  boxPlot: function(params) {
    console.log("Plotting box plot with params:", params);
  },
  violinPlot: function(params) {
    console.log("Plotting violin plot with params:", params);
  },
  cumulativeAverage: function(params) {
    console.log("Plotting cumulative average with params:", params);
  },
  inverse: function(params) {
    console.log("Plotting inverse function with params:", params);
  },
  modulatedSine: function(params) {
    console.log("Plotting modulated sine with params:", params);
  },
  extended3D: function(params) {
    console.log("Plotting extended 3D plot with params:", params);
  },
  testPlot: function(params) {
    console.log("Test Plot with params:", params);
  },
  contourPlot: function(params) {
    console.log("Plotting contour plot with params:", params);
  }
};

export { advancedPlots };