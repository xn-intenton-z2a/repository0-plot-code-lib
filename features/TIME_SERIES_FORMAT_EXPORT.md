# Overview

Extend the default time series generation command to support both JSON and CSV export formats from a single structured CLI entrypoint. Users will generate numeric data series from a mathematical expression and range, choose their preferred format via `--format`, and direct the result to stdout or a file.

# Behavior

- Required flags:
  • `--expression`, `-e` (string): Formula in the form y=<expression> or <expression>.
  • `--range`, `-r` (string): Numeric range in the form x=<start>:<end>:<step>.
- Optional flags:
  • `--format`, `-f` (string): Output format, `json` (default) or `csv`.
  • `--output`, `-o` (string): Path to write the output; prints to stdout if omitted.
  • `--help`, `-h`: Display usage information and exit code 0.
  • `--version`, `-v`: Display the package version and exit code 0.

On execution:
1. Strip an optional `y=` prefix and compile the expression via mathjs; invalid expressions exit code 1 with `Error: Invalid expression`.
2. Parse and validate the range string `x=<start>:<end>:<step>`, enforce `step > 0` and `start <= end`; invalid ranges exit code 1 with `Error: Invalid range`.
3. Generate an inclusive series of `{ x, y }` by stepping from start to end.
4. Serialize the series:
   - JSON: `JSON.stringify(series, null, 2)`.
   - CSV: header `x,y` followed by comma-separated rows.
5. Write the serialized output to the specified file via `fs.writeFileSync` or print to stdout.
6. Exit code 0 on success.

# Implementation

- Update yargs configuration in `src/lib/main.js` for the default command:
  • Add `.option('format', { alias: 'f', choices: ['json','csv'], default: 'json', describe: 'Output format' })`.
- In the time series handler:
  1. Invoke the existing `main({expression, range})` logic to produce an array of `{x,y}`.
  2. Based on the `format` flag, serialize to JSON or build CSV lines with header `x,y` and data rows.
  3. Write to file or stdout.

# Tests

- Extend `tests/unit/plot-generation.test.js` to cover:
  • JSON stdout and file output via `--output`.
  • CSV stdout with `--format csv` and CSV file output via `--output`.
  • Unsupported format (`--format xml`): exit code 1 and stderr shows valid choices.
  • Invalid expression and invalid range error conditions.
  • Help and version flags: exit code 0 and display expected usage or version text.

# Documentation

- Update `USAGE.md` under **Time Series Generation** to document the `--format` option and provide examples for JSON and CSV modes.
- Update `README.md` under `## Time Series Generation` with usage snippets illustrating JSON, CSV, file output, `--help`, and `--version`.
