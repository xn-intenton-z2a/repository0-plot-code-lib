# CLI_PLOTTING with ENV

This update refines the existing CLI_PLOTTING feature by fully integrating support for environment variable configuration. The feature will load default plotting parameters from a `.env` file using the `dotenv` package if command-line options are not provided.

## Overview

- **Environment Loading:**
  - At startup in the source file (`src/lib/main.js`), the application will import and invoke `dotenv.config()` to load environment variables. 
  - New environment variables include `SVG_WIDTH`, `SVG_HEIGHT`, `SVG_PADDING`, and `SVG_POINTS`. These will be used to set default plot dimensions, padding, and data point resolution when the corresponding CLI flags are not provided.

- **Parameter Precedence:**
  - Parameters provided via CLI flags still take precedence over those set in the environment. 
  - Logging should indicate whether a parameter was set from CLI input or an environment variable, enhancing user feedback and debuggability.

## Technical Changes

- **Source File (`src/lib/main.js`):**
  - Add an import for `dotenv` and call `dotenv.config()` at the very beginning, before processing CLI arguments.
  - Extend the logic for setting `svgWidth`, `svgHeight`, and `padding` to check for environment variables if the CLI argument is missing.
  - Similarly, allow the `pointsArg` to default from an environment variable (`SVG_POINTS`) if not provided via CLI.
  - Update console logging to display the source (CLI vs environment) of the configuration values.

- **Test File (`tests/unit/main.test.js`):**
  - Include tests to simulate the cases when environment variables are set. Ensure that when CLI parameters are omitted, the application correctly retrieves defaults from the environment.
  - Validate that CLI provided values override the environment defaults.

- **Documentation (`README.md`):**
  - Update the README to include a section on using a `.env` file for configuration. Provide examples of how to set environment variables (e.g., `SVG_WIDTH=600`, `SVG_HEIGHT=400`).
  - Document the new behavior and how it interacts with CLI flags.

- **Dependencies (`package.json`):**
  - Confirm that `dotenv` is properly listed as a dependency, ensuring backwards compatibility and ease of installation.

## How to Test

1. Create a `.env` file with custom defaults (e.g., `SVG_WIDTH=600`, `SVG_HEIGHT=400`, `SVG_PADDING=30`, `SVG_POINTS=20`).
2. Run the CLI without specifying the corresponding parameters and verify that the output uses the environment-sourced values.
3. Run the CLI with explicit CLI parameters to check that these override the ones set in the `.env` file.
4. Run unit tests to confirm that both scenarios are handled correctly.

This update reinforces the mission of making the tool the go-to solution for formula visualizations by enhancing configurability and ease-of-use through environment variable support.