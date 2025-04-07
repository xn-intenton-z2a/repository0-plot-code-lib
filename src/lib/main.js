#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import process from "process";
import { evaluate } from "mathjs";
import express from "express";
import readline from "readline";

// Internal CLI argument parser implementation
function parseArguments(args) {
  // Modes activated by single flag arguments
  if (args.length === 0) {
    return {
      action: interactiveMode
    };
  } else if (args.includes("--interactive")) {
    return {
      action: interactiveMode
    };
  } else if (args.includes("--serve")) {
    return {
      action: webServerMode
    };
  } else if (args.includes("--ascii")) {
    return {
      action: asciiMode
    };
  } else if (args.includes("--diagnostics")) {
    return {
      action: diagnosticsMode
    };
  } else if (args.length >= 2) {
    const output = args[0];
    const command = args[1];
    // Determine plot type by prefix
    if (command.startsWith("quad:")) {
      const paramsStr = command.substring(5);
      const params = paramsStr.split(",");
      if (params.length !== 6) {
        const err = new Error("Invalid quad plot command format: Expected 6 numeric parameters separated by commas.");
        err.code = 1;
        err.diagnostic = { error: "Incorrect number of parameters", provided: params.length, expected: 6 };
        throw err;
      }
      // Evaluate each parameter using mathjs
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
        if (Number.isNaN(evaluated)) {
          const err = new Error(`Invalid parameter at index ${i}: Evaluated result is NaN for input '${p}'. Please provide a valid finite mathematical expression.`);
          err.code = 1;
          err.diagnostic = { index: i, rawValue: p, evaluated };
          throw err;
        }
        if (!Number.isFinite(evaluated)) {
          const err = new Error(`Invalid parameter at index ${i}: Evaluated result is not a finite number for input '${p}'. Please provide a valid finite mathematical expression.`);
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
          // Placeholder for actual quad plot generation logic
        }
      };
    } else if (command.startsWith("linear:")) {
      const paramsStr = command.substring(7);
      const params = paramsStr.split(",");
      if (params.length !== 5) {
        const err = new Error("Invalid linear plot command format: Expected 5 numeric parameters separated by commas.");
        err.code = 1;
        err.diagnostic = { error: "Incorrect number of parameters", provided: params.length, expected: 5 };
        throw err;
      }
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
        if (Number.isNaN(evaluated) || !Number.isFinite(evaluated)) {
          const err = new Error(`Invalid parameter at index ${i}: Evaluated result is not a valid finite number for input '${p}'.`);
          err.code = 1;
          err.diagnostic = { index: i, rawValue: p, evaluated };
          throw err;
        }
        params[i] = evaluated;
      }
      return {
        action: () => {
          console.log(`Generating linear plot to ${output} with parameters ${params.join(",")}`);
          // Placeholder for actual linear plot generation logic
        }
      };
    } else if (command.startsWith("expr:")) {
      // Expected format: expr:<function_expression>:<rangeStart>,<rangeEnd>,<step>
      const remainder = command.substring(5);
      const firstColonIndex = remainder.indexOf(":");
      if (firstColonIndex === -1) {
        const err = new Error("Invalid expr plot command format: Missing range parameters.");
        err.code = 1;
        err.diagnostic = { error: "Expected format expr:<expression>:<rangeStart>,<rangeEnd>,<step>" };
        throw err;
      }
      const funcExpr = remainder.substring(0, firstColonIndex);
      const rangeStr = remainder.substring(firstColonIndex + 1);
      const params = rangeStr.split(",");
      if (params.length !== 3) {
        const err = new Error("Invalid expr plot command format: Expected 3 numeric range parameters separated by commas.");
        err.code = 1;
        err.diagnostic = { error: "Incorrect number of range parameters", provided: params.length, expected: 3 };
        throw err;
      }
      // Evaluate the range parameters
      for (let i = 0; i < params.length; i++) {
        const p = params[i];
        let evaluated;
        try {
          evaluated = evaluate(p);
        } catch (evaluationError) {
          const err = new Error(`Error evaluating range parameter at index ${i}: value '${p}' is not a valid expression. Details: ${evaluationError.message}`);
          err.code = 1;
          err.diagnostic = { index: i, rawValue: p, error: evaluationError.message };
          throw err;
        }
        if (Number.isNaN(evaluated) || !Number.isFinite(evaluated)) {
          const err = new Error(`Invalid range parameter at index ${i}: Evaluated result is not a valid finite number for input '${p}'.`);
          err.code = 1;
          err.diagnostic = { index: i, rawValue: p, evaluated };
          throw err;
        }
        params[i] = evaluated;
      }
      return {
        action: () => {
          console.log(`Generating expression plot to ${output} with function '${funcExpr}' and range parameters ${params.join(",")}`);
          // Placeholder for actual expression plot generation logic
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

// Interactive mode implementation
function interactiveMode() {
  console.log("Starting interactive mode...");
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question("Enter your plot command: ", (answer) => {
    try {
      // Split answer by space; support for basic commands in interactive mode
      const tokens = answer.trim().split(" ");
      const { action } = parseArguments(tokens);
      action();
    } catch (error) {
      console.error(error.message);
      if (error.diagnostic) {
        console.error("Diagnostic info:", JSON.stringify(error.diagnostic));
      }
    } finally {
      rl.close();
    }
  });
}

// Web server mode using Express (placeholder implementation)
function webServerMode() {
  const app = express();
  const port = 3000;
  app.get("/", (req, res) => {
    res.send("Welcome to the plotting web interface. (Placeholder)");
  });
  // Start listening asynchronously, but log synchronously for testing purposes
  app.listen(port, () => {
    // Additional async log can be placed here if needed
  });
  console.log(`Starting web server (placeholder) on port ${port}.`);
}

// ASCII plot mode (placeholder implementation)
function asciiMode() {
  console.log("Generating ASCII plot output (placeholder).");
}

// Diagnostics mode (placeholder implementation)
function diagnosticsMode() {
  console.log("Diagnostics mode activated. (Placeholder diagnostics information)");
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
