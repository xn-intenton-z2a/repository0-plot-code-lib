# Overview

Fully implement the plot engine by completing the CLI `plot` subcommand and the HTTP `/plot` endpoint. Enable users to generate SVG or PNG images from mathematical expressions or data files, support optional derivative overlays, regression trendlines, custom dimensions, color palettes, and base64 encoding for HTTP responses.

# CLI Plot Subcommand

Add and validate the following flags using zod:

- `--expression <function>`    Mathematical expression in `y=…` form
- `--range <axis>=min:max`     Axis range for computed mode
- `--data-file <path>`         JSON, CSV, or YAML file of data points
- `--format <svg|png>`         Output image format
- `--output <path>`            File path to write image (required)
- `--width <number>`           Image width in pixels (default 500)
- `--height <number>`          Image height in pixels (default 300)
- `--samples <number>`         Sample count for expression mode (default 100)
- `--derivative <true|false>`  Overlay first derivative curve
- `--overlay-trendline <true|false>`  Overlay regression trendline
- `--palette <colors>`         Comma-separated list of CSS colors

Behavior:
1. Parse and validate flags; on validation errors print message and exit code 1.
2. Generate points via `generateData` or read from `data-file` (support JSON, CSV, YAML).
3. If `--derivative` true, compute finite-difference derivative series.
4. If `--overlay-trendline` true, compute regression and trendline series.
5. Build a Chart.js configuration including series, overlays, dimensions, and palette.
6. POST configuration to QuickChart API (`/chart`) with width, height, format.
7. Receive SVG string or image buffer, write to `--output`, exit code 0 on success.

# HTTP /plot Endpoint

Extend Express server at GET `/plot` with query parameters validated by zod:

- `expression`, `range`, `dataFile`, `format`, `width`, `height`, `samples`, `derivative`, `overlayTrendline`, `palette`, `encoding`

Behavior:
1. Validate and parse parameters; return 400 on invalid input.
2. Generate or load data points and apply derivative/regression overlays.
3. Construct Chart.js config and POST to QuickChart API.
4. If `encoding=base64`, return `application/json` with `{ data: <base64>, type: svg|png }`.
5. Otherwise set `Content-Type` to `image/svg+xml` or `image/png` and stream raw bytes.
6. Include `Access-Control-Allow-Origin: *`; return 200 on success.

# Testing

- Add `tests/unit/plot-cli.test.js` to verify CLI plots with SVG and PNG for computed and file modes, derivative and trendline flags.
- Add `tests/unit/plot-http.test.js` using supertest to verify HTTP `/plot` returns correct status, content-type, raw bytes and base64 JSON, and 400 on invalid parameters.

# Documentation

- Update `USAGE.md` and `README.md` to document the `plot` subcommand flags and `/plot` endpoint.
- Provide examples for computed and file modes, derivative and trendline overlays, palette usage, base64 encoding.
- Show sample curl commands and expected responses.
