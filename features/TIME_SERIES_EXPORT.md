# Overview

Enhance the existing CLI to generate numeric time series from a mathematical expression and range, with flexible export to JSON or CSV via a single command. Users can choose the format and output destination without separate subcommands.

# Behavior

When invoked via the CLI:

- Required flags:
  - `--expression, -e`  Formula in form y=<expression> or <expression>.
  - `--range, -r`       Range in form x=<start>:<end>:<step>.
- Optional flags:
  - `--format, -f`      Output format: `json` (default) or `csv`.
  - `--output, -o`      Path to write results; prints to stdout if omitted.
  - `--help, -h`        Show usage information and exit code 0.
  - `--version, -v`     Show package version and exit code 0.

Output:

- **JSON** mode: pretty-printed array of `{ x: number, y: number }`.
- **CSV** mode: first line header `x,y`, then one comma-separated row per point.

Validation errors (invalid expression, invalid range format, unsupported format) exit with code 1 and print `Error: <message>` to stderr.

# Implementation

- Add dependencies in `package.json`: `yargs` for CLI parsing and `mathjs` for expression parsing.
- In `src/lib/main.js`:
  1. Configure yargs with required options (`expression`, `range`), optional (`format`, `output`), plus `.help()` and `.version()`.
  2. Export a programmatic `main({ expression, range, format, output })` function that:
     - Strips optional `y=` prefix and compiles the expression with `mathjs.compile`.
     - Parses and validates the range string (`x=<start>:<end>:<step>`), enforces `step>0` and `start<=end`.
     - Generates an inclusive series of `{ x, y }` points.
     - Serializes the series to JSON or CSV based on `format`.
     - Writes to the specified file or stdout using `fs.writeFileSync` or `console.log`.
  3. CLI entrypoint invokes `main()`, catches exceptions, prints errors, and exits with appropriate codes.

# Tests

Extend `tests/unit/plot-generation.test.js` to cover:

- Default JSON stdout and file writing with `--output`.
- CSV stdout (`--format csv`) and file writing.
- Error on unsupported format values.
- Error on invalid expression or range.
- Help (`--help`) and version (`--version`) flags exit 0 with expected output.

# Documentation

- Update `USAGE.md` under **Time Series Generation** to document `--format` option and show JSON and CSV examples.
- Update `README.md` under `## Time Series Generation` with usage snippets for JSON, CSV, file output, help, and version commands.