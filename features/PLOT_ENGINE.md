# Overview
Extend the repository to implement a fully working plot subcommand for CLI and HTTP, generating SVG or PNG images from mathematical expressions or imported data files.

# CLI Plot Subcommand
Add a new `plot` subcommand that supports the following flags:
- --expression <expression>    Function to plot in the form `y=…` when generating computed data
- --range <axis>=<min>:<max>   Required with `--expression` to define numeric range
- --data-file <path>           Path to a JSON, CSV, or YAML file containing an array of {x,y} points
- --format <svg|png>           Output image format (required)
- --output <path>              Destination file path for the rendered image (required)
- --width <number>             Optional image width in pixels (default 500)
- --height <number>            Optional image height in pixels (default 300)
- --samples <number>           Number of points for expression mode (default 100)
- --derivative <true|false>    Overlay first derivative curve when using `--expression`
- --overlay-trendline <true|false>    Overlay regression trendline on the chart
- --palette <CSV>              Comma-separated list of CSS color strings for series

Behavior:
1. In `main()`, detect `argv[0] === 'plot'` and dispatch to `runPlotCli(argv.slice(1))`
2. Validate flags and combinations; exit code 1 on missing or invalid parameters
3. Load or generate data points:
   - Computed mode: use `parseRange`, `generateData`
   - File mode: detect extension and parse JSON, YAML, or CSV into a points array
4. Build a ChartJS configuration object with axes, series, overlays (derivative, trendline), and palette
5. Render the chart to SVG or PNG using embedded ChartJS with `canvas` or via QuickChart HTTP API; fallback to `sharp` for PNG rasterization if needed
6. Write the rendered buffer or string to the `--output` file; exit code 0 on success

# HTTP Plot Endpoint
Ensure the existing Express server exposes `/plot` with the following behavior:
- Accept same parameters as CLI via query string plus `encoding=base64` for JSON-wrapped base64 output
- Validate inputs with zod
- Generate chart configuration and render as above
- Set appropriate content-type:
  - `image/svg+xml` for SVG
  - `image/png` for PNG
  - `application/json` when `encoding=base64`
- Include CORS header `Access-Control-Allow-Origin: *`
- Return 400 on validation or runtime errors

# Implementation Details
- In `src/lib/main.js`, implement `runPlotCli` parallel to `runStatsCli`
- Update `main()` dispatch logic to call `runPlotCli` when `plot` is requested
- Reuse `parseArgs`, `parseRange`, `generateData`, `computeRegression`
- Add dependencies: `chart.js` (or QuickChart client) and `canvas` or use existing `sharp` for PNG rendering
- Extend Express setup in `createServer` to mount `/plot`

# Testing
- Add unit tests for CLI in `tests/unit/plot-cli.test.js`:
  - Verify SVG and PNG files are created with correct dimensions
  - Test expression mode and data-file mode for both formats
  - Test flags: samples, derivative overlay, trendline overlay, palette
  - Test invalid flag combinations and missing parameters
- Extend HTTP tests in `tests/unit/plot-generation.test.js`:
  - GET `/plot?expression=…&range=…&format=svg` returns `image/svg+xml`
  - GET `/plot?dataFile=…&format=png` returns `image/png`
  - Encoding=base64 returns JSON with `data` and `type`
  - CORS header present
  - Validation errors return 400

# Documentation Updates
- Update USAGE.md and README.md to document the new `plot` subcommand and `/plot` endpoint with examples
- Provide usage examples for both expression and data-file modes, with both local CLI and HTTP invocation