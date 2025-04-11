#!/usr/bin/env node
/* File: src/lib/main.js */
// src/lib/main.js

import { fileURLToPath } from "url";
import chalk, { Chalk } from "chalk";
import { existsSync, readFileSync, appendFileSync } from "fs";
import path from "path";
import { z } from "zod";

// Global configuration schema using zod
const globalConfigSchema = z.object({
  CLI_COLOR_SCHEME: z.string().optional(),
  LOG_LEVEL: z.string().optional(),
  ERROR_REPORTING_URL: z.string().url().optional(),
  defaultArgs: z.array(z.string()).optional(),
  FALLBACK_NUMBER: z.string().optional(),
  ERROR_RETRY_DELAYS: z.union([z.string(), z.array(z.number())]).optional(),
  ERROR_MAX_ATTEMPTS: z.string().optional(),
  ALLOW_NAN: z.boolean().optional(),
  additionalNaNValues: z.array(z.string()).optional()
});

// Helper function to determine if a string represents a NaN variant (including signed and whitespace variants), with support for custom configured variants
function isNaNVariant(str, additionalVariants = []) {
  const trimmed = str.trim();
  // Check default NaN variants using regex
  const defaultNaN = /^[+-]?nan$/i.test(trimmed);
  // Check if the trimmed string matches any additional custom NaN variant (case-insensitive, expecting lower-case values)
  const customNaN = additionalVariants.some(av => trimmed.toLowerCase() === av);
  return defaultNaN || customNaN;
}

