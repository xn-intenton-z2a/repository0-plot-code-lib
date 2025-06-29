# Overview

Extend the existing CLI entrypoint to support both JSON and CSV export formats for numeric time series generation from a mathematical expression and a range. This provides flexible output options for downstream data processing without introducing new subcommands.

# Behavior

- Required flags:
  - `--expression, -e` : A formula in the form y=<expression> or <expression>.
  - `--range, -r`      : A numeric range in the form x=<start>:<end>:<step>.
- Optional flags:
  - `--format, -f`     : Output format, `json` (default) or `csv`.
  - `--output, -o`     : File path to write results; prints to stdout if omitted.
  - `--help, -h`       : Display usage information and exit code 0.
  - `--version, -v`    : Display the package version and exit code 0.

When invoked, the command:
1. Strips an optional `y=` prefix and compiles the expression via mathjs. Invalid expressions exit code 1 with `Error: Invalid expression`.
2. Parses and validates the range string `x=<start>:<end>:<step>` enforcing `step > 0` and `start <= end`. Invalid ranges exit code 1 with `Error: Invalid range`.
3. Generates an inclusive series of `{ x, y }` points.
4. Serializes the series:
   - JSON: `JSON.stringify(series, null, 2)`.
   - CSV: header `x,y` plus comma-separated rows per point.
5. Writes the serialized output to the specified file or stdout.
6. Exits with code 0 on success, 1 on failure.
