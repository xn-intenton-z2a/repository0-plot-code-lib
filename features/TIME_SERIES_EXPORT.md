# Overview

Extend the core time series generation command to support both JSON and CSV export directly from the CLI. Users can generate numeric data series from a mathematical expression and range, and choose their preferred export format for easy downstream consumption.

# Behavior

When invoked via the CLI:
- Required flags:
  - --expression, -e: A formula in terms of x, in the form y=<expression> or directly <expression>.
  - --range, -r: A numeric range string in the form x=<start>:<end>:<step> (e.g., x=0:2:0.5).
- Optional flags:
  - --format, -f: Specify output format, either json (default) or csv.
  - --output, -o: Path to write the output; if omitted, prints to stdout.
  - --help, -h: Display usage information and exit.
  - --version, -v: Display the package version and exit.

Output details:
- JSON mode: Pretty-printed array of { x: number, y: number } objects.
- CSV mode: First line header x,y followed by one comma-separated row per data point.

Validation:
- The expression must compile via mathjs; on failure, exit code 1 with an error message.
- The range must start with x= and consist of three numeric parts; enforce step>0 and start<=end.
- On any error, print `Error: <message>` to stderr and exit with code 1.

# Implementation

- Add `yargs` and `mathjs` dependencies in package.json.
- In `src/lib/main.js`:
  - Configure yargs with required `--expression` and `--range`, optional `--format` and `--output`, plus built-in help/version.
  - Strip `y=` prefix, compile the expression, parse and validate the range, generate the series.
  - Serialize to JSON or CSV based on `--format` and write to stdout or the `--output` file.
  - Use process.exit codes for success (0) and failures (1).

# Tests

- Extend `tests/unit/plot-generation.test.js` to cover:
  - Default JSON output to stdout and to a file.
  - CSV output to stdout and to a file.
  - Error on unsupported format values, invalid expressions, and invalid range syntax.

# Documentation

- Update USAGE.md under "Time Series Generation" to document `--format` and examples for both JSON and CSV modes.
- Update README.md under `## Time Series Generation` with usage snippets for JSON, CSV, file output, help, and version commands.