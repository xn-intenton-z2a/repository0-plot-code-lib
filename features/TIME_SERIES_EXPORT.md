# Overview

Extend the existing CLI command to support both JSON and CSV export formats via a single, structured entrypoint. Users can generate numeric data series from a mathematical expression and range, choose their preferred export format, and direct the result to stdout or a file.

# Behavior

When invoked via the CLI:

- Required flags:
  - --expression, -e: Formula in the form y=<expression> or <expression>
  - --range, -r: Numeric range in the form x=<start>:<end>:<step>
- Optional flags:
  - --format, -f: Output format, json (default) or csv
  - --output, -o: Path to write output; prints to stdout if omitted
  - --help, -h: Display usage information and exit code 0
  - --version, -v: Display the package version and exit code 0

Output:
- **JSON** mode: Pretty-printed array of { x: number, y: number }
- **CSV** mode: Header `x,y` followed by comma-separated rows for each point

Invalid expression or range syntax, unsupported format, or file write failures exit code 1 with a descriptive `Error: <message>` on stderr.

# Implementation

- Add dependencies in package.json: `yargs` for CLI parsing and `mathjs` for expression parsing.
- In `src/lib/main.js`:
  1. Use yargs to configure options: `expression`, `range` (required), `format`, `output` (optional), plus `.help()` and `.version()`.
  2. Export a programmatic `main({ expression, range, format, output })` that:
     - Strips optional `y=` prefix and compiles the expression via `mathjs.compile`.
     - Parses and validates the range string: `x=<start>:<end>:<step>`, enforces `step > 0` and `start <= end`.
     - Generates an inclusive series of `{ x, y }` points.
     - Serializes the series to JSON or CSV based on `format`:
       - JSON: `JSON.stringify(series, null, 2)`.
       - CSV: header `x,y` plus comma-separated rows.
     - Writes to the specified file via `fs.writeFileSync` or logs to stdout.
  3. The CLI entrypoint calls `main()`, catches exceptions, prints error messages to stderr, and uses process.exit codes (0 on success, 1 on failure).

# Tests

Extend `tests/unit/plot-generation.test.js` to cover:
- Default JSON output to stdout and file writing via `--output`.
- CSV output to stdout (`--format csv`) and file writing via `--output`.
- Unsupported `--format xml`: exit code 1, stderr contains `Choices:`.
- Invalid expression: exit code 1, stderr contains `Error: Invalid expression`.
- Invalid range syntax: exit code 1, stderr contains `Error: Invalid range`.
- Help and version flags: exit code 0 and expected usage or version text.

# Documentation

- **USAGE.md**: Under _Time Series Generation_, document `--format` option with examples for JSON and CSV modes, and include help/version usage.
- **README.md**: Under `## Time Series Generation`, include usage snippets demonstrating JSON, CSV, file output, help, and version commands.