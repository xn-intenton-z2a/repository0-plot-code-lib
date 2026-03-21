# CLI_TOOL

Overview

A command-line interface that ties parsing, sampling, CSV loading, rendering and file saving into a simple user workflow.

Specification

- The main entry point is src/lib/main.js and must export named functions and also behave as a CLI when executed directly
- Supported flags: --expression, --range, --csv, --file, --help
- Behavior:
  - If --expression and --range are provided, parse and sample the expression then render to output format inferred from --file extension
  - If --csv is provided, load CSV and render
  - --file determines output format: .svg or .png
  - --help prints concise usage examples and exits with status 0

Acceptance Criteria

1. Running node src/lib/main.js --help outputs usage information and exits
2. Running node src/lib/main.js --expression y=Math.sin(x) --range -3.14:0.01:3.14 --file output.svg creates an output file at path output.svg
3. The CLI uses named exports internally so unit tests can import and exercise each step independently

Implementation Notes

- Use a small args parser (minimist is an available design reference); avoid large CLI frameworks.
- Provide clear error messages for invalid combinations of flags and missing files or options.

Tests

- Behavior tests should simulate the CLI and assert help output and file creation for a sample run.