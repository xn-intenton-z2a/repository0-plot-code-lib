# Usage Guide for repository0-plot-code-lib

This library is a command-line tool for generating plots from mathematical expressions. It supports both SVG and PNG output formats.

## Generating an SVG Plot

For a single expression, run:

  node src/lib/main.js --expression "y=sin(x)" --width 800 --height 400

For single expressions, the width can be set using the --width flag (default is 640 if not provided) and the height defaults to 400 but can be overridden using the --height flag.

For multiple expressions, separate each expression with a semicolon (;). In this mode:

- The --width flag sets the overall SVG width.
- The --segmentHeight flag (new) sets the height for each individual expression segment. If --segmentHeight is not provided, the tool will fall back to using the --height flag if set, or default to 100 per expression.
- The total SVG height will be calculated as (number of expressions * segment height).

Example for multiple expressions using --segmentHeight:

  node src/lib/main.js --expression "y=sin(x); y=cos(x)" --range "x=-3:3" --width 800 --segmentHeight 120

This command generates an SVG with an overall width of 800, each segment with a height of 120, and displays the range information if provided.

Example for multiple expressions without --segmentHeight (using --height as fallback):

  node src/lib/main.js --expression "y=sin(x); y=cos(x)" --range "x=-3:3" --width 800 --height 120

In this case, each segment will have a height of 120, yielding a total height of (number of expressions * 120).

## Generating a PNG Plot

To generate a PNG plot, ensure you have the required dependency installed (the sharp library is needed).

Usage example:

  node src/lib/main.js --expression "y=sin(x)" --output-format png --file output.png

**Important:** When using PNG output, the --file flag is mandatory. If --file is not provided, the program will output an error message with a timestamp and error details.

## Customizing SVG Dimensions

- For single expression plots:
  - The --width flag sets the width of the SVG.
  - The --height flag sets the overall height (default is 400 if not provided).

- For multiple expression plots:
  - The --width flag sets the overall SVG width.
  - The --segmentHeight flag sets the height for each individual expression segment. If omitted, the tool uses the --height flag if provided, or defaults to 100 per expression.
  - The total height of the SVG is calculated as (number of expressions * segment height).

## Axis Labels

You can enhance your plot by adding axis labels using the --xlabel and --ylabel flags. When provided, these flags add text labels for the x-axis and y-axis:

- The x-axis label is centered at the bottom of the SVG.
- The y-axis label is positioned along the left side of the SVG and rotated -90 degrees.

Example:

  node src/lib/main.js --expression "y=sin(x)" --width 800 --height 400 --xlabel "Time (s)" --ylabel "Amplitude"

**Note:** If an empty value is provided for either --xlabel or --ylabel, the tool will display an error message and no labels will be rendered.

## Additional Options

- The --range flag can be used to specify a range (e.g., "x=-3:3"). When provided, the range information will be displayed in the generated SVG plot.

## Important Notes

- The --expression flag is required.
- When generating PNG plots, the --file flag is mandatory.
- Ensure that values provided for --width and --height (or --segmentHeight) are positive numbers. Invalid values will produce an error.
- When providing multiple expressions, separate them with a semicolon (;) so that each valid expression is rendered in its own segment.
- The flag --output-format (or --outputFormat) determines the output format. If set to png, the SVG will be converted to a PNG image using the sharp library.

Happy plotting!
