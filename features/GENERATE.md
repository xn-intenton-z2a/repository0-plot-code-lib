# Overview

Provide a dedicated `generate` subcommand for the CLI that focuses solely on time series data generation. This separates data generation from plotting, improving discoverability and maintainability.

# Behavior

When invoked as `repository0-plot-code-lib generate`:

- Required flags:
  • `--expression`, `-e`: formula in `y=<expression>` or `<expression>` form.
  • `--range`, `-r`: numeric range in `x=<start>:<end>:<step>` form.
- Optional flags:
  • `--format`, `-f`: output format, `json` (default) or `csv`.
  • `--output`, `-o`: file path to write output; prints to stdout if omitted.
  • `--help`, `-h`: display usage and exit code 0.
  • `--version`, `-v`: display version and exit code 0.

On execution:
1. Strip an optional `y=` prefix and compile the expression via mathjs. On compile failure, exit with code 1 and print `Error: Invalid expression`.
2. Parse and validate the range string, enforcing `step > 0` and `start ≤ end`. On failure, exit with code 1 and print `Error: Invalid range`.
3. Generate an inclusive series of `{ x, y }` points from start to end by step.
4. Serialize the series:
   - JSON: `JSON.stringify(series, null, 2)`.
   - CSV: header `x,y` followed by comma-separated rows.
5. Write serialized data to the specified file (fs.writeFileSync) or stdout.
6. Exit code 0 on success.

# Implementation

Use `yargs.command('generate', …)` in `src/lib/main.js` to define the subcommand. Move existing time series logic into the `generate` handler. Retain `main(options)` for programmatic use.