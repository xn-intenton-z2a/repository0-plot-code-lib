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

Example for enhanced SVG plot generation using the new CLI syntax:

  $ node src/lib/main.js --plot "sin(x)" --xmin -10 --xmax 10 --points 100 [--fallback "Custom fallback message for non-finite values"]

Note: If the literal expression 'NaN' (case-insensitive, and with any surrounding whitespace) is provided via the CLI, the tool will report an error with detailed diagnostics. The error message will explain that 'NaN' is not acceptable because it violates valid mathematical evaluation rules and will suggest providing a valid expression or using the --fallback flag to supply a custom message.

The enhanced feature evaluates the provided mathematical expression over a given range and produces a dynamic SVG plot containing a polyline that represents the computed curve. The implementation robustly filters out any points that are non-finite (including NaN, Infinity, etc.). If no valid points are found, a fallback SVG is returned that includes diagnostic details indicating that the expression evaluation resulted in non-finite values. The fallback message can be customized using the --fallback flag in the CLI.

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

#### Utility Function: isLiteralNaN

The library now includes a dedicated utility function to check if an input expression is a literal 'NaN' (ignoring case and whitespace). This ensures consistent rejection of invalid expressions across both CLI and API usage.

Example usage:

  import { isLiteralNaN } from '@src/lib/main.js';
  console.log(isLiteralNaN(' NaN ')); // true

---

The plotting functions use robust filtering with a try/catch mechanism to ignore non-finite values and any intermittent evaluation errors. This ensures that only valid data points are used for generating the SVG plot. If no valid points are found, a fallback SVG is returned that includes diagnostic details indicating the issue.

## License

MIT
