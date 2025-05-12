# Overview

Provide a unified, end-to-end plotting feature that supports both command-line and HTTP contexts. Users can render function plots as SVG or PNG images and retrieve them via a CLI command or a REST endpoint.

# CLI Plot Command

Add a new `plot` subcommand to the CLI entrypoint. The invocation:

repository0-plot-code-lib plot [--flags]

Required flags:
- --expression <expression>         Mathematical expression in the form y=…
- --range <axis=min:max>            Numeric axis range
- --format <svg|png>                Output image format

Optional flags:
- --output <path>                   Write image to file; defaults to stdout
- --width <pixels>, --height <pixels>
- --samples <number>                Number of sample points (default 100)
- --xLog, --yLog                    Use logarithmic scale on respective axis
- --grid                            Include grid lines
- --title <text>, --xLabel <text>, --yLabel <text>
- --derivative                      Overlay first derivative curve
- --trendlineStats                  Compute regression stats only
- --overlayTrendline                Overlay regression trendline
- --palette <name>, --colors <CSV>  Color scheme settings
- --exportData <path>               Export raw data points to CSV/JSON/YAML
- --exportFormat <csv|json|yaml>    Format for export when extension is missing

Behavior:
1. Parse and validate flags; on error, print to stderr and exit code 1.
2. Compute data with `parseRange` and `generateData`.
3. Call `generatePlot(points, options)` to produce SVG or PNG.
4. If `--trendlineStats`, compute regression stats and print without image.
5. Write image or stats to `--output` or stdout.
6. Exit code 0 on success.

# HTTP Plot Endpoint

Expose GET `/plot` when server is started (`--serve <port>`).

Query parameters mirror CLI flags:
- expression (required)
- range (required)
- format (required)
- width, height, samples, xLog, yLog, grid, title, xLabel, yLabel, derivative,
  trendlineStats, overlayTrendline, palette, colors, exportData, exportFormat
- encoding=base64                    Return JSON with base64 image

Behavior:
1. Validate parameters with Zod; return 400 JSON on error.
2. Generate data series and call `generatePlot`.
3. If format=png, convert SVG via sharp.
4. Always set `Access-Control-Allow-Origin: *`.
5. If `encoding=base64`, respond with `application/json`:
   {
     data: <base64string>,
     type: "svg"|"png"
   }
6. Otherwise return raw image bytes or SVG text with correct Content-Type.
7. On errors, return HTTP 400 and error JSON.

# Implementation

In `src/lib/main.js`:
- Export a `runPlotCli(argv)` function handling CLI parsing and calling `generatePlot`.
- Extend `main()` to dispatch on `argv[0] === 'plot'` and invoke `runPlotCli`.
- Add an Express route for GET `/plot` in `createServer` analogous to `/stats`.
- Implement `generatePlot(points, options)`:
  - Render SVG via EJS template or template strings.
  - Use sharp to convert to PNG when needed.
  - If exportData is set, write raw data in the specified format.

Update dependencies to include EJS and sharp if missing.

# Testing

Add unit tests in `tests/unit/cli-plot.test.js`:
- Success cases: SVG and PNG output to file and stdout.
- Error cases: missing or invalid flags.

Add tests in `tests/unit/plot-endpoint.test.js`:
- GET `/plot` returns correct SVG and PNG raw and base64.
- Validation errors yield 400 with JSON error.
- CORS header present.

# Documentation

Update `USAGE.md` and `README.md`:
- Document `plot` subcommand flags and examples.
- Document GET `/plot` parameters, raw and base64 modes, sample curl commands.
