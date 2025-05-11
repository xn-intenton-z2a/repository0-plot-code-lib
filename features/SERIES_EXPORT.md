# Overview

Implement data generation and export capabilities to transform parsed mathematical expressions into time series arrays and serialize them in JSON or CSV formats for output to stdout or files.

# Dependencies

Add a lightweight expression evaluator to compile and run mathematical formulas:
- expr-eval: to parse and evaluate expressions

# Implementation

1. Install expr-eval in package.json dependencies.
2. In src/lib/main.js, after validating CLI options, import { Parser } from expr-eval.
3. Compile the expression string into a function using Parser.parse(expression).toJSFunction('x', ...axes).
4. Generate a series of data points:
   - For each axis, compute an evenly spaced array of values based on range and points.
   - Evaluate the parsed function at each sample point to produce an array of objects mapping axis names to values and the result.
5. Serialize the resulting array:
   - JSON: format with indentation for readability.
   - CSV: produce a header row of column names followed by rows of comma-separated values.
6. Write the serialized output to stdout or to the file path specified by the --output flag.

# CLI Integration

- After parsing and validating flags, compile the user expression.
- Invoke generateSeries to create raw data points.
- Choose serializer based on the format flag.
- Write the serialized data to destination.
- On serialization or write errors, display a clear error and exit with code 1.

# Tests

- Unit tests for generateSeries:
  - Confirm correct series length and values for simple expressions (e.g., y=x*2).
  - Test multi-axis generation producing expected grid sizes.
- Tests for serialization:
  - Verify JSON.stringify output matches series structure.
  - Verify CSV output has correct headers and rows for sample series.
- Integration tests:
  - CLI invocation with --format json outputs valid JSON.
  - CLI invocation with --format csv outputs well-formed CSV.

# Documentation

- Update README.md and USAGE.md to show example commands and resulting JSON and CSV outputs.
