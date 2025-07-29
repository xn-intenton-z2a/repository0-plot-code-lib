# Overview

Enhance the default time series generation command to support both JSON and CSV export formats and provide clear, discoverable CLI flags using yargs. Users can generate numeric data series from a mathematical expression and numeric range, choose output format, and write results to stdout or a file.

# Behavior

When invoked via the CLI:
- Required flags:
  • --expression, -e (string): Formula in the form y=<expression> or <expression>.
  • --range, -r (string): Numeric range in the form x=<start>:<end>:<step>.
- Optional flags:
  • --format, -f (string): Output format json (default) or csv.
  • --output, -o (string): Path to write the output file; prints to stdout if omitted.
  • --help, -h: Display usage information and exit code 0.
  • --version, -v: Display package version and exit code 0.

Behavior details:
1. Strip optional y= prefix and compile the expression using mathjs; on failure, exit code 1 with "Error: Invalid expression".
2. Parse and validate the range string; enforce step > 0 and start ≤ end; on failure, exit code 1 with "Error: Invalid range".
3. Generate an inclusive series of { x, y } points stepping by the specified value.
4. Serialize the series:
   - JSON: JSON.stringify(series, null, 2).
   - CSV: header x,y followed by comma-separated rows.
5. Write to the specified file via fs.writeFileSync or print to stdout.
6. Exit code 0 on success; exit code 1 on any error with a descriptive message.

# Implementation

- Add dependencies:
  • yargs for CLI parsing.
  • mathjs for expression compilation.
- In src/lib/main.js:
  • Use yargs to configure the default command with options: expression, range, format, output, help, and version flags.
  • Export a programmatic main({ expression, range, format, output }) function that:
    1. Strips y= prefix and compiles expression via mathjs.compile.
    2. Parses and validates the range string.
    3. Generates an inclusive series of data points.
    4. Serializes to JSON or CSV.
    5. Writes output to file or stdout.
  • CLI entrypoint calls main(), catches exceptions, prints error messages, and sets process.exit codes.

# Tests

- Extend tests/unit/plot-generation.test.js to cover:
  • JSON stdout and file output via --output.
  • CSV stdout (--format csv) and file output.
  • Unsupported format values: exit 1, stderr mentions valid choices or "Unsupported format".
  • Invalid expression or range: exit 1, stderr contains descriptive error.
  • Help and version flags: exit 0 and display expected usage or version.