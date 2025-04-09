///////////////////////////////
// File: src/lib/main.js
///////////////////////////////

import { fileURLToPath } from "url";
import { z } from "zod";

function errorExit(message) {
  console.error(message);
  process.exit(1);
}

// Default NaN aliases constant, expanded to include common international representations
const DEFAULT_NAN_ALIASES = new Set([
  "nan",
  "not a number",
  "notanumber",
  "na",
  "not-a-number",
  "nicht eine zahl",
  "pas un nombre",
  "no es un número",
  "non è un numero"
]);

// Helper function for normalizing aliases
// Normalization order: trim, NFC normalization, then lower-case to properly handle decomposed and composed Unicode forms.
function normalizeAlias(alias) {
  return alias.trim().normalize("NFC").toLocaleLowerCase();
}

// Helper function to clean numeric token if thousands separator parsing is enabled
function parseFormattedNumberValue(token) {
  if (process.env.ENABLE_THOUSANDS_SEPARATOR) {
    const locale = process.env.NUMERIC_LOCALE || 'en';
    if (locale.toLowerCase() === 'eu') {
      // For European formats, remove dot as thousands separator and replace comma with period
      token = token.replace(/\./g, '');
      token = token.replace(/,/g, '.');
    } else {
      // Default English formatting: remove commas as thousands separators
      token = token.replace(/,/g, '');
    }
  }
  return token;
}

// Utility function to get accepted NaN aliases
// When STRICT_NAN_MODE is enabled, only the canonical normalized 'nan' is accepted.
function getAcceptedNaNAliases() {
  if (process.env.STRICT_NAN_MODE) {
    return new Set([normalizeAlias('NaN')]);
  }
  
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

// Regex for valid numeric values: integer, decimal or scientific notation.
const numericRegex = /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?$/;

// Optimized implementation of numeric parameter conversion using Zod for validation and transformation.
// This function processes delimiters (commas, semicolons, whitespace) and normalizes tokens to support international and strict NaN alias handling.
function parseNumericParams(paramStr, errorHandler) {
  let tokens;
  // Determine delimiter: if comma or semicolon exists, split using them; otherwise use whitespace splitting.
  if (paramStr.includes(",") || paramStr.includes(";")) {
    tokens = paramStr.split(/[,;]+/);
  } else {
    tokens = paramStr.split(/\s+/);
  }

  const result = [];
  const acceptedAliases = getAcceptedNaNAliases();

  // Zod schema for validating and transforming each token
  const tokenSchema = z.string().transform(token => {
    const trimmedToken = token.trim();
    const normToken = normalizeAlias(trimmedToken);
    // Reject near-miss tokens such as "n/a"
    if (normToken === "n/a") {
      const accepted = Array.from(acceptedAliases).sort().join(", ");
      throw new Error(`Invalid numeric parameter '${trimmedToken}'. Near-miss token 'n/a' is not accepted. Accepted tokens: ${accepted}.`);
    }
    // If token is a recognized NaN alias, return native NaN
    if (acceptedAliases.has(normToken)) {
      if (process.env.DEBUG_NUMERIC) {
        console.debug(`Normalized token '${trimmedToken}' to native NaN`);
      }
      return Number.NaN;
    }
    // Process token for thousands separator if enabled
    let processedToken = trimmedToken;
    if (process.env.ENABLE_THOUSANDS_SEPARATOR) {
      processedToken = parseFormattedNumberValue(trimmedToken);
    }
    if (numericRegex.test(processedToken)) {
      return Number(processedToken);
    }
    throw new Error(`Invalid numeric parameter '${trimmedToken}'. Expected a valid number or an accepted NaN alias.`);
  });

  for (const token of tokens) {
    const trimmed = token.trim();
    if (trimmed === "") continue; // Skip empty tokens from extra delimiters
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

// Refactored main function to support batch plotting commands
function main(args = []) {
  if (args.length === 0) {
    console.log("Run with: []");
    return;
  }

  let i = 0;
  while (i < args.length) {
    if (args[i] === "--advanced") {
      if (i + 2 >= args.length) {
        errorExit("Insufficient arguments for advanced command.");
      }
      const plotType = args[i + 1];
      let params = args[i + 2];
      let parsedParams = params;
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
      i += 3;
    } else {
      const arg = args[i];
      if (arg.includes(":")) {
        const parts = arg.split(/:(.+)/);
        const label = parts[0].trim();
        const paramStr = parts[1] ? parts[1].trim() : "";
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
        console.log(`Run with: [["${label}", ${JSON.stringify(parsedParams)}]]`);
      } else if (arg.includes(",") || arg.includes(";") || /\s+/.test(arg)) {
        const parsed = parseNumericParams(arg);
        console.log(`Run with: ${JSON.stringify(parsed)}`);
      } else {
        console.log(`Run with: ${arg}`);
      }
      i++;
    }
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  main(args);
}

export { advancedPlots, getAcceptedNaNAliases, parseNumericParams, main };
