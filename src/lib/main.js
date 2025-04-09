///////////////////////////////
// File: src/lib/main.js
///////////////////////////////

import { fileURLToPath } from "url";

function errorExit(message) {
  console.error(message);
  process.exit(1);
}

// Default NaN aliases in lower case with normalized spacing
const defaultNaNAliases = [
  "nan",
  "not a number",
  "notanumber",
  "na",
  "not-a-number"
];

// Helper function to fetch accepted NaN aliases from environment variable or fallback to default.
function getAcceptedNaNAliases() {
  try {
    if (process.env.LOCALE_NAN_ALIASES) {
      const parsed = JSON.parse(process.env.LOCALE_NAN_ALIASES);
      if (Array.isArray(parsed)) {
        return new Set(parsed.map(token => token.toLowerCase().replace(/\s+/g, ' ').trim()));
      }
    }
  } catch (e) {
    // ignore error and fallback to default
  }
  return new Set(defaultNaNAliases);
}

// Optimized implementation of numeric parameter conversion utility.
function parseNumericParams(paramStr) {
  const acceptedNaNAliases = getAcceptedNaNAliases();
  const tokens = paramStr.split(",");
  const result = [];
  
  // Regex for valid numeric values: integer, decimal or scientific notation.
  const numericRegex = /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?$/;
  
  for (const token of tokens) {
    const trimmed = token.trim();
    // Skip empty tokens
    if (trimmed === "") continue;
    
    const lowerToken = trimmed.toLowerCase();
    // Check for near-miss tokens such as "n/a" by removing all spaces
    if (lowerToken.replace(/\s/g, '') === "n/a") {
      errorExit(`Invalid numeric parameter '${trimmed}'. Near-miss tokens like 'n/a' are not accepted. Did you mean one of the accepted tokens: ${Array.from(acceptedNaNAliases).join(", ")}?”);
    }
    
    // Normalize token for alias checking by replacing multiple spaces with a single space
    const normalizedAlias = lowerToken.replace(/\s+/g, ' ').trim();
    if (acceptedNaNAliases.has(normalizedAlias)) {
      if (process.env.DEBUG_NUMERIC) {
        console.debug(`Normalized token '${trimmed}' to "NaN"`);
      }
      result.push("NaN");
    } else if (numericRegex.test(trimmed)) {
      result.push(Number(trimmed));
    } else {
      errorExit(`Invalid numeric parameter '${trimmed}'`);
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
      case "scatterMatrix":
        console.log("Advanced Plot: Scatter Matrix");
        advancedPlots.scatterMatrix(parsedParams);
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
  },
  scatterMatrix: function(params) {
    console.log("Plotting scatter matrix with params:", params);
  }
};

export { advancedPlots };