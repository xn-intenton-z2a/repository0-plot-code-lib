# Overview

Extend the existing time series generation command to allow users to choose export format, supporting both JSON and CSV output from a single CLI entrypoint. Users can generate a numeric series from a mathematical expression and range, select their preferred format via a new --format flag, and direct the result to stdout or an output file.

# Behavior

When invoked via the CLI:

- Required flags:
  - --expression, -e (string): Formula in the form y=<expression> or <expression>.
  - --range, -r (string): Numeric range in the form x=<start>:<end>:<step>.
- Optional flags:
  - --format, -f (string): Output format, json (default) or csv.
  - --output, -o (string): Path to write results; prints to stdout if omitted.
  - --help, -h: Display usage information and exit code 0.
  - --version, -v: Display the package version and exit code 0.

Output details:
- JSON mode: Pretty-printed array of { x: number, y: number }.
- CSV mode: First line header x,y followed by comma-separated rows for each data point.

On invalid expression, range, or unsupported format, the process exits with code 1 and prints Error: <message> to stderr. On success, writes or prints output and exits code 0.

# Implementation

- Update yargs configuration in src/lib/main.js to add a --format flag:
  • .option('format', { alias: 'f', choices: ['json', 'csv'], default: 'json', describe: 'Output format: json or csv' })
- In the existing time series handler:
  1. Strip optional y= prefix and compile the expression via mathjs.compile; on failure throw 'Invalid expression'.
  2. Parse and validate the range string x=<start>:<end>:<step>; ensure step > 0 and start <= end; on failure throw 'Invalid range'.
  3. Generate an inclusive series of { x, y } points.
  4. After data generation, inspect the format flag:
     - If 'json', serialize with JSON.stringify(data, null, 2).
     - If 'csv', build lines with header 'x,y' and comma-separated rows 'x,y'.
  5. Write the serialized string to the output file via fs.writeFileSync or console.log to stdout.

# Tests

- Extend tests in tests/unit/plot-generation.test.js to cover:
  • JSON stdout and file output via --output.
  • CSV stdout with --format csv and CSV file output via --output.
  • Exit code 1 and error message for unsupported formats (--format xml).
  • Exit code 1 and error message for invalid expression and invalid range.
  • Help (--help) and version (--version) flags exit 0 and display expected usage or version.

# Documentation

- Update USAGE.md under **Time Series Generation** to document the --format option with examples for both JSON and CSV.
- Update README.md under ## Time Series Generation to include usage snippets for JSON, CSV, file output, --help, and --version.
