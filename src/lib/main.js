///////////////////////////////
// File: src/lib/main.js
///////////////////////////////

import { fileURLToPath } from "url";
import { z } from "zod";

function errorExit(message) {
  console.error(message);
  process.exit(1);
}

// Default NaN aliases constant
const DEFAULT_NAN_ALIASES = new Set(["nan", "not a number", "notanumber", "na", "not-a-number"]);

// Helper function for normalizing aliases
function normalizeAlias(alias) {
  return alias.toLocaleLowerCase().trim().normalize("NFC");
}

// Utility function to get accepted NaN aliases
function getAcceptedNaNAliases() {
  // Normalize default aliases
  const defaultAliases = new Set();
  for (const alias of DEFAULT_NAN_ALIASES) {
    defaultAliases.add(normalizeAlias(alias));
  }

  if (process.env.LOCALE_NAN_ALIASES) {
    try {
      const customAliases = JSON.parse(process.env.LOCALE_NAN_ALIASES);
      if (!Array.isArray(customAliases)) {
        console.warn("Invalid configuration for LOCALE_NAN_ALIASES. Using default NaN aliases.");
        return defaultAliases;
      }
      const normalizedCustom = new Set(customAliases.map(a => normalizeAlias(a)));
      if (process.env.LOCALE_NAN_OVERRIDE) {
        return normalizedCustom;
      } else {
        // Merge default aliases with custom ones
        for (const alias of defaultAliases) {
          normalizedCustom.add(alias);
        }
        return normalizedCustom;
      }
    } catch (err) {
      console.warn("Invalid configuration for LOCALE_NAN_ALIASES. Using default NaN aliases.");
      return defaultAliases;
    }
  }
  return defaultAliases;
}

// Optimized implementation of numeric parameter conversion utility with consolidated NaN validation using Zod schema validation.
// Now leveraging Zod for declarative input transformation and validation to improve robustness and clarity.
// Added an optional errorHandler callback parameter to allow customizable error processing instead of calling errorExit directly.
function parseNumericParams(paramStr, errorHandler) {
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

  // Zod schema for validating and transforming each token
  const tokenSchema = z.string().transform(token => {
    const normToken = normalizeAlias(token);
    if (normToken === "n/a") {
      throw new Error(`Invalid numeric parameter '${token.trim()}'. Near-miss token 'n/a' is not accepted. Did you mean one of the accepted tokens: ${Array.from(getAcceptedNaNAliases()).join(", ")} ?`);
    }
    if (getAcceptedNaNAliases().has(normToken)) {
      if (process.env.DEBUG_NUMERIC) {
        console.debug(`Normalized token '${token.trim()}' to native NaN`);
      }
      return Number.NaN;
    }
    if (numericRegex.test(token.trim())) {
      return Number(token.trim());
    }
    throw new Error(`Invalid numeric parameter '${token.trim()}'`);
  });

  for (const token of tokens) {
    const trimmed = token.trim();
    if (trimmed === "") continue; // Skip empty tokens
    try {
      const value = tokenSchema.parse(token);
      result.push(value);
    } catch (err) {
      if (typeof errorHandler === 'function') {
        errorHandler(err.message);
        throw err;
      } else {
        errorExit(err.message);
      }
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
    let parsedParams = params;
    // Check if params is a valid JSON configuration
    if (params && params.trim().startsWith("{") && params.trim().endsWith("}")) {
      try {
        parsedParams = JSON.parse(params);
      } catch (err) {
        errorExit("Invalid JSON configuration for advanced plot parameters.");
      }
    } else if (params && (params.includes(",") || params.includes(";") || /\s+/.test(params))) {
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

  // For non-advanced mode, check for colon-separated arguments first
  const finalArgs = args.map(arg => {
    if (arg.includes(":")) {
      // Split only on the first colon to separate label and parameters
      const parts = arg.split(/:(.+)/);
      const label = parts[0].trim();
      const paramStr = parts[1] ? parts[1].trim() : "";
      // Check if paramStr is a valid JSON configuration
      let parsedParams;
      if (paramStr && paramStr.startsWith("{") && paramStr.endsWith("}")) {
        try {
          parsedParams = JSON.parse(paramStr);
        } catch (err) {
          errorExit("Invalid JSON configuration for plot parameters.");
        }
      } else {
        parsedParams = paramStr ? parseNumericParams(paramStr) : [];
      }
      return [label, parsedParams];
    } else if (arg.includes(",") || arg.includes(";")) {
      return parseNumericParams(arg);
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
