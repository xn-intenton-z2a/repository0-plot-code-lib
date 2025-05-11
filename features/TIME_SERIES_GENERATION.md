# Time Series Generation

## Overview
Provide core functionality for parsing a mathematical expression and generating time series data points over a specified range. This lays the foundation for later plotting and format conversion features.

## Function API
Add a new function generateTimeSeries(expression, rangeSpec) to src/lib/main.js that:
- Parses a simple mathematical expression in terms of x (e.g., y = sin(x), x^2 + 3*x + 2).
- Interprets rangeSpec in the form "x=start:end:step" or "x=start:end" (default step of 1).
- Returns an array of objects with shape { x: number, y: number } covering the specified domain.

## CLI Interface
Extend the existing CLI to accept two new flags:
--expression <string>  The mathematical expression to evaluate.
--range <string>       The range specification for x values.

Behavior:
1. Validate inputs.
2. Generate the time series with generateTimeSeries.
3. Print the resulting array as JSON to stdout.

## Input Validation
Use Zod to define and enforce:
- expression is a non-empty string.
- range follows the allowed pattern and numeric segments.
Provide clear error messages for invalid inputs.

## Testing
- Add unit tests covering:
  - Linear expressions over a simple range.
  - Trigonometric functions with default step.
  - Error cases for malformed range or expression.
- Tests should live in tests/unit/plot-generation.test.js.

## Dependencies
- Introduce a lightweight math parser library (e.g., mathjs) to handle expression parsing and evaluation.

## Documentation
Update README.md and USAGE.md with examples:
- CLI invocation: repository0-plot-code-lib --expression "sin(x)" --range "x=0:6.28:0.1"
- Direct API usage of generateTimeSeries.