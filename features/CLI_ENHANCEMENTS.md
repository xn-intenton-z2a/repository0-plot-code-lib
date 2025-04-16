# CLI_ENHANCEMENTS Feature Specification

This feature upgrades and consolidates the command line interface (CLI) by adding several new options and modes. In addition to the existing support for help output, diagnostics, verbose logging, and error handling, this update introduces an interactive mode and pretty print support for JSON outputs. These enhancements improve user experience without compromising backward compatibility.

## Overview

- **Purpose:**
  - Enhance the CLI experience by providing an interactive mode triggered by the `--interactive` flag.
  - Add a new `--pretty` flag to format JSON output in a human-readable way when generating time series data.
  - Continue to support existing features including help (`--help`), diagnostics (`--diagnostics`), and verbose logging (`--verbose`).
  - Maintain backward compatibility with plot generation and time series JSON data functionality.

## Implementation

### Source Code Changes (src/lib/main.js)

- **Interactive Mode:**
  - When the `--interactive` flag is detected, the CLI enters an interactive session prompting the user for the mathematical expression and range.
  - Follows the normal evaluation and output generation once user input is acquired.

- **Pretty Print JSON Option:**
  - When the `--pretty` flag is provided, the CLI will output the generated JSON time series data in a formatted, human-readable style using `JSON.stringify(series, null, 2)`.
  - If the flag is not provided, the CLI defaults to the compact JSON output (`JSON.stringify(series)`).

- **Help, Diagnostics, and Verbose Logging:**
  - Retains immediate help message display when the `--help` flag is used.
  - When `--diagnostics` is provided, the tool outputs diagnostic information (tool version, Node.js version, CLI arguments) and exits.
  - Enabling `--verbose` provides detailed logging of CLI processing, argument parsing, and evaluation steps.

- **Maintained Functionality:**
  - The updates ensure that plot generation (SVG/PNG) and time series JSON data generation continue to operate as specified.
  - Existing maintenance checks, error messages, and non-finite number handling remain unchanged.

### Test File Updates (tests/unit/main.test.js)

- **New Tests for Pretty Print Mode:**
  - Add tests that simulate the CLI invocation with the `--pretty` flag and verify that the output JSON is formatted with indentation (e.g., containing newline characters and spaces).
  - Ensure that the pretty print does not affect the correctness of the JSON structure.

- **Interactive Mode Tests:**
  - Extend existing interactive mode tests to simulate user input and verify that the session correctly prompts for expression and range.

- **Regression Tests:**
  - Ensure that tests for help mode, diagnostics, plot file generation, sample count customization, and error handling continue to pass without interference.

### Documentation Updates (README.md)

- **CLI Usage Section:**
  - Update documentation to include details on the new `--pretty` flag. For example:
    ```bash
    node src/lib/main.js --expression "Math.sin(x)" --range "x=0:6.28" --pretty
    ```
    This will output the JSON time series data in a formatted, human-readable style.
  - Clarify the interactive mode usage with examples:
    ```bash
    node src/lib/main.js --interactive
    ```
    In interactive mode, the CLI will prompt the user to enter a mathematical expression and range.

## Compatibility and Mission Alignment

- The addition of the interactive and pretty print modes builds on current CLI features, enhancing user experience and output readability without affecting existing functionalities.
- All changes are confined to modifications within source, test, README, and dependency files, ensuring full backward compatibility.
- This update aligns with the mission of making `plot-code-lib` the go-to tool for generating flexible, user-friendly formula visualizations.
