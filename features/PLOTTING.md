# Overview
Enhance the existing CLI plotting workflow with support for exporting raw time series data in standard formats in addition to generating plots.

# CLI Parameter Parsing & Validation
- Use zod in src/lib/main.js to define and parse flags:
  - --expression: required unless --input-file is provided
  - --range: required unless --input-file is provided, syntax x=min:max[:step]
  - --input-file: optional path to CSV or JSON data
  - --input-format: csv or json, default csv
  - --export-data-format: optional, csv or json; when provided enables data export
  - --export-file: optional path for data export; default writes to stdout when export-data-format is set
  - --format: svg or png, default svg for plots
  - --output-file: optional path for plot output; default writes to stdout
- Emit clear errors and exit with nonzero status on invalid combinations or values

# Expression Parsing & Time Series Generation
- Import mathjs to parse and compile the expression into a function f(x)
- Parse range string into numeric min, max, step and generate array of x values
- Evaluate f(x) over the range, include only finite y values, skip non-finite
- Represent time series as array of objects { x: number, y: number }

# Data Sourcing & I/O
- If --input-file is present, read asynchronously:
  - For CSV use csv parser with header presence detection
  - For JSON parse array of objects with numeric x and y
- Validate records using zod schema for time series entries

# Data Export
- When --export-data-format is specified:
  - Serialize computed time series to the chosen format:
    - CSV: header "x,y" and comma-separated records
    - JSON: an array of { x, y } objects
  - Write serialized data to --export-file or stdout
  - Skip plot generation when data export is requested

# Plot Rendering
- Generate SVG markup via an EJS template including axes and data path
- If PNG output convert SVG to PNG using sharp
- Write output to --output-file or stdout when export-data-format is not set

# HTTP API
- Extend Express server in src/lib/main.js on PORT or default 3000
- Define POST /plot accepting JSON payload with fields:
  - expression, range, inputFile, inputFormat, exportDataFormat, exportFile, format
- Validate payload with zod, return 400 on validation errors
- For exportDataFormat requests, respond with data CSV or JSON and content type text/csv or application/json
- For plot requests, respond with image/svg+xml or image/png
- Handle errors with 500 status and JSON error message

# Testing Enhancements
- Update tests/unit/main.test.js to cover new flags and data export scenarios
- Add tests/unit/export.test.js to verify data serialization and file/stdout output
- Extend server tests in tests/unit/server.test.js to cover exportDataFormat payloads

# Documentation Updates
- Update README.md CLI Usage to include data export flags and examples
- Enhance docs/USAGE.md with data export section for CLI and HTTP API
