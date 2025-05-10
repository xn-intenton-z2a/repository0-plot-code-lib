# Feature Overview
This feature introduces import and export capabilities for time series data in standard formats to the existing CLI tool.

# Input and Output Formats
The feature supports two common formats:

- JSON: Standard time series JSON with arrays of {x, y} points.
- CSV: Comma separated values with header row "x,y".

When exporting, the format is inferred from the file extension. When importing, it is detected by extension.

# CLI Options

- --export-data <file path>
  Writes the generated time series data to the specified file. JSON or CSV output is chosen by extension.

- --input-data <file path>
  Reads time series data from an existing JSON or CSV file instead of generating data from an expression and range.

# Unit Tests

Create tests in tests/unit/time-series-io.test.js to cover:

- Exporting generated series to JSON and CSV and verifying file contents.
- Importing valid JSON and CSV files and asserting that subsequent plot generation uses the imported data.
- Error handling for unsupported formats and malformed files.

# Documentation Updates

- Update USAGE.md with examples of using --export-data and --input-data options.
- Add usage snippets in README.md demonstrating both import and export workflows.
