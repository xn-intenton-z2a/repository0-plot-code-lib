# Overview
Enhance and fully implement the plot subcommand and HTTP /plot endpoint to provide seamless generation of visualizations and data exports from mathematical expressions or imported data series. Users can render images in SVG or PNG, overlay analytical curves, or export raw and derived data in common formats.

# CLI Plot Subcommand
Extend the CLI to support a "plot" subcommand with the following flags:
- --expression <expression>  Provide a mathematical expression in y=… form (required unless dataFile provided)
- --range <axis>=<min>:<max>  Define the numeric range for the axis when using an expression (required with expression)
- --data-file <path>  Path to a JSON, CSV, or YAML file containing [{x,y}, …] (required unless expression provided)
- --format <svg|png>  Output image format (default svg)
- --output <path>  File path to write the generated file (stdout if omitted)
- --encoding <base64|none>  When using base64, wrap image bytes in a JSON response (default none)
- --width <number>  Image width in pixels (default 500)
- --height <number>  Image height in pixels (default 300)
- --device-pixel-ratio <number>  Device pixel ratio for rendering (default 1)
- --background-color <CSS>  Background CSS color for the chart (default transparent)
- --version <Chart.js version>  Chart.js version for QuickChart API (default 2.9.4)
- --derivative <true|false>  Overlay first derivative curve on the plot (default false)
- --overlay-trendline <true|false>  Overlay linear regression trendline on the plot (default false)
- --export-data <path>  Export raw or derived data to a file or stdout instead of generating an image
- --export-format <csv|json|yaml>  Format for data export (default inferred from file extension)

Behavior for CLI:
1. Parse and validate flags; on validation error print to stderr and exit code 1
2. Load or generate points via generateData or data-file parser
3. If derivative=true, compute derivative points for each sample
4. If overlay-trendline=true, compute regression parameters and line segment
5. If export-data is provided, serialize raw and analytical points in the requested format and write to output
6. Otherwise, assemble a Chart.js configuration with requested overlays, styling, and size
7. Render the chart via QuickChart API or a local chart generator based on format and encoding
8. If encoding=base64 wrap the resulting data in a JSON object {
   type: format,
   data: base64string
}
9. Write image bytes or JSON to output or stdout and exit code 0

# HTTP /plot Endpoint
Augment the HTTP server to register a GET /plot route with CORS enabled. Query parameters mirror CLI flags using camelCase:
- expression, range, dataFile, format, encoding, width, height, devicePixelRatio, backgroundColor, version
- derivative, overlayTrendline, exportData, exportFormat

Behavior for HTTP:
1. Apply Access-Control-Allow-Origin header
2. Validate query parameters against a Zod schema; on error return 400 JSON with error details
3. Generate or load data points, compute derivative and trendline as requested
4. If exportData=true, respond with serialized data in JSON, CSV, or YAML and status 200
5. Otherwise, render chart via QuickChart API or local generator; respond with:
   - application/json for base64 encoding responses
   - image/svg+xml or image/png for binary images
6. Status code 200 on success, 400 JSON on any processing error

# Implementation
- Introduce runPlotCli in src/lib/main.js to handle the plot subcommand and flags
- Extend createServer in src/lib/main.js to register GET /plot with Zod validation
- Use generateData, computeRegression, and a new computeDerivative(points) helper to compute derivative values
- Integrate QuickChart API via HTTP client or use sharp/local renderer for direct image generation
- Ensure consistent flag parsing with parseArgs and consistent error messaging
- Maintain existing dependencies or add minimal libraries if needed for chart assembly

# Testing
- Add unit tests for CLI plot:
  - Image output in SVG and PNG formats
  - Base64 JSON response when encoding=base64
  - Derivative and overlayTrendline overlays applied
  - Data export in CSV, JSON, and YAML formats
  - Validation error cases for missing required params
- Add HTTP endpoint tests via supertest:
  - GET /plot returns correct content type for images and JSON
  - ExportData=true returns serialized data formats and correct headers
  - CORS header present on all responses
  - Validation errors return 400 with error messages

# Documentation
- Update USAGE.md and README.md to document all new flags and examples for the plot subcommand and HTTP /plot endpoint
- Provide sample CLI commands and curl examples demonstrating image generation, base64 encoding, and data export
- Reference computeDerivative and overlayTrendline behavior in API reference