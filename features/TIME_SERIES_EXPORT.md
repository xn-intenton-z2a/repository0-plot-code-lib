# Overview

Extend the existing time series generation CLI to support both JSON and CSV export formats via a single entrypoint. Users can generate numeric data series from a mathematical expression and range, choose their preferred output format, and direct the result to stdout or a file.

# Behavior

When invoked via the CLI:

- Required flags:
  - --expression, -e : Formula in the form y=<expression> or <expression>.
  - --range, -r      : Numeric range in the form x=<start>:<end>:<step>.
- Optional flags:
  - --format, -f     : Output format, json (default) or csv.
  - --output, -o     : File path to write the output; if omitted, prints to stdout.
  - --help, -h       : Display usage information and exit code 0.
  - --version, -v    : Display the package version and exit code 0.

Validation errors exit with code 1 and print a descriptive message to stderr.

# Implementation

- Add `yargs` and `mathjs` to dependencies in package.json.
- In `src/lib/main.js`:
  - Configure yargs with the required options (expression, range), optional flags (format, output), and built-in help/version.
  - Export a programmatic `main({ expression, range, format, output })` function:
    1. Strip an optional `y=` prefix and compile the expression via mathjs.
    2. Parse and validate the range string (start, end, step) enforcing `step > 0` and `start <= end`.
    3. Generate an inclusive series of data points: `{ x, y }`.
    4. Serialize the series to JSON (`JSON.stringify` with indent) or CSV (header `x,y` and rows).
    5. Write the output to the specified file or stdout.
  - CLI entrypoint calls this function and handles process exit codes on success/failure.

# Tests

Extend `tests/unit/plot-generation.test.js` to cover:
- Default JSON output (stdout and file).
- CSV output (stdout and file).
- Errors on unsupported formats, invalid expressions, invalid ranges.
- Help/version flags exit code 0 and expected output.

# Documentation

- Update `USAGE.md` under **Time Series Generation** to document the `--format` option and examples for JSON and CSV.
- Update `README.md` under `## Time Series Generation` with snippets for JSON, CSV, file output, help, and version commands.