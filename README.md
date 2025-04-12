# repository0-plot-code-lib

"_Be a go-to plot library with a CLI, be the jq of formulae visualisations._"

## Usage

### CLI

Invoke directly via the command line using Node:

  node src/lib/main.js [arguments]

Example for standard execution:

  $ node src/lib/main.js arg1 arg2

Example for enhanced plot generation using legacy parameters:

  $ node src/lib/main.js --plot --expr "sin(x)" --start 0 --end 6.28 --step 0.1 [--fallback "Custom fallback message for non-finite values"]

Example for enhanced SVG plot generation using the new CLI syntax (single expression):

  $ node src/lib/main.js --plot "sin(x)" --xmin -10 --xmax 10 --points 100 [--fallback "Custom fallback message for non-finite values"]

Example for multi-function plotting using a comma-separated list with the new CLI syntax:

  $ node src/lib/main.js --plot "sin(x),cos(x)" --xmin 0 --xmax 6.28 --points 100 [--fallback "Custom fallback message"]

Example using the new flag for multi-function plotting:

  $ node src/lib/main.js --plots "tan(x),log(x)" --xmin 1 --xmax 10 --points 50 [--fallback "Custom fallback message"]

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

For direct SVG plot generation using the new API:

  import { generateSVGPlot } from '@src/lib/main.js';
  const svg = generateSVGPlot("sin(x)", -10, 10, 0.4, "Custom fallback message");
  console.log(svg);

For multi-function plotting via the API:

  import { generateMultiPlot } from '@src/lib/main.js';
  const expressions = ["sin(x)", "cos(x)"];
  const svg = generateMultiPlot(expressions, 0, 6.28, 0.1);
  console.log(svg);

#### Utility Function: isLiteralNaN

The library now includes a dedicated utility function to check if an input expression is a literal 'NaN' (ignoring case and whitespace). This ensures consistent rejection of invalid expressions across both CLI and API usage.

Example usage:

  import { isLiteralNaN } from '@src/lib/main.js';
  console.log(isLiteralNaN(' NaN ')); // true

---

The plotting functions use robust filtering with a try/catch mechanism to ignore non-finite values and any intermittent evaluation errors. This ensures that only valid data points are used for generating the SVG plot. When multiple expressions are provided, each is rendered with a distinct color and a legend is added to differentiate between them. If no valid points are found for an expression (or for all), a fallback SVG is returned that includes diagnostic details indicating the issue.

## License

MIT
