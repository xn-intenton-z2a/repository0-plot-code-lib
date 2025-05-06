# Overview

Implement the core pipeline for parsing a mathematical expression and numeric range, generating a time series, and exporting the data in JSON or NDJSON (newline delimited JSON) formats. This feature enables users to produce structured data points via the CLI for downstream processing or streaming workflows.

# Expression and Range Parsing

Define parseExpression(expressionString) and parseRange(rangeString) in src/lib/main.js. Use a parsing library or custom parser for single-variable arithmetic expressions. Validate syntax and ensure range format x=start:end:step. Use zod to enforce numeric start, end, and nonzero step.

# Time Series Generation

Implement generateTimeSeries(expressionAst, variableName, start, end, step) that iterates from start to end (inclusive or exclusive based on rounding rules), computes y for each x, and yields objects with x and y properties. Handle floating point accumulation safely.

# Output Formats

Support two export modes:

1. JSON: Collect all data points into an array and serialize as a single JSON document.
2. NDJSON: Stream each data point as an individual JSON record separated by newline to stdout or a file. Follow the NDJSON specification with no empty lines and proper UTF-8 handling.

Allow a CLI flag --format with values json (default) or ndjson. When ndjson is chosen use Node fs.createWriteStream for streaming output with proper backpressure handling.

# CLI Integration

Extend main(args) to accept flags:

--expression  the formula to evaluate
--range       the numeric range in x=start:end:step
--output      optional file path (default stdout)
--format      json or ndjson (default json)

Parse arguments with minimist or yargs. Invoke parsing and generation functions. For ndjson mode, write each record as a line. For json mode, write the full array. Exit with code 0 on success, nonzero on validation or I/O errors.

# Tests

Add unit tests in tests/unit/plot-generation.test.js for:

- Valid and invalid expression strings
- Valid and invalid range strings including zero or negative steps
- Correct JSON output for known expressions
- Correct NDJSON streaming behavior: records separated by newline, no trailing newline
- CLI integration tests that stub process.argv and mock fs.write or createWriteStream for both json and ndjson modes

Ensure edge cases and exit codes are covered.