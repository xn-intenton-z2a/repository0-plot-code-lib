# Overview

Introduce a dedicated `generate` subcommand that isolates time series data generation under a clear command. This subcommand refines the CLI interface by separating data generation from plotting, improving discoverability and ease of extension.

# Behavior

When invoked as:

    repository0-plot-code-lib generate --expression <expr> --range <range> [--format <json|csv>] [--output <file>]

- Required flags:
  • `--expression, -e` (string): Formula in the form `y=<expression>` or `<expression>`.
  • `--range, -r` (string): Numeric range in the form `x=<start>:<end>:<step>`.
- Optional flags:
  • `--format, -f` (string): Output format, `json` (default) or `csv`.
  • `--output, -o` (string): File path to write the output; if omitted, prints to stdout.
  • `--help, -h`: Show help and exit code 0.
  • `--version, -v`: Show version and exit code 0.

# Implementation

- Add a `generate` command via `yargs.command('generate', ...)` in `src/lib/main.js`.
- Move series generation logic into the `generate` handler:
  1. Strip an optional `y=` prefix and compile the expression via `mathjs.compile`; invalid expressions exit code 1 with `Error: Invalid expression`.
  2. Parse and validate the range string `x=<start>:<end>:<step>`, enforcing step > 0 and start ≤ end; invalid ranges exit code 1 with `Error: Invalid range`.
  3. Generate an inclusive series of `{ x, y }` points by stepping from start to end.
  4. Serialize the series based on `--format`: JSON (`JSON.stringify(series, null, 2)`) or CSV (header `x,y` plus comma-separated rows).
  5. Write to the specified file via `fs.writeFileSync` or print to stdout.
  6. Exit code 0 on success.

# Tests

- Add `tests/unit/generate-subcommand.test.js` covering:
  • JSON stdout and file output.
  • CSV stdout and file output.
  • Errors for invalid expression and range.
  • `--help` for the `generate` subcommand displaying usage.
