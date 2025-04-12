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

### Library

Import the main function in your project:

  import { main } from '@src/lib/main.js';
  main(['your', 'args']);

For direct SVG plot generation, import the generatePlot function from its own module:

  import { generatePlot } from '@src/lib/plot.js';
  const svg = generatePlot("sin(x)", 0, 6.28, 0.1);
  console.log(svg);

---

## License

MIT
