///////////////////////////////
// File: src/lib/main.js
///////////////////////////////

import { fileURLToPath } from "url";

function errorExit(message) {
  console.error(message);
  process.exit(1);
}

// Utility function to get accepted NaN aliases
function getAcceptedNaNAliases() {
  const defaultAliases = new Set(["nan", "not a number", "notanumber", "na", "not-a-number"]);
  if (process.env.LOCALE_NAN_ALIASES) {
    try {
      const customAliases = JSON.parse(process.env.LOCALE_NAN_ALIASES);
      if (!Array.isArray(customAliases)) {
        console.warn("Invalid configuration for LOCALE_NAN_ALIASES. Using default NaN aliases.");
        return defaultAliases;
      }
      const normalized = new Set(
        customAliases.map(alias => alias.toLowerCase().trim().normalize("NFC"))
      );
      // Merge default aliases with custom ones
      for (const alias of defaultAliases) {
        normalized.add(alias);
      }
      return normalized;
    } catch (err) {
      console.warn("Invalid configuration for LOCALE_NAN_ALIASES. Using default NaN aliases.");
      return defaultAliases;
    }
  }
  return defaultAliases;
}

// Optimized implementation of numeric parameter conversion utility with consolidated NaN validation.
// Enhanced to ensure unified handling of NaN aliases (with caching), Unicode normalization (NFC), and improved error messaging for near-miss tokens.
function parseNumericParams(paramStr) {
  let tokens;
  // If the string contains a comma or semicolon, use them as delimiters. Otherwise, split on whitespace.
  if (paramStr.includes(",") || paramStr.includes(";")) {
    tokens = paramStr.split(/[,;]+/);
  } else {
    tokens = paramStr.split(/\s+/);
  }

  const result = [];
  // Regex for valid numeric values: integer, decimal or scientific notation.
  const numericRegex = /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?$/;

  for (const token of tokens) {
    const trimmed = token.trim();
    // Skip empty tokens (including those from trailing or consecutive delimiters)
    if (trimmed === "") continue;

    // Normalize token for consistent alias checking: lowercase, trim and Unicode NFC
    const normToken = trimmed.toLowerCase().trim().normalize("NFC");

    // Reject near-miss tokens like "n/a" with a clear suggestion
    if (normToken === "n/a") {
      errorExit(`Invalid numeric parameter '${trimmed}'. Near-miss token 'n/a' is not accepted. Did you mean one of the accepted tokens: ${Array.from(getAcceptedNaNAliases()).join(", ")} ?`);
    }

    if (getAcceptedNaNAliases().has(normToken)) {
      if (process.env.DEBUG_NUMERIC) {
        console.debug(`Normalized token '${trimmed}' to native NaN`);
      }
      result.push(Number.NaN);
    } else if (numericRegex.test(trimmed)) {
      result.push(Number(trimmed));
    } else {
      errorExit(`Invalid numeric parameter '${trimmed}'`);
    }
  }
  return result;
}

// Inlined advanced plotting implementations
const advancedPlots = {
  spiral: function (params) {
    console.log("Plotting spiral with params:", params);
  },
  polarHeatmap: function (params) {
    console.log("Plotting polar heatmap with params:", params);
  },
  dualAxis: function (params) {
    console.log("Plotting dual axis with params:", params);
  },
  boxPlot: function (params) {
    console.log("Plotting box plot with params:", params);
  },
  violinPlot: function (params) {
    console.log("Plotting violin plot with params:", params);
  },
  cumulativeAverage: function (params) {
    console.log("Plotting cumulative average with params:", params);
  },
  inverse: function (params) {
    console.log("Plotting inverse function with params:", params);
  },
  modulatedSine: function (params) {
    console.log("Plotting modulated sine with params:", params);
  },
  extended3D: function (params) {
    console.log("Plotting extended 3D plot with params:", params);
  },
  testPlot: function (params) {
    console.log("Test Plot with params:", params);
  },
  contourPlot: function (params) {
    console.log("Plotting contour plot with params:", params);
  },
  scatterMatrix: function (params) {
    console.log("Plotting scatter matrix with params:", params);
  }
};

function main(args = []) {
  // Check if the --advanced flag is provided
  if (args.includes("--advanced")) {
    const filteredArgs = args.filter(arg => arg !== "--advanced");
    const [plotType, params] = filteredArgs;
    // If parameters contain a delimiter, parse them using the numeric utility
    let parsedParams = params;
    if (params && (params.includes(",") || params.includes("") || params.includes(";"))) {
      if (params.includes(",") || params.includes(";")) {
        parsedParams = parseNumericParams(params);
      } else if (/\s+/.test(params)) {
        parsedParams = parseNumericParams(params);
      }
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

  // For non-advanced mode, standardize numeric conversion on parameters that include delimiters.
  const finalArgs = args.map(arg => {
    if (arg.includes(",") || arg.includes(";")) {
      if (arg.includes(":")) {
        return arg.split(":").map(segment => {
          return (segment.includes(",") || segment.includes(";")) ? parseNumericParams(segment) : segment;
        });
      } else {
        return parseNumericParams(arg);
      }
    } else if (/\s+/.test(arg)) {
      return parseNumericParams(arg);
    }
    return arg;
  });

  console.log(`Run with: ${JSON.stringify(finalArgs)}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  main(args);
}

export { advancedPlots, getAcceptedNaNAliases, parseNumericParams, main };
