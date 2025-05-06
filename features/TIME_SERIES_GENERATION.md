# Overview
Implement the core time series generation capability by parsing the validated expression and range and producing a set of (x, y) data points for plotting or further processing.

# Implementation

1. Add a dependency on expr-eval in package.json.

2. Update src/lib/main.js:
   - Import the Parser class from expr-eval.
   - Change main to accept a config object with properties: expression (string), range (string in format "x=min:max,y=min:max"), file (string), format (string).
   - Parse the range string into a numeric range object:
     • Split on comma to separate variable ranges.
     • For each part, split on '=' to get the variable name and a min:max string.
     • Split min:max on ':' and coerce to numbers.
     • Build an object of the form { x: { min, max }, y: { min, max } }.
   - Use the Parser to parse the expression string into an AST once.
   - Sample N=100 points evenly between x.min and x.max (inclusive). Compute step = (x.max - x.min) / (N - 1).
   - For each sample index i from 0 to N-1, compute x = x.min + step * i, then evaluate y = ast.evaluate({ x }).
   - Collect an array of objects [ { x, y }, … ].
   - Return or console.log the resulting array so downstream plotting or IO can consume it.

3. Update USAGE.md and README.md:
   - Document programmatic use:
     • Example import and invocation of main to obtain data points.
     • CLI example showing JSON output of time series before plotting.

# Testing and Documentation

- Write unit tests in tests/unit/plot-generation.test.js:
  • Test a simple linear expression (for example y=2*x) and a known range (0 to 10) and assert endpoints and midpoint values.
  • Test a nonlinear expression (for example y=x*x) and assert the first, middle, and last points.
  • Ensure errors are thrown for invalid range formats.

- Ensure that npm test runs these tests and that README and USAGE.md examples are accurate.