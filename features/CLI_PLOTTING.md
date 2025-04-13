# Overview

This feature refines the CLI plotting functionality to improve input validation, error handling, asynchronous file processing, and logging. It builds on the existing plotting logic by enhancing the user experience, ensuring clear error messages, and providing more robust handling of CLI arguments and file output operations. These improvements align with the mission to become the go-to plot library with a straightforward CLI interface for formula visualisations.

# Technical Changes

- **Input Validation Enhancements:**
  - Improve parsing of the `--range` parameter to ensure both x and y ranges are correctly formatted.
  - Enforce clear error messages when the expression or range is missing or malformed.

- **Asynchronous File Handling:**
  - Refactor file output (particularly PNG conversion using sharp) to use async/await for clearer logic and error management.
  - Ensure that the process correctly logs and handles any errors during file writing or conversion operations.

- **Improved Logging and User Feedback:**
  - Provide detailed console logs during each step of the plotting process (data computation, SVG rendering, file output).
  - Ensure backward compatibility by logging raw input when no actionable parameters are provided.

- **Code Refactoring:**
  - Minor refactoring of source code in `src/lib/main.js` to improve clarity and maintainability, without altering the core functionality.

# Testing

- Update `tests/unit/main.test.js` to include additional edge cases, such as:
  - Missing or partially provided CLI parameters, to verify graceful fallback and error messages.
  - Validation of asynchronous file writing and proper error reporting during PNG conversion.
  - Ensuring that the enhanced logging outputs expected messages under various scenarios.

# Documentation

- Update the `README.md` to reflect new usage examples and enhanced error handling. This includes examples with:
  - Valid and invalid `--range` and `--expression` inputs.
  - Detailed explanations of the asynchronous file output operations and error handling best practices.

This refined CLI plotting feature advances the project’s value by ensuring a robust, user-friendly, and maintainable plotting tool that meets the mission of being the go-to solution for formula visualisations via CLI.
