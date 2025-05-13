# Overview

Enhance the existing Plot engine to support advanced styling flags and introduce configuration file support for both CLI and HTTP endpoints. Users can now load default chart options from a JSON or YAML config file and override individual settings via flags or query parameters.

# CLI Plot Customization

Introduce and document new styling flags for the plot subcommand:
- --title <text>             Chart title displayed above the plot
- --x-label <text>           Label for the horizontal axis
- --y-label <text>           Label for the vertical axis
- --grid <true|false>        Show or hide grid lines (default: true)
- --x-log <true|false>       Use logarithmic scale on the x axis (default: false)
- --y-log <true|false>       Use logarithmic scale on the y axis (default: false)
- --config <path>            Path to JSON or YAML config file with default plot settings

Behavior:
1. Parse --config first. If provided, read file contents (JSON or YAML) and parse into an options object. On parse error or missing file, print an error and exit with code 1.
2. Load default chartConfig from config file, merging properties into an internal args object.
3. Parse remaining CLI flags and override any config values.
4. Merge styling settings into chartConfig.options:
   - plugins.title.text = title
   - scales.x.title.text = xLabel
   - scales.y.title.text = yLabel
   - scales.x.grid.display = grid
   - scales.y.grid.display = grid
   - scales.x.type = xLog ? 'log' : 'linear'
   - scales.y.type = yLog ? 'log' : 'linear'
5. Retain existing dataset, derivative, trendline, palette, encoding, output, width, height, and format behavior.
6. Request QuickChart API with the fully merged chartConfig and output result as before.

# Configuration File Support

Provide a unified mechanism for predefining plot options:

CLI Behavior:
- The config file is optional. When --config <path> is used, CLI will load defaults before processing flags.
- Config file format must be valid JSON or YAML. Supported keys match CLI flags (title, xLabel, yLabel, grid, xLog, yLog, format, width, height, samples, derivative, overlayTrendline, palette, encoding, output).
- Explicit CLI flags always override config values.

HTTP Behavior:
- The /plot endpoint accepts an optional query parameter config which is a server-local file path to a config file (JSON or YAML).
- On each request, if config is present, server will read and parse the file, merge its contents into query defaults, then apply any explicit query parameters.
- On missing or invalid config file, return status 400 with JSON error body.

# HTTP /plot Customization

Extend the GET /plot endpoint to accept the same advanced styling options and configuration file support:
- Accept query parameters: title, xLabel, yLabel, grid, xLog, yLog alongside existing expression, range, dataFile, format, width, height, samples, derivative, overlayTrendline, palette, encoding, and new config.
- Merge config file values before applying explicit parameters and then build chartConfig as in CLI.
- Honor CORS header Access-Control-Allow-Origin: *.
- Return image/svg+xml or image/png when no encoding, or JSON with base64 payload when encoding=base64.

# Testing

Add unit and integration tests to cover configuration support and styling:

CLI Unit Tests
- Load a YAML config file with title and log scales, run plot CLI without explicit flags, and verify chartConfig passed to QuickChart includes those values.
- Override config values by passing flags alongside --config and verify flags take precedence.
- Error case: missing or invalid config file should exit with code 1 and print an error message.

HTTP Integration Tests
- GET /plot?config=path/to/config.yaml&format=svg: expect SVG response containing title and axis definitions from config.
- GET /plot with config and explicit grid=false: expect grid hidden despite config requesting grid true.
- GET /plot?config=invalid-path: expect 400 status with JSON error body.

# Documentation

Update README.md and USAGE.md under Plot section to:
- Describe the --config flag and config query parameter.
- Provide example config file in JSON and YAML formats.
- Show example CLI command using --config and overriding a setting.
- Show example HTTP request with config parameter and resulting output.
