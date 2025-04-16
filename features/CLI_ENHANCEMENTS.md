# CLI_ENHANCEMENTS Feature Specification

This feature upgrades and consolidates the command line interface (CLI) by adding several new options and modes. In addition to the existing support for help output, diagnostics, verbose logging, and error handling, this update introduces an interactive mode for users who wish to input expressions and ranges dynamically.

## Overview

- **Purpose:**
  - Enhance the CLI experience by providing an interactive mode triggered by the `--interactive` flag.
  - Continue to support the existing features: help (`--help`), diagnostics (`--diagnostics`), and verbose logging (`--verbose`).
  - Maintain backward compatibility with plot generation and time series JSON data functionality.

## Implementation

### Source Code Changes (src/lib/main.js)

- **Interactive Mode:**
  - When the `--interactive` flag is detected, the CLI will enter an interactive session.
  - The interactive session will prompt the user for the mathematical expression and the range (in the format `x=min:max`).
  - User input will be read from standard input, after which the normal evaluation and output generation logic will execute.

- **Help Mode Integration:**
  - As before, the CLI should immediately display a comprehensive help message when the `--help` flag is used.

- **Diagnostics Flag:**
  - If the `--diagnostics` flag is provided, the tool outputs diagnostic information (tool version, Node.js version, and CLI arguments) and exits.

- **Verbose Logging:**
  - If `--verbose` is specified, detailed logging of CLI processing, including argument parsing and evaluation steps, is enabled.

- **Maintained Functionality:**
  - The updates ensure that plot file generation (SVG/PNG) and time series JSON data generation continue to operate as specified.
  - Existing maintenance checks and error messages remain unchanged.

### Test File Updates (tests/unit/main.test.js)

- **New Tests for Interactive Mode:**
  - Add tests to simulate interactive input by mocking standard input mechanisms.
  - Verify that when `--interactive` is provided, the CLI properly prompts for input and then produces valid output.

- **Existing Tests:**
  - Ensure that the new interactive mode does not interfere with tests for help mode, diagnostics, plot file generation, numeric range validation, and maintenance handling.

### Documentation Updates (README.md)

- **CLI Usage Section:**
  - Update the CLI usage documentation to include details on the interactive mode.
  - Provide usage examples such as:
    ```bash
    node src/lib/main.js --interactive
    ```
    With the interactive mode, after launching the CLI, the user is prompted to enter a mathematical expression and a range (e.g., `x=0:6.28`).

## Compatibility and Mission Alignment

- The interactive mode enhancement builds on the current CLI features, providing an additional user-friendly mechanism to generate plots and time series data dynamically.
- All changes are confined to modifications within existing files (source, tests, README, and dependencies) while ensuring complete backward compatibility with current functionality.
- This update aligns with the mission of making `plot-code-lib` the go-to tool for generating formula visualizations with a flexible and intuitive CLI interface.