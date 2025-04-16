# CLI_ENHANCEMENT Update

This update refines the CLI functionality to provide comprehensive support for the `--help` flag. The changes introduce an early check in the CLI entry-point to detect the `--help` flag and output a detailed usage guide. This enhancement is part of our goal to make the CLI a user-friendly tool for formulae visualisations.

## Overview

- Adds support for the `--help` flag to provide clear instructions on using the CLI tool.
- Ensures that, when `--help` is invoked, the tool prints a complete help message and exits without processing further arguments.
- Retains existing functionalities for plot generation and time series JSON generation without interference.

## Source Code Changes

- Modify `src/lib/main.js`:
  - Add an early check for the `--help` flag. If detected, output the usage guide (including details for flags like `--expression`, `--range`, `--file`, and `--help`).
  - Ensure that the process exits immediately after displaying the help message.
  - Maintain error handling and validations for other flags.

## Testing Enhancements

- Update tests in `tests/unit/main.test.js` to include:
  - A new test case verifying that invoking the CLI with the `--help` flag results in the complete help message being printed and no further processing.
  - Ensure that existing tests for plot generation and time series data are not affected.

## Documentation Updates

- Update `README.md` under the CLI Usage section:
  - Describe the purpose and behavior of the `--help` flag.
  - Provide examples showing the help command in action along with sample output.

## Alignment with Mission & Contributing Guidelines

- **Mission Compliance:** Enhancing the CLI accessibility aligns with our vision to be the go-to library for formulae visualisations.
- **Contributing Guidelines:** All changes are confined to existing files (the source code, tests, README, and dependencies), adhere to coding style standards, and include thorough documentation and test coverage.
