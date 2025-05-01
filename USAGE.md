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

## Customizing SVG Dimensions

You can now customize the dimensions of your SVG output using the new `--width` and `--height` flags:

- For **single expression plots**, `--width` sets the width of the SVG (default is 640). The height remains at 400.
  
  Example:

    node src/lib/main.js --expression "y=sin(x)" --width 800

  This generates an SVG with a width of 800 and a height of 400.

- For **multiple expression plots**, use `--width` to set the overall SVG width and `--height` to set the height of each individual segment. The total SVG height is calculated as `--height` multiplied by the number of expressions (default segment height is 100).

  Example:

    node src/lib/main.js --expression "y=sin(x); y=cos(x)" --width 800 --height 120

  This generates an SVG with a width of 800, each segment with a height of 120, and a total height of 240 for two expressions.

## Generating Merged SVG Plots with Multiple Expressions

You can provide multiple expressions separated by semicolons. The tool generates a merged SVG with each expression rendered in its own segment with a vertical offset.

Example:

  node src/lib/main.js --expression "y=sin(x); y=cos(x)" --range "x=-3:3"

This will create an SVG where the first segment represents y=sin(x) and the second represents y=cos(x), each offset vertically.

For PNG output with multiple expressions, ensure you also specify the `--file` flag:

  node src/lib/main.js --expression "y=sin(x); y=cos(x)" --output-format png --file output.png

## Notes

- The `--expression` flag is required.
- When generating PNG plots, the `--file` flag is mandatory.
- The optional `--range` flag can be used to adjust the plotting range.
- Use `--width` and `--height` to customize your SVG dimensions. Provide positive numeric values only.
- When providing multiple expressions, separate them with a semicolon (;). Each valid expression is rendered in a distinct segment.
