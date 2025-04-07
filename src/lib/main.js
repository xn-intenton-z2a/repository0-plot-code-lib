#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import process from "process";
import { evaluate } from "mathjs";
import express from "express";
import readline from "readline";

// Enhanced error handling for evaluating mathematical expressions
// Now includes detailed diagnostic information when a parameter evaluates to NaN or a non-finite number.
function evaluateParameter(p, index) {
  let evaluated;
  try {
    evaluated = evaluate(p);
  } catch (evaluationError) {
    const err = new Error(`Error evaluating parameter ${index} with input '${p}': ${evaluationError.message}. Please check your expression for syntax and valid operators.`);
    err.code = 1;
    err.diagnostic = { index, rawValue: p, error: evaluationError.message, suggestion: "Review the expression for invalid syntax, missing values, or unsupported operators." };
    throw err;
  }
  if (Number.isNaN(evaluated)) {
    const err = new Error(`Error: Parameter ${index} with input '${p}' evaluated to NaN. This might be due to invalid operators, unsupported syntax, or missing values. Please ensure it forms a valid numeric expression.`);
    err.code = 1;
    err.diagnostic = { index, rawValue: p, evaluated, suggestion: "Check the expression for syntax errors, missing values, and invalid operators." };
    throw err;
  }
  if (!Number.isFinite(evaluated)) {
    const err = new Error(`Error: Parameter ${index} with input '${p}' evaluated to a non-finite number (${evaluated}). Please provide a finite numeric expression. Suggestions: Check for division by zero or overflow issues.`);
    err.code = 1;
    err.diagnostic = { index, rawValue: p, evaluated, suggestion: "Ensure the expression does not result in Infinity, -Infinity, or other non-finite values." };
    throw err;
  }
  return evaluated;
}

// Helper function to process parameters for commands expecting numeric expressions
function processParams(params, expectedCount) {
  if (params.length !== expectedCount) {
    const err = new Error(`Invalid parameter count: Expected ${expectedCount} numeric parameters separated by commas, but got ${params.length}.`);
    err.code = 1;
    err.diagnostic = { provided: params.length, expected: expectedCount };
    throw err;
  }
  return params.map((p, i) => evaluateParameter(p, i));
}

// Command Handlers mapping for plot commands
const commandHandlers = {
  quad: (output, paramString) => {
    const params = paramString.split(",");
    const evaluatedParams = processParams(params, 6);
    return {
      action: () => {
        console.log(`Generating quad plot to ${output} with parameters ${evaluatedParams.join(",")}`);
        // Placeholder for actual quad plot generation logic
      }
    };
  },
  linear: (output, paramString) => {
    const params = paramString.split(",");
    const evaluatedParams = processParams(params, 5);
    return {
      action: () => {
        console.log(`Generating linear plot to ${output} with parameters ${evaluatedParams.join(",")}`);
        // Placeholder for actual linear plot generation logic
      }
    };
  },
  expr: (output, paramString) => {
    // Expected format: <function_expression>:<rangeStart>,<rangeEnd>,<step>
    const firstColonIndex = paramString.indexOf(":");
    if (firstColonIndex === -1) {
      const err = new Error("Invalid expr plot command format: Missing range parameters.");
      err.code = 1;
      err.diagnostic = { error: "Expected format expr:<expression>:<rangeStart>,<rangeEnd>,<step>" };
      throw err;
    }
    const funcExpr = paramString.substring(0, firstColonIndex);
    const rangeStr = paramString.substring(firstColonIndex + 1);
    const rangeParams = rangeStr.split(",");
    const evaluatedRangeParams = processParams(rangeParams, 3);
    return {
      action: () => {
        console.log(`Generating expression plot to ${output} with function '${funcExpr}' and range parameters ${evaluatedRangeParams.join(",")}`);
        // Placeholder for actual expression plot generation logic
      }
    };
  }
};

// Refactored argument parser
function parseArguments(args) {
  // Check for modes activated by flags
  if (args.length === 0 || args.includes("--interactive")) {
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
    const colonIndex = command.indexOf(":");
    if (colonIndex === -1) {
      const err = new Error("Invalid plot command format");
      err.code = 1;
      err.diagnostic = { command };
      throw err;
    }
    const prefix = command.substring(0, colonIndex);
    const paramString = command.substring(colonIndex + 1);
    const handler = commandHandlers[prefix];
    if (!handler) {
      const err = new Error("Invalid plot command format");
      err.code = 1;
      err.diagnostic = { command };
      throw err;
    }
    return handler(output, paramString);
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
