# CLI Enhancement

This feature merges and refines the existing STATS and PLOT functionalities to provide a unified CLI experience. In addition to maintaining the plot generation and statistics computation functionalities, it introduces a new help flag to guide users through command usage.

## Overview

- Integrates the `--stats` flag to compute and display basic statistics (minimum, maximum, average) for generated y-values.
- Enhances CLI argument parsing to support the primary plot generation flags: `--expression`, `--range`, and `--file`.
- Introduces a `--help` flag which prints a comprehensive usage guide and command examples.

## Implementation Details

- **Source File (`src/lib/main.js`):**
  - Update the argument parser to recognize `--stats` and `--help` flags.
  - For `--stats`, implement logic to compute basic statistics from dummy or computed y-values (using functions like `Math.min`, `Math.max` and a sum for average).
  - For `--help`, print a detailed usage message covering all available flags with examples.
  - Maintain existing functionality for plot generation using `--expression`, `--range`, and `--file`.

- **Test File (`tests/unit/main.test.js`):**
  - Add tests to verify that when the `--stats` flag is provided, a formatted statistics summary is included in the console output.
  - Add tests that check the correct output when the `--help` flag is provided, ensuring the usage message is comprehensive and correctly formatted.
  - Retain and update existing tests for valid plot generation and error cases.

- **Documentation (`README.md`):**
  - Update the CLI usage documentation to include details on the new `--stats` and `--help` flags.
  - Provide usage examples illustrating different scenarios (e.g., plot generation with statistics enabled, and displaying help).

- **Dependencies:**
  - No additional dependencies are required. The feature remains compatible with Node 20 and ECMAScript modules as defined in the current package configuration.

## Testing & Validation

- Ensure that running the CLI with all required flags (`--expression`, `--range`, `--file`) produces the expected plot generation message.
- Validate that using the `--stats` flag produces a properly formatted summary of computed statistics.
- Confirm that the `--help` flag outputs a detailed usage guide covering all supported commands and options.

This unified CLI enhancement aligns with the mission to be the go-to tool for formula visualisations by combining essential plotting and analytic capabilities with user-friendly command guidance.