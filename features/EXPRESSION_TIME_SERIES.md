# Overview
This feature extends the CLI entry point to accept a mathematical expression and a numeric range, generate a time series of data points, and optionally persist the result in JSON or JSON Lines format.

# CLI Arguments
- Support a flag `--expression` that takes a string defining y as a function of x (for example `sin(x)`).
- Support a flag `--range` that takes a string in the format x=start:end:step (for example `x=-1:1:0.1`).
- Add an optional flag `--output-file` that takes a file path where the time series data will be written.
- Add an optional flag `--output-format` that takes a value `json` or `jsonl`, defaulting to `json`.
- Validate that when `--output-file` is provided, `--output-format` is one of the supported values.

# Time Series Generation
- Parse the `--range` parameter into numeric start, end, and step values.
- Use mathjs to parse, compile, and evaluate the expression for each x value in the range.
- Collect an array of objects { x, y } representing the series.

# Persistence
- If `--output-file` is provided:
  - For format `json`, write the entire array as a JSON string to the specified file.
  - For format `jsonl`, write each data point as a JSON value on its own line following the JSON Lines standard.
  - Ensure UTF-8 encoding and that each JSON value is trimmed of surrounding whitespace.

# Testing
- Add unit tests for the persistence utility to verify both `json` and `jsonl` outputs produce correct file contents and valid formats.
- Add CLI integration tests by simulating process arguments with expression, range, output-file, and output-format flags, then asserting that the output file exists and its contents match expected structure.

# Documentation
- Update README.md to include example commands for writing time series data to `output.json` and `output.jsonl`.
- Reference the JSON Lines specification and explain its benefits for streaming and pipelining data.

# Dependencies
- No new dependencies; use built-in Node.js file system APIs for writing files.