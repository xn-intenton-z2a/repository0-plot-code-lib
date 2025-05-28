# Overview

Extend the existing time series CLI to support both JSON and CSV export formats via a single, structured interface. Users can generate numeric data series from a mathematical expression and a range, choose their preferred export format, and direct the result to stdout or a file.

# Behavior

When invoked via the CLI:

- Required flags:
  - --expression, -e: Formula in the form y=<expression> or <expression>.
  - --range, -r: Numeric range in the form x=<start>:<end>:<step>.
- Optional flags:
  - --format, -f: Output format: json (default) or csv.
  - --output, -o: File path to write output; prints to stdout if omitted.
  - --help, -h: Display usage information and exit code 0.
  - --version, -v: Display the package version and exit code 0.

# Implementation

- Add dependencies in package.json: yargs for CLI parsing and mathjs for expression evaluation.
- In src/lib/main.js:
  1. Configure yargs with required options (expression, range), optional flags (format, output), and built-in .help() and .version().
  2. Export a programmatic main({ expression, range, format, output }) function that:
     - Strips optional y= prefix and compiles the expression via mathjs.compile.
     - Parses and validates the range string; enforces step > 0 and start <= end.
     - Generates an inclusive series of { x, y } points.
     - Serializes data to JSON or CSV based on format:
       - JSON: JSON.stringify(series, null, 2).
       - CSV: header x,y plus comma-separated rows for each point.
     - Writes output to the specified file with fs.writeFileSync or prints to stdout.
  3. CLI entrypoint invokes main(), catches exceptions, prints errors to stderr, and uses process.exit codes (0 success, 1 failure).

# Tests

Extend tests/unit/plot-generation.test.js to cover:
- Default JSON output to stdout and file writing via --output.
- CSV output to stdout (--format csv) and file writing via --output.
- Errors on unsupported format values, invalid expression, and invalid range.
- Help (--help) and version (--version) flags exit 0 and display expected text.

# Documentation

- Update USAGE.md under **Time Series Generation** to document --format and examples for JSON and CSV modes.
- Update README.md under ## Time Series Generation with usage snippets for JSON, CSV, file output, help, and version commands.