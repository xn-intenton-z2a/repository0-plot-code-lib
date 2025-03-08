#!/usr/bin/env node
// src/lib/main.js
// repository0-plot-code-lib: CLI for mathematical plotting as per our mission statement.

import { fileURLToPath } from "url";

// Helper functions exported for dynamic import; allows easier mocking during tests
export function loadExpress() {
  return import("express");
}

export function loadReadline() {
  return import("readline");
}

export function main(args) {
  // No arguments: show demo output.
  if (args.length === 0) {
    console.log("Demo Plot: Quadratic function (placeholder). Use flags --interactive, --serve or provide plot parameters.");
    return;
  }
  
  // --diagnostics flag: output diagnostics info
  if (args.includes("--diagnostics")) {
    console.log(`Diagnostics: Node version: ${process.version}`);
    return;
  }

  // --serve flag: start Express-based web server
  if (args.includes("--serve")) {
    loadExpress()
      .then(expressModule => {
        const express = expressModule.default;
        const app = express();
        const port = 3000;
        app.get("/", (req, res) => {
          res.send("Welcome to the interactive plotting web interface.");
        });
        app.listen(port, () => {
          console.log(`Express server running at http://localhost:${port}`);
        });
      })
      .catch(err => {
        console.error("Error starting server:", err);
      });
    return;
  }

  // --interactive flag: prompt for user input via readline
  if (args.includes("--interactive")) {
    loadReadline().then(rlModule => {
      const rl = rlModule.createInterface({
        input: process.stdin,
        output: process.stdout,
      });
      rl.question("Enter plot command (e.g., 'quad:1,0,0,-10,10,1'): ", answer => {
        console.log(`Received plot command: ${answer}`);
        rl.close();
      });
    });
    return;
  }
  
  // Otherwise, simulate processing of plot parameters
  console.log(`Processing plot request with parameters: ${JSON.stringify(args)}`);
}

// Entry point
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  main(args);
}
