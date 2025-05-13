# Overview
Enable full plot generation functionality by implementing the CLI “plot” subcommand and the HTTP /plot endpoint. Users will create graphical outputs (SVG or PNG) from expressions or imported data, with options for styling, overlays, sampling, and encoding.

# CLI Plot Subcommand
**Flags (validated by zod)**
- --expression <function>    Mathematical expression in y=… form
- --range <axis>=min:max     Axis range required for expression mode
- --data-file <path>         Path to JSON, CSV, or YAML file containing [{x,y},…]
- --format <svg|png>         Output image format (default svg)
- --output <path>            Write result to file (stdout if omitted)
- --width <number>           Image width in pixels (default 500)
- --height <number>          Image height in pixels (default 300)
- --samples <number>         Number of sample points (default 100)
- --derivative <true|false>  Overlay the first derivative curve
- --overlay-trendline <true|false>  Overlay regression trendline on the plot
- --palette <colors>         Comma-separated CSS colors for series
- --encoding <base64>        Wrap output bytes in JSON with data and type when set

**Behavior**
1. Parse and validate CLI arguments with parseArgs and zod schema.
2. Load or generate data points via generateData(expression, range, samples) or file reader for JSON, CSV, YAML.
3. Optionally compute derivative series and regression parameters (slope, intercept, r2) for overlay.
4. Build a ChartConfiguration object compatible with QuickChart API, injecting data series, dimensions, colors, and overlays.
5. Send a POST /chart request with chart configuration, width, height, and format to QuickChart endpoint.
6. On success, receive image bytes (SVG text or PNG binary). If encoding=base64, wrap bytes in JSON: { data: <base64string>, type: "svg"|"png" } and set content-type application/json; otherwise write raw bytes or text to output path or stdout.
7. Exit with code 0 on success, code 1 on error.

# HTTP Plot Endpoint
**GET /plot**
**Query parameters (validated by zod)**
- expression, range, dataFile, format, width, height, samples, derivative, overlayTrendline, palette, encoding

**Behavior**
1. Validate parameters with zod schema; return 400 on invalid inputs.
2. Generate or load data and apply derivative/trendline overlays.
3. Construct and send QuickChart API request as in CLI.
4. If encoding=base64, respond with application/json and JSON { data, type }; otherwise respond with image/svg+xml or image/png and raw body.
5. Include Access-Control-Allow-Origin: * on all responses.
6. Return 200 on success, 400 on validation errors, 502 on upstream QuickChart failures.

# Implementation
- In src/lib/main.js, replace runPlotCli stub with full implementation using fetch (or node-fetch) and zod for validation.
- Extend createServer to implement app.get('/plot') handler matching CLI behavior.
- Add QuickChart client helper module or inline helper in main.js.
- Use js-yaml and existing data loaders for file import.

# Testing
- **CLI Unit Tests**: stub filesystem writes and mock fetch to QuickChart; verify SVG prefix or PNG magic bytes; JSON encoding when encoding flag is set; correct exit codes and file outputs; error on invalid parameters.
- **HTTP Endpoint Tests**: use supertest to assert GET /plot returns correct content-type and body for default binary responses; JSON wrapper when encoding=base64; 400 on validation failure; 502 on simulated upstream error.

# Documentation
- Update USAGE.md and README.md to document new plot flags, syntax, and examples for SVG, PNG, and base64 output.
- Add sample curl and CLI commands in help output.