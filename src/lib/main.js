///////////////////////////////
// File: src/lib/main.js
///////////////////////////////
// src/lib/main.js

import { fileURLToPath } from "url";

function errorExit(message) {
  console.error(message);
  process.exit(1);
}

// Validate numeric parameters in arguments that are expected to contain comma-separated numbers.
// This function checks each token that contains a comma across colon-delimited segments and
// if all parts are valid numbers. It still treats the literal 'NaN' (case insensitive) as a special valid value.
// (This function is retained for non-advanced mode validations.)
function validateNumericInputs(arg) {
  const segments = arg.split(":");
  segments.forEach(segment => {
    if (segment.includes(",")) {
      const parts = segment.split(",").map(p => p.trim());
      parts.forEach(part => {
        if (part === "" || (part.toLowerCase() !== 'nan' && isNaN(Number(part)))) {
          const explanation = part === "" ? "empty" : "not a valid number";
          errorExit(`Error: Invalid numeric parameter '${part}' (${explanation}) in segment '${segment}' of argument '${arg}'.`);
        }
      });
    }
  });
}

// New function to parse numeric tokens and convert them to native numbers.
// It splits a comma-separated string and converts each token: if token equals 'NaN' (case insensitive) then returns native NaN,
// otherwise converts using Number and validates the conversion.
function parseNumericParams(paramStr) {
  const parts = paramStr.split(",").map(p => p.trim());
  const converted = parts.map(part => {
    if (part.toLowerCase() === 'nan') {
      return NaN;
    } else if (part === "") {
      errorExit(`Error: Invalid numeric parameter '' (empty) in parameters '${paramStr}'.`);
    } else {
      const num = Number(part);
      if (isNaN(num)) {
        errorExit(`Error: Invalid numeric parameter '${part}' (not a valid number) in parameters '${paramStr}'.`);
      }
      return num;
    }
  });
  return converted;
}

export function main(args = []) {
  // Check if the --advanced flag is provided
  if (args.includes("--advanced")) {
    const filteredArgs = args.filter(arg => arg !== "--advanced");
    const [plotType, params] = filteredArgs;
    // If parameters contain a comma, parse them to convert numeric tokens
    let parsedParams = params;
    if (params && params.includes(",")) {
      parsedParams = parseNumericParams(params);
    }
    switch (plotType) {
      case "spiral":
        console.log("Advanced Plot: Spiral");
        advancedPlots.spiral(parsedParams);
        break;
      case "polarHeatmap":
        console.log("Advanced Plot: Polar Heatmap");
        advancedPlots.polarHeatmap(parsedParams);
        break;
      case "dualAxis":
        console.log("Advanced Plot: Dual Axis");
        advancedPlots.dualAxis(parsedParams);
        break;
      case "boxPlot":
        console.log("Advanced Plot: Box Plot");
        advancedPlots.boxPlot(parsedParams);
        break;
      case "violinPlot":
        console.log("Advanced Plot: Violin Plot");
        advancedPlots.violinPlot(parsedParams);
        break;
      case "cumulativeAverage":
        console.log("Advanced Plot: Cumulative Average");
        advancedPlots.cumulativeAverage(parsedParams);
        break;
      case "inverse":
        console.log("Advanced Plot: Inverse Function");
        advancedPlots.inverse(parsedParams);
        break;
      case "modulatedSine":
        console.log("Advanced Plot: Modulated Sine");
        advancedPlots.modulatedSine(parsedParams);
        break;
      case "extended3D":
        console.log("Advanced Plot: Extended 3D Plot");
        advancedPlots.extended3D(parsedParams);
        break;
      case "testPlot":
        // Added for testing numeric conversion
        advancedPlots.testPlot(parsedParams);
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

// Inlined advanced plotting implementations (previously in advancedPlots.js)
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
  },
  testPlot: function(params) {
    // Dummy implementation for testing numeric conversion
    console.log("Test Plot with params:", params);
  }
};

// Export advancedPlots for use in the web interface
export { advancedPlots };