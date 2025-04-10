#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import chalk, { Chalk } from "chalk";
import { existsSync, readFileSync } from "fs";
import path from "path";

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

/**
 * Returns the current CLI theme color functions based on a custom configuration file or the CLI_COLOR_SCHEME environment variable.
 */
function getThemeColors() {
  const customConfigPath = path.join(process.cwd(), "cli-theme.json");
  if (existsSync(customConfigPath)) {
    try {
      const configContent = readFileSync(customConfigPath, "utf-8");
      const config = JSON.parse(configContent);
      if (!isValidThemeConfig(config)) {
        throw new Error("Invalid custom CLI theme configuration: expected keys 'error', 'usage', 'info', and 'run' with non-empty string values.");
      }
      // Use a forced chalk instance with ANSI level 3 for custom themes
      const customChalk = new Chalk({ level: 3 });
      return {
        error: applyChalkChain(config.error, customChalk),
        usage: applyChalkChain(config.usage, customChalk),
        info: applyChalkChain(config.info, customChalk),
        run: applyChalkChain(config.run, customChalk)
      };
    } catch (e) {
      console.error(chalk.red(`Custom CLI theme configuration error [${customConfigPath}]: ${e.message}. Please ensure the file is valid JSON and contains the required keys: error, usage, info, run. Using fallback theme.`));
    }
  }
  const theme = process.env.CLI_COLOR_SCHEME || "default";
  switch (theme) {
    case "dark": {
      // Force chalk to use ANSI escape codes by creating a new instance with level 3
      const forcedChalk = new Chalk({ level: 3 });
      return {
        error: forcedChalk.bold.red,
        usage: forcedChalk.bold.blue,
        info: forcedChalk.bold.green,
        run: forcedChalk.bold.cyan
      };
    }
    case "light":
      return {
        error: chalk.red,
        usage: chalk.magenta,
        info: chalk.blue,
        run: chalk.yellow
      };
    default:
      return {
        error: chalk.red,
        usage: chalk.yellow,
        info: chalk.green,
        run: chalk.cyan
      };
  }
}

/**
 * Main function that executes CLI logic with advanced error handling, colored output, and numeric argument validation.
 * @param {string[]} args - Command line arguments.
 */
export function main(args) {
  const themeColors = getThemeColors();
  // Determine verbose mode via command line flag or environment variable
  const verboseMode = (args && args.includes("--verbose")) || process.env.LOG_LEVEL === "debug";

  // Numeric argument validation: process flags of the form --number=<value>
  const numberFlagPrefix = "--number=";
  for (const arg of args) {
    if (arg.startsWith(numberFlagPrefix)) {
      const numValue = arg.slice(numberFlagPrefix.length);
      const parsed = Number(numValue);
      if (numValue.trim() === "" || Number.isNaN(parsed)) {
        const unifiedMsg = `Invalid numeric value for argument '${arg}': '${numValue}' is not a valid number.`;
        const throwMsg = `Invalid numeric value: ${numValue}`;
        if (verboseMode) {
          const errorInstance = new Error(unifiedMsg);
          logError(themeColors.error, errorInstance);
        } else {
          console.error(themeColors.error(`Error: ${unifiedMsg}`));
        }
        if (process.env.NODE_ENV === "test") {
          throw new Error(throwMsg);
        } else {
          process.exit(1);
        }
      }
    }
  }

  try {
    // Simulate an error if '--simulate-error' flag is provided (for testing purposes)
    if (args && args.includes("--simulate-error")) {
      throw new Error("Simulated error condition for testing");
    }

    // If no arguments are provided, display usage message with colors
    if (!args || args.length === 0) {
      console.log(themeColors.usage("No arguments provided. Please provide valid arguments."));
      console.log(themeColors.usage("Usage: repository0-plot-code-lib <arguments>"));
      return;
    }

    console.log(themeColors.info("Run with: ") + themeColors.run(JSON.stringify(args)));
  } catch (error) {
    if (verboseMode) {
      logError(themeColors.error, "Error in main function execution:", error);
    } else {
      console.error(themeColors.error(`Error: ${error.message}`));
    }

    // In test environment, rethrow error for assertions
    if (process.env.NODE_ENV === "test") {
      throw error;
    } else {
      process.exit(1);
    }
  }
}

// If the script is executed directly from the CLI, invoke main with command line arguments
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  main(args);
}
