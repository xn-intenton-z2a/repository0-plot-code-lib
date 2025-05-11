# Overview

Implement generation of time series data points from a parsed mathematical expression and specified axis ranges. This feature transforms user inputs into a structured array of numerical samples suitable for downstream plotting or export.

# Data Generation

- Use a lightweight expression evaluation library (for example mathjs or expr-eval) to compile the provided expression into a callable function.
- For a single-axis expression y = f(x):
  1. Determine x-min and x-max from the parsed range object.
  2. Compute an evenly spaced array of x values of length `points`.
  3. Evaluate f(x) for each value to produce an array of { x, y } pairs.
- For multi-axis expressions (for example z = f(x, y)):
  1. Determine ranges for each axis from the parsed range specification.
  2. Generate a grid of evenly spaced samples across each axis.
  3. Evaluate f(...) at each sample point to produce an array of coordinate objects.

# API and Integration

- Export a function `generateSeries(options)` that accepts:
  - expressionFn: the compiled expression function
  - ranges: object mapping axis names to [min, max]
  - points: number of samples per axis
- The function returns an array of point objects.
- Integrate `generateSeries` into `main` so that after parsing and validation, `generateSeries` is invoked to produce raw data.

# Tests

- Add unit tests to verify series length matches `points` setting for single-axis cases.
- Test correct value generation for a known expression such as y = x * 2 over a simple range.
- Add edge case tests: zero-length range, negative ranges, and malformed expression errors.

# Documentation

- Update USAGE.md and README.md to include an example of invoking the CLI to generate raw series output.
- Document the shape of the returned data structure and available options.
