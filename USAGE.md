# Usage Guide for repository0-plot-code-lib

This library is a command-line tool for generating plots from mathematical expressions. It supports both SVG and PNG output formats.

## Generating an SVG Plot

For a single expression, run:

  node src/lib/main.js --expression "y=sin(x)" --width 800

For single expressions, the width can be set using the --width flag (default is 640 if not provided) and the height is fixed at 400.

For multiple expressions, separate each expression with a semicolon (;). In this mode, the --width flag sets the overall SVG width, while the --height flag sets the height for each individual expression segment. The total SVG height will be calculated as the number of expressions multiplied by the segment height (default segment height is 100 if --height is not provided).

Example for multiple expressions:

  node src/lib/main.js --expression "y=sin(x); y=cos(x)" --width 800 --height 120

This command generates an SVG with an overall width of 800, each segment with a height of 120, and a total height of 240 for two expressions.

## Generating a PNG Plot

To generate a PNG plot, ensure you have the required dependency installed (sharp is needed). Then run:

  node src/lib/main.js --expression "y=sin(x)" --output-format png --file output.png

The above command converts the internally generated SVG plot to PNG format and writes it to the specified file.

## Customizing SVG Dimensions

- For single expression plots, the --width flag sets the width of the SVG. The height remains fixed at 400. If --width is not provided, the default width is 640.
- For multiple expression plots, --width sets the overall SVG width, while --height sets the height for each individual segment. The total height of the SVG is calculated as (number of expressions * segment height).

## Important Notes

- The --expression flag is required.
- When generating PNG plots, the --file flag is mandatory.
- Ensure that values provided for --width and --height are positive numbers. Invalid values will produce an error.
- When providing multiple expressions, separate them with a semicolon (;) so that each valid expression is rendered in its own segment.

Happy plotting!
