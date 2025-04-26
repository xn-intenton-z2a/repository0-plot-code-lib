# PLOTTING Feature

This feature consolidates expression parsing, time series generation, and plot rendering into a unified CLI workflow, supporting CSV/JSON I/O and SVG/PNG output formats.

# CLI Parameter Parsing & Validation

- Introduce and validate flags using zod:
  - --expression: required if no input file is provided. A string function of x (e.g. y=sin(x) or x^2+3*x-5).
  - --range: required if no input file is provided. Syntax x=min:max[:step], where min < max and step > 0 (default step = (max-min)/100).
  - --input-file: optional path to a CSV or JSON file containing time series data.
  - --input-format: optional, csv or json, default csv.
  - --file: optional output file path. If absent, write to stdout.
  - --format: optional output format, svg or png, default svg.

# Implementation Details

- Use zod in src/lib/main.js to define and parse flags, emitting descriptive errors for missing or invalid values.
- Data sourcing:
  - If input-file is specified, read and parse its contents. For CSV, split on commas into x and y pairs. For JSON, parse an array of objects with numeric x and y.
  - If no input-file, generate series from expression and range: parse expression into an AST or evaluation function, build x values, evaluate y for each x, ensuring y is finite.
- Plot rendering:
  - For svg: generate markup using existing SVG template routines.
  - For png: render the SVG output to a PNG buffer using sharp, writing correct file extension and binary data.
- Output:
  - Serialize and write SVG or PNG to the specified file path or stdout if no file is given.

# Testing Enhancements

- Extend tests in tests/unit/main.test.js:
  - Parsing and validation errors for invalid or missing flags.
  - Correct series generation from both file input and expression/range.
  - SVG output default and PNG output via sharp produces nonzero byte buffers.
  - Failures when unsupported formats or malformed input are provided.

# Documentation Updates

- Update README.md with combined usage examples demonstrating:
  node src/lib/main.js --expression "y=sin(x)" --range "x=0:6.28:0.1" --file plot.svg
  node src/lib/main.js --input-file data.csv --input-format csv --file data_plot.png --format png