# Overview

Extend the core time series generation CLI with structured parsing and flexible export formats. Users can generate a numeric series from a mathematical expression and a numeric range, and choose to output the data as JSON or CSV via the same entrypoint.

# Behavior

When invoked via the CLI:

- Required options:
  - `--expression, -e`: A formula in the form `y=<expression>` or `<expression>`.
  - `--range, -r`: A numeric range in the form `x=<start>:<end>:<step>`.
- Optional options:
  - `--format, -f`: Output format `json` (default) or `csv`.
  - `--output, -o`: File path to write results; if omitted, prints to stdout.
  - `--help, -h`: Display usage information and exit code 0.
  - `--version, -v`: Display the package version and exit code 0.

Output:

- **JSON**: a pretty-printed array of objects `{ x: number, y: number }`.
- **CSV**: first line header `x,y` followed by one comma-separated row per data point.

Validation Errors:

- Invalid expression or range syntax, unsupported format, or file write failures exit with code 1 and print `Error: <message>` to stderr.

# Implementation

- Use `yargs` to configure the default command with required options (`expression`, `range`), optional `format` and `output`, plus built-in `.help()` and `.version()` flags.
- Export a programmatic function `main({ expression, range, format, output })` returning the data points or throwing an error:
  1. Strip an optional `y=` prefix and compile the expression via `mathjs.compile`.
  2. Parse and validate the range string, enforcing `step > 0` and `start <= end`.
  3. Generate an inclusive series of `{ x, y }` points.
  4. Serialize to JSON or CSV based on `format`.
  5. Write to `output` file via `fs.writeFileSync` or to stdout.
- The CLI entrypoint invokes `main()`, catches exceptions to stderr, and uses `process.exit(0 | 1)` for success or failure.

# Tests

Extend `tests/unit/plot-generation.test.js` to cover:

- JSON stdout and JSON file output using `--output`.
- CSV stdout with `--format csv` and CSV file output.
- Error on unsupported `--format` values (exit 1, yargs choices message).
- Error on invalid expression or range syntax (exit 1, descriptive message).
- Help (`--help`) and version (`--version`) flags exit 0 and show expected output.

# Documentation

- Update **USAGE.md** under _Time Series Generation_ to document the `--format` option and provide JSON and CSV examples.
- Update **README.md** under `## Time Series Generation` with usage snippets for both formats, file output, help, and version commands.