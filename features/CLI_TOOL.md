# CLI_TOOL

Status: Implemented

Overview

A command-line interface entrypoint is provided at src/lib/main.js. The CLI accepts expression or csv input, a range, and an output file option. A --help flag prints usage examples and exits.

Behavior

- Supported flags: --expression, --range, --csv, --file, --help and short aliases.
- When --expression and --range are provided, the CLI uses parseExpression and evaluateRange to compute points and then renders and saves the plot.
- When --csv is provided, the CLI loads the CSV and renders the series.
- Help prints concise usage examples and exits with code 0.

Acceptance criteria (testable)

- Running the CLI with --help prints usage examples and returns exit code 0.
- Running the CLI with --expression and --range and --file writes the expected output file at the given path.
- The CLI exits with a non-zero code on fatal errors and prints helpful error messages to stderr.
- Unit tests exercise argument parsing and the main flow; integration-style tests write an output SVG to a temporary path and assert file creation and SVG substrings.

Testing notes

- Existing tests under tests/unit/plot.pipeline.test.js cover the primary acceptance criteria.
- For advanced CLI flags (format, overwrite, verbose) add separate tests when implemented.

Implementation notes

- Implementation location: src/lib/main.js (runCli and helper functions). Keep argument parsing minimal and export functions to enable unit testing.
