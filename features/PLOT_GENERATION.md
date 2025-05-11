# Overview
This feature implements core plot generation: it parses mathematical expressions and numeric ranges, generates time series data points, and renders the data as SVG or PNG files.

# Input Parsing
CLI accepts parameters:
--expression <expression> where <expression> is a JavaScript-like formula in x, for example y=sin(x)+0.5*x
--range <axis>=min:max,... to define numeric ranges on each axis
--output <path> to specify output file path
--format svg|png to choose output format

# Data Generation
Generate a uniform sequence of x values within the specified range at a default resolution or user-specified sample count.
Evaluate the expression for each x to produce (x,y) pairs.

# Output Rendering
Use an SVG template to draw axes and a polyline of the data points.
If png is requested, convert the generated SVG to PNG using the sharp library.
Write the resulting file to disk at the specified output path.

# CLI Integration
Extend main(args) in src/lib/main.js to parse named flags, validate inputs, invoke parsing, data generation, and rendering.
Provide helpful error messages and a help option.

# Testing
Add unit tests in tests/unit/plot-generation.test.js to verify parsing, data generation correctness for simple expressions and ranges.
Mock file output to assert generation of valid SVG/PNG buffer content.