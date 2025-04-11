#!/usr/bin/env node
/* File: src/lib/main.js */
// src/lib/main.js

import { fileURLToPath } from "url";
import chalk, { Chalk } from "chalk";
import { existsSync, readFileSync, appendFileSync, watchFile } from "fs";
import path from "path";
import { z } from "zod";

// Global configuration schema using zod
const globalConfigSchema = z.object({
  CLI_COLOR_SCHEME: z.string().optional(),
  LOG_LEVEL: z.string().optional(),
  ERROR_REPORTING_URL: z.string().url().optional(),
  LOCALE: z.string().optional(),
  defaultArgs: z.array(z.string()).optional(),
  FALLBACK_NUMBER: z.string().optional(),
  ERROR_RETRY_DELAYS: z.union([z.string(), z.array(z.number())]).optional(),
  ERROR_MAX_ATTEMPTS: z.string().optional(),
  ALLOW_NAN: z.boolean().optional(),
  additionalNaNValues: z.array(z.string()).optional(),
  DISABLE_FALLBACK_WARNINGS: z.boolean().optional(),
  CASE_SENSITIVE_NAN: z.boolean().optional() // New config: case sensitive NaN matching
});

// Global configuration cache for hot reloading
let globalConfigCache = null;
// Global flag for CLI to suppress NaN fallback warnings
let cliSuppressNanWarnings = false;

// Global map to deduplicate NaN fallback warnings in batch processing
let warnedNaNWarnings = new Map();

// Exported for testing purposes to clear the config cache and warning cache
export function resetGlobalConfigCache() {
  globalConfigCache = null;
}

export function resetFallbackWarningCache() {
  // Instead of clearing the existing Map, reinitialize it to ensure complete reset
  warnedNaNWarnings = new Map();
}

// Loads the global configuration from available config files
function loadGlobalConfig() {
  const configPaths = [];
  const cwdConfigPath = path.join(process.cwd(), ".repository0plotconfig.json");
  configPaths.push(cwdConfigPath);
  const homeDir = process.env.HOME || process.env.USERPROFILE;
  if (homeDir) {
    configPaths.push(path.join(homeDir, ".repository0plotconfig.json"));
  }
  let mergedConfig = {};
  for (const configPath of configPaths) {
    if (existsSync(configPath)) {
      try {
        const content = readFileSync(configPath, "utf-8");
        const json = JSON.parse(content);
        mergedConfig = { ...mergedConfig, ...json };
      } catch (err) {
        console.error(chalk.red(`Global config error [${configPath}]: ${err.message}. Ignoring this config.`));
      }
    }
  }
  const result = globalConfigSchema.safeParse(mergedConfig);
  if (!result.success) {
    console.error(chalk.red(`Global config validation error: ${result.error}. Using default configuration.`));
    return {};
  }
  return result.data;
}

// Returns the current global configuration, using the cached version if available
// In test environment we reload config to allow dynamic changes
function getGlobalConfig() {
  if (!globalConfigCache || process.env.NODE_ENV === "test") {
    globalConfigCache = loadGlobalConfig();
  }
  return globalConfigCache;
}

// Sets up a watcher on the local global configuration file to enable hot reloading
function watchGlobalConfig() {
  const cwdConfigPath = path.join(process.cwd(), ".repository0plotconfig.json");
  if (existsSync(cwdConfigPath)) {
    watchFile(cwdConfigPath, { interval: 1000 }, (curr, prev) => {
      try {
        const newConfig = loadGlobalConfig();
        globalConfigCache = newConfig;
        console.log(chalk.green("Global configuration reloaded."));
      } catch (err) {
        console.error(chalk.red("Failed to reload global configuration: " + err.message));
      }
    });
  } else {
    console.warn(chalk.yellow("No local configuration file to watch."));
  }
}

// Helper function to clean input string by normalizing Unicode and trimming whitespace
function cleanString(str) {
  return str.normalize("NFKC").trim();
}

