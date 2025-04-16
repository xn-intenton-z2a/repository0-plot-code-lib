# CLI_ENHANCEMENTS Feature Specification

This feature upgrades and consolidates the command line interface (CLI) by adding support for a dedicated help mode, diagnostics output, and verbose logging. The improvements build on the existing CLI functionality for plot generation and time series data production, while remaining backward compatible. All updates are applied within the source (src/lib/main.js), tests, README documentation, and dependency management.

## Overview

- **Purpose:**
  - Provide a clear and comprehensive help output when the `--help` flag is used to display detailed usage instructions and exit immediately.
  - Introduce a diagnostics mode via the `--diagnostics` flag that outputs tool version, Node.js version, and current CLI arguments.
  - Enable verbose logging with the `--verbose` flag so that key processing steps (argument parsing, validation, evaluation, file writing) are logged.
  - Retain and enhance error handling and maintenance issue checks, while keeping existing plot generation and time series functionality.

## Implementation

### Source Code Changes (src/lib/main.js)

- **Help Mode Integration:**
  - During argument parsing, check if `--help` is present. If found, output a comprehensive usage guide summarizing all supported options and exit without further processing.

- **Diagnostics Flag:**
  - Check for the `--diagnostics` flag early in the main function. If provided, output diagnostic information including:
    - Tool version (retrieved from package.json)
    - Node.js version
    - All received CLI arguments
  - After displaying diagnostics, exit without executing further processing.

- **Verbose Logging:**
  - If `--verbose` is detected among the arguments, log detailed steps for parsing, validation, evaluation, and file operations.

- **Maintained Functionality:**
  - Continue handling options for generation of plot files (SVG or PNG) and time series JSON data.
  - Maintain the maintenance check and error messages as previously implemented.

### Test File Updates (tests/unit/main.test.js)

- Add tests to verify the help mode:
  - Assert that when `--help` is provided, the output contains usage instructions and no further processing occurs.

- Add tests for diagnostics mode:
  - Verify that when `--diagnostics` is provided, the output contains diagnostic information including Node.js version, tool version, and input arguments.

- Ensure existing tests for file generation, numeric range validation, and maintenance handling remain valid.

### Documentation Updates (README.md)

- Update the CLI Usage section to document the new `--help` and `--diagnostics` flags:
  - For `--help`: Describe that this option outputs a comprehensive usage guide with all available options and exits immediately.
  - For `--diagnostics`: Explain that this flag outputs version and system diagnostic information.

## Compatibility and Mission Alignment

- The updates are fully backward compatible with existing CLI behavior for plot generation and time series data generation.
- By adding help and diagnostics, the tool becomes more user-friendly and transparent, supporting the mission of making plot-code-lib the go-to tool for formula visualizations.
- All changes are applied solely to existing files with no new file additions or deletion of current features.
