# Overview

Extend the existing Plot engine to support additional QuickChart customization options, allowing fine-grained control of chart appearance and request parameters beyond basic dimensions and format. Users can specify background color, device pixel ratio, chart version, API key, legend placement, and font sizing both via CLI flags and HTTP query parameters.

# CLI Chart Customization Options

Introduce the following new flags for the plot subcommand:

- --background-color <CSS color>   Set the chart background color (e.g., white, transparent, #f0f0f0).
- --device-pixel-ratio <number>    Specify scaling factor for high-DPI outputs (e.g., 1, 2).
- --version <2|3|4>                QuickChart API version to target (default: 2).
- --key <string>                   QuickChart API key for authenticated requests.
- --legend-position <top|bottom|left|right>  Position of chart legend.
- --font-size <number>             Global font size in pixels for all chart text.

Behavior:
1. Parse the --config file as before (JSON or YAML), merge defaults into internal args.
2. Parse all CLI flags and override config values in this order:
   backgroundColor, devicePixelRatio, version, key, legendPosition, fontSize.
3. Build chartConfig.options:
   - options.plugins.legend.position = legendPosition
   - options.font.size = fontSize
   - backgroundColor applied to request payload or QuickChart URL
4. When constructing the QuickChart request:
   - Include width, height, devicePixelRatio, backgroundColor, version, key in the POST body or query string.
   - Send the JSON body to QuickChart endpoint as before.
5. Output behavior remains unchanged for svg, png, and base64 modes.

# HTTP /plot Chart Customization

Extend the GET /plot endpoint to accept these query parameters alongside existing ones:

- backgroundColor
- devicePixelRatio
- version
- key
- legendPosition
- fontSize

Behavior:
1. Validate and parse new parameters via Zod schema.
2. Merge config file values (if any) and explicit query parameters as with CLI.
3. Build the chartConfig with legend and font options, then assemble QuickChart request body including version, key, devicePixelRatio, and backgroundColor.
4. Honor CORS header and return svg or png as before, or JSON wrapper when encoding=base64.

# Testing

Add unit and integration tests covering all new behaviors:

CLI Unit Tests:
- Generate a plot with explicit --background-color red and verify QuickChart request body or URL includes backgroundColor: red.
- Use --device-pixel-ratio 2 and check the POST body contains devicePixelRatio: 2.
- Pass --version 3 and ensure the QuickChart version parameter is set to 3 in the request.
- Provide --legend-position bottom and --font-size 18, override config defaults, and assert chartConfig.options reflect these values.
- Include --key abc123 and verify that the request URL or body includes the key field.

HTTP Integration Tests:
- GET /plot?expression=y=x&range=x=0:5&backgroundColor=blue should return an SVG and QuickChart stub is called with backgroundColor: blue.
- GET with devicePixelRatio, version, key, legendPosition, fontSize parameters returns correct content type and chart output.
- Error cases: invalid devicePixelRatio (non-number), invalid version (not 2,3,4), invalid legendPosition (not one of allowed), expect 400 with JSON error.

# Documentation

Update USAGE.md and README.md Plot section to document:

- New CLI flags: backgroundColor, devicePixelRatio, version, key, legendPosition, fontSize with descriptions and examples.
- New HTTP query parameters with sample curl commands.
- Example showing overriding config file settings with explicit flags for legendPosition and fontSize.