// Helper function to format standardized warning message for NaN fallbacks
function formatNaNWarning(cleanedInput, normalized, fallbackNumber, additionalVariants, locale) {
  return JSON.stringify({
    level: "warn",
    event: "NaNFallback",
    originalInput: cleanedInput,
    normalized: normalized,
    fallbackValue: fallbackNumber.toString().trim(),
    customNaNVariants: additionalVariants,
    locale: locale
  });
}

// Consolidated helper function to check if a string represents a NaN variant
// This function now respects the CASE_SENSITIVE_NAN configuration for both built-in and custom variants.
function isNaNVariant(input, additionalVariants = []) {
  const cleanedInput = cleanString(input);
  const config = getGlobalConfig();
  const caseSensitive = config.CASE_SENSITIVE_NAN === true;
  // Define built-in NaN variants based on case sensitivity
  const builtInVariants = caseSensitive ? ["NaN", "+NaN", "-NaN"] : ["nan", "+nan", "-nan"];
  const inputToCompare = caseSensitive ? cleanedInput : cleanedInput.toLowerCase();
  if (builtInVariants.includes(inputToCompare)) return true;
  // Clean and adjust custom NaN variants according to case sensitivity
  const customVariants = additionalVariants.map(v => {
    const cleaned = cleanString(v);
    return caseSensitive ? cleaned : cleaned.toLowerCase();
  });
  return customVariants.includes(inputToCompare);
}

// Unified fallback handler to process invalid numeric inputs using fallback value and emit structured JSON warnings
function fallbackHandler(originalInput, normalized, fallbackNumber, additionalVariants, config, logger) {
  const cleanedInput = cleanString(originalInput);
  if (fallbackNumber !== undefined && fallbackNumber !== null && fallbackNumber.toString().trim() !== '') {
    if (!config.DISABLE_FALLBACK_WARNINGS && !cliSuppressNanWarnings) {
      const locale = config.LOCALE || "en-US";
      const key = JSON.stringify({
        normalized,
        fallbackValue: fallbackNumber.toString().trim(),
        customNaNVariants: additionalVariants,
        locale: locale
      });
      if (!warnedNaNWarnings.has(key)) {
        const logMessage = formatNaNWarning(cleanedInput, normalized, fallbackNumber, additionalVariants, locale);
        logger(logMessage);
        warnedNaNWarnings.set(key, true);
      }
    }
    return Number(fallbackNumber);
  }
  let errorMsg = `Invalid numeric input '${originalInput}' (Locale: ${config.LOCALE || "en-US"}). Expected a valid numeric value such as 42, 1e3, 1_000, or 1,000. Normalized input: '${normalized}'.`;
  if (additionalVariants.length > 0) {
    errorMsg += ` Recognized custom NaN variants: [${additionalVariants.join(", ") }].`;
  }
  throw Object.assign(new Error(errorMsg), { originalInput });
}

// Enhanced helper function: normalizeNumberString removes thousand separators based on locale and optionally preserves the decimal point
export function normalizeNumberString(inputStr, preserveDecimal = false) {
  inputStr = cleanString(inputStr);
  const globalConfig = getGlobalConfig();
  const locale = process.env.LOCALE || globalConfig.LOCALE || "en-US";
  let result = inputStr.replace(/[_\s]+/g, "");

  if (locale === "de-DE") {
    if (preserveDecimal) {
      result = result.replace(/\./g, "");
      result = result.replace(/,/g, ".");
    } else {
      result = result.replace(/[\.,]/g, "");
    }
  } else {
    if (preserveDecimal) {
      result = result.replace(/,+/g, "");
    } else {
      result = result.replace(/[,\.]+/g, "");
    }
  }
  return result;
}

// Helper function to apply a chalk chain from a dot-separated config string, optionally using a provided chalk instance.
function applyChalkChain(chain, chalkInstance = chalk) {
  if (typeof chain !== 'string' || chain.trim() === '') {
    return chalkInstance;
  }
  const chainParts = chain.split('.');
  let chained = chalkInstance;
  chainParts.forEach((part) => {
    if (typeof chained[part] === 'function') {
      chained = chained[part];
    }
  });
  return chained;
}

