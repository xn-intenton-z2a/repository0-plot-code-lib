# Overview
Extend the existing time series generation command to support both JSON and CSV export formats via a single CLI entrypoint. Users will generate numeric data series from a mathematical expression and range, choose their preferred export format, and direct the result to stdout or a file.

# Behavior
- Required flags:
  - --expression, -e: Formula in the form y=<expression> or <expression>.
  - --range, -r: Numeric range in the form x=<start>:<end>:<step>.
- Optional flags:
  - --format, -f: Output format: json (default) or csv.
  - --output, -o: File path to write the output; if omitted, prints to stdout.
  - --help, -h: Display usage information and exit code 0.
  - --version, -v: Display package version and exit code 0.

# Implementation
1. Add dependencies in package.json: yargs for CLI parsing and mathjs for expression evaluation.
2. In src/lib/main.js configure yargs with required and optional flags, plus .help() and .version(), and implement:
   - Export async function main({ expression, range, format, output }) that:
     - Strips optional y= prefix, compiles expression via mathjs.compile, or throws on invalid expression.
     - Parses and validates range string, enforcing step>0 and start<=end, or throws on invalid range.
     - Generates inclusive series of { x, y } points.
     - Serializes series to JSON or CSV based on format.
     - Writes to output file via fs.writeFileSync or console.log to stdout.
   - CLI entrypoint calls main(), catches errors, prints Error messages to stderr, and exits 0 on success or 1 on failure.

# Tests
- Extend tests/unit/plot-generation.test.js to cover:
  - JSON stdout and file output.
  - CSV stdout and file output.
  - Unsupported format errors.
  - Invalid expression and range errors.
  - Help and version flags behavior.

# Documentation
- Update USAGE.md under "Time Series Generation" to document --format and examples for JSON and CSV output.
- Update README.md under "## Time Series Generation" with usage snippets for JSON, CSV, file output, help, and version commands.
