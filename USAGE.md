# Usage Guide for repository0-plot-code-lib

This library is a command-line tool for generating plots from mathematical expressions. It supports both SVG and PNG output formats.

## Generating an SVG Plot

For a single expression, run:

  node src/lib/main.js --expression "y=sin(x)" --width 800 --height 400

For single expressions, the width can be set using the --width flag (default is 640 if not provided) and the height defaults to 400 but can be overridden using the --height flag.

For multiple expressions, separate each expression with a semicolon (;). In this mode, the --width flag sets the overall SVG width, while the --height flag sets the height for each individual expression segment. The total SVG height will be calculated as the number of expressions multiplied by the segment height (default segment height is 100 if --height is not provided).

Example for multiple expressions:

  node src/lib/main.js --expression "y=sin(x); y=cos(x)" --range "x=-3:3" --width 800 --height 120

This command generates an SVG with an overall width of 800, each segment with a height of 120, and displays the range information if provided.

## Generating a PNG Plot

To generate a PNG plot, ensure you have the required dependency installed (the sharp library is needed).

Usage example:

  node src/lib/main.js --expression "y=sin(x)" --output-format png --file output.png

**Important:** When using PNG output, the --file flag is mandatory. If --file is not provided, the program will output an error message with a timestamp and error details.

## Customizing SVG Dimensions

- For single expression plots, the --width flag sets the width of the SVG and the --height flag sets the height (default is 400 if not provided).
- For multiple expression plots, --width sets the overall SVG width, while --height sets the height for each individual segment. The total height of the SVG is calculated as (number of expressions * segment height).

## Additional Options

- The --range flag can be used to specify a range (e.g., "x=-3:3"). When provided, the range information will be displayed in the generated SVG plot.

## Important Notes

- The --expression flag is required.
- When generating PNG plots, the --file flag is mandatory.
- Ensure that values provided for --width and --height are positive numbers. Invalid values will produce an error.
- When providing multiple expressions, separate them with a semicolon (;) so that each valid expression is rendered in its own segment.
- The flag --output-format (or --outputFormat) determines the output format. If set to png, the SVG will be converted to a PNG image using the sharp library.

Happy plotting!