// Helper function to validate the custom theme configuration
function isValidThemeConfig(config) {
  const requiredKeys = ['error', 'usage', 'info', 'run'];
  if (typeof config !== 'object' || config === null) return false;
  for (const key of requiredKeys) {
    if (typeof config[key] !== 'string' || config[key].trim() === '') {
      return false;
    }
  }
  return true;
}

// Enhanced logError function logs the actual error's stack trace when an Error object is passed
function logError(chalkError, ...args) {
  let errorObj = null;
  const messageParts = args.map(arg => {
    if (arg instanceof Error && !errorObj) {
      errorObj = arg;
      return arg.message;
    }
    return arg;
  });
  const baseMessage = [chalkError("Error:"), ...messageParts].join(" ");
  if (errorObj && errorObj.stack) {
    console.error(baseMessage + "\nStack trace: " + errorObj.stack);
  } else {
    console.error(baseMessage);
  }
}

// Unified function to process numeric input with fallback and consistent warning logging
function processNumberInputUnified(inputStr, fallbackNumber, allowNaN = false, preserveDecimal = false, additionalVariants = [], logger = console.warn, strict = false) {
  const cleanedInput = cleanString(inputStr);
  const normalized = normalizeNumberString(cleanedInput, preserveDecimal);
  const config = getGlobalConfig();

  if (isNaNVariant(cleanedInput, additionalVariants)) {
    if (strict) {
      let errorMsg = `Strict mode: Invalid numeric input '${cleanedInput}' (Locale: ${config.LOCALE || "en-US"}). Normalized input: '${normalized}'.`;
      if (cleanedInput.startsWith('+') || cleanedInput.startsWith('-')) {
        errorMsg += " Signed NaN variants are not allowed in strict mode.";
      }
      throw new Error(errorMsg);
    }
    if (allowNaN) {
      return NaN;
    } else {
      return fallbackHandler(cleanedInput, normalized, fallbackNumber, additionalVariants, config, logger);
    }
  }

  const num = Number(normalized);
  if (Number.isNaN(num)) {
    if (strict) {
      throw new Error(`Strict mode: Invalid numeric input '${cleanedInput}' (Locale: ${config.LOCALE || "en-US"}). Normalized input: '${normalized}'.`);
    }
    return fallbackHandler(cleanedInput, normalized, fallbackNumber, additionalVariants, config, logger);
  }
  return num;
}

// Consolidated numeric parsing function that processes numeric inputs uniformly
export function parseNumericInput(inputStr, fallbackNumber, allowNaN = false, preserveDecimal = false, strict = false) {
  const config = getGlobalConfig();
  const additionalVariants = (config.additionalNaNValues || []).map(v => {
    let cleaned = cleanString(v);
    if (!config.CASE_SENSITIVE_NAN) {
      cleaned = cleaned.toLowerCase();
    }
    return cleaned;
  });
  return processNumberInputUnified(inputStr, fallbackNumber, allowNaN, preserveDecimal, additionalVariants, console.warn, strict);
}

// CSV Importer: Reads a CSV file and returns an array of arrays of numbers using unified numeric parsing
export function parseCSV(filePath, fallbackNumber, allowNaN = false, preserveDecimal = false, delimiter = ',', strict = false) {
  const content = readFileSync(filePath, "utf-8");
  const data = parseCSVFromString(content, fallbackNumber, allowNaN, preserveDecimal, delimiter, strict);
  // Reset warning cache after processing a CSV batch
  resetFallbackWarningCache();
  return data;
}

