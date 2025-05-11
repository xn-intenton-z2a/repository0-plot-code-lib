features/GENERATE_TIMESERIES.md
# features/GENERATE_TIMESERIES.md
# Overview
Adds CLI support for generating time series data from a mathematical expression and range.

# CLI Options
--expression <expr>  Required: Mathematical expression as a function of x.
--range <min>:<max>:<step>  Required: Range specifier for x values.
--output <file>  Optional: Path to write the output JSON file.
--format <fmt>  Optional: Output format (json or csv). Defaults to json.

# Behavior
Parses the expression and range. Computes data points by evaluating the expression at each x value between min and max inclusive in increments of step. Produces an array of { x, y } objects. If --output is specified, writes the result to the file. Otherwise, prints the result to stdout.

# Examples
repository0-plot-code-lib --expression "Math.sin(x)" --range 0:6.28:0.1

# Validation
Validates that expression is provided and non-empty. Validates that range parts are numeric and that step is greater than zero.

# Error Handling
Exits with code 1 and prints an error message if arguments are missing, invalid, or if evaluation fails.features/PLOT_GENERATION.md
# features/PLOT_GENERATION.md
# Overview
Adds CLI support for rendering generated time series data as SVG or PNG images.

# CLI Options
--plot-format <format>  Required: Output image format, either svg or png. Defaults to svg.
--width <pixels>  Optional: Width of the generated plot in pixels. Defaults to 800.
--height <pixels>  Optional: Height of the generated plot in pixels. Defaults to 600.
--output <file>  Optional: Path to write the generated image file. If omitted, writes base64-encoded image to stdout.

# Behavior
Generates time series data from the provided expression and range (reuse existing options). Renders a line chart representing x vs y using QuickChart for SVG output. If png is requested, processes the SVG through Sharp to produce a PNG image. Outputs the image to the specified file or stdout.

# Examples
repository0-plot-code-lib --expression "Math.sin(x)" --range 0:6.28:0.1 --plot-format svg --output sine.svg
repository0-plot-code-lib --expression "x*x" --range 0:10:0.5 --plot-format png --width 1024 --height 768 --output parabola.png

# Validation
Validates that plot-format is svg or png, width and height are positive integers, and output path is writable. Existing expression and range validation applies.

# Error Handling
Exits with code 1 and prints an error message if options are missing, invalid formats are provided, or rendering fails.