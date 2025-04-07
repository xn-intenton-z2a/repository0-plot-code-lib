#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import process from "process";

// Internal CLI argument parser implementation
function parseArguments(args) {
  if (args.length === 0) {
    return {
      action: () => {
        console.log("No arguments provided. Starting interactive mode by default.");
      }
    };
  } else if (args.includes("--interactive")) {
    return {
      action: () => {
        console.log("Interactive mode activated.");
      }
    };
  } else if (args.includes("--serve")) {
    return {
      action: () => {
        console.log("Starting web server (placeholder) on port 3000.");
      }
    };
  } else if (args.includes("--ascii")) {
    return {
      action: () => {
        console.log("Generating ASCII plot output (placeholder).");
      }
    };
  } else if (args.includes("--diagnostics")) {
    return {
      action: () => {
        console.log("Diagnostics mode activated.");
      }
    };
  } else if (args.length >= 2) {
    const output = args[0];
    const command = args[1];
    if (command.startsWith("quad:")) {
      const paramsStr = command.substring(5);
      const params = paramsStr.split(",");
      if (params.length !== 6) {
        const err = new Error("Invalid plot command format");
        err.code = 1;
        throw err;
      }
      for (const p of params) {
        const num = Number(p);
        if (!Number.isFinite(num)) {
          const err = new Error(`Invalid parameter: "${p}" is not a valid number. Please provide only numeric values. Example valid input: quad:1,0,0,-10,10,1`);
          err.code = 1;
          throw err;
        }
      }
      return {
        action: () => {
          console.log(`Generating quad plot to ${output} with parameters ${params.join(",")}`);
        }
      };
    } else {
      const err = new Error("Invalid plot command format");
      err.code = 1;
      throw err;
    }
  } else {
    const err = new Error("Invalid command");
    err.code = 1;
    throw err;
  }
}

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
