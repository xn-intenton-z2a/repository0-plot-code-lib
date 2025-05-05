# Overview

Enable the CLI to parse a mathematical expression and numeric range, sample the expression at a user-configurable number of points, generate time-series data, support raw data export (CSV or JSON) and render plots in SVG or PNG formats.

# CLI Options

- --expression, -e    : A mathematical formula in terms of x (e.g., sin(x) or x^2+1)
- --range, -r         : One or two comma-separated axis ranges using colon syntax (e.g., x=-10:10 or x=-10:10,y=-1:1)
- --samples, -n       : Number of sample points to generate. Must be integer greater than 1. Default: 100
- --export, -x        : Export format for raw data, either csv or json. Default: omitted (plot generation)
- --format, -f        : Output image format for plots, either svg or png. Default: svg
- --output, -o, --file: Path to write the output file. Default: plot.svg for plots, data.csv or data.json for exports
- --help, -h          : Show help and exit

# Implementation

1. Extend Zod schema to validate and default samples, export format, plot format, and output path.  Reject values outside choices or noninteger sample counts.
2. Parse the numeric range string into axis start and end values. Validate two numeric endpoints.
3. Parse and compile the expression, reject any variables besides x.
4. Generate an array of (x, y) points by dividing the range into (samples - 1) intervals and evaluating the function at each x coordinate.  Capture errors during evaluation and report with context.
5. If export option is provided, branch:
   a. For csv: emit header x,y and comma-separated rows for each point.
   b. For json: serialize the points array with x and y properties, formatted for readability.
   Write content to file or stdout when output is '-'.
6. If export option is omitted, generate a plot:
   a. Use a lightweight SVG or Canvas library to draw axes, gridlines, and data series based on the sampled points.
   b. Support both svg and png output formats via the chosen library.
   c. Write the image to the specified output path.
7. Ensure both export and plot paths use the same sample count for consistency.
8. Maintain backward compatibility: default samples to 100, default format to svg, default export to none.
9. Exit with code 0 on success, nonzero on validation, evaluation, file, or rendering errors.

# Testing and Documentation

- Add or update unit tests to cover:
  • Validation of --samples when omitted, noninteger, or out of range
  • Default sampling count when --samples is omitted
  • Custom sampling count results in correct number of points in CSV, JSON, and plot routines
  • CSV serialization including header and correct line count
  • JSON serialization structure and length
  • Plot generation calls into the rendering library for both svg and png
  • File writes and stdout writes for both export and plot paths
  • Error handling for invalid expressions, ranges, and rendering failures
- Stub file writes and rendering library in tests to verify correct parameters and flow
- Update USAGE.md and README.md with examples demonstrating --samples, plot generation, and data export in both formats