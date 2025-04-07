#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";

function errorExit(message) {
  console.error(message);
  process.exit(1);
}

// Validate numeric parameters in arguments that are expected to contain comma-separated numbers.
// This function checks each token that contains a comma across colon-delimited segments and if all parts are numbers.
function validateNumericInputs(arg) {
  const tokens = arg.split(":");
  tokens.forEach(token => {
    if (token.includes(",")) {
      const parts = token.split(",").map(p => p.trim());
      // Only validate if all parts are non-empty
      const allNumeric = parts.every(part => part !== "" && !isNaN(Number(part)));
      if (!allNumeric) {
        // Find which part is invalid
        for (const part of parts) {
          if (part === "" || isNaN(Number(part))) {
            errorExit(`Error: Invalid numeric parameter '${part}' in argument '${arg}'.`);
          }
        }
      }
    }
  });
}

export function main(args = []) {
  // Process each argument: if it contains a colon, check potential numeric tokens
  args.forEach(arg => {
    if (arg.includes(":")) {
      validateNumericInputs(arg);
    }
  });

  console.log(`Run with: ${JSON.stringify(args)}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  main(args);
}
