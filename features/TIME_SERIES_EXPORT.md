# Overview

Extend the existing time series CLI entrypoint to support both JSON and CSV export formats using a single structured interface. Users can generate numeric data series from a mathematical expression and range, choose an output format, and direct the result to stdout or a file.

# Behavior

- Required options:
  - `--expression, -e`: A formula in the form `y=<expression>` or `<expression>`.
  - `--range, -r`: A numeric range in the form `x=<start>:<end>:<step>`.
- Optional options:
  - `--format, -f`: Output format, `json` (default) or `csv`.
  - `--output, -o`: Path to write output; if omitted, prints to stdout.
  - `--help, -h`: Display usage information and exit code 0.
  - `--version, -v`: Display package version and exit code 0.

# Implementation

1. Add dependencies in `package.json`: `yargs` for CLI parsing, `mathjs` for expression parsing.
2. In `src/lib/main.js`:
   - Use yargs to configure required options: `expression`, `range`; optional: `format`, `output`; plus `.help()` and `.version()`.
   - Export a programmatic `main({ expression, range, format, output })` function that:
     1. Strips optional `y=` prefix and compiles the expression via `mathjs.compile` (throws on invalid).
     2. Parses and validates the range string (`x=<start>:<end>:<step>`, enforce `step>0` and `start<=end`).
     3. Generates an inclusive series of `{ x, y }` points.
     4. Serializes the series to JSON (`JSON.stringify(series, null, 2)`) or CSV (header `x,y` plus rows).
     5. Writes to the specified file with `fs.writeFileSync` or to stdout.
   - CLI entrypoint invokes `main()`, catches exceptions, prints `Error: <message>` to stderr, and exits with code 0 or 1.
