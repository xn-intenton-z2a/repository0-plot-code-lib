# Overview

Enable the CLI to parse a mathematical expression and numeric range, sample the expression over the range, generate a time series data set, and render it as an SVG or PNG plot file.

# CLI Options

- --expression, -e  : A valid mathematical formula in terms of x (for example, sin(x), x^2+1).
- --range, -r       : One or two comma-separated axis ranges using a colon syntax (for example, x=-10:10 or x=-10:10,y=-1:1).
- --format, -f      : The output image format, either svg or png. Default: svg.
- --output, -o      : The path to write the generated image. Default: plot.svg in the working directory.

# Implementation

1. Validate and coerce CLI arguments with Zod to ensure correct expression syntax, numeric ranges, and image format.
2. Use a mathematical parser library to compile the expression into a function of x.
3. Sample the function at a configurable resolution over the specified x range (and y range if provided) to produce a set of (x, y) points.
4. Use an SVG or Canvas plotting library to draw axes, gridlines, and the data series, and export to the requested file format.
5. Ensure the command exits with code 0 on success and nonzero on failure, logging clear error messages for invalid input or file write errors.

# Testing and Documentation

- Add unit tests for CLI argument validation, expression sampling logic, and a stubbed plot export to confirm that files are written correctly.
- Update USAGE.md and README.md to include examples of expression, range, and output usage.
