# CLI UTILITIES UPDATE: ENVIRONMENT OVERRIDES

This update refines the CLI utilities by adding robust support for environment variable overrides. It builds upon the existing version flag functionality while ensuring that if crucial CLI parameters are missing, their defaults can be supplied via environment variables.

## Overview

- Load environment variables from a `.env` file using the `dotenv` package at the very start of execution.
- For key parameters (`--expression`, `--range`, `--file`), check for corresponding environment variables if the CLI flag is not explicitly provided.
- CLI parameters, when provided, take precedence over any defaults in the environment.
- Update documentation and tests to cover the new behavior.

## Implementation Details

- **Source File (`src/lib/main.js`):**
  - At the top of the file, add `import dotenv from 'dotenv';` and call `dotenv.config();` to load any environment variables.
  - Before parsing CLI arguments, check if parameters like `expression`, `range`, and `file` are missing from the parsed CLI arguments. If missing, assign them from `process.env.PLOT_EXPRESSION`, `process.env.PLOT_RANGE`, and `process.env.PLOT_FILE` respectively.
  - Ensure that the rest of the CLI logic (validation, plotting, CSV export, etc.) remains intact.

- **Test File Updates (`tests/unit/main.test.js`):**
  - Add test cases that simulate omission of CLI arguments and verify that defaults are correctly loaded from the environment.
  - For example, remove the `--expression` flag and set `process.env.PLOT_EXPRESSION`, then check that the application uses the environment value.

- **README Updates (`README.md`):**
  - Update the CLI usage section to document that users can now override required CLI parameters using environment variables via a `.env` file.
  - Include an example snippet:

  ```sh
  # .env file example
  PLOT_EXPRESSION=y=cos(x)
  PLOT_RANGE=x=0:10,y=0:5
  PLOT_FILE=output.svg
  ```

- **Dependency File:**
  - No new dependencies are needed as `dotenv` is already included. Just ensure the `.env` support is documented.

## Benefits

- **Flexibility:** Users can configure default parameters in the environment, saving time and reducing CLI complexity when repeatedly using the tool.
- **Robustness:** Provides a fallback mechanism ensuring that missing parameters are handled gracefully.
- **Improved Documentation & Testing:** Reflects new behavior in tests and README, ensuring consistent user experience and easier maintenance.

This enhancement aligns with our mission of becoming the go-to plot library by providing a more flexible and user-friendly CLI experience.