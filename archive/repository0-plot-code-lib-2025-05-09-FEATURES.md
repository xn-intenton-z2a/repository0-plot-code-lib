features/PLOT_GENERATION.md
# features/PLOT_GENERATION.md
# Overview

Implement core plot generation capability in the CLI tool to transform a mathematical expression and a numeric range into a visual plot image.

# CLI Options

* **--expression**: A mathematical expression in terms of x (for example, y=sin(x))
* **--range**: Numeric range for x values in the format start:end:step (for example, -1:1:0.1)
* **--output**: Path to the output file (for example, output.svg or output.png)
* **--format**: Output format, either svg or png (default is svg)

# Processing Steps

1. Parse and validate all CLI options
2. Use a formula parser to evaluate the expression over the specified range of x values and produce a series of (x,y) data points
3. Render the data points into an SVG plot with labeled axes
4. If PNG output is requested, convert the generated SVG into a PNG image
5. Save the resulting file to the given output path

# Dependencies

Add or update dependencies to include:
* mathjs for expression parsing
* sharp or a similar library for converting SVG to PNG when needed

# Tests

Provide unit tests to cover:
* Correct parsing of CLI arguments
* Generation of expected data points for a known expression
* Successful creation of an SVG file at the specified path
* Conversion to PNG output when --format png is requested