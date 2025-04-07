#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import * as advancedPlots from "./advancedPlots.js";

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
  // Check if the --advanced flag is provided
  if (args.includes("--advanced")) {
    const filteredArgs = args.filter(arg => arg !== "--advanced");
    const [plotType, params] = filteredArgs;
    switch (plotType) {
      case "spiral":
        console.log("Advanced Plot: Spiral");
        advancedPlots.spiral(params);
        break;
      case "polarHeatmap":
        console.log("Advanced Plot: Polar Heatmap");
        advancedPlots.polarHeatmap(params);
        break;
      case "dualAxis":
        console.log("Advanced Plot: Dual Axis");
        advancedPlots.dualAxis(params);
        break;
      case "boxPlot":
        console.log("Advanced Plot: Box Plot");
        advancedPlots.boxPlot(params);
        break;
      case "violinPlot":
        console.log("Advanced Plot: Violin Plot");
        advancedPlots.violinPlot(params);
        break;
      case "cumulativeAverage":
        console.log("Advanced Plot: Cumulative Average");
        advancedPlots.cumulativeAverage(params);
        break;
      case "inverse":
        console.log("Advanced Plot: Inverse Function");
        advancedPlots.inverse(params);
        break;
      case "modulatedSine":
        console.log("Advanced Plot: Modulated Sine");
        advancedPlots.modulatedSine(params);
        break;
      case "extended3D":
        console.log("Advanced Plot: Extended 3D Plot");
        advancedPlots.extended3D(params);
        break;
      default:
        errorExit("Error: Unknown advanced plot type.");
    }
    return;
  }

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


// -----------------------------------------------------------------------------
// New Module: src/lib/advancedPlots.js
// -----------------------------------------------------------------------------

// src/lib/advancedPlots.js

import { evaluate } from "mathjs";

export function spiral(params) {
  // Dummy implementation for enhanced spiral plotting
  console.log("Plotting spiral with params:", params);
}

export function polarHeatmap(params) {
  // Dummy implementation for polar heatmap plotting
  console.log("Plotting polar heatmap with params:", params);
}

export function dualAxis(params) {
  // Dummy implementation for dual axis plotting
  console.log("Plotting dual axis with params:", params);
}

export function boxPlot(params) {
  // Dummy implementation for box plot
  console.log("Plotting box plot with params:", params);
}

export function violinPlot(params) {
  // Dummy implementation for violin plot
  console.log("Plotting violin plot with params:", params);
}

export function cumulativeAverage(params) {
  // Dummy implementation for cumulative average plotting
  console.log("Plotting cumulative average with params:", params);
}

export function inverse(params) {
  // Dummy implementation for inverse function plotting
  console.log("Plotting inverse function with params:", params);
}

export function modulatedSine(params) {
  // Dummy implementation for modulated sine plotting
  console.log("Plotting modulated sine with params:", params);
}

export function extended3D(params) {
  // Dummy implementation for extended 3D plotting
  console.log("Plotting extended 3D plot with params:", params);
}
