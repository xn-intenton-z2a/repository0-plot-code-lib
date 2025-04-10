#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import chalk from "chalk";

/**
 * Returns the current CLI theme color functions based on the CLI_COLOR_SCHEME environment variable.
 */
function getThemeColors() {
  const theme = process.env.CLI_COLOR_SCHEME || "default";
  switch (theme) {
    case "dark":
      return {
        error: chalk.bold.red,
        usage: chalk.bold.blue,
        info: chalk.bold.green,
        run: chalk.bold.cyan,
      };
    case "light":
      return {
        error: chalk.red,
        usage: chalk.magenta,
        info: chalk.blue,
        run: chalk.yellow,
      };
    default:
      return {
        error: chalk.red,
        usage: chalk.yellow,
        info: chalk.green,
        run: chalk.cyan,
      };
  }
}

/**
 * Logs detailed error information with colored output.
 * @param {Function} errorColor - Function to apply error color
 * @param {string} message - The error context message.
 * @param {Error} error - The error object.
 */
function logError(errorColor, message, error) {
  console.error(errorColor(message));
  console.error(errorColor(`Error message: ${error.message}`));
  console.error(errorColor(`Stack trace: ${error.stack}`));
}

/**
 * Main function that executes CLI logic with advanced error handling and colored output.
 * @param {string[]} args - Command line arguments.
 */
export function main(args) {
  const themeColors = getThemeColors();
  // Determine verbose mode either via command line flag or environment variable
  const verboseMode = (args && args.includes("--verbose")) || process.env.LOG_LEVEL === "debug";

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
