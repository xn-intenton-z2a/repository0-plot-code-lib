features/TIME_SERIES_IO.md
# features/TIME_SERIES_IO.md
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
features/CLI_PLOT_GENERATION.md
# features/CLI_PLOT_GENERATION.md
# Feature Overview

This feature introduces robust CLI plot generation logic into main.js. It adds support for parsing command line arguments for mathematical expressions and ranges, generating time series data, and rendering plots in SVG and PNG formats.

# Expression and Range Parsing

The CLI accepts an expression option and a range option. The expression is parsed into an abstract syntax tree using an open library parser. The range string supports definitions with min step max syntax separated by commas. The parser validates syntax and produces sample points for each variable.

# Plot Generation Logic

Using the parsed expression and generated data points, the feature computes values for each sample, constructs a time series dataset, and uses a plotting library to render output as SVG or PNG files. The output is saved to a specified file path based on user input.

# Unit Tests

Add tests in tests/unit/plot-generation.test.js to validate expression parsing, range generation, error handling for invalid inputs, and correct data point computation. Tests use vitest and cover edge conditions such as zero or negative step values.

# Documentation Updates

Update USAGE.md with CLI usage examples showing expression and range options and sample commands. Update README.md to include quick start instructions for the new CLI options.