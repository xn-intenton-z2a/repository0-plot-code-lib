# CLI_OVERRIDES Feature Consolidation

This feature merges and refines the existing CLI utilities and environment overrides implementations into a single, cohesive behavior. It ensures that the CLI tool loads environment variables from a `.env` file to provide fallback values for crucial parameters while also maintaining robust argument parsing and validation.

## Overview

- **Environment Variable Loading:** At startup, the CLI will load environment variables using the `dotenv` package. This enables users to define default values for key parameters in a `.env` file.

- **Parameter Overrides:** For essential CLI flags such as `--expression`, `--range`, and `--file`, if the user omits these parameters on the command line, their values will be pulled from corresponding environment variables (`PLOT_EXPRESSION`, `PLOT_RANGE`, and `PLOT_FILE`). When provided on the command line, these flags take precedence over the environment defaults.

- **Documentation & Testing Enhancements:** The README and test files will be updated to document and validate the new unified behavior. Examples will show how to override parameters via a `.env` file, and tests will simulate scenarios where CLI arguments are partially or fully omitted.

## Implementation Details

- **Source File (`src/lib/main.js`):**
  - At the very top, import `dotenv` and call `dotenv.config();` to ensure all environment variables are loaded.
  - After parsing the CLI arguments, check if parameters like `expression`, `range`, or `file` are missing. If so, assign their values from `process.env.PLOT_EXPRESSION`, `process.env.PLOT_RANGE`, and `process.env.PLOT_FILE` respectively.
  - Ensure the existing validations (using `zod`) and further processing follow seamlessly.

- **Test File Updates (`tests/unit/main.test.js`):**
  - Add or update test cases to simulate the absence of certain CLI flags while setting the corresponding environment variables. Verify that the application correctly loads fallback values.

- **README File Updates (`README.md`):**
  - Update CLI usage instructions to highlight that users can override key parameters using environment variables defined in a `.env` file.
  - Include an example snippet:

    ```sh
    # .env file example
    PLOT_EXPRESSION=y=cos(x)
    PLOT_RANGE=x=0:10,y=0:5
    PLOT_FILE=output.svg
    ```

## Benefits

- **Flexibility:** Users can configure default parameters in their environment, reducing the need to repeatedly specify common values.
- **Robustness:** The fallback mechanism ensures that missing parameters are handled gracefully, aligning with the mission of making the CLI tool more user-friendly and resilient.
- **Maintainability:** Consolidating related features into one reduces duplication and simplifies future enhancements.
