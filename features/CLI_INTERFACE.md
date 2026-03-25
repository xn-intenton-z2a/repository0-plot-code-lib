# CLI_INTERFACE

## Summary

Define the command-line interface behavior for generating plots from expressions or CSV files and persisting output to disk.

## Motivation

The CLI is a primary user surface for quick generation of plots and examples required by the mission.

## Scope

- The main CLI entrypoint is node src/lib/main.js which must be executable via npm run start:cli.
- Supported flags: --expression, --range, --csv, --file, --help.
- Export a function runCli(argv) from src/lib/main.js to allow programmatic invocation in tests.

## Requirements

- --expression accepts a string expression such as "y=Math.sin(x)" and requires --range when used alone.
- --range accepts start:step:end format.
- --csv accepts a path to a CSV file with time,value columns (mutually exclusive with --expression).
- --file accepts the output file path and infers format from the extension.
- --help prints concise usage examples for the flags and exits with code 0.

## Acceptance Criteria

- Running node src/lib/main.js --help prints usage information with examples and exits successfully.
- Running node src/lib/main.js --expression "y=Math.sin(x)" --range "-3.14:0.01:3.14" --file output.svg produces an output.svg file.
- Passing incompatible flags results in a helpful error message and non-zero exit code.

## Notes

- Implement CLI parsing with a small, dependency-free approach (manual argv parsing) or with a lightweight parser; ensure runCli is testable by passing argv arrays.
