# repository0-plot-code-lib

"_Be a go-to plot library with a CLI, be the jq of formulae visualisations._"

## Usage

### CLI

Invoke directly via the command line using Node:

  node src/lib/main.js [arguments]

When no arguments are provided, a default demo plot (plotting sin(x) from 0 to 6.28) is generated and written to output.svg.

Example for standard execution (outputs to file output.svg by default):

  $ node src/lib/main.js --plot --expr "sin(x)" --start 0 --end 6.28 --step 0.1

Example for specifying custom SVG dimensions and a custom output file (e.g., PNG):

  $ node src/lib/main.js --plot "sin(x)" --xmin -10 --xmax 10 --points 100 --width 600 --height 400 --file output.png [--fallback "Custom fallback message for non-finite values"]

#### Enhanced Interactive Mode

A new interactive plotting mode is available. When the `--interactive` flag is provided along with plotting parameters, the tool generates an SVG with tooltips on hover and basic zoom/pan functionality. Data points display their coordinates when hovered over.

For a single interactive plot:

  $ node src/lib/main.js --plot "sin(x)" --xmin -10 --xmax 10 --points 100 --interactive [--fallback "Custom fallback message"]

For interactive multi-function plotting with a comma-separated list:

  $ node src/lib/main.js --plots "tan(x),log(x)" --xmin 1 --xmax 10 --points 50 --interactive [--width 600 --height 400] [--fallback "Custom fallback message"]

Additional flags for logarithmic scaling can be used to transform the axes:

  --logscale-x        Apply logarithmic scale to the x-axis (requires positive x values)
  --logscale-y        Apply logarithmic scale to the y-axis (requires positive y values)

Example with log scale:

  $ node src/lib/main.js --plot "log(x)" --xmin 1 --xmax 100 --points 100 --logscale-x
  $ node src/lib/main.js --plot "x" --xmin 1 --xmax 100 --points 100 --logscale-y

Example for diagnostics mode:

  $ node src/lib/main.js --diagnostics

Example for displaying help:

  $ node src/lib/main.js --help
  $ node src/lib/main.js -h

Example for displaying version:

  $ node src/lib/main.js --version
  $ node src/lib/main.js -v

### Library

Import the main function in your project:

  import { main } from '@src/lib/main.js';
  main(['your', 'args']);

For direct SVG plot generation using the legacy API:

  import { generatePlot } from '@src/lib/main.js';
  const svg = generatePlot("sin(x)", 0, 6.28, 0.1, "Custom fallback message");
  console.log(svg);

For direct SVG plot generation using the new API (with optional logarithmic scaling and custom dimensions):

  import { generateSVGPlot } from '@src/lib/main.js';
  // Log scale on x-axis with custom dimensions
  const svg = generateSVGPlot("sin(x)", -10, 10, 0.4, "Custom fallback message", true, false, 600, 400);
  console.log(svg);

For interactive SVG plot generation via the API:

  import { generateInteractivePlot } from '@src/lib/main.js';
  // Generates an interactive SVG with tooltips and zoom/pan features
  const svg = generateInteractivePlot("sin(x)", -10, 10, 0.4, "Custom fallback message", false, false, 600, 400);
  console.log(svg);

For multi-function plotting via the API:

  // Non-interactive multi-plot
  import { generateMultiPlot } from '@src/lib/main.js';
  const expressions = ["sin(x)", "cos(x)"];
  const svg = generateMultiPlot(expressions, 0, 6.28, 0.1, "", false, false);
  console.log(svg);

  // Interactive multi-plot
  import { generateInteractiveMultiPlot } from '@src/lib/main.js';
  const expressions = ["sin(x)", "cos(x)"];
  const svgInteractive = generateInteractiveMultiPlot(expressions, 0, 6.28, 0.1, "", false, false);
  console.log(svgInteractive);

---

**PNG Conversion:**

If the output file specified with the --file flag ends with .png, the tool automatically converts the generated SVG to PNG format using the 'sharp' library. This allows seamless generation of PNG images from mathematical plots.

**File Output:** By default, the CLI writes the SVG output to a file named "output.svg". This can be overridden using the --file flag with the desired filename (e.g., output.png).

**Custom Dimensions:**

Users can now customize the output SVG dimensions using the new --width and --height options, which default to 500 and 300 respectively if not specified.

**Interactive Mode:**

Interactive SVG plots include tooltips that show data point coordinates on hover, as well as basic zooming and panning functionalities via mouse events. This enhances the user experience for exploring plotted data.

**Caching:** This version also implements an in-memory caching layer. Identical plotting requests will return cached SVG output to improve performance.
