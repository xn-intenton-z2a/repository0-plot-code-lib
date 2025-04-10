#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import chalk, { Chalk } from "chalk";
import { existsSync, readFileSync } from "fs";
import path from "path";

// Helper function to apply a chalk chain from a dot-separated config string.
function applyChalkChain(chain) {
  if (typeof chain !== "string" || chain.trim() === "") {
    return chalk;
  }
  const chainParts = chain.split(".");
  let chained = chalk;
  chainParts.forEach((part) => {
    if (typeof chained[part] === 'function') {
      chained = chained[part];
    }
  });
  return chained;
}

// Enhanced logError function to concatenate messages for accurate logging
function logError(chalkError, ...args) {
  const message = [chalkError("Error:"), ...args, "\nStack trace:", new Error().stack].join(" ");
  console.error(message);
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
      return {
        error: applyChalkChain(config.error),
        usage: applyChalkChain(config.usage),
        info: applyChalkChain(config.info),
        run: applyChalkChain(config.run)
      };
    } catch (e) {
      console.error(chalk.red("Failed to parse custom CLI theme configuration. Using fallback theme."));
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
 * Main function that executes CLI logic with advanced error handling and colored output.
 * @param {string[]} args - Command line arguments.
 */
export function main(args) {
  const themeColors = getThemeColors();
  // Determine verbose mode via command line flag or environment variable
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
