# Overview
Extend the existing plot engine to support both rich chart customization and an integrated ASCII art rendering subcommand within a single CLI, and apply customization options to the HTTP `/plot` endpoint.

# CLI Subcommands

## plot
Introduce flags for advanced customization:
- --title <text>          Chart title displayed at the top
- --x-label <text>        Horizontal axis label
- --y-label <text>        Vertical axis label
- --grid <true|false>     Show or hide grid lines (default: true)
- --x-log <true|false>    Use logarithmic scale on x-axis (default: false)
- --y-log <true|false>    Use logarithmic scale on y-axis (default: false)

These flags integrate into the QuickChart `chartConfig.options`:
- Set plugins.title.text when title is provided
- Set scales.x.title.text and scales.y.title.text for axis labels
- Toggle grid display and axis scale types based on flags

## ascii
Add a new top-level subcommand `ascii` alongside `stats` and `plot`:
- Invocation: repository0-plot-code-lib ascii [common plot flags] [--width-chars <n>] [--height-rows <n>] [--plot-char <char>]
- Common flags: --expression, --range, --dataFile, --samples
- New flags:
  - --width-chars <number>  Number of character columns (default: 80)
  - --height-rows <number>  Number of rows (default: 20)
  - --plot-char <char>      Character for the line (default: *)

Behavior:
1. Parse and validate arguments
2. Generate or load data points
3. Map points onto an ASCII grid of given dimensions
4. Draw axes and plot line using chosen character
5. Write multi-line ASCII chart to stdout, exit code 0 on success, code 1 on missing inputs

# HTTP `/plot` Endpoint
Extend the HTTP `/plot` endpoint to accept equivalent query parameters for title, xLabel, yLabel, grid, xLog, and yLog. Validate via Zod and merge into `chartConfig.options` as in the CLI. Preserve existing encoding and response logic for SVG and PNG.

# Testing
Add unit and integration tests in tests/unit/plot-generation.test.js and a new tests/unit/ascii-art.test.js:
- Verify customization flags produce correct `chartConfig.options` for CLI and HTTP
- Test ASCII output shape and dimensions for simple expressions
- Test error handling when required flags are missing

# Documentation
Update USAGE.md and README.md:
- Under `plot` section, document new flags with descriptions and defaults
- Under CLI Subcommands, document `ascii` with usage examples and sample ASCII chart
- Under HTTP `/plot`, document new query parameters and show examples of customized charts