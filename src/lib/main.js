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

export async function main(args) {
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
    try {
      const expressModule = await loadExpress();
      const express = expressModule.default;
      const app = express();
      const port = 3000;
      app.get("/", (req, res) => {
        res.send("Welcome to the interactive plotting web interface.");
      });
      await new Promise(resolve => {
        app.listen(port, () => {
          console.log(`Express server running at http://localhost:${port}`);
          resolve();
        });
      });
    } catch (err) {
      console.error("Error starting server:", err);
    }
    return;
  }

  // --interactive flag: prompt for user input via readline
  if (args.includes("--interactive")) {
    const rlModule = await loadReadline();
    const rl = rlModule.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    await new Promise(resolve => {
      // In test environments, bypass the timeout by setting VITEST=true
      if (process.env.NODE_ENV === 'test' || process.env.VITEST === 'true') {
        rl.question("Enter plot command (e.g., 'quad:1,0,0,-10,10,1'): ", answer => {
          console.log(`Received plot command: ${answer}`);
          rl.close();
          resolve();
        });
      } else {
        // Use timeout fallback for non-test environments
        const timeoutMs = 100;
        const timeout = setTimeout(() => {
          console.warn('Interactive mode fallback triggered after timeout');
          rl.close();
          resolve();
        }, timeoutMs);
        rl.question("Enter plot command (e.g., 'quad:1,0,0,-10,10,1'): ", answer => {
          clearTimeout(timeout);
          console.log(`Received plot command: ${answer}`);
          rl.close();
          resolve();
        });
      }
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
