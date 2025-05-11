# Overview

Add support for generating time series data from a mathematical expression and numeric range. This feature will parse a simple expression syntax, sample across the specified range at a uniform interval, and produce an array of points to be consumed by downstream plotting or export logic.

# Implementation Details

- Add mathjs as a dependency to parse and evaluate mathematical expressions safely.
- Implement a parseRange function in src/lib/main.js to accept range strings in the form "variable=min:max[:step]" and return an object with numeric min, max, and step values. If step is omitted, default to 100 samples evenly spaced across the range.
- Implement generateTimeSeries(expression, rangeObj) in src/lib/main.js:
  1. Use mathjs to compile the expression (e.g., "y=sin(x)") and extract the right-hand side function.
  2. Generate an array of x values from min to max using step or default sample count.
  3. Evaluate the compiled expression for each x, producing an array of {x, y} objects.
- Integrate with main(args): after parsing CLI flags, if both expression and range are provided, call generateTimeSeries and pass the resulting data array to the plotting pipeline or console output.
- Export parseRange and generateTimeSeries from the module for library consumers and testing.

# Testing Requirements

- Create tests in tests/unit/time-series.test.js:
  - Test parseRange with valid inputs (including optional step) and invalid syntax scenarios to ensure zod validation or manual checks catch errors.
  - Test generateTimeSeries for simple expressions such as "y=2*x", verifying correct output length and value pairs.
  - Achieve 100% coverage for error handling and normal branches in both parseRange and generateTimeSeries.

# Documentation

- Update README.md to include a new section titled Time Series Generation with usage examples:
  - Inline API: import { generateTimeSeries } from the library and call it with a sample expression and range.
  - CLI: provide an example calling repository0-plot-code-lib --expression "y=sin(x)" --range "x=0:6.28:0.1" and illustrate the JSON or CSV output of the time series.
