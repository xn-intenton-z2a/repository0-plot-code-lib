# Overview

Enable the CLI to parse a mathematical expression and numeric range, sample the expression at a user-configurable number of points, generate a time series data set, and render it as an SVG or PNG plot file.

# CLI Options

- --expression, -e  : A valid mathematical formula in terms of x (for example, sin(x), x^2+1).
- --range, -r       : One or two comma-separated axis ranges using colon syntax (for example, x=-10:10 or x=-10:10,y=-1:1).
- --format, -f      : The output image format, either svg or png. Default: svg.
- --output, -o      : The path to write the generated image. Default: plot.svg in the working directory.
- --samples, -n     : The number of sample points to generate when evaluating the expression. Must be a positive integer. Default: 100.

# Implementation

1. Extend the existing Zod schema to validate the samples option as an integer greater than one, with a default value of 100.
2. After parsing and compiling the expression, use the samples value instead of a fixed count when generating the array of (x, y) points.
3. Ensure the sampling algorithm divides the range into (samples - 1) intervals and evaluates the function at each x coordinate.
4. Pass the same samples count through to any export or plotting routines to maintain consistency between CSV/JSON data exports and SVG/PNG plots.
5. Use an SVG or Canvas plotting library to draw axes, gridlines, and data series based on the dynamically generated points, and export to the requested file format.
6. Ensure backward compatibility: if the samples option is omitted, continue to sample at 100 points.
7. Exit with code 0 on success and nonzero on validation, file, or evaluation errors.

# Testing and Documentation

- Add unit tests to cover:
  - Validation of the samples flag (non-integer or out-of-range values).
  - Default sampling count when --samples is omitted.
  - Custom sampling count results in the expected number of plot points and exported data points.
  - Stub file writes or plotting calls to verify correct usage of the samples parameter.
- Update USAGE.md and README.md with examples demonstrating how to use --samples to control resolution for both plotting and data export.