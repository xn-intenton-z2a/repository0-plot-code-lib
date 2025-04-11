#!/usr/bin/env node
/* File: src/lib/main.js */
// src/lib/main.js

import { fileURLToPath } from "url";
import chalk, { Chalk } from "chalk";
import { existsSync, readFileSync } from "fs";
import path from "path";
import { z } from "zod";

// Removed import of numericParser; numeric parsing utilities are now integrated into this file

// Define global configuration schema using zod
const globalConfigSchema = z.object({
  CLI_COLOR_SCHEME: z.string().optional(),
  LOG_LEVEL: z.string().optional(),
  ERROR_REPORTING_URL: z.string().url().optional(),
  defaultArgs: z.array(z.string()).optional(),
  FALLBACK_NUMBER: z.string().optional()
});

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

// Unified function to process numeric inputs with fallback handling and explicit NaN acceptance
// This function standardizes the handling of 'NaN' inputs (case-insensitive) across CSV and CLI numeric arguments.
function processNumericInput(inputStr, fallbackNumber, allowNaN = false, preserveDecimal = process.env.PRESERVE_DECIMAL && process.env.PRESERVE_DECIMAL.toLowerCase() === 'true') {
  const trimmedInput = inputStr.trim();
  const lowerTrimmed = trimmedInput.toLowerCase();
  if (lowerTrimmed === 'nan') {
    if (allowNaN) {
      return NaN;
    } else if (fallbackNumber !== undefined) {
      return Number(fallbackNumber);
    } else {
      const normalized = normalizeNumberString(trimmedInput, preserveDecimal);
      const err = new Error(`Invalid numeric input '${trimmedInput}' (normalized: '${normalized}'). No fallback provided. Expected a valid number.`);
      err.originalInput = trimmedInput;
      throw err;
    }
  }
  const normalized = normalizeNumberString(trimmedInput, preserveDecimal);
  const num = Number(normalized);
  if (Number.isNaN(num)) {
    if (fallbackNumber !== undefined) {
      return Number(fallbackNumber);
    }
    const err = new Error(`Invalid numeric input '${trimmedInput}' (normalized: '${normalized}'). No fallback provided. Expected a valid number.`);
    err.originalInput = trimmedInput;
    throw err;
  }
  return num;
}

// CSV Importer function integrated into main.js
// This function reads a CSV file and returns an array of arrays of numbers.
// Enhanced to apply a fallback for cells containing a case-insensitive 'NaN' and to accept explicit NaN values if allowed.
export function parseCSV(filePath, fallbackNumber, allowNaN = false, preserveDecimal = false, delimiter = ',') {
  const content = readFileSync(filePath, "utf-8");
  return parseCSVFromString(content, fallbackNumber, allowNaN, preserveDecimal, delimiter);
}

// New helper function to parse CSV from a string with an optional custom delimiter
function parseCSVFromString(content, fallbackNumber, allowNaN = false, preserveDecimal = false, delimiter = ',') {
  if (content.trim() === "") {
    throw new Error("CSV file is empty.");
  }
  const rows = content.trim().split("\n");
  return rows.map(row => {
    let cells = [];
    // Use regex branch only if preserveDecimal is true and using default comma delimiter
    if (preserveDecimal && delimiter === ',') {
      const matches = row.match(/(?:NaN|-?\d+(?:,\d{3})*(?:\.\d+)?)/gi);
      if (matches === null) {
        throw new Error("No numeric data found in row.");
      }
      cells = matches;
    } else {
      cells = row.split(delimiter);
    }
    return cells.map(cell => processNumericInput(cell, fallbackNumber, allowNaN, preserveDecimal));
  });
}

// Numeric parsing utilities integrated directly in this file
export function normalizeNumberString(str, preserveDecimal = false) {
  // If preserveDecimal is true, remove underscores, commas, and spaces, but keep periods.
  // Otherwise, remove underscores, commas, spaces, and periods (treating them as thousand separators).
  return preserveDecimal ? str.replace(/[_\s,]+/g, '') : str.replace(/[_\s,\.]+/g, '');
}

export function validateNumericArg(numStr, verboseMode, themeColors, fallbackNumber, allowNaN = false, preserveDecimal = false) {
  // Consolidated numeric parsing with unified fallback logic and explicit NaN flag
  return processNumericInput(numStr, fallbackNumber, allowNaN, preserveDecimal);
}

/**
 * Consolidated main function that executes CLI logic with advanced error handling, colored output, numeric argument validation, CSV data import (from file or STDIN) and global configuration support.
 * @param {string[]} args - Command line arguments.
 */
export async function main(args) {
  let fallbackNumber = undefined;
  let allowNaN = false;
  let preserveDecimal = false;
  let csvDelimiter = ',';

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
  if (!preserveDecimal && process.env.PRESERVE_DECIMAL && process.env.PRESERVE_DECIMAL.toLowerCase() === 'true') {
    preserveDecimal = true;
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
    for await (const chunk of inputStream) {
      pipedData += chunk;
    }
    if (pipedData.trim()) {
      const csvData = parseCSVFromString(pipedData, fallbackNumber, allowNaN, preserveDecimal, csvDelimiter);
      console.log(themeColors.info("Imported CSV Data (from STDIN): ") + JSON.stringify(csvData));
    } else {
      throw new Error("CSV input is empty.");
    }
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
        // Validate numeric argument with fallback if provided and using allowNaN flag and preserveDecimal option
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

    // Automatic error reporting only in verbose mode
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
      try {
        const response = await fetch(errorReportingUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        if (response.ok) {
          console.log(themeColors.info("Error report submitted successfully."));
        } else {
          console.error(themeColors.error(`Failed to submit error report. Status: ${response.status}`));
        }
      } catch (err) {
        console.error(themeColors.error("Failed to submit error report:"), err);
      }
    }

    throw error;
  }
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
