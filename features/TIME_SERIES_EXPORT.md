# Overview

Enhance the existing CLI command to support both JSON and CSV export formats via a single entrypoint.  Users can generate numeric data series from a mathematical expression and range, choose output format, and direct the result to stdout or a file.

# Behavior

When invoked via the CLI:

- Required flags:
  - --expression, -e  The formula in form y=<expression> or <expression>.
  - --range, -r       The numeric range in form x=<start>:<end>:<step>.
- Optional flags:
  - --format, -f      Output format: json (default) or csv.
  - --output, -o      Path to write output; if omitted, prints to stdout.
  - --help, -h        Display usage and exit code 0.
  - --version, -v     Display the package version and exit code 0.

Validation errors exit code 1 with descriptive message.

# Implementation

- Configure yargs in src/lib/main.js with required and optional flags, .help() and .version().
- Implement programmatic export function main({expression,range,format,output}) that:
  1. Strips optional 'y=' prefix and compiles the expression via mathjs.
  2. Parses the range string, enforces step >0 and start <= end.
  3. Generates an inclusive series of {x,y} points.
  4. Serializes to JSON or CSV based on --format.
  5. Writes to the specified file or stdout.
- CLI entrypoint calls main() inside try/catch, reports errors, and uses process.exit codes.

# Tests

Extend tests/unit/plot-generation.test.js to cover:

- Default JSON stdout and file writing tests.
- CSV stdout and file writing tests.
- Unsupported format errors.
- Invalid expression and range errors.
- Help and version flags behavior.

# Documentation

- Update USAGE.md under "Time Series Generation" to document --format and examples for JSON and CSV modes, and help/version usage.
- Update README.md under `## Time Series Generation` with usage snippets showing JSON, CSV, file output, help, and version commands.