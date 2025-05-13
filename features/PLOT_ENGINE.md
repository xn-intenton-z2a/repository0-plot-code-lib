# Overview
Extend the existing plot engine to support additional CLI flags for chart customization and implement tests for both CLI and HTTP `/plot` endpoint. Update README with examples for the new flags.

# CLI Plot Flags
Enhance the plot subcommand with flags:
- --title <text> for chart title
- --x-label <text> for horizontal axis label
- --y-label <text> for vertical axis label
- --grid <true|false> to show or hide grid lines
- --x-log <true|false> to use logarithmic scale on the x axis
- --y-log <true|false> to use logarithmic scale on the y axis
Integrate these into chartConfig.options under plugins.title and scales.x, scales.y.

# HTTP /plot Endpoint
Extend the HTTP `/plot` endpoint to accept title, xLabel, yLabel, grid, xLog, yLog as query parameters. Validate parameters with the existing Zod schema. Merge them into chartConfig.options. Preserve SVG and PNG response logic and CORS header.

# Testing
Add new tests under tests/unit:
- plot-flags.test.js to verify runPlotCli handles each new flag and produces correct chartConfig.options
- plot-endpoint.test.js to verify GET `/plot` with title, xLabel, yLabel, grid, xLog, yLog returns correct status, content type, and response body for SVG, PNG, and base64 encoding
- Error cases when expression, dataFile, or range is missing

# Documentation
Update README.md in the Plot section:
- Add CLI examples showing title, labels, grid, and log scale flags
- Add HTTP `/plot` examples demonstrating title, labels, grid toggles, and log scales, both raw and base64 responses
Ensure USAGE.md is updated with descriptions and examples for all new flags and endpoint parameters.