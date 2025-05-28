# Overview

Enhance the core time series generation command to provide structured CLI parsing and support both JSON and CSV output formats. This feature allows users to generate numeric series from a mathematical expression and range, choose their preferred export format, and direct the result to stdout or a file without adding new subcommands.

# Behavior

When invoked via the CLI:

- Required flags:
  - --expression, -e: A formula in the form y=<expression> or <expression>.
  - --range, -r: A numeric range in the form x=<start>:<end>:<step>.
- Optional flags:
  - --format, -f: Output format, json (default) or csv.
  - --output, -o: Path to write the output; if omitted, prints to stdout.
  - --help, -h: Display usage information and exit code 0.
  - --version, -v: Display the package version and exit code 0.

On invocation:
1. Strip optional y= prefix and compile the expression via mathjs.  Invalid expressions exit with code 1 and an error message.
2. Parse and validate the range string; enforce step > 0 and start <= end.  Invalid ranges exit with code 1 and an error message.
3. Generate an inclusive series of { x, y } points.
4. Serialize the series:
   - JSON: JSON.stringify(series, null, 2)
   - CSV: header x,y plus comma-separated rows per point
5. Write to the specified file via fs.writeFileSync or print to stdout.
6. Exit code 0 on success.

# Implementation

- Use yargs to configure the default command with options: expression, range, format, output, help, and version.
- Export a programmatic main({ expression, range, format, output }) function that returns the data array or throws on invalid input.
- In src/lib/main.js handler:
  - Invoke main(), catch errors to stderr with `Error: <message>`, and exit with code 1.
  - On success, write or print the serialized output and exit with code 0.

# Tests

Extend tests/unit/plot-generation.test.js to cover:
- Default JSON output to stdout and file writing via --output.
- CSV output to stdout (--format csv) and file writing via --output.
- Errors on unsupported format (exit 1, descriptive error).
- Errors on invalid expression or invalid range (exit 1, descriptive error).
- Help (--help) and version (--version) flags exit code 0 and display expected output.

# Documentation

- Update USAGE.md under **Time Series Generation** to document --format, examples for JSON and CSV, and help/version flags.
- Update README.md under `## Time Series Generation` with usage snippets demonstrating JSON, CSV, file output, help, and version commands.