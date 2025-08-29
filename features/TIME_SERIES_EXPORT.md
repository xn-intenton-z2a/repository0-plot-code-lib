# Overview

Enhance the existing time series CLI command to support both JSON and CSV export formats via a single, structured entrypoint. Users will generate numeric data series from a mathematical expression and range, choose their preferred output format, and direct the result to stdout or a file.

# Behavior

When invoked via the default command:

- Required flags:
  • --expression, -e (string): Formula in the form y=<expression> or <expression>.
  • --range, -r (string): Numeric range in the form x=<start>:<end>:<step>.
- Optional flags:
  • --format, -f (string): Output format, json (default) or csv.
  • --output, -o (string): Path to write results; prints to stdout if omitted.
  • --help, -h: Display usage information and exit code 0.
  • --version, -v: Display the package version and exit code 0.

On success:
- JSON mode outputs a pretty-printed array of { x: number, y: number }.
- CSV mode outputs a header x,y followed by comma-separated data rows.

On validation errors (invalid expression, range syntax, unsupported format, file I/O), exit code 1 and print Error: <message>.

# Implementation

- Update yargs configuration in src/lib/main.js for the default command:
  • Add .option('format', { alias:'f', choices:['json','csv'], default:'json' }).
  • Retain --expression and --range as required options.
  • Add .help() and .version() for built-in flags.
- In the handler:
  1. Strip optional y= prefix and compile expression via mathjs.compile; errors throw 'Invalid expression'.
  2. Parse and validate range string: split x=start:end:step, enforce numeric values, step > 0, start <= end; errors throw 'Invalid range'.
  3. Generate an inclusive series of { x, y } points incremented by step.
  4. Serialize to JSON or CSV:
     - JSON: JSON.stringify(series, null, 2).
     - CSV: join header 'x,y' and rows `${x},${y}`.
  5. Write to the specified file using fs.writeFileSync or log to stdout.
- Export function main({ expression, range, format, output }) that returns the data array or throws.
- CLI entrypoint calls main(), catches exceptions, logs Error: <message>, and uses process.exit codes.

# Tests

Extend tests in tests/unit/plot-generation.test.js to cover:
- JSON stdout and JSON file output via --output.
- CSV stdout (--format csv) and CSV file output.
- Unsupported format errors (exit code 1, stderr mentions valid choices).
- Invalid expression and range errors (exit code 1, stderr contains descriptive error).
- --help and --version flags exit code 0 and show expected usage or version.

# Documentation

- Update USAGE.md under **Time Series Generation** to document the new --format option with examples for both JSON and CSV modes.
- Update README.md under `## Time Series Generation` with usage snippets for JSON, CSV, file output, --help, and --version.