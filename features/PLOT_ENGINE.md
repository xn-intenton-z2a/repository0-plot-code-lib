# Overview
Enhance the repository with a fully working plot command and HTTP endpoint. Users can generate PNG or SVG visualizations from mathematical expressions or from imported time series data. This feature complements the statistics engine and aligns with the mission of providing formula visualisations.

# CLI Plot Subcommand
- Introduce a new command "plot" in src/lib/main.js. When argv 0 equals plot, dispatch to runPlotCli with remaining arguments.
- Accept flags:
  - expression <function>  a y equation in form y=... for computed mode
  - range <axis>=min:max  required for expression mode to define numeric domain
  - dataFile <path>       optional path to file with array of points in JSON CSV or YAML
  - format <svg|png>      required output image format
  - output <path>         required file to write the image
  - width <number>        optional width in pixels default 500
  - height <number>       optional height in pixels default 300
  - samples <number>      optional sample count default 100 for expression mode
  - derivative <true|false> optional overlay of first derivative curve
  - overlayTrendline <true|false> optional regression trendline overlay on the plot
  - palette <colors>      optional comma separated CSS color list for series

Validation
- Validate combinations: expression requires range, format and output always required
- On missing or invalid parameters exit code 1 and print error message

Data Preparation
- Computed mode: parse range string, generate series from expression using generateData helper
- File mode: detect file extension, load JSON parse YAML or parse CSV into {x,y} points array

Rendering
- Build ChartJS configuration object with axes labels, data series, derivative and trendline overlays, and palette
- For SVG render use embedded Canvas or ChartJS SVG renderer
- For PNG render use QuickChart HTTP API as fallback or use chart.js with canvas and sharp for rasterization
- Write resulting buffer or string to output file path
- On success exit code 0

# HTTP Plot Endpoint
- In createServer mount GET /plot with query parameters matching CLI flags plus encoding=base64
- Validate inputs via zod schema
- Generate chart configuration and render as in CLI
- Response content types:
  - image/svg+xml for svg format
  - image/png for png format
  - application/json for base64 encoding returning JSON object with data and type fields
- Include Access-Control-Allow-Origin star for CORS
- On validation or runtime errors return 400 with JSON error message

# Testing
- Add unit tests under tests/unit:
  - plot-cli.test.js to verify CLI invocation creates correct SVG or PNG file given expression and dataFile modes and flags samples derivative overlay overlayTrendline palette width height
  - plot-http.test.js to verify GET /plot returns correct content type and body for svg png and base64 encoding and CORS header and error codes on invalid input

# Documentation
- Update USAGE.md and README.md to include examples for plot subcommand and /plot endpoint with all flag combinations and base64 example
- Provide examples for computed expression mode and dataFile mode for both SVG and PNG outputs