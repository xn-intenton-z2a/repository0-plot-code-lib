# Overview

Provide a dedicated "plot" subcommand in the CLI and a GET /plot HTTP endpoint to generate SVG and PNG images or export raw data from mathematical expressions or data files. Users can request images or data exports with styling options, overlays, and encoding preferences.

# CLI Plot Subcommand

Extend the CLI to recognize the "plot" subcommand with these flags:

- --expression <expression>        Provide a mathematical expression in y=… form (required unless dataFile provided)
- --range <axis>=<min>:<max>       Numeric range for expression mode (required with expression)
- --data-file <path>              Path to JSON, CSV, or YAML data series (required unless expression provided)
- --format <svg|png>              Output image format (default svg)
- --output <path>                 File path to write image or data export (stdout if omitted)
- --encoding <base64|none>        Wrap image in base64 JSON (default none)
- --width <number>                Image width in pixels (default 500)
- --height <number>               Image height in pixels (default 300)
- --device-pixel-ratio <number>   Device pixel ratio (default 1)
- --background-color <CSS>        Chart background color (default transparent)
- --version <Chart.js version>    QuickChart API version (default 2.9.4)
- --derivative <true|false>       Overlay first derivative curve (default false)
- --overlay-trendline <true|false> Overlay regression trendline (default false)
- --export-data <path>            Export raw or derived data instead of image
- --export-format <csv|json|yaml> Format for exported data (default inferred)

Behavior:
1. Parse and validate flags; on error print to stderr and set exit code 1.
2. Load or generate points via generateData or file parser.
3. Compute derivative points when derivative=true.
4. Compute regression line when overlay-trendline=true.
5. If export-data provided, serialize data and write in the chosen format.
6. Otherwise assemble a Chart.js config including overlays and styling.
7. Use QuickChart API or local renderer via the sharp library to produce an image in the requested format.
8. If encoding=base64, wrap bytes in a JSON object with type and data fields.
9. Write output to file or stdout and set exit code 0.

# HTTP /plot Endpoint

Add GET /plot route with CORS enabled exposing the same capabilities as the CLI. Query parameters mirror CLI flags in camelCase:

- expression
- range
- dataFile
- format
- encoding
- width
- height
- devicePixelRatio
- backgroundColor
- version
- derivative
- overlayTrendline
- exportData
- exportFormat

Behavior:
1. Set Access-Control-Allow-Origin to allow all origins.
2. Validate parameters with Zod; return 400 JSON on error.
3. Generate or load points.
4. Apply derivative and trendline computations.
5. If exportData=true, respond with serialized data and status 200.
6. Otherwise render image via QuickChart or local renderer.
7. Respond with application/json when encoding=base64 or image/svg+xml or image/png for binary images.
8. Return status 200 on success, 400 with error details on failure.

# Implementation

- In src/lib/main.js add runPlotCli handling argv starting with "plot" and the new flags.
- Extend createServer to register GET /plot with a Zod schema validating parameters.
- Use existing generateData, computeRegression, and introduce computeDerivative(points) helper.
- Integrate QuickChart API via HTTP client or use sharp for local rendering to SVG and PNG.
- Ensure consistent parsing with parseArgs and consistent error messages.

# Testing

- Add unit tests for CLI plot subcommand verifying SVG and PNG outputs, base64 JSON wrapping, derivative and trendline overlays, and data export formats.
- Add HTTP endpoint tests via supertest covering all response types, CORS header, validation errors, and data export.

# Documentation

- Update USAGE.md and README.md to document the plot subcommand and /plot endpoint flags and examples.
- Provide sample commands demonstrating image generation, base64 encoding, and data export.