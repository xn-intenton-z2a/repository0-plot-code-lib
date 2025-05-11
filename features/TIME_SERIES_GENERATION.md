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