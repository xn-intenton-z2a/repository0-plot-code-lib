#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";

/**
 * Logs detailed error information.
 * @param {string} message - The error context message.
 * @param {Error} error - The error object.
 */
function logError(message, error) {
  console.error(message);
  console.error(`Error message: ${error.message}`);
  console.error(`Stack trace: ${error.stack}`);
}

/**
 * Main function that executes CLI logic with advanced error handling.
 * @param {string[]} args - Command line arguments.
 */
export function main(args) {
  try {
    // Simulate an error if '--simulate-error' flag is provided (for testing purposes)
    if (args && args.includes("--simulate-error")) {
      throw new Error("Simulated error condition for testing");
    }

    // If no arguments are provided, display usage message instead of abrupt exit
    if (!args || args.length === 0) {
      console.log("No arguments provided. Please provide valid arguments.\nUsage: repository0-plot-code-lib <arguments>");
      return;
    }

    console.log(`Run with: ${JSON.stringify(args)}`);
  } catch (error) {
    logError("Error in main function execution:", error);
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
