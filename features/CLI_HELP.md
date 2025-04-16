# Overview

This feature introduces comprehensive support for the `--help` flag in the CLI. The changes ensure that when a user invokes the tool with the `--help` flag, the application immediately displays a detailed usage guide and exits without processing further arguments.

# Source Code Changes

- Update `src/lib/main.js` to check for the `--help` option before processing any other CLI arguments.
- If the `--help` flag is detected, output a detailed help message covering all available CLI options (e.g., `--expression`, `--range`, `--file`, etc.) and then exit the process.
- Ensure that existing functionality for plot generation and time series data generation remains unchanged when the `--help` flag is not present.

# Testing Enhancements

- Modify `tests/unit/main.test.js` to add a new test case that verifies if invoking `--help` outputs the expected usage message and that no further processing occurs.
- Maintain existing tests to ensure that other CLI functionalities (plot generation, time series generation) are not affected.

# Documentation Updates

- Update the `README.md` file under the CLI Usage section to document the new `--help` flag and provide examples of its usage.
- Include the expected output when running the CLI with the `--help` flag. 

# Alignment with Mission & Contributing Guidelines

- This update directly supports our mission of making the CLI tool accessible and user-friendly, reinforcing the value of the formulae visualisation library.
- Changes are confined to existing files (source, tests, README, dependencies) in accordance with the guidelines outlined in CONTRIBUTING.md.
