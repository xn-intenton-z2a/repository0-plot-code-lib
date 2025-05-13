# Overview

Enhance the existing Plot engine to support chart customization via CLI flags and HTTP query parameters, enabling users to specify titles, axis labels, grid visibility, and logarithmic scales for both axes. Maintain support for existing expression/data modes, sample counts, derivative and trendline overlays, and PNG/SVG output with optional base64 encoding.

# CLI Plot Customization

Introduce new flags for the `plot` subcommand:
- --title <text>             Chart title displayed above the plot
- --x-label <text>           Label for the horizontal (x) axis
- --y-label <text>           Label for the vertical (y) axis
- --grid <true|false>        Show or hide grid lines (default: true)
- --x-log <true|false>       Use logarithmic scale on the x axis (default: false)
- --y-log <true|false>       Use logarithmic scale on the y axis (default: false)

Behavior:
1. Parse values from CLI via parseArgs and coerce booleans.
2. When provided, merge into `chartConfig.options`:
   - plugins.title.text = title
   - scales.x.title.text = xLabel
   - scales.y.title.text = yLabel
   - scales.x.grid.display = grid
   - scales.y.grid.display = grid
   - scales.x.type = xLog? 'log':'linear'
   - scales.y.type = yLog? 'log':'linear'
3. Preserve existing datasets configuration, derivative, trendline, palette, encoding, output.

# HTTP /plot Customization

Extend HTTP `/plot` endpoint to accept the same customization parameters via query string:
- title, xLabel, yLabel, grid, xLog, yLog alongside expression, dataFile, range, format, width, height, samples, derivative, overlayTrendline, palette, encoding.

Implementation:
1. Update Zod schema to include optional string flags for title, xLabel, yLabel, grid, xLog, yLog.
2. After data generation and overlays, construct `chartConfig` including customization as above.
3. Forward request to QuickChart and return SVG/PNG or base64 JSON as current.
4. Honor CORS header and existing error handling.

# Testing

Add unit and integration tests covering customizations:

## CLI Unit Tests
- Verify runPlotCli merges title, labels, grid, xLog, yLog into chartConfig before QuickChart invocation (mock fetch).
- Test each flag independently and in combination with derivative and overlayTrendline.
- Test boolean parsing for true and false values.

## HTTP Integration Tests
- GET `/plot` with title, xLabel, yLabel, grid=false, xLog=true, yLog=true and format=svg: expect content-type image/svg+xml and returned SVG contains title element and axis definitions.
- GET `/plot`?format=png encoding=base64 with customization: expect JSON with data and type and underlying chartConfig passed correctly.
- Error cases: invalid grid/xLog values produce 400 with JSON error body.

# Documentation

Update usage documentation:
- In README.md and USAGE.md under the Plot section, document new flags and query parameters with descriptions and CLI/HTTP examples.
- Provide example commands demonstrating title, axis labels, grid toggling, and log scales in both SVG and base64-encoded JSON.
