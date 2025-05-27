# Overview

Enhance the CLI to support both JSON and CSV export formats for time series generation, with a structured interface, built-in help, and version flags. Users can generate numeric data series from a mathematical expression and range, choose their preferred export format, and direct the result to stdout or a file.

# Behavior

When invoked via the CLI:

- Required flags:
  - `--expression` or `-e`: A formula in the form y=<expression> or <expression>.
  - `--range` or `-r`: A numeric range in the form x=<start>:<end>:<step>.
- Optional flags:
  - `--format` or `-f`: Output format, `json` (default) or `csv`.
  - `--output` or `-o`: File path to write output; prints to stdout if omitted.
  - `--help` or `-h`: Display help information and exit code 0.
  - `--version` or `-v`: Display package version and exit code 0.

Validation errors (invalid expression, range, or format) exit with code 1 and print a descriptive message to stderr.

# Implementation

- Add dependencies in `package.json`:
  - `yargs` for CLI parsing.
  - `mathjs` for expression parsing and evaluation.
- In `src/lib/main.js`:
  1. Configure yargs with required options: `expression`, `range`, optional `format`, `output`, and built-in `.help()` and `.version()`.
  2. Export a programmatic function `main({ expression, range, format, output })`:
     - Strip optional `y=` prefix and compile the expression using `mathjs.compile`.
     - Parse and validate the range string, enforcing step > 0 and start <= end.
     - Generate an inclusive series of `{ x, y }` points.
     - Serialize the series to JSON or CSV based on the `format` flag:
       - JSON: `JSON.stringify(series, null, 2)`.
       - CSV: Header `x,y` plus lines for each data point.
     - Write the result to `output` file via `fs.writeFileSync`, or to stdout if omitted.
  3. The CLI entrypoint calls this function, handles errors with process exit codes, and prints messages.

# Tests

Extend `tests/unit/plot-generation.test.js` to cover:

- Default JSON output to stdout and file writing via `--output`.
- CSV output to stdout (`--format csv`) and file writing.
- Error on unsupported `--format` values (exit 1, yargs message).
- Errors on invalid expression or range (exit 1, descriptive message).
- Help and version flags: exit code 0 and expected output.

# Documentation

- Update `USAGE.md` under **Time Series Generation**:
  - Document the `--format` option and show examples for JSON and CSV.
  - Include help and version usage.
- Update `README.md` under `## Time Series Generation` with usage snippets for JSON, CSV, file output, help, and version commands.
