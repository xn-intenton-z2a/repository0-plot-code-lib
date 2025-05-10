# Summary
Add a plot subcommand to the CLI that accepts flags to configure chart type, dimensions, and output, and update README with usage examples.

# Behaviour
When the first argument is plot:
- Parse flags: `--type` for chart type with values line, bar, scatter; default line
- `--width` for width in pixels; default 640
- `--height` for height in pixels; default 480
- `--output` for optional file path to write the plot
- If `--output` is omitted, print a summary of the plot parameters

# CLI Overview
Usage: repository0-plot-code-lib plot [flags]

Flags:
- `--type <chartType>` Chart type (line, bar, scatter)
- `--width <pixels>` Width of the plot in pixels
- `--height <pixels>` Height of the plot in pixels
- `--output <file>` Output file path for the plot

# Examples
repository0-plot-code-lib plot --type bar --width 400 --height 300
Generates a bar plot 400x300 in the console output

repository0-plot-code-lib plot --type scatter --output data.png
Generates a scatter plot 640x480 and writes it to data.png

# Testing
- Add tests in tests/unit/plot-generation.test.js covering:
  - All flags provided with valid values
  - Defaults when flags are not specified
  - Error case when flag values are invalid or missing
- Mock console.log and file system writes to capture output
- Ensure coverage tests include each branch and flag combination
- Update README.md with usage and examples for the plot command