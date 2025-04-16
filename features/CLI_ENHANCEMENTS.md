# CLI_ENHANCEMENTS Feature Specification

This feature consolidates and upgrades the command line interface functionality by merging diagnostics, verbose logging, and input validation into one streamlined system.

## Overview

- Enhance the user experience by providing clear diagnostic outputs, detailed processing logs, and robust input validation using the Zod library.
- Retain the existing maintenance check and plot/time series generation functionalities while integrating improved logging and error messages.
- Align with the project mission of being a transparent, reliable, and user-friendly CLI tool for generating plots and time series data.

## Implementation

### Source Code Changes (src/lib/main.js)

- **Argument Parsing and Maintenance Check**: Preserve the existing simple argument parser and the maintenance flag logic.

- **Input Validation with Zod**:
  - Integrate Zod-based schema validation for required options:
    - `expression`: Required string. Optionally prefixed with 'y=' and processed accordingly.
    - `range`: Required string in the format `x=min:max`.
    - `file`: Optional, must end with `.svg` or `.png` if provided.
    - `samples`: Optional, must be a number greater than 1 if provided.
  - On validation failure, output a clear error message and display usage instructions.

- **Diagnostics Mode**:
  - When the `--diagnostics` flag is provided, output a JSON object containing the tool's version (sourced from package.json), current Node.js version, and received CLI arguments.
  - Ensure diagnostics mode is handled at the beginning of the processing flow.

- **Verbose Logging Mode**:
  - When the `--verbose` flag is supplied, output detailed logs at key execution points:
    - Log the initial options and validation results.
    - Log before and after evaluating expressions and generating time series data.
    - Log file writing operations along with success or error messages.

- **Integration**:
  - Ensure that diagnostics and verbose logging operate before the main processing to prevent propagation of unclear errors.
  - Merge the functionalities previously handled by separate features (DIAGNOSTICS, CLI_LOGGING, and CLI_IMPROVEMENTS) into this unified implementation.

### Testing

- **Unit Tests** (tests/unit/main.test.js):
  - Add tests to verify that the diagnostics mode outputs valid JSON with the expected properties (version, Node.js version, and arguments).
  - Verify that verbose logging produces identifiable log messages at key processing stages.
  - Ensure that inputs not meeting the Zod schema requirements are rejected with clear error messages.

### Documentation Updates (README.md)

- Update the CLI Usage section to document the following:
  - Use of the `--diagnostics` flag for outputting diagnostic information.
  - Use of the `--verbose` flag for detailed operational logs.
  - Clear description of input validation requirements for `--expression`, `--range`, `--file`, and `--samples`.

## Mission Alignment

- By consolidating diagnostics, logging, and input validation, this feature bolsters transparency and reliability. It reinforces the project mission of being a go-to CLI tool by offering users immediate feedback and robust error handling, making plot generation more accessible and predictable.