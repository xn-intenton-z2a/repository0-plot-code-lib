# CLI_TOOL

Overview

Provide a small command-line interface that enables generating plots from an expression or a CSV file and writing the output to a file. The CLI must include a helpful --help output with usage examples.

Behavior

- Support flags: --expression, --range, --csv, --file, and --help.
- When --expression and --range are provided, evaluate the expression across the range and render to the requested file type.
- When --csv is provided, load the CSV and render the series.
- --help prints concise usage examples and exits with code zero.

Acceptance Criteria

- node src/lib/main.js --help prints usage text and exits with status 0.
- Running the CLI with expression and range and --file produces the requested output file on disk.
- CLI errors are user-friendly and documented in README.md.