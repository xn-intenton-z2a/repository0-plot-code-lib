// /////////////////////////////
// File: src/lib/main.js
// /////////////////////////////

import { fileURLToPath } from "url";
import { z } from "zod";

/**
 * Immediately exits the process after logging an error message.
 * @param {string} message - The error message to log before exiting.
 */
function errorExit(message) {
  console.error(message);
  process.exit(1);
}

// A set of default aliases representing Not-a-Number (NaN) values in various languages.
const DEFAULT_NAN_ALIASES = new Set([
  "nan",
  "not a number",
  "notanumber",
  "na",
  "not-a-number",
  "nicht eine zahl",
  "pas un nombre",
  "no es un número",
  "non è un numero",
]);

/**
 * Normalizes an alias string by applying trimming, Unicode NFC normalization, and converting to lower case.
 * This ensures that both precomposed and decomposed Unicode forms are handled uniformly.
 *
 * @param {string} alias - The alias string to normalize.
 * @returns {string} - The normalized alias.
 */
function normalizeAlias(alias) {
  // Normalize by trimming whitespace, applying Unicode NFC normalization, then converting to lower-case
  return alias.trim().normalize("NFC").toLocaleLowerCase();
}

/**
 * Cleans a numeric token by removing or replacing thousands separators based on locale-specific configurations.
 * For European locale, dots are removed as thousands separators and commas replaced with dots.
 * For English formatting, commas are simply removed.
 *
 * @param {string} token - The numeric token to process.
 * @returns {string} - The processed numeric token.
 */
function parseFormattedNumberValue(token) {
  if (process.env.ENABLE_THOUSANDS_SEPARATOR) {
    const locale = process.env.NUMERIC_LOCALE || "en";
    if (locale.toLowerCase() === "eu") {
      // European number format: remove dots as thousands separators and replace comma with period
      token = token.replace(/\./g, "");
      token = token.replace(/,/g, ".");
    } else {
      // Default English formatting: remove commas
      token = token.replace(/,/g, "");
    }
  }
  return token;
}

/**
 * Retrieves the set of accepted NaN aliases.
 * It begins with a set of default aliases and merges with locale-specific custom aliases if provided via environment variables.
 *
 * Behavior:
 * - If STRICT_NAN_MODE is enabled, only the canonical normalized "nan" is acceptable.
 * - If LOCALE_NAN_ALIASES is provided and valid (as a JSON array), the custom aliases are normalized.
 *   If LOCALE_NAN_OVERRIDE is set, only the custom aliases are used; otherwise, they are merged with the default aliases.
 * - If LOCALE_NAN_ALIASES is invalid, a warning is printed and the default aliases are used.
 *
 * @returns {Set<string>} - A set of normalized accepted NaN aliases.
 */
