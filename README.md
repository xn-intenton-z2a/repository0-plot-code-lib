# repository0-plot-code-lib

_"Be a go-to plot library with a CLI, be the jq of formulae visualisations."_

---

## Overview

`plot-code-lib` is a JavaScript library and CLI tool designed to transform mathematical expressions and time series data into visual plots (SVG/PNG). It enables users to generate plots directly from the command-line using a simple syntax.

## CLI Usage

To generate a plot using `plot-code-lib`, run the following command:

```bash
node src/lib/main.js --expression "y=sin(x)" --range "x=-1:1,y=-1:1" --file output.svg
```

Options:
- `--expression`: The mathematical expression to be plotted.
- `--range`: The range values for the plot (e.g., x and y boundaries).
- `--file`: The output file name where the plot will be saved (supports SVG/PNG).

If all options are provided, the CLI simulates plot generation by printing a message detailing the input. If any options are missing, it displays a usage message.

## License

MIT

---
