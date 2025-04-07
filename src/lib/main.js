#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import process from "process";
import { evaluate } from "mathjs";
import express from "express";
import readline from "readline";

// Helper: Standardized error throwing for invalid numeric evaluations
function throwInvalidNumberError(index, rawValue, evaluated, extraInfo = '') {
  const trimmedValue = rawValue.trim();
  const err = new Error(`Parameter ${index} error: Expression '${trimmedValue}' evaluated to ${evaluated}, which is not a finite number. Raw input: '${rawValue}'.`);
  err.code = 1;
  err.diagnostic = {
    index,
    rawValue,
    trimmedValue,
    evaluated,
    suggestion: "Replace any literal 'NaN' (even if formatted with extra whitespace or different casing) with a valid numeric expression."
  };
  throw err;
}

// Enhanced error handling for evaluating mathematical expressions
// This function robustly rejects literal 'NaN' inputs (regardless of case or extra whitespace) and ensures all evaluated expressions yield a finite number.
function evaluateParameter(p, index) {
  const trimmedValue = p.trim();
  // Enhanced robust NaN detection using a regex to catch any case variations and extra whitespace.
  if (/^nan$/i.test(trimmedValue)) {
    const err = new Error(`Parameter ${index} error: Literal 'NaN' detected. Provided raw input '${p}', trimmed to '${trimmedValue}', is not a valid finite number.`);
    err.code = 1;
    err.diagnostic = {
      index,
      rawValue: p,
      trimmedValue,
      suggestion: "Replace the literal 'NaN' with a valid numeric expression, for example, '0' or another finite number."
    };
    throw err;
  }
  let evaluated;
  try {
    evaluated = evaluate(trimmedValue);
  } catch (evaluationError) {
    let refinedSuggestion = "Ensure the expression is well-formed and yields a finite number.";
    const errMsg = evaluationError.message.toLowerCase();
    if (errMsg.includes("undefined symbol") || errMsg.includes("is not defined")) {
      refinedSuggestion = "Verify that all variables are defined and correctly spelled.";
    } else if (errMsg.includes("syntax")) {
      refinedSuggestion = "Ensure the expression follows correct syntax and operator usage.";
    } else if (errMsg.includes("operator")) {
      refinedSuggestion = "Ensure that all operators are supported and used correctly.";
    }
    const err = new Error(`Parameter ${index} error: Unable to evaluate '${trimmedValue}'. ${evaluationError.message}`);
    err.code = 1;
    err.diagnostic = {
      index,
      rawValue: p,
      trimmedValue,
      error: evaluationError.message,
      suggestion: refinedSuggestion
    };
    throw err;
  }
  if (!Number.isFinite(evaluated)) {
    throwInvalidNumberError(index, p, evaluated);
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
    const exitCode = error.code || 1;
    // In test environment, throw an error that includes diagnostic info, else exit
    if (process.env.NODE_ENV === 'test') {
      const exitError = new Error(`process.exit:${exitCode}`);
      exitError.diagnostic = error.diagnostic;
      throw exitError;
    } else {
      process.exit(exitCode);
    }
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  main(args);
}
