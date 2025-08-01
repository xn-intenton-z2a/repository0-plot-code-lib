# Overview

Introduce a dedicated `generate` subcommand that isolates time series data generation under a clear command. This refines the CLI interface by splitting data generation (`generate`) from plot rendering (`plot`), improving discoverability and maintainability.

# Behavior

When invoked as:
```
repository0-plot-code-lib generate --expression <expr> --range <range> [--format <json|csv>] [--output <file>]
```

- The CLI accepts:
  • `--expression, -e` (string, required): formula in form `y=<expression>` or `<expression>`.
  • `--range, -r` (string, required): range syntax `x=<start>:<end>:<step>`.
  • `--format, -f` (string, optional): output format `json` (default) or `csv`.
  • `--output, -o` (string, optional): file path to write output; when omitted, data is printed to stdout.
  • `--help, -h`: show help for `generate` subcommand.
  • `--version, -v`: show global version and exit.

- Validation:
  1. Strip optional `y=` prefix and compile the expression via mathjs; compilation errors exit code 1 with `Error: Invalid expression`.
  2. Parse and validate the `x=<start>:<end>:<step>` range; enforce `step > 0` and `start <= end`; failures exit code 1 with `Error: Invalid range`.

- Output:
  • When `--format json`, output the data array `[ { x, y }, … ]` via `JSON.stringify(..., 2)`.
  • When `--format csv`, output lines beginning with header `x,y` and one comma-separated row per point.

- On success, write to file or stdout and exit code 0.
- On any error or missing required flags, show subcommand usage and exit code 1.

# Implementation

- Update `src/lib/main.js` to use `yargs.command('generate', …)` to define the subcommand.
- Move existing time series generation logic into the `generate` handler.
- Retain existing `plot` subcommand unchanged.
- Ensure `main()` programmatic export remains and is invoked by the `generate` handler.

# Tests

- Add `tests/unit/generate-subcommand.test.js` covering:
  • `generate` CLI for JSON stdout and file output.
  • CSV output to stdout and file when `--format csv`.
  • Errors for invalid expression and range.
  • `--help` for `generate` subcommand showing usage and flags.

# Documentation

- In `USAGE.md`, add a new section `## Generate Series` documenting the `generate` command and its flags.
- In `README.md`, under `## Commands`, list the `generate` subcommand with examples.