// Helper to auto-detect CSV delimiter based on the first line of content
function autoDetectDelimiter(content) {
  const delimiters = [',', ';', '|', '\t'];
  const firstLine = content.split("\n")[0];
  let maxCount = 0;
  let selected = ',';
  delimiters.forEach(delim => {
    const count = firstLine.split(delim).length - 1;
    if (count > maxCount) {
      maxCount = count;
      selected = delim;
    }
  });
  return selected;
}

// Parses CSV content from a string with an optional custom delimiter
function parseCSVFromString(content, fallbackNumber, allowNaN = false, preserveDecimal = false, delimiter = ',', strict = false) {
  if (!delimiter || delimiter === '') {
    delimiter = autoDetectDelimiter(content);
  }
  if (content.trim() === "") {
    throw new Error("CSV file is empty.");
  }
  const rows = content.trim().split("\n");
  return rows.map(row => {
    let cells = [];
    if (preserveDecimal && delimiter === ',') {
      const matches = row.match(/(?:[+\-]?NaN|-?\d+(?:,\d{3})*(?:\.\d+)?(?:[eE][+\-]?\d+)?)/gi);
      if (matches === null) {
        throw new Error("No numeric data found in row.");
      }
      cells = matches;
    } else {
      cells = row.split(delimiter).map(cell => cell.trim());
    }
    return cells.map(cell => parseNumericInput(cell, fallbackNumber, allowNaN, preserveDecimal, strict));
  });
}

// Enhanced validateNumericArg applies fallback mechanism and logs a warning for invalid numeric CLI input
export function validateNumericArg(numStr, verboseMode, themeColors, fallbackNumber, allowNaN = false, preserveDecimal = false, strict = false) {
  const config = getGlobalConfig();
  const additionalVariants = (config.additionalNaNValues || []).map(v => {
    let cleaned = cleanString(v);
    if (!config.CASE_SENSITIVE_NAN) {
      cleaned = cleaned.toLowerCase();
    }
    return cleaned;
  });
  return processNumberInputUnified(numStr, fallbackNumber, allowNaN, preserveDecimal, additionalVariants, console.warn, strict);
}

/**
 * Main function executing CLI logic with advanced error handling, colored output, numeric validation, CSV import, and global configuration support.
 * Enhanced inline documentation and structured logging for NaN handling have been applied.
 * 
 * Added Debug Trace mode (--debug-trace) to output detailed structured JSON logs of the internal processing pipeline.
 * 
 * @param {string[]} args - Command line arguments.
 */
