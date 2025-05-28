# Overview

Extend the core time series generation CLI to support both JSON and CSV output formats via a single, structured interface. Users will generate numeric data series from a mathematical expression and a range, choose their preferred export format, and direct the result to stdout or a file.

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

Output:

- JSON mode: Pretty-printed array of { x: number, y: number }.
- CSV mode: First line header x,y followed by comma-separated rows for each point.

Validation errors exit code 1 with descriptive message.

# Implementation

- Add dependencies `yargs` for CLI parsing and `mathjs` for expression evaluation.
- In src/lib/main.js:
  1. Configure yargs with options: `expression`, `range`, `format`, `output`, plus `.help()` and `.version()`.
  2. Export programmatic `main({ expression, range, format, output })`:
     - Strip optional `y=` prefix and compile expression with mathjs.
     - Parse and validate range string (`start<=end`, `step>0`).
     - Generate inclusive series of { x, y } points.
     - Serialize based on `--format`: JSON or CSV with header `x,y`.
     - Write to file or stdout using fs.writeFileSync or console.log.
  3. CLI entrypoint invokes `main()`, catches exceptions, prints `Error: <message>` to stderr, and exits with codes (0 success, 1 failure).

# Tests

Extend `tests/unit/plot-generation.test.js` to cover:
- Default JSON output to stdout and file writing via `--output`.
- CSV output to stdout (`--format csv`) and file writing.
- Errors on unsupported format, invalid expression, and invalid range.
- Help and version flags exit code 0 and display expected output.

# Documentation

- Update USAGE.md under **Time Series Generation** to document `--format` flag and examples for JSON and CSV.
- Update README.md under `## Time Series Generation` with usage snippets for JSON, CSV, file output, help, and version commands.