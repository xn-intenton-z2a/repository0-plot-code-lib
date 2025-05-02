# Usage Guide for repository0-plot-code-lib

This library is a command-line tool for generating plots from mathematical expressions. It supports both SVG and PNG output formats.

## Generating an SVG Plot

For a single expression, run:

  node src/lib/main.js --expression "y=sin(x)" --width 800 --height 400

For single expressions, the width can be set using the --width flag (default is 640 if not provided) and the height defaults to 400 but can be overridden using the --height flag.

For multiple expressions, separate each expression with a semicolon (;). In this mode:

- The --width flag sets the overall SVG width.
- The --segmentHeight flag sets the height for each individual expression segment. If --segmentHeight is not provided, the tool will fall back to using the --height flag if set, or default to 100 per expression.
- The total SVG height will be calculated as (number of expressions * segment height).

### Dynamic Height Adjustment with --autoSegment

A new flag, --autoSegment, has been introduced. When enabled (by passing --autoSegment true), the tool dynamically calculates the segment height for multi-expression plots based on the complexity (length) of each expression and the presence of additional elements such as axis labels and range information. 

The dynamic calculation uses the following heuristic:

- Start with a base height of 100.
- Add an extra 5 pixels for every 10 characters in the expression.
- Add an additional 20 pixels if an x-axis label (--xlabel) is provided.
- Add an additional 20 pixels if a y-axis label (--ylabel) is provided.
- Add an additional 20 pixels if a range (--range) is specified.

The segment height used will be the maximum computed height among all expressions, ensuring a consistent look and sufficient space for each expression. 

**Example with autoSegment enabled:**

  node src/lib/main.js --expression "y=sin(x); y=cos(x) + extra-long-term" --width 640 --autoSegment true --xlabel "Time" --ylabel "Value" --range "x=-5:5"

In this example, the dynamic segment height is computed based on the content of each expression and the provided labels, and the total SVG height is determined accordingly.

## Generating a PNG Plot

To generate a PNG plot, ensure you have the required dependency installed (the sharp library is needed).

Usage example:

  node src/lib/main.js --expression "y=sin(x)" --output-format png --file output.png

**Important:** When using PNG output, the --file flag is mandatory. If --file is not provided, the program will output an error message with a timestamp and error details.

## Customizing SVG Dimensions and Style

- For single expression plots:
  - The --width flag sets the width of the SVG.
  - The --height flag sets the overall height (default is 400 if not provided).

- For multiple expression plots:
  - The --width flag sets the overall SVG width.
  - The --segmentHeight flag sets the height for each individual expression segment. If omitted and --autoSegment is not enabled, the tool uses the --height flag if provided, or defaults to 100 per expression.
  - With --autoSegment enabled, the segment height is dynamically calculated.
  - The total height of the SVG is calculated as (number of expressions * segment height).

### Custom Style Options

You can customize the appearance of the generated SVG plot using the following new flags:

- --textColor: Sets the fill color for all text elements (plot expressions and axis labels).
- --lineColor: Sets the stroke color for the plot line element.
- --backgroundColor: Sets the background color of the SVG. This is applied by rendering a background rectangle covering the entire SVG.

**Example:**

  node src/lib/main.js --expression "y=sin(x)" --width 800 --height 400 --textColor "red" --lineColor "blue" --backgroundColor "#efefef"

## Axis Labels

You can enhance your plot by adding axis labels using the --xlabel and --ylabel flags. When provided, these flags add text labels for the x-axis and y-axis:

- The x-axis label is centered at the bottom of the SVG.
- The y-axis label is positioned along the left side of the SVG and rotated -90 degrees.

**Note:** Supplying an empty value for --xlabel, --ylabel, --textColor, --lineColor, or --backgroundColor will result in an error, and no SVG output will be rendered.

## Additional Options

- The --range flag can be used to specify a range (e.g., "x=-3:3"). When provided, the range information will be displayed in the generated SVG plot.

## Important Notes

- The --expression flag is required.
- When generating PNG plots, the --file flag is mandatory.
- Ensure that values provided for --width and --height (or --segmentHeight) are positive numbers. Invalid values will produce an error.
- When providing multiple expressions, separate them with a semicolon (;) so that each valid expression is rendered in its own segment.
- The flag --output-format (or --outputFormat) determines the output format. If set to png, the SVG will be converted to a PNG image using the sharp library.
- The new --autoSegment flag allows dynamic adjustment of segment heights for multi-expression plots based on expression complexity and additional elements.

Happy plotting!
