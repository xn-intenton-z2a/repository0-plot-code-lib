features/STATS_COMMAND.md
# features/STATS_COMMAND.md
# Overview
Implement a new stats subcommand to compute common summary statistics (min, max, mean, median, standard deviation) over numeric datasets.  This complements time series generation by providing quick insights into the distribution of data produced or provided to the library.

# Function API
Add a function computeStats(data, options) to src/lib/main.js
- data: an array of numbers or an array of objects with numeric x and y properties
- options: object with field property indicating which numeric field to summarize ("y" by default)
- returns an object with keys min, max, mean, median, stddev, each a number

# CLI Interface
Extend the CLI entrypoint in src/lib/main.js with a "stats" subcommand
- repository0-plot-code-lib stats --expression <expression> --range <range> [--field <x|y>]
- repository0-plot-code-lib stats --data <path-to-json-file> [--field <x|y>]
- When invoked, parse inputs, generate or load data, run computeStats, and print JSON summary to stdout
- Support a help flag for the stats subcommand detailing usage and flags

# Input Validation
Use Zod to validate inputs
- expression must be non-empty string when provided
- range must match existing x=start:end[:step] pattern when provided
- data path must point to a readable JSON file containing an array
- field must be either "x" or "y"
- Provide clear error messages and exit with code 1 on invalid input

# Implementation Details
- Import existing generateTimeSeries for expression and range input
- For file input, read and parse JSON using fs and validate loaded array
- Extract numeric values for the specified field into a number array
- Use mathjs functions min, max, mean, median, std from the already imported math environment
- Return or log an object { min: number, max: number, mean: number, median: number, stddev: number }

# Testing
Create tests/unit/stats.test.js
- Unit tests for computeStats with pure numeric arrays, object arrays for x and y, and invalid input cases
- CLI tests invoking the stats subcommand with expression/range flags and with a temporary JSON file, verifying exit code and JSON output shape
- Cover error cases: missing flags, invalid JSON file, invalid field

# Documentation
Update README.md and USAGE.md
- Add a section for stats subcommand with usage examples
- Show API example calling computeStats programmatically
- Document shape of returned summary object and common error messages

# Dependencies
- No new dependencies; reuse mathjs for statistics, zod for validation, and fs from Node.jsfeatures/PLOT_COMMAND.md
# features/PLOT_COMMAND.md
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
No new dependencies required for SVG generation. Future png support may require a canvas libraryfeatures/TIME_SERIES_GENERATION.md
# features/TIME_SERIES_GENERATION.md
# Overview
Provide core functionality for parsing a mathematical expression and generating time series data points over a specified range. This establishes the foundation for downstream plotting, format conversion, and persistence capabilities.

# Function API
Add generateTimeSeries(expression, rangeSpec) to src/lib/main.js
- Accept expression as a string in terms of x, for example y = sin(x) or x^2 + 3*x + 2
- Accept rangeSpec in the form x=start:end:step or x=start:end (step defaults to 1)
- Return an array of objects shaped as { x: number, y: number } covering the specified domain

# CLI Interface
Extend the existing CLI entrypoint in src/lib/main.js
- Add flags --expression <expression> and --range <rangeSpec>
- On invocation with both flags, parse inputs, run generateTimeSeries, and print JSON array to stdout
- Support a help flag that shows usage of --expression and --range

# Input Validation
Use Zod to validate inputs
- expression must be non-empty string
- rangeSpec must match the pattern x\u003dstart:end or x\u003dstart:end:step and numeric segments
- Provide clear error messages for invalid inputs

# Implementation Details
- Import mathjs to parse and evaluate the expression safely
- Implement expression compilation once per invocation for performance
- Iterate x from start to end by step, compute y, and collect results
- Handle floating point precision gracefully

# Testing
Update tests/unit/plot-generation.test.js and tests/unit/main.test.js
- Cover linear expressions over simple ranges
- Cover trigonometric expressions with default and explicit step
- Cover invalid expression and malformed range error cases
- Ensure CLI invocation writes valid JSON and exits with code 0 on success

# Documentation
Update README.md and USAGE.md
- Show API usage example for generateTimeSeries with a simple expression and range
- Show CLI invocation examples:
  repository0-plot-code-lib --expression "sin(x)" --range "x=0:6.28:0.1"
- Document return shape and error cases

# Dependencies
- Add mathjs to dependencies for expression parsing and evaluation
- Add zod if not present for input validation