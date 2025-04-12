# repository0-plot-code-lib

_"Be a go-to plot library with a CLI, be the jq of formulae visualisations."_

## Usage

### CLI

Invoke directly via the command line using Node:

  node src/lib/main.js [arguments]

Example for standard execution:

  $ node src/lib/main.js arg1 arg2

Example for enhanced plot generation using legacy parameters:

  $ node src/lib/main.js --plot --expr "sin(x)" --start 0 --end 6.28 --step 0.1

Example for enhanced SVG plot generation using the new CLI syntax:

  $ node src/lib/main.js --plot "sin(x)" --xmin -10 --xmax 10 --points 100

This enhanced feature evaluates the provided mathematical expression over a given range and produces a dynamic SVG plot containing a polyline that represents the computed curve. The implementation robustly filters out any points that are non-finite (including NaN). If no valid data points are available, a fallback SVG with a "No valid data" message along with diagnostic information is returned, indicating that the expression evaluation resulted in exclusively non-finite values. Additionally, if any numeric parameter is invalid, the CLI logs an appropriate error and exits immediately without generating a fallback SVG.

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
  const svg = generatePlot("sin(x)", 0, 6.28, 0.1);
  console.log(svg);

For direct SVG plot generation using the new API:

  import { generateSVGPlot } from '@src/lib/plotSVG.js';
  const svg = generateSVGPlot("sin(x)", -10, 10, 100);
  console.log(svg);

The plotting functions use robust filtering with a try/catch mechanism to ignore non-finite values and any intermittent evaluation errors. This ensures that only valid data points are used for generating the SVG plot. If no valid points are found, a fallback SVG with a 'No valid data' message along with diagnostic information is returned.

---

## License

MIT
