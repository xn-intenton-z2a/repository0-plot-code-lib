# Overview

Extend the core time series generation CLI to support both JSON and CSV export formats via a single structured entrypoint. Users can generate numeric series from a mathematical expression and range, choose their preferred output format, and direct the result to stdout or a file.

# Behavior

- Required flags:
  - --expression, -e: Formula in the form y=<expression> or <expression>.
  - --range, -r: Numeric range in the form x=<start>:<end>:<step>.
- Optional flags:
  - --format, -f: Output format, json (default) or csv.
  - --output, -o: Path to write the output; if omitted, prints to stdout.
  - --help, -h: Display usage information and exit code 0.
  - --version, -v: Display the package version and exit code 0.

On invocation:
1. Strip optional y= prefix and compile the expression via mathjs; invalid expressions exit with code 1 and an error message.
2. Parse and validate the range string in the form x=<start>:<end>:<step>, enforce step > 0 and start ≤ end; invalid ranges exit code 1 with a descriptive message.
3. Generate an inclusive series of objects { x: number, y: number } by stepping from start to end.
4. Serialize:
   - JSON: JSON.stringify(series, null, 2).
   - CSV: header x,y followed by comma-separated rows.
5. Write to the specified file via fs.writeFileSync or print to stdout.
6. Exit code 0 on success; code 1 on failure.

# Implementation

- Add dependencies in package.json: yargs for CLI parsing and mathjs for expression compilation.
- In src/lib/main.js:
  - Configure yargs with required options (expression, range), optional (format, output), and built-in .help() and .version().
  - Export a programmatic function main({ expression, range, format, output }) that:
    1. Strips y= prefix and compiles the expression via mathjs.compile(), or throws on invalid.
    2. Parses and validates the range string (start, end, step) enforcing step > 0 and start ≤ end, or throws on invalid.
    3. Generates an inclusive series of { x, y } points.
    4. Serializes to JSON or CSV based on format.
    5. Writes output to file or stdout.
  - CLI entrypoint invokes main(), catches errors, prints `Error: <message>` to stderr, and sets process.exit codes.

# Tests

Extend tests in tests/unit/plot-generation.test.js to verify:
- Default JSON stdout and file output via --output.
- CSV stdout (--format csv) and file output via --output.
- Error on unsupported formats, invalid expressions, and invalid ranges.
- Help and version flags exit code 0 and display expected usage or version text.

# Documentation

- Update USAGE.md under **Time Series Generation** to document --format option with examples for JSON and CSV.
- Update README.md under ## Time Series Generation with usage snippets for JSON, CSV, file output, help, and version commands.