export async function main(args) {
  try {
    let debugTrace = false;
    let debugData = {};

    if (args && args.includes('--debug-trace')) {
      debugTrace = true;
      args = args.filter(arg => arg !== '--debug-trace');
    }

    if (args && args.length > 0) {
      args = args.filter(arg => {
        if (arg === '--suppress-nan-warnings') {
          cliSuppressNanWarnings = true;
          return false;
        }
        return true;
      });
    }

    let fallbackNumber = undefined;
    let allowNaN = false;
    let preserveDecimal = false;
    let csvDelimiter = '';
    let strictNumeric = false;

    if (args && args.length > 0) {
      args = args.filter(arg => {
        if (arg.startsWith('--fallback-number=')) {
          fallbackNumber = arg.slice('--fallback-number='.length);
          return false;
        }
        if (arg === '--allow-nan') {
          allowNaN = true;
          return false;
        }
        if (arg === '--preserve-decimal') {
          preserveDecimal = true;
          return false;
        }
        if (arg.startsWith('--csv-delimiter=')) {
          csvDelimiter = arg.slice('--csv-delimiter='.length);
          return false;
        }
        if (arg === '--strict-numeric') {
          strictNumeric = true;
          return false;
        }
        if (arg === '--watch-config') {
          return false;
        }
        return true;
      });
    }
    if (!fallbackNumber && process.env.FALLBACK_NUMBER) {
      fallbackNumber = process.env.FALLBACK_NUMBER;
    }
    if (!allowNaN && process.env.ALLOW_EXPLICIT_NAN && process.env.ALLOW_EXPLICIT_NAN.toLowerCase() === 'true') {
      allowNaN = true;
    }

    let themeFlag = null;
    args = args.filter(arg => {
      if (arg.startsWith('--theme=')) {
        themeFlag = arg.slice('--theme='.length);
        return false;
      }
      return true;
    });
    if (themeFlag) {
      process.env.CLI_COLOR_SCHEME = themeFlag;
    }

    let logFilePath = null;
    args = args.filter(arg => {
      if (arg.startsWith('--log-file=')) {
        logFilePath = arg.slice('--log-file='.length);
        return false;
      }
      return true;
    });
    if (logFilePath) {
      const originalConsoleLog = console.log;
      const originalConsoleError = console.error;
      console.log = (...args) => {
        originalConsoleLog(...args);
        appendFileSync(logFilePath, args.join(" ") + "\n", { flag: "a" });
      };
      console.error = (...args) => {
        originalConsoleError(...args);
        appendFileSync(logFilePath, args.join(" ") + "\n", { flag: "a" });
      };
    }

    if (debugTrace) {
      debugData.argParsing = {
        fallbackNumber,
        allowNaN,
        preserveDecimal,
        csvDelimiter,
        strictNumeric,
        themeFlag,
        logFilePath,
        remainingArgs: args
      };
    }

    if (args.includes('--watch-config')) {
      watchGlobalConfig();
    }

    if (args && args.includes('--show-config')) {
      const globalConfig = getGlobalConfig();
      if (process.env.CLI_COLOR_SCHEME) globalConfig.CLI_COLOR_SCHEME = process.env.CLI_COLOR_SCHEME;
      if (process.env.LOG_LEVEL) globalConfig.LOG_LEVEL = process.env.LOG_LEVEL;
      if (process.env.ERROR_REPORTING_URL) globalConfig.ERROR_REPORTING_URL = process.env.ERROR_REPORTING_URL;
      if (process.env.FALLBACK_NUMBER) globalConfig.FALLBACK_NUMBER = process.env.FALLBACK_NUMBER;
      if (process.env.LOCALE) globalConfig.LOCALE = process.env.LOCALE;
      console.log(JSON.stringify(globalConfig, null, 2));
      return;
    }

    const globalConfig = getGlobalConfig();
    if (debugTrace) {
      debugData.configMerge = globalConfig;
    }

    if (globalConfig.ALLOW_NAN !== undefined) {
      allowNaN = globalConfig.ALLOW_NAN;
    }

    if (!process.env.CLI_COLOR_SCHEME && globalConfig.CLI_COLOR_SCHEME) {
      process.env.CLI_COLOR_SCHEME = globalConfig.CLI_COLOR_SCHEME;
    }
    if (!process.env.LOG_LEVEL && globalConfig.LOG_LEVEL) {
      process.env.LOG_LEVEL = globalConfig.LOG_LEVEL;
    }
    const errorReportingUrl = process.env.ERROR_REPORTING_URL || globalConfig.ERROR_REPORTING_URL;

    const themeColors = getThemeColors();
    const verboseMode = args && args.includes("--verbose");

    let csvFilePath = null;
    if (args && args.length > 0) {
      args = args.filter(arg => {
        if (arg.startsWith('--csv-file=')) {
          csvFilePath = arg.slice('--csv-file='.length);
          return false;
        }
        return true;
      });
    }

    if (csvFilePath) {
      try {
        const csvData = parseCSV(csvFilePath, fallbackNumber, allowNaN, preserveDecimal, csvDelimiter, strictNumeric);
        console.log(themeColors.info("Imported CSV Data: ") + JSON.stringify(csvData));
        if (debugTrace) {
          debugData.csvProcessing = {
            file: csvFilePath,
            delimiterUsed: csvDelimiter || autoDetectDelimiter(readFileSync(csvFilePath, 'utf-8')),
            data: csvData
          };
        }
      } catch (csvError) {
        logError(themeColors.error, "Error importing CSV data:", csvError);
        if (debugTrace) {
          debugData.csvProcessing = { error: csvError.message };
        }
        throw csvError;
      }
    } else if (globalThis.__TEST_STDIN__ || (process.stdin && process.stdin.isTTY === false)) {
      const inputStream = globalThis.__TEST_STDIN__ || process.stdin;
      let pipedData = "";
      await (async () => {
        for await (const chunk of inputStream) {
          pipedData += chunk;
        }
        if (pipedData.trim()) {
          const csvData = parseCSVFromString(pipedData, fallbackNumber, allowNaN, preserveDecimal, csvDelimiter, strictNumeric);
          console.log(themeColors.info("Imported CSV Data (from STDIN): ") + JSON.stringify(csvData));
          if (debugTrace) {
            debugData.csvProcessing = {
              source: "STDIN",
              delimiterUsed: csvDelimiter || autoDetectDelimiter(pipedData),
              data: csvData
            };
          }
        } else {
          throw new Error("CSV input is empty.");
        }
      })();
    } else if (!args || args.length === 0) {
      console.log(themeColors.usage("No arguments provided. Please provide valid arguments."));
      console.log(themeColors.usage("Usage: repository0-plot-code-lib <arguments>"));
      if (debugTrace) {
        debugData.executionState = { message: "No arguments provided." };
        console.log(JSON.stringify({ debugTrace: debugData }, null, 2));
      }
      return;
    }

    try {
      const numberFlagPrefix = "--number=";
      const numericDebug = [];
      for (const arg of args) {
        if (arg.startsWith(numberFlagPrefix)) {
          const numStr = arg.slice(numberFlagPrefix.length);
          const result = validateNumericArg(numStr, verboseMode, themeColors, fallbackNumber, allowNaN, preserveDecimal, strictNumeric);
          numericDebug.push({ input: numStr, result });
        }
      }
      if (debugTrace) {
        debugData.numericProcessing = numericDebug;
      }

      if (args && args.includes("--simulate-error")) {
        throw new Error("Simulated error condition for testing. Please provide a valid number (e.g., '--number=42').");
      }

      console.log(themeColors.usage("Run with: ") + themeColors.run(JSON.stringify(args)));
      if (debugTrace) {
        debugData.executionState = { status: "Completed Successfully", finalArgs: args };
        console.log(JSON.stringify({ debugTrace: debugData }, null, 2));
      }
    } catch (error) {
      if (verboseMode || (process.env.LOG_LEVEL && process.env.LOG_LEVEL.toLowerCase() === 'debug')) {
        logError(themeColors.error, "Error in main function execution:", error);
      } else {
        const msg = error.message.startsWith("Invalid numeric input") ? error.message : "Error: " + error.message;
        console.error(themeColors.error(msg));
      }

      if (debugTrace) {
        debugData.executionState = { error: error.message };
        console.log(JSON.stringify({ debugTrace: debugData }, null, 2));
      }

      if ((verboseMode || (process.env.LOG_LEVEL && process.env.LOG_LEVEL.toLowerCase() === 'debug')) && errorReportingUrl) {
        let libraryVersion = 'unknown';
        try {
          const pkgPath = path.join(process.cwd(), 'package.json');
          if (existsSync(pkgPath)) {
            const pkgContent = readFileSync(pkgPath, 'utf-8');
            const pkg = JSON.parse(pkgContent);
            libraryVersion = pkg.version || 'unknown';
          }
        } catch (e) {}
        const payload = {
          errorMessage: error.message,
          stackTrace: error.stack || "",
          cliArgs: args,
          libraryVersion,
          timestamp: new Date().toISOString(),
          envContext: {
            NODE_ENV: process.env.NODE_ENV || 'undefined',
            CLI_COLOR_SCHEME: process.env.CLI_COLOR_SCHEME || 'undefined',
            LOG_LEVEL: process.env.LOG_LEVEL || 'undefined',
            HOME: process.env.HOME || process.env.USERPROFILE || 'undefined',
            LOCALE: process.env.LOCALE || 'undefined'
          },
          originalNumericInput: error.originalInput || null
        };
        await submitErrorReport(payload, errorReportingUrl, themeColors);
      }

      throw error;
    }
  } catch (err) {
    throw err;
  } finally {
    // Reset the fallback warning cache after each batch execution
    resetFallbackWarningCache();
  }
}

