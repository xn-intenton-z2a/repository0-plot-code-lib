===== src/lib/main.js =====
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
// if all parts are valid numbers. If not, it provides a detailed error message indicating the
// problematic token and its segment.
function validateNumericInputs(arg) {
  const segments = arg.split(":");
  segments.forEach(segment => {
    if (segment.includes(",")) {
      const parts = segment.split(",").map(p => p.trim());
      parts.forEach(part => {
        if (part === "" || isNaN(Number(part))) {
          const explanation = part === "" ? "empty" : "not a valid number";
          errorExit(`Error: Invalid numeric parameter '${part}' (${explanation}) in segment '${segment}' of argument '${arg}'.`);
        }
      });
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
  }
};

// Export advancedPlots for use in the web interface
export { advancedPlots };


===== src/web/app.js =====
import express from 'express';
import { advancedPlots } from '../lib/main.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));

// GET endpoint: Serve a simple HTML form for plotting
app.get('/', (req, res) => {
  const plotTypes = [
    'spiral',
    'polarHeatmap',
    'dualAxis',
    'boxPlot',
    'violinPlot',
    'cumulativeAverage',
    'inverse',
    'modulatedSine',
    'extended3D'
  ];
  const options = plotTypes.map(type => `<option value="${type}">${type}</option>`).join('');
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Plot Interface</title>
      </head>
      <body>
        <h1>Plot Interface</h1>
        <form action="/plot" method="post">
          <label for="plotType">Select Plot Type:</label>
          <select name="plotType" id="plotType">
            ${options}
          </select>
          <br><br>
          <label for="params">Parameters:</label>
          <input type="text" id="params" name="params" placeholder="Enter parameters" required>
          <br><br>
          <button type="submit">Generate Plot</button>
        </form>
      </body>
    </html>
  ";
  res.send(html);
});

// POST endpoint: Process form submission and invoke the corresponding advanced plotting function
app.post('/plot', (req, res) => {
  const { plotType, params } = req.body;
  if (advancedPlots[plotType]) {
    advancedPlots[plotType](params);
    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Plot Confirmation</title>
        </head>
        <body>
          <h1>Plot Action Executed</h1>
          <p>Executed ${plotType} plot with parameters: ${params}</p>
          <a href="/">Back</a>
        </body>
      </html>
    `);
  } else {
    res.status(400).send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Error</title>
        </head>
        <body>
          <h1>Error: Unknown advanced plot type.</h1>
          <a href="/">Back</a>
        </body>
      </html>
    `);
  }
});

app.listen(port, () => {
  console.log(`Web server listening on port ${port}`);
});

export default app;
