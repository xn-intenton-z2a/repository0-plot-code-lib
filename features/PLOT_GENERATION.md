# Overview

Implement the core pipeline for parsing a mathematical expression and numeric range, generating a time series, and exporting the data as JSON or writing it to a file. This feature enables users to transform a simple single-variable formula into a structured array of data points via the CLI.

# Expression and Range Parsing

Define parseExpression(expressionString) and parseRange(rangeString) functions in src/lib/main.js. Use a lightweight parsing library such as expr-eval or a custom parser for arithmetic expressions with one variable. Validate expression syntax and range format of the form x=start:end:step. Use zod to enforce that start, end, and step are valid numbers and that step is nonzero.

# Time Series Generation

Implement generateTimeSeries(expressionAst, variableName, start, end, step) that iterates from start to end exclusive or inclusive based on rounding, computes y for each x, and returns an array of objects with keys x and y. Handle floating point accumulation safely.

# CLI Integration in main.js

Extend the main function to accept flags --expression, --range, and optional --output. Parse process.argv using minimist or yargs, invoke parsing and generation functions, and by default write JSON to stdout. If --output is provided, write JSON to the specified file path using fs. Exit with code 0 on success, nonzero on validation or I/O errors.

# README Updates

Update README.md to document the new CLI flags, usage examples, and output behavior. Include example commands and expected JSON output structure.

# Tests

Add unit tests in tests/unit/plot-generation.test.js for:

- Valid and invalid expression strings
- Valid and invalid range strings including zero or negative steps
- Correct time series data for known expressions like x^2 or sin(x)
- CLI integration tests invoking main with stubbed process.argv and mocking fs writes

Ensure coverage of edge cases and proper exit codes.