# Usage Guide for repository0-plot-code-lib

This library is a command-line tool for generating plots from mathematical expressions. It supports both SVG and PNG output formats.

## Generating an SVG Plot

For a single expression, run:

  node src/lib/main.js --expression "y=sin(x)" --width 800 --height 400

For single expressions, the width can be set using the --width flag (default is 640 if not provided) and the height defaults to 400 but can be overridden using the --height flag. Note: Only positive numeric values are accepted for these dimensions.

For multiple expressions, separate each expression with a semicolon (;). In this mode:

- The --width flag sets the overall SVG width.
- The --segmentHeight flag sets the height for each individual expression segment. If provided, it takes precedence over the --height flag.
- When explicit --segmentHeight is not provided and --autoSegment is enabled, the segment height is dynamically calculated using the following formula:

  computed_segment_height = 100 + (5 * floor(expression_length / 10)) + (20 * number_of_flags)

where the flags that contribute an additional 20 pixels each are: --xlabel, --ylabel, --range, --annotation, and --title.

- If neither --segmentHeight nor --autoSegment is used, the tool will use the --height flag (if provided) or default to 100 pixels per expression.
- The total SVG height is calculated as:

  total_height = (number of expressions) * (segment height)

### Dynamic Height Adjustment with --autoSegment

When enabled (by passing --autoSegment true) without an explicit --segmentHeight, the tool automatically computes a suitable segment height based on the expression length and additional elements. This ensures that each expression has enough space for its rendering along with any axis labels, range information, annotations, or title.

**Example with autoSegment enabled:**

  node src/lib/main.js --expression "y=sin(x); y=cos(x)" --width 640 --autoSegment true --xlabel "Time" --ylabel "Value" --range "x=-5:5" --annotation "Note" --title "Title"

In this example, for each expression (e.g. "y=sin(x)" with length 8), the computed segment height will be:

  100 + (5 * floor(8 / 10)) + (20 * 5) = 100 + 0 + 100 = 200 pixels

Thus, if there are 2 expressions, the total height of the SVG will be 400 pixels.

## Generating a PNG Plot

To generate a PNG plot, ensure you have the required dependency installed (the sharp library is needed).

Usage example:

  node src/lib/main.js --expression "y=sin(x)" --output-format png --file output.png

**Important:** When using PNG output, the --file flag is mandatory. If --file is not provided, the program will output a timestamped error message and abort the PNG conversion.

## Customizing SVG Dimensions and Style

- For single expression plots:
  - The --width flag sets the width of the SVG.
  - The --height flag sets the overall height (default is 400 if not provided).

- For multiple expression plots:
  - The --width flag sets the overall SVG width.
  - The --segmentHeight flag sets the height for each individual expression segment. If omitted and --autoSegment is not enabled, the tool uses the --height flag if provided, or defaults to 100 per expression.
  - **Note:** Only positive numeric values are accepted for --width, --height, and --segmentHeight. In multi-expression mode, if both --height and --segmentHeight are provided, --segmentHeight takes precedence.
  - With --autoSegment enabled (and no explicit --segmentHeight), the segment height is dynamically calculated.
  - The total height of the SVG is calculated as (number of expressions * segment height).

## Custom Style Options

You can customize the appearance of the generated SVG plot using the following flags:

- --textColor: Sets the fill color for all text elements (plot expressions, axis labels, annotations, and title).
- --lineColor: Sets the stroke color for the plot line element.
- --backgroundColor: Sets the background color of the SVG by rendering a background rectangle covering the entire SVG.

**Example:**

  node src/lib/main.js --expression "y=sin(x)" --width 800 --height 400 --textColor "red" --lineColor "blue" --backgroundColor "#efefef"

## Axis Labels

Enhance your plot by adding axis labels using the --xlabel and --ylabel flags. When provided:

- The x-axis label is centered at the bottom of the SVG.
- The y-axis label is positioned along the left side of the SVG and rotated -90 degrees.

**Note:** Supplying an empty value for --xlabel, --ylabel, --textColor, --lineColor, or --backgroundColor will result in a timestamped error message and no SVG output.

## Annotations

Add custom annotations to your plot using the --annotation flag. The annotation is rendered as a <text> element positioned in the top-right corner (x = width - 100, y = 20 by default, or adjusted if a title is present) with a font size of 14. Its fill color is determined by --textColor if provided, or defaults to black.

**Example:**

  node src/lib/main.js --expression "y=sin(x)" --width 800 --height 400 --annotation "Data collected on 2025-05-02" --textColor "purple"

## Adding a Plot Title with --title

You can add a title to your plot using the --title flag. The title appears at the top center of the SVG and is rendered as a <text> element with:

- x coordinate: half of the width (width/2).
- y coordinate: approximately 30.
- Font size: 18.
- Fill color: determined by --textColor, defaulting to black if not specified.

**Example:**

  node src/lib/main.js --expression "y=sin(x)" --width 800 --height 400 --title "Sine Wave Plot"

## Additional Options

- The --expression flag is required.
- When generating PNG plots, the --file flag is mandatory.
- Ensure numeric flags (e.g., --width, --height, --segmentHeight) are positive numbers; otherwise, a timestamped error message is displayed.
- For multiple expressions, separate them with a semicolon (;) so that each valid expression is rendered in its own segment.
- The flag --output-format (or --outputFormat) determines the output format. When set to png, the SVG is converted to PNG using the sharp library.
- The --autoSegment flag (when no explicit --segmentHeight is provided) dynamically computes the segment height based on expression length and additional flags (--xlabel, --ylabel, --range, --annotation, --title).
- The --title flag adds a custom title at the top of the plot.

**Sample Error Output:**

  [2025-05-02T15:42:39.724Z] Error: --width must be a positive number.

Happy plotting!