function getAcceptedNaNAliases() {
  if (process.env.STRICT_NAN_MODE) {
    return new Set([normalizeAlias("NaN")]);
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
      const normalizedCustom = new Set(customAliases.map((a) => normalizeAlias(a)));
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

// Regular expression to validate numeric input. It supports integers, decimals, and scientific notation.
const numericRegex = /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?$/;

/**
 * Parses a string of numeric parameters, handling multiple delimiters and locale-specific formatting.
 * The function splits the input token by commas, semicolons, or whitespace, trims extra spaces,
 * and processes each token using Zod for validation and transformation.
 *
 * @param {string} paramStr - The string containing numeric parameters.
 * @param {Function} [errorHandler] - Optional custom error handler function.
 * @returns {Array<number>} - The array of parsed numeric values (with NaN values as native NaN).
 */
function parseNumericParams(paramStr, errorHandler) {
  let tokens;
  // Determine delimiter: use commas or semicolons if present; otherwise, split by whitespace.
  if (paramStr.includes(",") || paramStr.includes(";")) {
    tokens = paramStr.split(/[,;]+/);
  } else {
    tokens = paramStr.split(/\s+/);
  }

  const result = [];
  const acceptedAliases = getAcceptedNaNAliases();

  // Zod schema for validating and transforming each token
  const tokenSchema = z.string().transform((token) => {
    const trimmedToken = token.trim();
    const normToken = normalizeAlias(trimmedToken);
    // Disallow near-miss tokens such as "n/a"
    if (normToken === "n/a") {
      const accepted = Array.from(acceptedAliases).sort().join(", ");
      throw new Error(
        `Invalid numeric parameter '${trimmedToken}'. Detected near-miss token 'n/a'. Expected ${process.env.STRICT_NAN_MODE ? "canonical NaN" : "an accepted NaN alias"}: ${accepted}.`,
      );
    }
    // If token matches an accepted NaN alias, return native NaN
    if (acceptedAliases.has(normToken)) {
      if (process.env.DEBUG_NUMERIC) {
        console.debug(`Normalized token '${trimmedToken}' to native NaN`);
      }
      return Number.NaN;
    }
    // Apply locale-specific formatting for thousands separators if enabled
    let processedToken = trimmedToken;
    if (process.env.ENABLE_THOUSANDS_SEPARATOR) {
      processedToken = parseFormattedNumberValue(trimmedToken);
    }
    // Validate numeric format using regex
    if (numericRegex.test(processedToken)) {
      return Number(processedToken);
    }
    const accepted = Array.from(acceptedAliases).sort().join(", ");
    throw new Error(
      `Invalid numeric parameter '${trimmedToken}'. Expected a valid number or ${process.env.STRICT_NAN_MODE ? "canonical NaN" : "an accepted NaN alias"}: ${accepted}.`,
    );
  });

  for (const token of tokens) {
    const trimmed = token.trim();
    if (trimmed === "") continue; // Skip empty tokens from extra delimiters
    try {
      const value = tokenSchema.parse(token);
      result.push(value);
    } catch (err) {
      if (typeof errorHandler === "function") {
        errorHandler(err.message);
        throw err;
      } else {
        errorExit(err.message);
      }
    }
  }
  return result;
}

/**
 * Parses a JSON configuration string using Zod for validation. Provides detailed error messages for invalid JSON.
 * @param {string} configStr - The JSON configuration string to parse.
 * @returns {any} - The validated JSON object.
 */
function parseJSONConfig(configStr) {
  // Use a generic schema for JSON objects
  const jsonSchema = z.any();
  try {
    const parsed = JSON.parse(configStr.trim());
    return jsonSchema.parse(parsed);
  } catch (error) {
    errorExit(`Invalid JSON configuration: ${error.message}`);
  }
}

// Advanced plotting implementations are inlined under the advancedPlots object
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
  },
};

/**
 * The main function which processes CLI arguments and executes plotting commands.
 * It handles both batch plotting commands and advanced mode commands.
 *
 * Command processing:
 * - If an argument starts with "--advanced", it processes the next two arguments
 *   as the plot type and parameters respectively. The parameters can be in JSON format or numeric string.
 * - For non-advanced commands separated by a colon, it splits the command into label and parameter string,
 *   then parses the numeric parameters or JSON configuration.
 * - If an argument contains numeric delimiters without a colon, it is processed as a plain numeric parameter sequence.
 *
 * This function demonstrates integration of Zod-based validation for robust parsing of numeric values.
 *
 * @param {Array<string>} args - An array of CLI arguments.
 */
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
      const params = args[i + 2];
      let parsedParams = params;
      if (params && params.trim().startsWith("{") && params.trim().endsWith("}")) {
        // Use dedicated JSON parsing function for nested JSON configurations
        parsedParams = parseJSONConfig(params);
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
          parsedParams = parseJSONConfig(paramStr);
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

export { advancedPlots, getAcceptedNaNAliases, parseNumericParams, main, parseJSONConfig };
