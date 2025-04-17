# repository0-plot-code-lib

_"Be a go-to plot library with a CLI, be the jq of formulae visualisations."_

---

## Overview

This library provides functionality to generate plots from mathematical expressions and time series data. The CLI supports various options to facilitate this process.

---

## Usage

You can run the CLI with the following options:

- --expression: A mathematical expression (e.g., "y=sin(x)")
- --range: A range specification for variables (e.g., "x=-10:10,y=-1:1")
- --file: The output filename for the generated plot (e.g., output.svg)

### Example

Run the following command to generate a plot based on the specified expression and range, and save it to the given file:

    node src/lib/main.js --expression "y=sin(x)" --range "x=-10:10,y=-1:1" --file output.svg

---

## License

MIT

---
