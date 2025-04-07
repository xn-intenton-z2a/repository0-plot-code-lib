#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import process from "process";
import { evaluate } from "mathjs";

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
        const err = new Error("Invalid plot command format: Expected 6 numeric parameters separated by commas.");
        err.code = 1;
        err.diagnostic = { error: "Incorrect number of parameters", provided: params.length, expected: 6 };
        throw err;
      }
      // Evaluate each parameter using mathjs to support expressions
      for (let i = 0; i < params.length; i++) {
        const p = params[i];
        let evaluated;
        try {
          evaluated = evaluate(p);
        } catch (evaluationError) {
          const err = new Error(`Error evaluating parameter at index ${i}: value '${p}' is not a valid expression. Details: ${evaluationError.message}`);
          err.code = 1;
          err.diagnostic = { index: i, rawValue: p, error: evaluationError.message };
          throw err;
        }
        if (!Number.isFinite(evaluated)) {
          const err = new Error(`Invalid parameter at index ${i}: value '${p}' did not evaluate to a valid finite number.`);
          err.code = 1;
          err.diagnostic = { index: i, rawValue: p, evaluated };
          throw err;
        }
        // Replace text parameter with its evaluated numeric value
        params[i] = evaluated;
      }
      return {
        action: () => {
          console.log(`Generating quad plot to ${output} with parameters ${params.join(",")}`);
        }
      };
    } else {
      const err = new Error("Invalid plot command format");
      err.code = 1;
      err.diagnostic = { command };
      throw err;
    }
  } else {
    const err = new Error("Invalid command");
    err.code = 1;
    err.diagnostic = { args };
    throw err;
  }
}

export function main(args) {
  try {
    const { action } = parseArguments(args);
    action();
  } catch (error) {
    console.error(error.message);
    if (error.diagnostic) {
      console.error("Diagnostic info:", JSON.stringify(error.diagnostic));
    }
    process.exit(error.code || 1);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  main(args);
}
