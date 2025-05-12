# Overview
Enhance the existing plotting feature to fully implement the CLI subcommand for generating SVG and PNG images and the HTTP /plot endpoint. Users will be able to render charts directly via command-line or through a RESTful GET request with styling, export, and encoding options.

# CLI Plot Subcommand

Invoke:
 repository0-plot-code-lib plot [--flags]

Required flags:
 - --expression <expression>      Mathematical expression in the form y=… for expression mode
 - --range <axis=min:max>         Axis range for expression mode
 - --format <svg|png>             Output image format

Optional flags:
 - --dataFile <path>              Path to JSON, CSV, or YAML file containing data points
 - --output <path>                File path to write the image (defaults to stdout)
 - --width <number>               Image width in pixels (default 800)
 - --height <number>              Image height in pixels (default 600)
 - --samples <number>             Number of sample points (default 100)
 - --xLog <true|false>            Use logarithmic scale for x axis (default false)
 - --yLog <true|false>            Use logarithmic scale for y axis (default false)
 - --grid <true|false>            Include grid lines (default false)
 - --title <text>                 Chart title
 - --xLabel <text>                Label for x axis
 - --yLabel <text>                Label for y axis
 - --derivative <true|false>      Overlay the first derivative curve (default false)
 - --overlayTrendline <true|false>Overlay a regression trendline on the plot (default false)
 - --palette <name>               Predefined color scheme
 - --colors <c1,c2,…>             Comma-separated list of series colors
 - --exportData <path>            Export raw data points to a file
 - --exportFormat <csv|json|yaml> Format to use when exporting data
 - --encoding <base64|url>        Return a base64 or URL-encoded image in JSON instead of raw bytes

Behavior:
 1. Dispatch when first CLI argument is plot; parse and validate flags, exit code 1 on error
 2. Load points from expression via generateData or from dataFile via filesystem
 3. Call generatePlot(points, options) to produce an SVG string
 4. If format is png convert SVG to PNG using sharp
 5. If exportData is provided write raw points in specified format
 6. If encoding is set wrap image data in JSON with fields data and type
 7. Otherwise write raw image bytes or SVG text to stdout or output file
 8. Set process.exitCode to 0 on success

# HTTP Plot Endpoint

Route: GET /plot
Query parameters mirror CLI flags: expression, range, dataFile, format, width, height, samples, xLog, yLog, grid,
 title, xLabel, yLabel, derivative, overlayTrendline, palette, colors, exportData, exportFormat, encoding

Behavior:
 1. Validate query parameters with zod; on failure respond 400 JSON error
 2. Load data points from expression or file
 3. Generate SVG via generatePlot, convert to PNG via sharp if requested
 4. Include Access-Control-Allow-Origin: * on all responses
 5. If encoding is set respond with application/json { data, type }
 6. Otherwise respond with image/svg+xml or image/png bytes
 7. Respond with HTTP 200 on success or 400 on failure

# Implementation

- In src/lib/main.js add handling in main() for argv[0] === 'plot' to invoke runPlotCli
- Implement runPlotCli that uses parseArgs, parseRange, generateData, fs and yamlLoad to load points
- Import and call an existing generatePlot utility to render an SVG; use sharp for PNG conversion
- Respect flags for exportData and encoding to write raw points or encoded JSON
- Extend createServer to register GET /plot route with a zod schema reflecting all flags
- Ensure CORS header is applied and response content types are correct

# Testing

- Add tests/unit/plot-cli.test.js covering:
  • Successful CLI plot generation for SVG and PNG formats
  • Error cases for missing required flags or invalid ranges
  • Encoding and exportData modes
- Add tests/unit/plot-endpoint.test.js covering:
  • HTTP GET /plot returning valid SVG and PNG content types
  • JSON response when encoding=base64 or url
  • Validation errors returning 400 with JSON error messages
  • Presence of Access-Control-Allow-Origin header

# Documentation

- Update USAGE.md to include a new section for the plot subcommand flags and examples
- Update README.md to document the plot CLI invocation and HTTP /plot endpoint, including sample curl commands and encoding examples