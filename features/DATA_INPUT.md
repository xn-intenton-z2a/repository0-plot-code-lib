# Overview

Add support for importing time series data from external files (JSON or CSV) to generate plots without requiring an expression and range on the command line. This enables users to visualize arbitrary datasets and integrate seamlessly with downstream workflows.

# CLI Integration

- Introduce a new flag --input <file> to specify a path to a JSON or CSV file containing time series data.
- When --input is provided:
  - expression and range flags become optional and ignored.
  - Validate file extension: .json or .csv. Report an error for unsupported formats.
  - Provide an example usage:
    npx repository0-plot-code-lib --input data.json --output plot.svg
    npx repository0-plot-code-lib --input data.csv --format png --output plot.png

# Implementation

- Extend parseArgs in src/lib/main.js to accept input (string) in the args schema.
- In main:
  - If parsed.input exists, read the file from disk with fs.readFileSync.
  - If .json:
    - JSON.parse to obtain an object with xValues (number[]) and yValues (number[]). Validate array lengths match.
  - If .csv:
    - Parse lines by splitting on newlines. Expect header row, e.g., x,y. Use built-in string methods to parse numbers.
    - Convert columns into xValues and yValues arrays. Throw an error on parse failure or mismatched lengths.
  - After data is loaded, reuse generateSVG or format logic (with --format) to produce the plot or raw data output.
  - Honor --format and --output flags as in existing flow.
  - Print clear error messages for file I/O or parsing issues and exit with non-zero status.

# Tests

- Add unit tests in tests/unit/plot-generation.test.js to cover:
  - parseArgs correctly parsing --input alongside other flags.
  - Loading JSON input: create a temporary JSON file with known arrays and verify generateSVG called with correct data.
  - Loading CSV input: create a temporary CSV file, parse it, and verify data arrays.
  - Error handling: unsupported extension, invalid JSON, malformed CSV, mismatched array lengths.
- Ensure the test suite cleans up any temp files and does not interfere with other tests.

# Documentation

- Update README.md and USAGE.md to document the new --input flag, supported formats, examples, and error conditions.
