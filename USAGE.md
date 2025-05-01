# Usage Guide for repository0-plot-code-lib

This library is a command-line tool for generating plots from mathematical expressions. It supports both SVG and PNG output formats.

## Generating an SVG Plot

To generate an SVG plot, run:

  node src/lib/main.js --expression "y=sin(x)" --range "x=-3:3"

This command will display the SVG output in the console. To write the SVG to a file, use the `--file` flag:

  node src/lib/main.js --expression "y=sin(x)" --file output.svg

## Generating a PNG Plot

To generate a PNG plot, ensure you have the required dependency installed (sharp is needed). Then run:

  node src/lib/main.js --expression "y=sin(x)" --output-format png --file output.png

The above command converts the internally generated SVG plot to PNG format and writes it to the specified file.

## Notes

- The `--expression` flag is required.
- If generating PNG plots, the `--file` flag is mandatory.
- The optional `--range` flag can be used to adjust the plotting range.