// New helper function: normalizeNumberString to remove thousand separators etc.
export function normalizeNumberString(inputStr, preserveDecimal = false) {
  if (preserveDecimal) {
    // Remove underscores, commas, and spaces but preserve periods (decimal points) and scientific notation parts
    return inputStr.replace(/[_\s,]+/g, "");
  } else {
    // Remove underscores, commas, spaces and periods
    return inputStr.replace(/[_\s,\.]+/g, "");
  }
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

// Enhanced logError function to log the actual error's stack trace when an Error object is passed
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

// NEW: Unified function to process numeric input with fallback and consistent warning logging
// Finalized integration of custom NaN variants for consistent numeric parsing across CSV and CLI arguments
function processNumberInputUnified(inputStr, fallbackNumber, allowNaN = false, preserveDecimal = false, additionalVariants = [], logger = console.warn) {
  const trimmedInput = inputStr.trim();
  const normalized = normalizeNumberString(trimmedInput, preserveDecimal);
  if (isNaNVariant(trimmedInput, additionalVariants)) {
    if (allowNaN) {
      return NaN;
    } else if (fallbackNumber !== undefined && fallbackNumber !== null && fallbackNumber.toString().trim() !== '') {
      logger(`Warning: Non-numeric input '${trimmedInput}' detected (normalized as '${normalized}'). Fallback value ${fallbackNumber} applied.${additionalVariants.length ? " Recognized custom NaN variants: [" + additionalVariants.join(", ") + "]." : ""}`);
      return Number(fallbackNumber);
    }
    let errorMsg = `Invalid numeric input '${trimmedInput}'. Expected to provide a valid numeric input such as 42, 1e3, 1_000, or 1,000.`;
    if (additionalVariants.length > 0) {
      errorMsg += ` Recognized custom NaN variants: [${additionalVariants.join(", ") }].`;
    }
    throw Object.assign(new Error(`${errorMsg} Normalized input: '${normalized}'.`), { originalInput: trimmedInput });
  }
  const num = Number(normalized);
  if (Number.isNaN(num)) {
    if (fallbackNumber !== undefined && fallbackNumber !== null && fallbackNumber.toString().trim() !== '') {
      logger(`Warning: Non-numeric input '${trimmedInput}' resulted in NaN after normalization ('${normalized}'). Fallback value ${fallbackNumber} applied.${additionalVariants.length ? " Recognized custom NaN variants: [" + additionalVariants.join(", ") + "]." : ""}`);
      return Number(fallbackNumber);
    }
    let errorMsg = `Invalid numeric input '${trimmedInput}'. Expected to provide a valid numeric input such as 42, 1e3, 1_000, or 1,000.`;
    if (additionalVariants.length > 0) {
      errorMsg += ` Recognized custom NaN variants: [${additionalVariants.join(", ") }].`;
    }
    throw Object.assign(new Error(`${errorMsg} Normalized input: '${normalized}'.`), { originalInput: trimmedInput });
  }
  return num;
}

// Consolidated numeric parsing function to process numeric inputs uniformly across CSV and CLI arguments.
// This function delegates to processNumberInputUnified for standardized behavior.
export function parseNumericInput(inputStr, fallbackNumber, allowNaN = false, preserveDecimal = false) {
  const config = getGlobalConfig();
  const additionalVariants = (config.additionalNaNValues || []).map(v => v.trim().toLowerCase());
  return processNumberInputUnified(inputStr, fallbackNumber, allowNaN, preserveDecimal, additionalVariants, console.warn);
}

// CSV Importer function integrated into main.js
// Reads a CSV file and returns an array of arrays of numbers, handling unified NaN parsing and fallback behavior.
export function parseCSV(filePath, fallbackNumber, allowNaN = false, preserveDecimal = false, delimiter = ',') {
  const content = readFileSync(filePath, "utf-8");
  return parseCSVFromString(content, fallbackNumber, allowNaN, preserveDecimal, delimiter);
}

// New helper function to auto-detect CSV delimiter based on the first line of content
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

// New helper function to parse CSV from a string with an optional custom delimiter
function parseCSVFromString(content, fallbackNumber, allowNaN = false, preserveDecimal = false, delimiter = ',') {
  if (!delimiter || delimiter === '') {
    delimiter = autoDetectDelimiter(content);
  }
  if (content.trim() === "") {
    throw new Error("CSV file is empty.");
  }
  const rows = content.trim().split("\n");
  return rows.map(row => {
    let cells = [];
    // Use regex branch only if preserveDecimal is true and using comma as delimiter
    if (preserveDecimal && delimiter === ',') {
      const matches = row.match(/(?:[+-]?NaN|-?\d+(?:,\d{3})*(?:\.\d+)?(?:[eE][+-]?\d+)?)/gi);
      if (matches === null) {
        throw new Error("No numeric data found in row.");
      }
      cells = matches;
    } else {
      // Split and trim each cell to ensure consistent numeric parsing including NaN variants
      cells = row.split(delimiter).map(cell => cell.trim());
    }
    return cells.map(cell => parseNumericInput(cell, fallbackNumber, allowNaN, preserveDecimal));
  });
}

// Updated validateNumericArg function to apply a fallback mechanism and log a warning for invalid numeric CLI input.
// It uses processNumberInputUnified for consistent behavior.
export function validateNumericArg(numStr, verboseMode, themeColors, fallbackNumber, allowNaN = false, preserveDecimal = false) {
  const config = getGlobalConfig();
  const additionalVariants = (config.additionalNaNValues || []).map(v => v.trim().toLowerCase());
  // Use console.warn for fallback warnings to ensure warnings are logged in tests
  return processNumberInputUnified(numStr, fallbackNumber, allowNaN, preserveDecimal, additionalVariants, console.warn);
}

/**
 * Consolidated main function that executes CLI logic with advanced error handling, colored output, numeric argument validation, CSV data import (from file or STDIN) and global configuration support.
 *
 * Note on Unified 'NaN' Handling:
 * - All numeric inputs including variants like 'NaN', 'nan', '+NaN', '-NaN' (even with extra spaces) are uniformly processed via processNumberInputUnified.
 * - When explicit NaN values are not allowed and no valid fallback is provided, an error is thrown with clear instructions and details about allowed formats.
 * - If a fallback value is provided, it is applied and a standardized warning is logged including the normalized input and recognized custom NaN variants if configured.
 * - Additional custom NaN variants can be configured via the global configuration file (.repository0plotconfig.json).
 *
 * @param {string[]} args - Command line arguments.
 */
export async function main(args) {
  let fallbackNumber = undefined;
  let allowNaN = false;
  let preserveDecimal = false;
  let csvDelimiter = ''; // default to empty to trigger auto-detection

  // Process flags for fallback, allow-nan, preserve-decimal and csv-delimiter
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
      return true;
    });
  }
  if (!fallbackNumber && process.env.FALLBACK_NUMBER) {
    fallbackNumber = process.env.FALLBACK_NUMBER;
  }
  if (!allowNaN && process.env.ALLOW_EXPLICIT_NAN && process.env.ALLOW_EXPLICIT_NAN.toLowerCase() === 'true') {
    allowNaN = true;
  }

  // Process theme flag to override color scheme if provided
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

  // Process file-based logging flag
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

  // Check if the '--show-config' flag is present
  if (args && args.includes('--show-config')) {
    const globalConfig = getGlobalConfig();
    // Merge environment overrides
    if (process.env.CLI_COLOR_SCHEME) globalConfig.CLI_COLOR_SCHEME = process.env.CLI_COLOR_SCHEME;
    if (process.env.LOG_LEVEL) globalConfig.LOG_LEVEL = process.env.LOG_LEVEL;
    if (process.env.ERROR_REPORTING_URL) globalConfig.ERROR_REPORTING_URL = process.env.ERROR_REPORTING_URL;
    if (process.env.FALLBACK_NUMBER) globalConfig.FALLBACK_NUMBER = process.env.FALLBACK_NUMBER;
    console.log(JSON.stringify(globalConfig, null, 2));
    return;
  }

  // Merge global config settings
  const globalConfig = getGlobalConfig();

  // Override allowNaN if ALLOW_NAN is configured in global config
  if (globalConfig.ALLOW_NAN !== undefined) {
    allowNaN = globalConfig.ALLOW_NAN;
  }

  // Set environment variables from global config if not already set
  if (!process.env.CLI_COLOR_SCHEME && globalConfig.CLI_COLOR_SCHEME) {
    process.env.CLI_COLOR_SCHEME = globalConfig.CLI_COLOR_SCHEME;
  }
  if (!process.env.LOG_LEVEL && globalConfig.LOG_LEVEL) {
    process.env.LOG_LEVEL = globalConfig.LOG_LEVEL;
  }
  // Set error reporting URL from global config or environment variable
  const errorReportingUrl = process.env.ERROR_REPORTING_URL || globalConfig.ERROR_REPORTING_URL;

  const themeColors = getThemeColors();
  // Determine verbose mode via command line flag only
  const verboseMode = args && args.includes("--verbose");

  // Extract CSV file flag
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

  // If CSV file flag provided, process CSV file
  if (csvFilePath) {
    try {
      const csvData = parseCSV(csvFilePath, fallbackNumber, allowNaN, preserveDecimal, csvDelimiter);
      console.log(themeColors.info("Imported CSV Data: ") + JSON.stringify(csvData));
    } catch (csvError) {
      logError(themeColors.error, "Error importing CSV data:", csvError);
      throw csvError;
    }
  } else if (globalThis.__TEST_STDIN__ || (process.stdin && process.stdin.isTTY === false)) {
    // Process STDIN input if available
    const inputStream = globalThis.__TEST_STDIN__ || process.stdin;
    let pipedData = "";
    await (async () => {
      for await (const chunk of inputStream) {
        pipedData += chunk;
      }
      if (pipedData.trim()) {
        const csvData = parseCSVFromString(pipedData, fallbackNumber, allowNaN, preserveDecimal, csvDelimiter);
        console.log(themeColors.info("Imported CSV Data (from STDIN): ") + JSON.stringify(csvData));
      } else {
        throw new Error("CSV input is empty.");
      }
    })();
  } else if (!args || args.length === 0) {
    console.log(themeColors.usage("No arguments provided. Please provide valid arguments."));
    console.log(themeColors.usage("Usage: repository0-plot-code-lib <arguments>"));
    return;
  }

  try {
    // Consolidated numeric argument validation using validateNumericArg
    const numberFlagPrefix = "--number=";
    for (const arg of args) {
      if (arg.startsWith(numberFlagPrefix)) {
        const numStr = arg.slice(numberFlagPrefix.length);
        // Validate numeric argument with fallback if provided
        validateNumericArg(numStr, verboseMode, themeColors, fallbackNumber, allowNaN, preserveDecimal);
      }
    }

    // Simulate an error if '--simulate-error' flag is provided (for testing purposes)
    if (args && args.includes("--simulate-error")) {
      throw new Error("Simulated error condition for testing. Please provide a valid number (e.g., '--number=42').");
    }

    console.log(themeColors.usage("Run with: ") + themeColors.run(JSON.stringify(args)));
  } catch (error) {
    if (verboseMode || (process.env.LOG_LEVEL && process.env.LOG_LEVEL.toLowerCase() === 'debug')) {
      logError(themeColors.error, "Error in main function execution:", error);
    } else {
      const msg = error.message.startsWith("Invalid numeric input") ? error.message : "Error: " + error.message;
      console.error(themeColors.error(msg));
    }

    // Automatic error reporting only in verbose mode with errorReportingUrl
    if ((verboseMode || (process.env.LOG_LEVEL && process.env.LOG_LEVEL.toLowerCase() === 'debug')) && errorReportingUrl) {
      let libraryVersion = 'unknown';
      try {
        const pkgPath = path.join(process.cwd(), 'package.json');
        if (existsSync(pkgPath)) {
          const pkgContent = readFileSync(pkgPath, 'utf-8');
          const pkg = JSON.parse(pkgContent);
          libraryVersion = pkg.version || 'unknown';
        }
      } catch (e) {
        // Leave libraryVersion as 'unknown'
      }
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
          HOME: process.env.HOME || process.env.USERPROFILE || 'undefined'
        },
        originalNumericInput: error.originalInput || null
      };
      // Use the new automatic retry submission function
      await submitErrorReport(payload, errorReportingUrl, themeColors);
    }

    throw error;
  }
}

// New function to submit error reports with automatic retry and exponential backoff
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

// Returns the current CLI theme color functions based on a provided theme override, a custom configuration file, or the CLI_COLOR_SCHEME environment variable.
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

// Function to get global configuration from .repository0plotconfig.json with schema validation
function getGlobalConfig() {
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

// If the script is executed directly from the CLI, invoke main with command line arguments
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
