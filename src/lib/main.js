#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import process from "process";
import { parseArguments } from "./cliParser.js";

export function main(args) {
  try {
    const { action } = parseArguments(args);
    action();
  } catch (error) {
    console.error(error.message);
    process.exit(error.code || 1);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  main(args);
}

// --------------------------------------------------
// New Module: src/lib/cliParser.js
// --------------------------------------------------

/**
 * Parses CLI arguments and returns an object containing an action function
 * to execute the appropriate command based on the provided arguments.
 */

// Note: This module encapsulates flag handling and standard plot command parsing.

import process from "process";

export function parseArguments(args) {
  // If no arguments, default to interactive mode
  if (!args || args.length === 0) {
    return {
      action: () => {
        console.log("No arguments provided. Starting interactive mode by default.");
        // Placeholder for interactive mode logic
      }
    };
  }

  // Check if any argument is a flag (starts with "--")
  const flagArg = args.find(arg => arg.startsWith("--"));
  if (flagArg) {
    return {
      action: () => {
        switch (flagArg) {
          case "--interactive":
            console.log("Interactive mode activated.");
            // Placeholder for interactive mode logic
            break;
          case "--serve":
            console.log("Starting web server (placeholder) on port 3000.");
            // Placeholder for Express server startup
            break;
          case "--ascii":
            console.log("Generating ASCII plot output (placeholder).");
            // Placeholder for ASCII plot generation
            break;
          case "--diagnostics":
            console.log("Diagnostics mode active.");
            // Placeholder for diagnostics
            break;
          default:
            console.error(`Unknown flag: ${flagArg}`);
            process.exit(1);
        }
      }
    };
  }

  // Standard plot command parsing:
  if (args.length < 2) {
    const error = new Error("Insufficient arguments. Expected output file and plot command.");
    error.code = 1;
    throw error;
  }

  const [outputFile, plotCommand] = args;
  const parts = plotCommand.split(":");
  if (parts.length < 2) {
    const error = new Error("Invalid plot command format. Expected 'command:parameters'.");
    error.code = 1;
    throw error;
  }

  const commandName = parts[0];
  const paramsString = parts.slice(1).join(":");
  const params = paramsString.split(",");

  // Validate that all parameters are numeric
  const invalidParams = params.filter(p => Number.isNaN(Number(p)));
  if (invalidParams.length > 0) {
    const errMsg = `Invalid parameter(s): ${invalidParams.map(p => `"${p}"`).join(", ")} provided. All parameters must be numeric. Please ensure you use only numeric values. Example valid input: ${commandName}:1,0,0,-10,10,1`;
    const error = new Error(errMsg);
    error.code = 1;
    throw error;
  }

  return {
    action: () => {
      console.log(`Generating ${commandName} plot to ${outputFile} with parameters ${params.join(",")}`);
    }
  };
}
