#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import chalk, { Chalk } from "chalk";
import { existsSync, readFileSync } from "fs";
import path from "path";
import { z } from "zod";  // imported zod for schema validation

// Define global configuration schema using zod
const globalConfigSchema = z.object({
  CLI_COLOR_SCHEME: z.string().optional(),
  LOG_LEVEL: z.string().optional(),
  ERROR_REPORTING_URL: z.string().url().optional(),
  defaultArgs: z.array(z.string()).optional()
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

/**
 * Returns the current CLI theme color functions based on a provided theme override, a custom configuration file, or the CLI_COLOR_SCHEME environment variable.
 */
function getThemeColors(themeOverride = null) {
  if (themeOverride) {
    const forcedChalk = new Chalk({ level: 3 });
    switch (themeOverride) {
      case "dark":
        return {
          error: forcedChalk.bold.red,
          usage: forcedChalk.bold.blue,
          info: forcedChalk.bold.green,
          run: forcedChalk.bold.cyan
        };
      case "light":
        return {
          error: forcedChalk.red,
          usage: forcedChalk.magenta,
          info: forcedChalk.blue,
          run: forcedChalk.yellow
        };
      case "default":
        return {
          error: forcedChalk.red,
          usage: forcedChalk.yellow,
          info: forcedChalk.green,
          run: forcedChalk.cyan
        };
      default:
        console.error(forcedChalk.red(`Unknown theme override '${themeOverride}'. Falling back to default theme.`));
        return {
          error: forcedChalk.red,
          usage: forcedChalk.yellow,
          info: forcedChalk.green,
          run: forcedChalk.cyan
        };
    }
  }

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
  if (theme === "dark") {
    const forcedChalk = new Chalk({ level: 3 });
    return {
      error: forcedChalk.bold.red,
      usage: forcedChalk.bold.blue,
      info: forcedChalk.bold.green,
      run: forcedChalk.bold.cyan
    };
  } else if (theme === "light") {
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
  // Validate merged configuration using zod schema
  const result = globalConfigSchema.safeParse(mergedConfig);
  if (!result.success) {
    console.error(chalk.red(`Global config validation error: ${result.error}. Using default configuration.`));
    return {};
  }
  return result.data;
}

/**
 * Consolidated validation function for numeric CLI arguments.
 * Validates the number format and throws detailed errors that are handled in the main catch block.
 * @param {string} numStr - The numeric string from CLI argument.
 * @param {boolean} verboseMode - Flag indicating verbose mode.
 * @param {object} themeColors - Theme color functions for logging.
 * @returns {number} - Parsed valid number.
 * @throws {Error} if the numeric value is invalid.
 */
function validateNumericArg(numStr, verboseMode, themeColors) {
  const trimmedValue = numStr.trim();
  if (trimmedValue === "") {
    throw new Error(`Invalid numeric value for argument '--number=': no value provided. Please provide a valid number such as '--number=42'.`);
  }

  // Normalize by removing underscores and commas
  const normalized = trimmedValue.replace(/[_,]/g, '');

  // Directly parse the number and validate
  const parsed = Number(normalized);
  if (Number.isNaN(parsed)) {
    throw new Error(`Invalid numeric value for argument '--number=${trimmedValue}': '${trimmedValue}' is not a valid number. Please provide a valid number such as '--number=42'.`);
  }

  return parsed;
}

/**
 * Main function that executes CLI logic with advanced error handling, colored output, numeric argument validation, and global configuration support.
 * @param {string[]} args - Command line arguments.
 */
export async function main(args) {
  // Extract and remove any theme override flag from args
  let themeOverride = null;
  if (args && args.length > 0) {
    args = args.filter(arg => {
      if (arg.startsWith('--theme=')) {
        themeOverride = arg.slice('--theme='.length);
        return false;
      }
      return true;
    });
  }

  // Check if the '--show-config' flag is present
  if (args && args.includes('--show-config')) {
    const globalConfig = getGlobalConfig();
    // Merge environment overrides
    if (process.env.CLI_COLOR_SCHEME) globalConfig.CLI_COLOR_SCHEME = process.env.CLI_COLOR_SCHEME;
    if (process.env.LOG_LEVEL) globalConfig.LOG_LEVEL = process.env.LOG_LEVEL;
    if (process.env.ERROR_REPORTING_URL) globalConfig.ERROR_REPORTING_URL = process.env.ERROR_REPORTING_URL;
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

  const themeColors = getThemeColors(themeOverride);
  // Determine verbose mode via command line flag only
  const verboseMode = args && args.includes("--verbose");

  // If no args provided but global config has defaultArgs, use them
  if ((!args || args.length === 0) && globalConfig.defaultArgs && Array.isArray(globalConfig.defaultArgs) && globalConfig.defaultArgs.length > 0) {
    console.log(themeColors.info("Using default arguments from global configuration."));
    args = globalConfig.defaultArgs;
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
        validateNumericArg(numStr, verboseMode, themeColors);
      }
    }

    // Simulate an error if '--simulate-error' flag is provided (for testing purposes)
    if (args && args.includes("--simulate-error")) {
      throw new Error("Simulated error condition for testing. Please provide a valid number such as '--number=42'");
    }

    console.log(themeColors.usage("Run with: ") + themeColors.run(JSON.stringify(args)));
  } catch (error) {
    if (verboseMode || (process.env.LOG_LEVEL && process.env.LOG_LEVEL.toLowerCase() === 'debug')) {
      logError(themeColors.error, "Error in main function execution:", error);
    } else {
      const msg = error.message.startsWith("Invalid numeric value for argument") ? error.message : "Error: " + error.message;
      console.error(themeColors.error(msg));
    }

    // Automatic error reporting only in verbose mode
    if ((verboseMode || (process.env.LOG_LEVEL && process.env.LOG_LEVEL.toLowerCase() === 'debug')) && errorReportingUrl) {
      // Gather library version from package.json
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
        }
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
