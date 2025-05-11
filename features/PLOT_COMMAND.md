# Overview
Add a new plot subcommand and library function to render time series data as an SVG plot. This feature fulfills the mission to produce visual output directly from mathematical expressions and ranges.

# Function API
Add function generatePlot(series, options) to src/lib/main.js
- series: an array of objects { x: number, y: number }
- options: object with fields
  - width: number (default 800)
  - height: number (default 600)
  - margin: number (default 40)
  - strokeColor: string (default "#333")
  - format: string "svg" or "png" (default "svg")
- returns: a string containing SVG content when format is svg. If format is png, exit with code 1 and an error message indicating png support is not yet implemented.

# CLI Interface
Extend the CLI entrypoint in src/lib/main.js with a "plot" subcommand
- repository0-plot-code-lib plot --expression <expression> --range <range> [--output <path>] [--format <svg|png>]
- On invocation, parse flags, generate series via generateTimeSeries, call generatePlot, and write the result to the specified output file or stdout
- Support a help flag for the plot subcommand detailing usage and flags

# Input Validation
Use Zod to validate inputs
- expression must be a non-empty string
- range must match existing x=start:end[:step] pattern
- output must be a non-empty string when provided
- format must be either "svg" or "png"
- width, height, margin must be positive numbers when provided
Provide clear error messages and exit with code 1 on invalid input

# Implementation Details
- Import existing generateTimeSeries for expression and range input
- Implement generatePlot below in src/lib/main.js
- For SVG: compute data bounds, map x and y into an SVG viewport, assemble an SVG string with a polyline element for the series
- Use options.width, options.height, options.margin, and options.strokeColor to control the appearance
- If format is png, print an error indicating format not supported and exit code 1

# Testing
Create tests/unit/plot.test.js
- Unit tests for generatePlot with simple two-point series and default options, verifying the returned string contains an <svg> element and correct viewBox
- CLI tests invoking the plot subcommand with expression and range flags and an output file, reading the file to confirm valid SVG content and exit code 0
- Error tests for missing flags and unsupported png format

# Documentation
Update USAGE.md and README.md
- Add a section for the plot subcommand with usage examples for svg output
- Show API example importing generatePlot and generateTimeSeries and saving the SVG string

# Dependencies
No new dependencies required for SVG generation. Future png support may require a canvas library