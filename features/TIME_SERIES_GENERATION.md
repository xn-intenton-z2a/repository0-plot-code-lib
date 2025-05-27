# Overview

Extend the time series generation command to support multiple expressions and ranges in a single invocation, along with JSON and CSV export formats. Users can generate and compare multiple data series side by side, labeled for clarity.

# Behavior

- Accept multiple `--expression` or `-e` flags and matching multiple `--range` or `-r` flags. Each expression-range pair produces a separate series. The number of expressions must match the number of ranges.
- Optionally accept a `--label` or `-l` flag repeated to assign human-readable labels to each series; if omitted, use the raw expression as its label.
- Preserve the existing `--format` or `-f` flag with values `json` or `csv`; default is `json`.
- When `format=json`, output an array of objects: each object has `label` (string) and `data` (array of `{ x:number, y:number }`).
- When `format=csv`, output rows labeled per series. The first line is a header: `label,x,y`. Each subsequent line represents a data point with its series label.
- The `--output` or `-o` flag continues to specify an output file path; if omitted, print to stdout.
- Validation errors (mismatched counts, invalid expressions or ranges, write failures) exit with code 1 and a descriptive message on stderr.

# Implementation

- Update yargs configuration:
  - Define `expression` and `range` options as arrays.
  - Define `label` option as an optional array.
  - Define `format` with choices `json` and `csv`.
- In the handler:
  1. Ensure the same count of `expression` and `range` flags.
  2. For each pair, generate its series of `{ x, y }` using the existing logic.
  3. Assign labels from `--label` or default to the expression string.
  4. Serialize output:
     - For JSON: build an array of `{ label, data }` and JSON.stringify with 2-space indentation.
     - For CSV: build a string starting with `label,x,y` header and one line per data point prefixed by its label.
  5. Write to file or stdout.

# Tests

- Add unit tests to cover:
  - Single-series JSON and CSV output remain unchanged.
  - Multiple-series invocation: matching counts of expressions and ranges produce the expected JSON structure and CSV rows.
  - Labels assignment: custom labels appear in JSON objects and CSV header rows.
  - Error cases: mismatched counts, invalid ranges or expressions, and file write errors.

# Documentation

- Update USAGE.md under “Time Series Generation”:
  - Document the repeatable `--expression`, `--range`, and optional `--label` flags.
  - Provide JSON and CSV examples for single and multiple series.
- Update README.md under `## Time Series Generation` accordingly.