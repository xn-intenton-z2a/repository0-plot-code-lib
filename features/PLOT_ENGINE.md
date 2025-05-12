# Overview
Extend the CLI to support a new plot subcommand that mirrors the HTTP /plot endpoint, enabling users to generate SVG or PNG plots directly from the command line and optionally export the underlying data series.

# CLI plot Subcommand
- Usage: repository0-plot-code-lib plot [options]
- Flags
  - --expression (required) mathematical function in form y=…
  - --range (required with expression) axis range in axis=min:max format
  - --format (required) svg or png
  - --output (optional) file path for image output; writes to stdout if omitted
  - --samples (optional) integer sample count; default 100
  - --width (optional) image width in pixels; default 800
  - --height (optional) image height in pixels; default 600
  - --derivative (optional) true or false; overlay first derivative curve
  - --overlay-trendline (optional) true or false; overlay regression trendline
  - --trendline-stats (optional) true or false; compute and print trendline statistics without image
  - --export-data (optional) file path to write raw data series
  - --export-format (optional) csv, json, or yaml; default inferred from export-data extension
- Behavior
  - Validate that expression and range are provided; on validation failure print error to stderr and exit with code 1
  - Generate data series via parseRange and generateData
  - Render plot using existing plot generator to SVG or PNG buffer
  - Write image to output path or print binary to stdout
  - When export-data is specified, serialize series in requested format and write to file
  - Exit with code 0 on success or non-zero on error

# Implementation
- In src/lib/main.js, update main to detect first argument plot and call new runPlotCli function
- Implement runPlotCli to parse flags using parseArgs, validate inputs, reuse parseRange and generateData, and call generatePlot
- Use sharp or SVG API to produce the requested image buffer
- Handle file writes and stdout accordingly, and set process exit codes

# Testing
- Add unit tests in tests/unit/cli-plot.test.js
  - Test plot subcommand for svg and png output to file and stdout
  - Test error conditions: missing expression, missing range, unsupported format
  - Test export-data flag writes correct csv and json outputs
  - Use vitest command invocation and temporary files for isolation

# Documentation
- Update USAGE.md and README.md to include a CLI plot section
- Document all flags, defaults, and examples without code escape sequences
- Provide sample commands showing image and data export workflows