# Overview
This feature merges the existing CLI plotting workflow with an HTTP API endpoint to generate SVG and PNG plots from mathematical expressions or time series data.

# CLI Parameter Parsing & Validation
- Use zod in src/lib/main.js to define and parse flags
  - --expression: required unless --input-file is provided
  - --range: required unless --input-file is provided, syntax x=min:max[:step]
  - --input-file: optional path to CSV or JSON data
  - --input-format: csv or json, default csv
  - --format: svg or png, default svg
  - --output-file: optional path for file output; default writes to stdout
- Emit clear errors and exit with nonzero status on invalid input

# Expression Parsing & Time Series Generation
- Import mathjs to parse and compile the expression into a function f(x)
- Parse range string into numeric min, max, step and generate array of x values
- Evaluate f(x) over the range, include only finite y values, skip non-finite

# Data Sourcing & I/O
- If --input-file is present read asynchronously
  - For CSV use csv parser supporting optional header
  - For JSON parse array of objects with numeric x and y
- Validate records and error on invalid entries

# Plot Rendering
- Generate SVG markup via an EJS template including axes and data path
- If PNG output convert SVG to PNG using sharp
- Write output to file or stdout

# HTTP API
- In src/lib/main.js start an express server on PORT or default 3000
- Define POST /plot accepting JSON payload with same fields as CLI
- Validate payload with zod, return 400 on validation errors
- Generate plot in memory and respond with image/svg+xml or image/png
- Handle errors with 500 status and JSON error message

# Testing Enhancements
- Extend tests/unit/main.test.js to cover flag parsing, expression and range handling, input formats and rendering outputs
- Add tests/unit/server.test.js to start server on random port, test valid and invalid payloads, response status and content type

# Documentation Updates
- Update README.md CLI Usage and API Reference sections with examples
- Update docs/USAGE.md to include HTTP API examples and environment variable guidance
