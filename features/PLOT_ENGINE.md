# Overview
Enhance and fully implement the plot subcommand and HTTP /plot endpoint to generate SVG and PNG images from mathematical expressions or input data files. Provide complete CLI options support for styling, export, and encoding modes, and enable configurable CORS origins for embedding control in browser contexts.

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
 - --cors-origins <origins>       Comma-separated list of allowed origins for CORS when in server mode

Behavior:
 1. Detect plot subcommand and parse flags; on error print to stderr and set exit code 1
 2. Validate required flags; error if missing
 3. Load points from expression via parseRange and generateData or read dataFile
 4. Generate SVG via generatePlot(points, options)
 5. If format is png, convert SVG to PNG via sharp
 6. If exportData is present, write data file in specified exportFormat
 7. If encoding is set, output JSON with data and type
 8. Otherwise write raw SVG or PNG bytes to stdout or output file
 9. Set process.exitCode to 0 on success

# HTTP /plot Endpoint
Route: GET /plot

Query parameters mirror CLI flags plus:
 - corsOrigins (optional): Comma-separated list of origins to set in Access-Control-Allow-Origin

Behavior:
 1. Determine allowed origins in priority:
    a. Query parameter corsOrigins
    b. CLI flag corsOrigins when launching with --serve
    c. Environment variable CORS_ORIGINS
    d. Fallback to '*' if none provided
 2. Validate corsOrigins format using zod; return 400 JSON on error
 3. Load data points from expression or dataFile
 4. Generate SVG via generatePlot; convert to PNG if format=png
 5. Set response header Access-Control-Allow-Origin to the resolved allowed origins value
 6. If encoding is set, respond application/json with { data, type } else respond with image/svg+xml or image/png bytes
 7. Return HTTP 200 on success or 400 on failure

# Implementation
- Extend parseArgs to accept --cors-origins and pass it through parsedArgs
- In main(), when parsedArgs.serve is present, extract parsedArgs['cors-origins'] and process.env.CORS_ORIGINS and store allowedOrigins list
- Modify createServer to accept an allowedOrigins parameter and apply it in both /plot and /stats handlers instead of wildcard
- In createServer, replace fixed res.set('Access-Control-Allow-Origin', '*') with the configured allowedOrigins value
- Add zod validation for corsOrigins query parameter in GET /plot route

# Testing
- Add unit tests for HTTP GET /plot verifying Access-Control-Allow-Origin header matches:
   • custom origin provided via corsOrigins query parameter
   • custom origin provided via CORS_ORIGINS environment variable
   • custom origin provided via --cors-origins CLI flag
   • fallback to '*' when no origin configured
- Verify status codes and content types for encoding, image bytes, and JSON modes

# Documentation
- Update USAGE.md to document the new --cors-origins flag, corsOrigins query parameter, and CORS_ORIGINS environment variable
- Update README.md under HTTP Server Mode and CORS Support sections with examples of configuring allowed origins