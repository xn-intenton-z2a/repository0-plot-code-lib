# repository0-plot-code-lib

"_Be a go-to plot library with a CLI, be the jq of formulae visualisations._"

## Usage

### CLI

Invoke directly via the command line using Node:

  node src/lib/main.js [arguments]

When no arguments are provided, a default demo plot (plotting sin(x) from 0 to 6.28) is generated and written to output.svg.

Example for standard execution (outputs to file output.svg by default):

  $ node src/lib/main.js --plot --expr "sin(x)" --start 0 --end 6.28 --step 0.1

Example for specifying a custom output file (e.g., PNG):

  $ node src/lib/main.js --plot "sin(x)" --xmin -10 --xmax 10 --points 100 --file output.png [--fallback "Custom fallback message for non-finite values"]

Example for enhanced SVG plot generation using the new CLI syntax (single expression):

  $ node src/lib/main.js --plot "sin(x)" --xmin -10 --xmax 10 --points 100 [--fallback "Custom fallback message for non-finite values"]

Example for multi-function plotting using a comma-separated list with the new CLI syntax:

  $ node src/lib/main.js --plot "sin(x),cos(x)" --xmin 0 --xmax 6.28 --points 100 [--fallback "Custom fallback message"]

Example using the new flag for multi-function plotting:

  $ node src/lib/main.js --plots "tan(x),log(x)" --xmin 1 --xmax 10 --points 50 [--fallback "Custom fallback message"]

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

For direct SVG plot generation using the new API (with optional logarithmic scaling):

  import { generateSVGPlot } from '@src/lib/main.js';
  // Log scale on x-axis
  const svg = generateSVGPlot("sin(x)", -10, 10, 0.4, "Custom fallback message", true, false);
  console.log(svg);

For multi-function plotting via the API:

  import { generateMultiPlot } from '@src/lib/main.js';
  const expressions = ["sin(x)", "cos(x)"];
  // Log scale on both axes
  const svg = generateMultiPlot(expressions, 0, 6.28, 0.1, "", true, true);
  console.log(svg);

---

The plotting functions now implement consistent fallback handling: when no valid data points are generated, a fallback SVG is returned. Custom fallback messages provided are prioritized over default messages. Enhanced elements such as axes, tick marks with numeric labels, and grid lines are automatically added to the SVG output.

**File Output:** By default, the CLI writes the SVG output to a file named "output.svg". This can be overridden using the --file flag with the desired filename (e.g., output.png).

**Caching:** This version also implements an in-memory caching layer. Identical plotting requests will return cached SVG output to improve performance.
