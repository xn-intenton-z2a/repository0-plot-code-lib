# Overview

Enhance the existing CLI to provide structured parsing with yargs, built-in help and version flags, and flexible export formats for time series data. Users can generate numeric series from a mathematical expression and range, choose JSON or CSV output, and direct the result to stdout or a file.

# Behavior

When invoked via the CLI:

- Required flags:
  - --expression, -e: Formula in the form y=<expression> or <expression>.
  - --range, -r: Numeric range in the form x=<start>:<end>:<step>.
- Optional flags:
  - --format, -f: Output format, `json` (default) or `csv`.
  - --output, -o: File path to write the output; if omitted, prints to stdout.
  - --help, -h: Display usage information and exit code 0.
  - --version, -v: Display package version and exit code 0.

# Implementation

- Add `yargs` and `mathjs` to dependencies in `package.json`.
- In `src/lib/main.js`:
  1. Configure yargs with required options: `expression`, `range`; optional: `format`, `output`; plus `.help()` and `.version()`.
  2. Export `main({ expression, range, format, output })`:
     - Strip `y=` prefix and compile the expression via `mathjs.compile`.
     - Parse and validate the range string; enforce `step > 0` and `start <= end`.
     - Generate a series of `{ x, y }` points inclusive of end.
     - Serialize to JSON or CSV based on `--format`:
       - JSON: `JSON.stringify(series, null, 2)`.
       - CSV: header `x,y` plus data rows.
     - Write output to file or stdout using `fs.writeFileSync` or `console.log`.
  3. CLI entrypoint calls `main()`, handles errors to stderr, and uses `process.exit` codes.

# Tests

Extend `tests/unit/plot-generation.test.js` to cover:
- JSON stdout and file writing.
- CSV stdout and file writing.
- Error on unsupported `--format` values.
- Error on invalid expression or range syntax.
- Help and version flags exit code 0 and expected output.

# Documentation

- Update `USAGE.md` under **Time Series Generation** to document `--format` and examples for JSON and CSV.
- Update `README.md` under `## Time Series Generation` with usage snippets for JSON, CSV, file output, help, and version.