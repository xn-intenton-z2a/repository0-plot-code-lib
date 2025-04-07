#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import process from "process";

export function main(args) {
  if (!args || args.length === 0) {
    console.log("No arguments provided. Starting interactive mode by default.");
    // Placeholder for interactive mode logic.
    return;
  }

  // Check if any argument is a flag (starts with "--")
  const flagArg = args.find(arg => arg.startsWith("--"));
  if (flagArg) {
    switch (flagArg) {
      case "--interactive":
        console.log("Interactive mode activated.");
        // Placeholder for interactive mode logic.
        break;
      case "--serve":
        console.log("Starting web server (placeholder) on port 3000.");
        // Placeholder for Express server startup.
        break;
      case "--ascii":
        console.log("Generating ASCII plot output (placeholder).");
        // Placeholder for ASCII plot generation.
        break;
      case "--diagnostics":
        console.log("Diagnostics mode active.");
        // Placeholder for diagnostics.
        break;
      default:
        console.error(`Unknown flag: ${flagArg}`);
        process.exit(1);
    }
    return;
  }

  // If no flag, assume the arguments are for generating a plot
  if (args.length < 2) {
    console.error("Insufficient arguments. Expected output file and plot command.");
    process.exit(1);
  }

  const [outputFile, plotCommand] = args;
  const parts = plotCommand.split(":");
  if (parts.length < 2) {
    console.error("Invalid plot command format. Expected 'command:parameters'.");
    process.exit(1);
  }
  const commandName = parts[0];
  const paramsString = parts.slice(1).join(":");
  const params = paramsString.split(",");

  // Validate that all parameters are numeric using Number conversion.
  const invalidParams = params.filter(p => Number.isNaN(Number(p)));
  if (invalidParams.length > 0) {
    const errorMsg = `Invalid parameter: "${invalidParams[0]}" provided. All parameters must be numeric. Example valid input: ${commandName}:1,0,0,-10,10,1`;
    console.error(errorMsg);
    process.exit(1);
  }

  console.log(`Generating ${commandName} plot to ${outputFile} with parameters ${params.join(",")}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  main(args);
}
