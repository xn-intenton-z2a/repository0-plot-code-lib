# Overview
Enhance and fully implement the plot subcommand and HTTP /plot endpoint to generate dynamic SVG and PNG images from mathematical expressions or input data files. Support raw binary and encoded JSON responses, flexible styling, overlays, and configurable CORS origins for secure embedding.

# CLI Plot Subcommand
Extend the existing plot CLI to accept and validate the following options:

- `--expression <expr>`           Mathematical expression in form `y=...` (required unless `--data-file` provided)
- `--range <axis>=<min>:<max>`    Axis range for expression mode (required when expression provided)
- `--format <svg|png>`            Output image format (required)
- `--width <number>`              Image width in pixels (default 800)
- `--height <number>`             Image height in pixels (default 600)
- `--samples <number>`            Sample points for expression (default 100)
- `--x-log <true|false>`          Apply logarithmic x scale (default false)
- `--y-log <true|false>`          Apply logarithmic y scale (default false)
- `--grid <true|false>`           Include grid lines (default false)
- `--title <string>`              Plot title annotation
- `--x-label <string>`            X-axis label
- `--y-label <string>`            Y-axis label
- `--derivative <true|false>`     Overlay first derivative curve (default false)
- `--overlay-trendline <true|false>` Overlay regression trendline (default false)
- `--palette <string>`            Named color palette
- `--colors <list>`               Custom color list for series
- `--data-file <path>`            Path to JSON, CSV, or YAML file with data points
- `--encoding <base64|url>`       Return JSON with encoded image instead of raw bytes
- `--cors-origins <list>`         Comma-separated allowed origins for CORS when serving
- `--output <path>`               File path to write output (otherwise stdout)

Behavior:
1. Parse and validate flags; on error emit message and exit code 1.
2. Load or generate point list via `generateData` or file parsing.
3. Call new utility `generatePlot(points, options)` to produce SVG markup with styling and overlays.
4. If `format=png`, convert SVG to PNG using `sharp`.
5. If `encoding` is set, output a JSON object `{ data: <encoded>, type: <format> }` to stdout or file.
6. Otherwise write raw SVG or PNG bytes with appropriate stdout output or file write.
7. Exit with code 0 on success.

# HTTP /plot Endpoint
Expose GET `/plot` on the HTTP server to mirror CLI behavior over HTTP:

Query parameters:
- `expression`, `dataFile`, `range`, `format`, `width`, `height`, `samples`, `xLog`, `yLog`, `grid`, `title`, `xLabel`, `yLabel`, `derivative`, `overlayTrendline`, `palette`, `colors`, `encoding`, `corsOrigins`

Behavior:
1. Validate all query parameters with a Zod schema; on validation failure return 400 JSON `{ error: <message> }`.
2. Determine allowed origins: `corsOrigins` query, CLI flag, or `CORS_ORIGINS` env var, default `*`.
3. Load or generate data points as in CLI.
4. Generate SVG with `generatePlot`, convert to PNG if requested.
5. Set `Access-Control-Allow-Origin` header to resolved origins.
6. If `encoding` is set, respond `application/json` with `{ data, type }` and status 200.
7. Otherwise respond with image bytes (`image/svg+xml` or `image/png`) and status 200.

# Implementation
- Extend `parseArgs` and `runPlotCli` in `src/lib/main.js` to support new flags.
- Add `generatePlot(points, options)` utility function for chart creation.
- Integrate `sharp` for SVG to PNG conversion.
- In HTTP setup (`createServer`), register `/plot` handler with Zod parameter schema and conversion logic.
- Ensure existing `/stats` endpoint remains unchanged.

# Testing
- Add unit tests for CLI plot:
  • SVG and PNG output to stdout and file
  • Encoding modes produce valid JSON with correct `data` and `type`
  • Error on missing required parameters
- Add HTTP tests for GET `/plot` via Supertest:
  • Raw image responses with correct Content-Type
  • JSON encoded responses with base64/url
  • CORS header honors `corsOrigins` and defaults
  • Error responses on invalid or missing parameters

# Documentation
- Update `USAGE.md` and `README.md` to include `/plot` HTTP endpoint usage examples, encoding section, and CORS configuration.
