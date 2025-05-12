# Overview
Enhance and fully implement the plot subcommand and HTTP /plot endpoint to allow users to render mathematical expressions or imported data series as images or export raw and analytical data. Provide flexible chart customization and encoding options.

# CLI Plot Subcommand
Add a new "plot" subcommand with the following flags:
- --expression <expression>        Mathematical expression in y=… form (required unless dataFile provided)
- --range <axis>=<min>:<max>       Numeric range for axis when using expression (required with expression)
- --data-file <path>               Path to JSON, CSV, or YAML data file (required unless expression provided)
- --format <svg|png>               Output image format (default svg)
- --output <path>                  File path to write the image (stdout if omitted)
- --encoding <base64|none>         Encode output as base64 JSON when format svg or png (default none)
- --width <number>                 Image width in pixels (default 500)
- --height <number>                Image height in pixels (default 300)
- --device-pixel-ratio <number>    Device pixel ratio (default 1)
- --background-color <CSS>         Background color for chart (default transparent)
- --version <Chart.js version>     Chart.js version for QuickChart API (default 2.9.4)
- --derivative <true|false>       Overlay first derivative curve (default false)
- --overlay-trendline <true|false> Overlay regression trendline (default false)
- --export-data <path>            Export raw or derived data to file instead of image
- --export-format <csv|json|yaml> Format for export when exporting data

Behavior:
1. Parse and validate flags; on error print to stderr and exit with code 1
2. Load or generate data points via generateData or data-file parser
3. If derivative=true compute y′ for each sample
4. If overlay-trendline=true compute regression line segments
5. Construct a Chart.js configuration including data, derivative or trendline overlays
6. If export-data is present serialize raw and analytical data in requested format and write to file or stdout
7. Otherwise, request image render from QuickChart API or local chart generator using width, height, backgroundColor, version and encoding
8. Write or return image bytes or base64 JSON and exit code 0

# HTTP /plot Endpoint
Extend GET /plot to support chart rendering and data export. Query parameters mirror CLI flags using camelCase:
- expression, range, dataFile, format, encoding, width, height, devicePixelRatio, backgroundColor, version
- derivative, overlayTrendline, exportData, exportFormat

Behavior:
1. Set Access-Control-Allow-Origin to allow CORS
2. Validate query parameters with Zod; return 400 JSON on error
3. Generate or load points, compute derivative and trendline as requested
4. If exportData=true respond with data serialization JSON, CSV or YAML and status 200
5. Else render chart via QuickChart API or local module, honoring encoding; respond with application/json for base64 or image/svg+xml or image/png for raw bytes, status 200
6. Handle errors with 400 JSON responses

# Implementation
- In src/lib/main.js add runPlotCli handling "plot" subcommand and new flags
- Extend createServer to register GET /plot with a Zod schema for plot parameters
- Integrate QuickChart via HTTP client or use internal chart generator utility
- Ensure consistent flag parsing and error handling with parseArgs and zod

# Testing
- Add unit tests for CLI plot with various flags verifying image file output, base64 JSON, derivative and trendline overlays
- Add HTTP endpoint tests via supertest for GET /plot with image response, JSON base64 response, data export formats, and error conditions
- Use fixed small datasets to verify chart configuration and export data correctness

# Documentation
- Update USAGE.md and README.md to include detailed CLI plot examples and HTTP /plot usage
- Document all new flags, encoding option, export behaviors, and CORS support