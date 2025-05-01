# Usage Guide for repository0-plot-code-lib

This library is a command-line tool for generating plots from mathematical expressions. It supports both SVG and PNG output formats.

## Generating an SVG Plot

To generate an SVG plot for a single expression, run:

  node src/lib/main.js --expression "y=sin(x)" --range "x=-3:3"

This command will display the SVG output in the console. To write the SVG to a file, use the `--file` flag:

  node src/lib/main.js --expression "y=sin(x)" --file output.svg

## Generating a PNG Plot

To generate a PNG plot, ensure you have the required dependency installed (sharp is needed). Then run:

  node src/lib/main.js --expression "y=sin(x)" --output-format png --file output.png

The above command converts the internally generated SVG plot to PNG format and writes it to the specified file.

## Generating Merged SVG Plots with Multiple Expressions

You can provide multiple expressions separated by semicolons. The tool generates a merged SVG with each expression rendered in its own segment with a vertical offset.

Example:

  node src/lib/main.js --expression "y=sin(x); y=cos(x)" --range "x=-3:3"

This will create an SVG where the first segment represents y=sin(x) and the second represents y=cos(x), each offset vertically.

For PNG output with multiple expressions, ensure you also specify the `--file` flag:

  node src/lib/main.js --expression "y=sin(x); y=cos(x)" --output-format png --file output.png

## Notes

- The `--expression` flag is required.
- If generating PNG plots, the `--file` flag is mandatory.
- The optional `--range` flag can be used to adjust the plotting range.
- When providing multiple expressions, separate them with a semicolon (;). Each valid expression is rendered in a distinct segment.
