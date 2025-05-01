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

This tool now supports custom dimensions for SVG outputs using the `--width` and `--height` flags. The behavior is as follows:

- For **single expression plots**, the `--width` flag sets the width of the SVG. The height remains fixed at 400. If `--width` is not provided, the default width is 640.

  Example:

    node src/lib/main.js --expression "y=sin(x)" --width 800

  This command generates an SVG with a width of 800 and a height of 400.

- For **multiple expression plots**, `--width` sets the overall SVG width, while the `--height` flag sets the height for each individual segment. The total height of the SVG is calculated as the segment height multiplied by the number of expressions (default segment height is 100 if not provided).

  Example:

    node src/lib/main.js --expression "y=sin(x); y=cos(x)" --width 800 --height 120

  This command generates an SVG with an overall width of 800, each segment with a height of 120, and a total height of 240 for two expressions.

## Important Notes

- The `--expression` flag is required.
- When generating PNG plots, the `--file` flag is mandatory.
- Ensure that values provided for `--width` and `--height` are positive numbers. Invalid values will produce an error including a timestamp and details about the flag.
- When providing multiple expressions, separate them with a semicolon (;) so that each valid expression is rendered in its own segment with a vertical offset.

Happy plotting!
