# repository0-plot-code-lib

_"Be a go-to plot library with a CLI, be the jq of formulae visualisations."_

---

## Overview

This library provides functionality to generate plots from mathematical expressions and time series data. The CLI supports various options to facilitate this process. A new feature has been added to generate SVG and PNG plots directly from the CLI when valid parameters are provided.

---

## Usage

You can run the CLI with the following options:

- --expression: A mathematical expression (e.g., "y=sin(x)")
- --range: A range specification for variables (e.g., "x=-10:10,y=-1:1")
- --file: The output filename for the generated plot. If the file has a .svg extension, an SVG plot will be generated. If the file has a .png extension, the tool will generate a PNG plot by converting the SVG output to PNG.

### Example

To generate an SVG plot based on the specified expression and range, and save it to an SVG file, run the following command:

    node src/lib/main.js --expression "y=sin(x)" --range "x=-10:10,y=-1:1" --file output.svg

To generate a PNG plot, run the following command:

    node src/lib/main.js --expression "y=sin(x)" --range "x=-10:10,y=-1:1" --file output.png

This command will create a file containing a simple plot representation of the expression and range, in SVG or PNG format based on the file extension provided.

If the --file option is provided with a filename that does not end with .svg or .png, an error message will be displayed.

---

## License

MIT
