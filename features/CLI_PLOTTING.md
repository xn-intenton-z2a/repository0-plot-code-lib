# CLI_PLOTTING Feature Enhancement

This update to the CLI plotting functionality integrates environment-driven configuration using the dotenv package. By supporting environment variable overrides, users can pre-configure default values for SVG dimensions, padding, data points, and more without having to supply them each time on the command line.

## Overview

This enhancement builds on the existing CLI plotting feature by adding support for environment variables. It reads a `.env` file (if present) to set default configuration values such as SVG width (`SVG_WIDTH`), height (`SVG_HEIGHT`), padding (`SVG_PADDING`), and data points (`SVG_POINTS`). This change reduces repetitive command-line arguments and aligns with the mission of being a go-to tool for formula visualisations, offering flexibility and improved usability.

## Technical Changes

- **Environment Variable Support:**
  - Import and configure the `dotenv` package in `src/lib/main.js` to load environment variables at startup.
  - When parsing CLI arguments, if certain parameters (e.g., width, height, padding, points) are not provided, fallback to environment variables (e.g., `process.env.SVG_WIDTH`, `process.env.SVG_HEIGHT`, etc.) before using hard-coded defaults.

- **CLI Argument Handling Enhancements:**
  - Ensure that values provided via command-line override the environment settings if both are provided.
  - Maintain robust error handling by validating environment-sourced values similarly to CLI inputs.

- **Logging and User Feedback:**
  - Update console logging to include which configuration source (CLI vs environment) was used for key values, aiding in debugging and diagnostics.

## Testing

- **Unit Tests:**
  - Update tests in `tests/unit/main.test.js` to simulate scenarios where environment variables are set. Verify that default configurations are correctly read from environment variables when CLI parameters are omitted.
  - Ensure that providing CLI options still takes precedence over environment defaults.

## Documentation

- **README.md Update:**
  - Add a section detailing how users can configure default values via a `.env` file. List the configurable variables (e.g., `SVG_WIDTH`, `SVG_HEIGHT`, `SVG_PADDING`, `SVG_POINTS`).
  - Provide examples to show how to setup a `.env` file and describe the effect on the CLI invocation.

## Backward Compatibility

- Existing functionality for CLI plotting and diagnostics is maintained with the added benefit of environment configurations. Users who do not provide a `.env` file will continue to see the default values or CLI overrides as before.
