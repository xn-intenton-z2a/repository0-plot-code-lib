# Overview
Enhance and fully implement the plot subcommand and HTTP /plot endpoint in server mode to generate SVG and PNG images from mathematical expressions or input data files. Provide complete CLI options support for styling, export, and encoding modes, and enable CORS-enabled HTTP responses with optional base64 or URL encoding.

# CLI Plot Subcommand
Invoke the plot mode via:

 repository0-plot-code-lib plot [--flags]

Required flags:
 - --expression <expression>      Mathematical expression in form y=... (e.g., y=sin(x)+0.5*x)
 - --range <axis=min:max>         Axis range for expression mode (e.g., x=0:10)
 - --format <svg|png>             Output image format

Optional flags:
 - --dataFile <path>              JSON, CSV, or YAML file with data points
 - --output <path>                File path to write image (defaults to stdout)
 - --width <number>               Image width in pixels (default 800)
 - --height <number>              Image height in pixels (default 600)
 - --samples <number>             Sample point count for expression mode (default 100)
 - --xLog <true|false>            Use logarithmic scale for x axis (default false)
 - --yLog <true|false>            Use logarithmic scale for y axis (default false)
 - --grid <true|false>            Include grid lines (default false)
 - --title <text>                 Chart title
 - --xLabel <text>                X axis label
 - --yLabel <text>                Y axis label
 - --derivative <true|false>      Overlay first derivative curve (default false)
 - --overlayTrendline <true|false>Overlay regression trendline (default false)
 - --palette <name>               Predefined color scheme
 - --colors <c1,c2,…>             Comma-separated series colors
 - --exportData <path>            Export raw data points to file
 - --exportFormat <csv|json|yaml> Format for data export
 - --encoding <base64|url>        Return image encoded in JSON

Behavior:
 1. Detect plot subcommand and parse flags; on error print to stderr and set exit code 1
 2. Validate required flags; error if missing
 3. Load points from expression via parseRange and generateData or read dataFile
 4. Generate SVG via generatePlot(points, options)
 5. If format is png, convert SVG to PNG via sharp
 6. If exportData is present, write data file in specified exportFormat
 7. If encoding is set to base64 or url, output JSON with data and type
 8. Otherwise write raw SVG or PNG bytes to stdout or output file
 9. Set process.exitCode to 0 on success

# HTTP /plot Endpoint
Route: GET /plot

Query parameters mirror CLI flags: expression, range, format, dataFile, width, height, samples, xLog, yLog, grid, title, xLabel, yLabel, derivative, overlayTrendline, palette, colors, exportData, exportFormat, encoding

Behavior:
 1. Validate parameters with zod; respond 400 JSON on error
 2. Load points from expression or dataFile
 3. Generate SVG via generatePlot; convert to PNG if format=png
 4. Set CORS header Access-Control-Allow-Origin: *
 5. If encoding is set, respond application/json with { data, type }
 6. Otherwise respond with image/svg+xml or image/png bytes
 7. Return HTTP 200 on success

# Implementation
 - In src/lib/main.js extend main() to detect argv[0] === 'plot' and call runPlotCli
 - Implement runPlotCli to parse flags, load data, call generatePlot, handle PNG conversion, exportData, and encoding
 - In createServer register GET /plot with a zod schema reflecting all flags, implement behavior including CORS
 - Ensure consistent flag names between CLI and HTTP modes

# Testing
 - Add unit tests for CLI plot in tests/unit/plot-cli.test.js:
    • SVG and PNG generation success
    • Error cases for missing or invalid flags
    • exportData and encoding modes
 - Add tests for HTTP GET /plot in tests/unit/plot-endpoint.test.js:
    • Valid SVG and PNG responses content-type
    • JSON response when encoding=base64 or url
    • Validation errors return 400 with JSON error
    • CORS header present

# Documentation
 - Update USAGE.md and README.md to document plot subcommand flags, examples, and HTTP /plot endpoint usage