// Function to submit error reports with automatic retry
export async function submitErrorReport(payload, url, themeColors) {
  let retryDelays;
  let maxAttempts;
  const config = getGlobalConfig();
  if (process.env.ERROR_RETRY_DELAYS) {
    retryDelays = process.env.ERROR_RETRY_DELAYS.split(",").map(s => Number(s.trim()));
  } else if (config.ERROR_RETRY_DELAYS) {
    if (Array.isArray(config.ERROR_RETRY_DELAYS)) {
      retryDelays = config.ERROR_RETRY_DELAYS;
    } else if (typeof config.ERROR_RETRY_DELAYS === "string") {
      retryDelays = config.ERROR_RETRY_DELAYS.split(",").map(s => Number(s.trim()));
    }
  } else {
    retryDelays = [500, 1000, 2000];
  }
  if (process.env.ERROR_MAX_ATTEMPTS) {
    maxAttempts = Number(process.env.ERROR_MAX_ATTEMPTS);
  } else if (config.ERROR_MAX_ATTEMPTS) {
    maxAttempts = Number(config.ERROR_MAX_ATTEMPTS);
  } else {
    maxAttempts = retryDelays.length;
  }

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        console.log(themeColors.info(`Error report submitted successfully on attempt ${attempt + 1}.`));
        return;
      } else {
        console.error(themeColors.error(`Failed to submit error report on attempt ${attempt + 1}. Status: ${response.status}`));
      }
    } catch (err) {
      console.error(themeColors.error(`Failed to submit error report on attempt ${attempt + 1}. Error: ${err.message}`));
    }
    if (attempt < maxAttempts - 1) {
      let delay = retryDelays[attempt] !== undefined ? retryDelays[attempt] : retryDelays[retryDelays.length - 1];
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  console.error(themeColors.error("All attempts to submit error report have failed."));
}

