# repository0-plot-code-lib

_"Be a go-to plot library with a CLI, be the jq of formulae visualisations."_

## Usage

### CLI

Invoke directly via the command line using Node:

  node src/lib/main.js [arguments]

Example for standard execution:

  $ node src/lib/main.js arg1 arg2

Example for plot generation:

  $ node src/lib/main.js --plot --expr "sin(x)" --start 0 --end 6.28 --step 0.1

Example for diagnostics mode:

  $ node src/lib/main.js --diagnostics

Example for displaying help:

  $ node src/lib/main.js --help
  $ node src/lib/main.js -h

Example for displaying version:

  $ node src/lib/main.js --version
  $ node src/lib/main.js -v

Note:
- If any required parameters (--expr, --start, --end) are missing when using --plot, the process will log an error and terminate with exit code 1.
- All numeric parameters (--start, --end, and --step if provided) must be valid numbers. If a non-numeric value is provided, an appropriate error will be emitted and the process will exit with code 1.
- The plot range must be valid: the value provided for --start must be less than the value provided for --end.
- When using --diagnostics, the CLI outputs detailed execution context including parsed arguments, Node.js version, and the current working directory.
- Use --help or -h to display this usage guide and --version or -v to display the tool version.

### Library

Import the main function in your project:

  import { main } from '@src/lib/main.js';
  main(['your', 'args']);

For direct SVG plot generation, import the generatePlot function from the main module:

  import { generatePlot } from '@src/lib/main.js';
  const svg = generatePlot("sin(x)", 0, 6.28, 0.1);
  console.log(svg);

---

## License

MIT
