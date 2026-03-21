# CLI_TOOL

Summary
Provide a command line interface entry point in src/lib/main.js that accepts expression or CSV input and writes plots to files.

Goals
- Support the following flags and combinations: --expression, --range, --csv, --file, --help.
- Implement friendly help text and exit codes for success and error conditions.

CLI Behavior
- --expression EXPRESSION and --range START:STEP:END produce a plotted file when --file PATH is provided.
- --csv PATH and --file PATH produce a plotted file from CSV input.
- --help prints usage examples and exits with code 0.

Acceptance Criteria
- Running node src/lib/main.js --help prints a usage summary to stdout and exits with code 0.
- Running node src/lib/main.js --expression "y=Math.sin(x)" --range "-3.14:0.01:3.14" --file output.svg creates the output file on disk.
- Invalid argument combinations print an error to stderr and exit with a non-zero code.

Deliverables
- CLI parsing and wiring in src/lib/main.js exported as named functions for programmatic use plus a node-invocable entrypoint.
- Unit tests that simulate CLI invocation and assert behavior for --help, successful generation, and error cases.

Notes
- Keep the CLI argument parsing light-weight and document examples in README.