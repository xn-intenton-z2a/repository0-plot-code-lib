# Overview
Extend the CLI plot subcommand and add an HTTP /plot endpoint to serve generated plots as SVG or PNG. This feature enables programmatic visualization over HTTP and brings parity between CLI and server modes.

# CLI Plot Subcommand
Add or update the existing plot subcommand with these flags:
- --expression <expression>    Required mathematical expression in the form y=…
- --range <axis>=<min>:<max>   Required numeric range (e.g., x=0:10)
- --format <svg|png>           Required output image format
- --output <path>              Required file path to write the image
- --width <number>             Optional width of the plot in pixels (default 500)
- --height <number>            Optional height of the plot in pixels (default 300)
- --derivative <true|false>    Overlay first derivative curve
- --overlay-trendline <true|false>    Overlay regression trendline

Behavior:
1. Dispatch to runPlotCli when argv[0] is "plot".
2. Parse and validate flags; on error print message and exit code 1.
3. Generate data points, build ChartJS configuration.
4. Render SVG or PNG via embedded builder or QuickChart API and sharp.
5. Write output file and set exit code 0 on success.

# HTTP Plot Endpoint
Add a new HTTP GET /plot endpoint with query parameters:
- expression (required): y=… form
- range (required with expression): axis=min:max
- format (required): svg or png
- width, height, samples, derivative, overlayTrendline, trendlineStats, palette, xLog, yLog, grid, title, xLabel, yLabel (all optional)
- encoding (optional): base64 to return JSON {data, type}

Behavior:
1. Validate query parameters with zod.
2. Generate data and ChartJS configuration.
3. Render SVG or PNG, optionally rasterize.
4. If encoding=base64, return application/json with data and type; otherwise respond with image SVG or PNG with correct content-type.
5. Include Access-Control-Allow-Origin: * on all responses.
6. Return 400 on validation or runtime errors.

# Implementation
- In src/lib/main.js, update setupHttp to register GET /plot handler after /stats.
- Reuse parseArgs, parseRange, generateData, and mathjs.
- Use QuickChart API or embedded builder for SVG, use sharp for PNG.

# Testing
- Add tests in tests/unit/plot-server.test.js using supertest.
- Test valid SVG and PNG responses, base64 JSON encoding, parameter validation errors, and CORS header.

# Documentation
- Update USAGE.md and README.md with HTTP /plot endpoint details, query parameters, response formats, and examples.