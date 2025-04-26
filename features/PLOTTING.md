# Overview
Enhance the existing CLI plotting workflow with the following capabilities:
- Load configuration defaults from a .env file.
- Support robust CLI parsing, expression evaluation, data import/export, and plot rendering.

# Dotenv Integration
- On startup, load environment variables via dotenv.config.
- Recognize and validate the following variables with zod:
  - PLOT_WIDTH (number)
  - PLOT_HEIGHT (number)
  - PLOT_BACKGROUND (string)
  - PLOT_COLOR (string)
- Merge these defaults with CLI flags so that flags override env values.

# CLI Parameter Parsing & Validation
- Use zod in src/lib/main.js to define and parse flags:
  - --expression: required unless --input-file is provided
  - --range: required unless --input-file is provided, syntax x=min:max[:step]
  - --input-file: optional path to CSV or JSON data
  - --input-format: csv or json, default csv
  - --export-data-format: optional csv or json; when present enables data export
  - --export-file: optional path for data export; default stdout
  - --format: svg or png, default svg
  - --output-file: optional path for plot output; default stdout
  - --width, --height, --background, --color: optional overrides for plot dimensions and style
- Emit clear error messages and exit nonzero on invalid inputs or combinations.

# Expression Parsing & Time Series Generation
- Import mathjs to parse and compile the expression into f(x).
- Parse range into numeric start, end, step; validate start <= end and step > 0.
- Generate x values and compute y = f(x), filter non-finite results.
- Represent time series as array of objects { x: number, y: number }.

# Data Sourcing & I/O
- If --input-file is present, read asynchronously;
  - For CSV: use csv parser with header detection.
  - For JSON: parse array of objects with numeric x and y.
- Validate records against a zod schema.

# Data Export
- When --export-data-format is specified:
  - Serialize time series:
    - CSV: header x,y and comma-separated records.
    - JSON: array of { x, y } objects.
  - Write to --export-file or stdout.
  - Skip plot generation.

# Plot Rendering
- Generate SVG via EJS template with axes and data path.
- If PNG requested, convert SVG via sharp.
- Apply width, height, background, and color settings from env or flags.
- Write image to --output-file or stdout.

# HTTP API
- In Express server, define POST /plot:
  - Accept JSON payload matching CLI flags.
  - Validate payload with zod.
  - For export requests, respond with text/csv or application/json body.
  - For plot requests, respond with image/svg+xml or image/png.
  - Handle errors with JSON error messages and status codes.

# Testing Enhancements
- Update tests/unit/main.test.js to cover dotenv loading and new flags.
- Add tests/unit/export.test.js for data serialization and output.
- Extend tests/unit/server.test.js to cover env defaults and plot style overrides.

# Documentation Updates
- Update README.md CLI Usage to document dotenv support and style flags.
- Enhance docs/USAGE.md with examples of using env variables and flags together.