// Returns CLI theme color functions based on override or defaults
function getThemeColors() {
  const themeOverride = process.env.CLI_COLOR_SCHEME || "default";
  if (themeOverride === "dark") {
    const forcedChalk = new Chalk({ level: 3 });
    return {
      error: forcedChalk.bold.red,
      usage: forcedChalk.bold.blue,
      info: forcedChalk.bold.green,
      run: forcedChalk.bold.cyan
    };
  } else if (themeOverride === "light") {
    const forcedChalk = new Chalk({ level: 3 });
    return {
      error: forcedChalk.red,
      usage: forcedChalk.magenta,
      info: forcedChalk.blue,
      run: forcedChalk.yellow
    };
  } else {
    const forcedChalk = new Chalk({ level: 3 });
    return {
      error: forcedChalk.red,
      usage: forcedChalk.yellow,
      info: forcedChalk.green,
      run: forcedChalk.cyan
    };
  }
}

// New Utility Function: Format number output according to locale
/**
 * Format a number according to the locale.
 * @param {number} num - The number to format.
 * @param {object} options - Optional formatting options passed to Intl.NumberFormat.
 * @returns {string} The locale-formatted number string.
 */
export function formatNumberOutput(num, options = {}) {
  const config = getGlobalConfig();
  const locale = process.env.LOCALE || config.LOCALE || 'en-US';
  const formatter = new Intl.NumberFormat(locale, options);
  return formatter.format(num);
}

// Export watchGlobalConfig for testing purposes
export { watchGlobalConfig };

// If executed directly from the CLI, call main with process arguments
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  (async () => {
    try {
      await main(args);
    } catch (error) {
      process.exit(1);
    }
  })();
}
