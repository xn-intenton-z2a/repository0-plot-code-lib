# PLOTTING Feature

## Overview
This feature merges expression evaluation and plot rendering into a unified CLI workflow. It implements robust argument parsing and validation, mathematical expression compilation, time series generation, support for CSV and JSON I/O, and rendering of SVG and PNG outputs.

# CLI Parameter Parsing & Validation
- Use zod in src/lib/main.js to define and parse flags
  - --expression: required when --input-file is absent. A string representing a function of x (for example y=sin(x) or x^2+3*x-5)
  - --range: required when --input-file is absent. Syntax x=min:max[:step] where min < max and step > 0. If step is omitted, default step = (max - min) / 100
  - --input-file: optional path to a CSV or JSON file containing time series points
  - --input-format: optional, values csv or json, default csv, case-insensitive
  - --format: optional output format, values svg or png, default svg
  - --output-file: optional output file path; if omitted, write to stdout
- Emit descriptive error messages for missing or invalid values and exit with nonzero code on failures

# Expression Parsing & Time Series Generation
- Import mathjs and parse the --expression string into an AST
- Compile the AST into a function that accepts a numeric x and returns y
- Catch syntax errors and emit console error with exit code
- Parse the --range definition into numeric min, max, and step values
- Build an array of x values from min to max using the step interval
- For each x value, evaluate y using the compiled function and include only finite results
- Report and skip any non-finite values

# Data Sourcing & I/O
- If --input-file is provided
  - Read file asynchronously
  - If --input-format is csv
    - Detect optional header line
    - Parse comma separated fields into numeric x and y pairs
  - If --input-format is json
    - Parse JSON array of objects with numeric x and y properties
  - Validate data shape and types, error on invalid records
- If no --input-file, use generated time series from expression and range

# Plot Rendering
- For SVG output
  - Generate markup using an inline template or an existing EJS template
  - Include axes, grid lines, and a polyline or path for the data series
- For PNG output
  - Convert the SVG markup to a PNG buffer using sharp
- Write the resulting SVG string or PNG binary to --output-file or stdout

# Testing Enhancements
- Extend tests in tests/unit/main.test.js
  - Successful parsing of valid flags and error conditions for invalid or missing flags
  - Expression syntax errors and correct error messages
  - Range parsing correctness and expected number of points
  - CSV and JSON input parsing for valid and malformed files
  - SVG output should start with an <svg> element
  - PNG output should be a nonzero length buffer

# Documentation Updates
- Update README.md CLI Usage with end-to-end examples
  node src/lib/main.js --expression y=sin(x) --range x=0:6.28:0.1 --format svg --output-file plot.svg
  node src/lib/main.js --input-file data.csv --input-format csv --format png --output-file plot.png
- Update docs/USAGE.md examples to reflect full flag set and new feature behavior