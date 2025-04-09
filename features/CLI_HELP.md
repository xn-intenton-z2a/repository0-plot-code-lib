# CLI_HELP Feature Specification

## Overview
The CLI_HELP feature introduces a built-in help system accessible via a `--help` flag in the CLI. This feature provides users with detailed information about available commands, flags, and usage examples. It complements our mission by ensuring that the plotting tool is as user-friendly as it is powerful, supporting both new users and experienced developers alike.

## Implementation Details
- **CLI Flag Integration:**
  - Update the main CLI entry point (`src/lib/main.js`) to recognize the `--help` flag.
  - When the flag is provided, output a formatted help message detailing all commands including `--plot`, `--diagnostics`, `--export`, and the new color options in the PLOT_ENGINE.

- **Help Message Content:**
  - Describe the usage pattern for the CLI, including parameters and their defaults.
  - Provide sample commands and expected outputs.
  - Include troubleshooting tips and references to the README and documentation files for further information.

- **Testing and Documentation:**
  - Add unit tests to verify that invoking the `--help` flag results in the correct help message output.
  - Update the README.md and CONTRIBUTING.md with an example section that describes how to access help and interpret the available commands.

## Usage Example
- **CLI Command:**
  - Run: `node src/lib/main.js --help`
  - Expected output: A detailed help message listing and describing all available commands and options.
