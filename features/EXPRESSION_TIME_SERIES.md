# Overview

This feature extends the CLI entry point to accept a mathematical expression and a numeric range, generate a time series of data points, and optionally persist the result in JSON, JSON Lines, or CSV format.

# CLI Arguments

- Support a flag `--expression` that takes a string defining y as a function of x (for example `sin(x)`).
- Support a flag `--range` that takes a string in the format x=start:end:step (for example `x=-1:1:0.1`).
- Add an optional flag `--output-file` that takes a file path where the time series data will be written.
- Extend the flag `--output-format` to accept values `json`, `jsonl`, or `csv`, defaulting to `json`.
- Validate that when `--output-file` is provided, `--output-format` is one of the supported values.

# Time Series Generation

- Parse the `--range` parameter into numeric start, end, and step values.
- Use mathjs to parse, compile, and evaluate the expression for each x value in the range.
- Collect an array of objects `{ x, y }` representing the series.

# Persistence

- If `--output-file` is provided:
  - For format `json`, write the entire array as a JSON string to the specified file.
  - For format `jsonl`, write each data point as a JSON value on its own line following the JSON Lines standard.
  - For format `csv`, write a header row `x,y`, followed by each data point as comma-separated values, ensuring UTF-8 encoding.
  - Ensure CSV output uses LF line endings and properly escapes values if needed.

# Testing

- Add unit tests for the persistence utility to verify correct output in JSON, JSON Lines, and CSV formats.
- Add CLI integration tests by simulating process arguments with `--expression`, `--range`, `--output-file`, and `--output-format csv`, then asserting that the output file exists and its contents match the expected CSV structure.

# Documentation

- Update README.md to include example commands for writing time series data to `output.csv` using the `--output-format csv` flag.
- Update USAGE.md to include a CSV persistence section with sample output and notes on interoperability with spreadsheet tools and data pipelines.