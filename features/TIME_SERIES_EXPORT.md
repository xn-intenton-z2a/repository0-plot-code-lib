# Overview

Extend the core time series generation CLI to support both JSON and CSV output formats through a single, structured interface. Users will generate numeric data series from a mathematical expression and a range, select their preferred export format, and direct the result to stdout or a file.

# Behavior

When invoked via the CLI:

- Required flags:
  - `--expression, -e`: A formula in the form y=<expression> or <expression>.
  - `--range, -r`: A numeric range in the form x=<start>:<end>:<step>.
- Optional flags:
  - `--format, -f`: Output format, `json` (default) or `csv`.
  - `--output, -o`: File path to write the output; if omitted, prints to stdout.
  - `--help, -h`: Display usage information and exit code 0.
  - `--version, -v`: Display the package version and exit code 0.

Output:

- **JSON** mode: Pretty-printed array of `{ x: number, y: number }`.
- **CSV** mode: First line header `x,y`, then comma-separated rows for each point.

Validation errors (invalid expression, range format, unsupported format) exit code 1 with descriptive message.

# Implementation

- Use `yargs` to configure CLI flags (`expression`, `range`, `format`, `output`, help, version).
- Export a programmatic function `main({ expression, range, format, output })` that:
  1. Strips optional `y=` prefix and compiles the formula via `mathjs.compile`.
  2. Parses and validates the range string (`x=<start>:<end>:<step>`), enforcing `step>0` and `start<=end`.
  3. Generates an inclusive series of `{ x, y }` data points.
  4. Serializes the series based on `format`:
     - JSON: `JSON.stringify(series, null, 2)`.
     - CSV: header `x,y` followed by data rows.
  5. Writes the result to the specified file via `fs.writeFileSync` or prints to stdout.
- CLI entrypoint invokes `main()`, catches exceptions, prints to stderr, and sets exit codes (0 success, 1 failure).
