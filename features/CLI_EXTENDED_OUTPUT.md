# Overview

Enhance the existing command-line interface to support structured parsing with yargs, built-in help and version flags, and flexible output formats (JSON and CSV) for time series generation. This feature enables users to generate numeric series from mathematical expressions and ranges and export results in their preferred format via a single entrypoint.

# Behavior

When invoked via the CLI:

- Required flags:
  • `--expression, -e` (string): Formula in the form `y=<expression>` or `<expression>`.
  • `--range, -r` (string): Numeric range in the form `x=<start>:<end>:<step>`.
- Optional flags:
  • `--format, -f` (string): Output format, `json` (default) or `csv`.
  • `--output, -o` (string): File path to write the output; if omitted, prints to stdout.
  • `--help, -h`: Display usage information and exit code 0.
  • `--version, -v`: Display the package version and exit code 0.

When executed:
1. Strip optional `y=` prefix and compile the expression using mathjs; an invalid expression terminates with exit code 1 and `Error: Invalid expression`.
2. Parse and validate the range string; enforce three numeric parts, `step > 0`, and `start <= end`; invalid ranges terminate with exit code 1 and `Error: Invalid range`.
3. Generate an inclusive series of `{ x, y }` data points by stepping from start to end.
4. Serialize the data array:
   - JSON mode: `JSON.stringify(series, null, 2)`.
   - CSV mode: header `x,y` followed by comma-separated rows for each point.
5. Write the serialized output to the specified file using `fs.writeFileSync` or print to stdout.
6. Exit code 0 on success.

# Implementation

- Add `yargs` and `mathjs` to `package.json` dependencies.
- In `src/lib/main.js`, configure yargs with the required options, `.help()`, and `.version()` flags.
- Export a programmatic function `main({ expression, range, format, output })` that:
  1. Strips the `y=` prefix and compiles the expression via `mathjs.compile`.
  2. Parses and validates the range string.
  3. Generates the series of `{ x, y }` points.
  4. Serializes the series to JSON or CSV.
  5. Writes to the specified file or stdout.
- The CLI entrypoint invokes this `main` function, catches exceptions, prints `Error: <message>` to stderr, and uses proper exit codes.

# Tests

Add or update tests in `tests/unit/plot-generation.test.js` to cover:
- Default JSON output to stdout and file writing via `--output`.
- CSV output to stdout (`--format csv`) and file writing via `--output`.
- Unsupported `--format` values: exit code 1 and a message listing valid choices.
- Invalid expression: exit code 1 and `Error: Invalid expression`.
- Invalid range syntax: exit code 1 and `Error: Invalid range`.
- Help and version flags: exit code 0 and expected usage or version text in stdout.
