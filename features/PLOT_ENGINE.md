# Overview

Unify the existing CLI plot command and HTTP `/plot` endpoint into a single coherent feature. Provide users with a consistent interface for generating SVG or PNG plots from mathematical expressions and numeric ranges, both in command-line and server contexts.

# CLI Plot Command

Usage: repository0-plot-code-lib plot

Flags:
- --expression <expression> (required): mathematical expression in the form y=…
- --range <axis=min:max> (required): numeric axis range
- --format <svg|png> (required): output image format
- --output <path> (optional): file path to write the generated image; writes to stdout if omitted
- --width, --height (optional): pixel dimensions of the plot
- --samples <number> (optional, default 100): number of sample points
- --xLog, --yLog (optional): use logarithmic scale on x or y axis
- --grid (optional): include grid lines
- --title, --xLabel, --yLabel (optional): text for title and labels
- --derivative (optional): overlay first derivative curve
- --trendlineStats (optional): compute regression statistics without plot
- --overlayTrendline (optional): overlay regression trendline
- --palette, --colors (optional): color scheme settings

Behavior:
1. Validate flags; on validation error write to stderr and exit with code 1.
2. Parse range and generate data via parseRange and generateData.
3. Call generatePlot(dataPoints, options) to render SVG or PNG.
4. Write the result to the output path or stdout, respecting binary/text modes.
5. Exit with code 0 on success.

# HTTP Plot Endpoint

Add a GET `/plot` endpoint to the HTTP server when started with `--serve <port>`.

Query Parameters:
- expression (required): function expression in y=… form
- range (required): axis=min:max
- format (required): svg or png
- encoding (optional): base64 to return JSON with base64 data
- width, height, samples, xLog, yLog, grid, title, xLabel, yLabel, derivative, palette, colors, trendlineStats, overlayTrendline (same meanings as CLI)

Behavior:
1. Validate query parameters with a Zod schema; return 400 on errors.
2. Generate data series via parseRange and generateData.
3. Render image via generatePlot. Use sharp to convert SVG to PNG when needed.
4. Set CORS header Access-Control-Allow-Origin: * on all responses.
5. If encoding=base64, respond with application/json:
   {
     data: <base64-encoded image>,
     type: "svg" | "png"
   }
6. Otherwise respond raw image bytes or SVG text with appropriate Content-Type.
7. On errors, return HTTP 400 with JSON error message.

# Implementation

- In src/lib/main.js implement generatePlot(points, options):
  - Render SVG via EJS or template strings.
  - If format=png, convert SVG to PNG using sharp.
- Extend the main function:
  - Detect `plot` subcommand and invoke runPlotCli.
  - In HTTP server setup add handler for GET `/plot` following above behavior.
- Reuse parseArgs, parseRange, generateData utilities.
- Update dependencies if needed (ensure sharp and ejs present).

# Testing

- Add unit tests in tests/unit/cli-plot.test.js:
  - Test CLI plot for SVG and PNG output to file and stdout.
  - Test validation errors for missing or invalid flags.
- Add unit tests in tests/unit/plot-endpoint.test.js:
  - Test GET `/plot` for svg and png, raw and base64 modes.
  - Verify response status, content type, and body shape.
  - Test missing or invalid parameters return 400 with error.

# Documentation

- Update USAGE.md and README.md:
  - Document the `plot` subcommand and its flags with examples.
  - Document GET `/plot` endpoint, parameters, raw and base64 responses.
  - Provide curl examples and sample responses.
