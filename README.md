# repository0-plot-code-lib

"_Be a go-to plot library with a CLI, be the jq of formulae visualisations._"

## Usage

### CLI

Invoke directly via the command line using Node:

  node src/lib/main.js [arguments]

When no arguments are provided, a default demo plot (plotting sin(x) from 0 to 6.28) is generated and written to output.svg.

Example for standard execution (outputs to file output.svg by default):

  $ node src/lib/main.js --plot --expr "sin(x)" --start 0 --end 6.28 --step 0.1

Example for specifying custom SVG dimensions, dark mode, and a custom output file (e.g., PNG, JPEG, or PDF):

  $ node src/lib/main.js --plot "sin(x)" --xmin -10 --xmax 10 --points 100 --width 600 --height 400 --darkmode --file output.png [--fallback "Custom fallback message for non-finite values"]

#### Enhanced Interactive Mode

A new interactive plotting mode is available. When the `--interactive` flag is provided along with plotting parameters, the tool generates an SVG with tooltips on hover and basic zoom/pan functionality. Data points display their coordinates when hovered over. Dark mode can also be enabled using the `--darkmode` flag.

**Animated Transitions:**

When the new `--animate` flag is also provided for interactive plots, the plot lines are drawn with smooth animated transitions, enhancing the visual experience during rendering.

For a single interactive plot with animation:

  $ node src/lib/main.js --plot "sin(x)" --xmin -10 --xmax 10 --points 100 --interactive --animate [--darkmode] [--fallback "Custom fallback message"]

For interactive multi-function plotting with a comma-separated list and animation:

  $ node src/lib/main.js --plots "tan(x),log(x)" --xmin 1 --xmax 10 --points 50 --interactive --animate [--width 600 --height 400] [--darkmode] [--fallback "Custom fallback message"]

**Export Plot Data as CSV:**

A new CLI flag `--export-csv` allows users to export the computed data points from a plot to a CSV file. By default, if no filename is specified, the output file is `output.csv`. The CSV includes a header `expression,x,y` followed by the data rows for each evaluated point. This feature works with both single and multi plot modes.

Example:

  $ node src/lib/main.js --plot "sin(x)" --xmin 0 --xmax 6.28 --points 100 --export-csv

Or with a custom filename:

  $ node src/lib/main.js --plot "sin(x)" --xmin 0 --xmax 6.28 --points 100 --export-csv data_points.csv

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

For direct SVG plot generation using the new API (with optional logarithmic scaling, custom dimensions, and dark mode support):

  import { generateSVGPlot } from '@src/lib/main.js';
  // Dark mode enabled with log scale on x-axis and custom dimensions
  const svg = generateSVGPlot("sin(x)", -10, 10, 0.4, "Custom fallback message", true, false, 600, 400, true);
  console.log(svg);

For interactive SVG plot generation via the API:

  import { generateInteractivePlot } from '@src/lib/main.js';
  // Generates an interactive SVG with tooltips, zoom/pan features, dark mode, and animated transitions if desired
  const svg = generateInteractivePlot("sin(x)", -10, 10, 0.4, "Custom fallback message", false, false, 600, 400, false, true);
  console.log(svg);

For non-interactive multi-function plotting via the API:

  import { generateMultiPlot } from '@src/lib/main.js';
  const expressions = ["sin(x)", "cos(x)"];
  const svg = generateMultiPlot(expressions, 0, 6.28, 0.1, "", false, false);
  console.log(svg);

For interactive multi-function plotting via the API:

  import { generateInteractiveMultiPlot } from '@src/lib/main.js';
  const expressions = ["sin(x)", "cos(x)"];
  const svgInteractive = generateInteractiveMultiPlot(expressions, 0, 6.28, 0.1, "", false, false, 600, 400, false, true);
  console.log(svgInteractive);

---

**PNG, JPEG, and PDF Conversion:**

If the output file specified with the --file flag ends with .png, .jpg, .jpeg, or .pdf, the tool automatically converts the generated SVG using the respective conversion process: 

- PNG conversion uses the 'sharp' library to produce PNG images.
- JPEG conversion uses the 'sharp' library to produce JPEG images (now supported).
- PDF conversion uses Puppeteer to produce PDF documents.

This allows seamless generation of PNG, JPEG, and PDF outputs from mathematical plots. The PDF conversion now includes increased timeout settings to ensure compatibility.

**File Output:** By default, the CLI writes the SVG output to a file named "output.svg". This can be overridden using the --file flag with the desired filename (e.g., output.png, output.jpg, output.pdf).

**Custom Dimensions:**

Users can now customize the output SVG dimensions using the new --width and --height options, which default to 500 and 300 respectively if not specified.

**Dark Mode:**

The new --darkmode flag (or darkMode parameter in the API) applies dark theme styling to the output SVG. This includes a dark background (#1e1e1e), light-colored axis lines, grid lines, tick marks, and text for improved visibility in dark environments.

**Interactive Mode:**

Interactive SVG plots include tooltips that show data point coordinates on hover, as well as basic zooming and panning functionalities via mouse events. This enhances the user experience for exploring plotted data.

**Animated Transitions:**

When the --animate flag is used with interactive plots, a smooth drawing animation is applied to the plot lines, adding a dynamic visual effect.

**CSV Export:**

With the new --export-csv flag, users can export the computed data points (x and y values) to a CSV file. The CSV file starts with a header "expression,x,y" and includes the data points generated from the mathematical expression. If no filename is specified after the flag, the default output filename is output.csv.

**Caching:** This version also implements an in-memory caching layer. Identical plotting requests will return cached SVG output to improve performance.
