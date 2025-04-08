///////////////////////////////
// File: src/lib/main.js
///////////////////////////////
// src/lib/main.js

import { fileURLToPath } from "url";

function errorExit(message) {
  console.error(message);
  process.exit(1);
}

// Inlined argument parser function
export function parseArguments(args) {
  if (args.length === 0) {
    return { advanced: false, args };
  }
  if (args[0] === "--advanced") {
    if (args.length < 3) {
      throw new Error("Insufficient arguments for advanced plotting.");
    }
    const plotType = args[1];
    const paramStr = args[2];
    const parts = paramStr.split(":");
    if (parts.length !== 2) {
      return { advanced: true, plotType, params: paramStr };
    }
    // Validate numeric values
    const numberStrings = parts[1].split(",");
    for (const numStr of numberStrings) {
      if (isNaN(Number(numStr))) {
        throw new Error(`Invalid numeric parameter '${numStr}'`);
      }
    }
    return { advanced: true, plotType, params: paramStr };
  }
  return { advanced: false, args };
}

export function main(args = []) {
  try {
    const parsed = parseArguments(args);
    if (parsed.advanced) {
      const { plotType, params } = parsed;
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
    } else {
      // For non-advanced mode, simply print the arguments
      console.log(`Run with: ${JSON.stringify(parsed.args)}`);
    }
  } catch (error) {
    errorExit(error.message);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  main(args);
}

// Inlined advanced plotting implementations
const advancedPlots = {
  spiral: function(params) {
    // Dummy implementation for enhanced spiral plotting
    console.log("Plotting spiral with params:", params);
  },
  polarHeatmap: function(params) {
    // Dummy implementation for polar heatmap plotting
    console.log("Plotting polar heatmap with params:", params);
  },
  dualAxis: function(params) {
    // Dummy implementation for dual axis plotting
    console.log("Plotting dual axis with params:", params);
  },
  boxPlot: function(params) {
    // Dummy implementation for box plot
    console.log("Plotting box plot with params:", params);
  },
  violinPlot: function(params) {
    // Dummy implementation for violin plot
    console.log("Plotting violin plot with params:", params);
  },
  cumulativeAverage: function(params) {
    // Dummy implementation for cumulative average plotting
    console.log("Plotting cumulative average with params:", params);
  },
  inverse: function(params) {
    // Dummy implementation for inverse function plotting
    console.log("Plotting inverse function with params:", params);
  },
  modulatedSine: function(params) {
    // Dummy implementation for modulated sine plotting
    console.log("Plotting modulated sine with params:", params);
  },
  extended3D: function(params) {
    // Dummy implementation for extended 3D plotting
    console.log("Plotting extended 3D plot with params:", params);
  }
};
