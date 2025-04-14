# CLI_PLOTTING with ENV OVERRIDES

This update enhances the existing CLI_PLOTTING feature by properly integrating support for environment variable configuration using the `dotenv` package. The feature will now load plotting defaults from a `.env` file when CLI arguments for dimensions, padding, or data points are not provided by the user.

## Overview

- **Environment Variable Loading:**
  - Import and invoke `dotenv.config()` at the very start of the source file (`src/lib/main.js`).
  - Check for the following environment variables if the corresponding CLI argument is omitted:
    - `SVG_WIDTH`: Default SVG width.
    - `SVG_HEIGHT`: Default SVG height.
    - `SVG_PADDING`: Default padding value for scaling the plot.
    - `SVG_POINTS`: Default number of data points along the x-axis.
  - CLI provided values take precedence over any values specified in the environment.
  - Console logging should indicate whether a parameter value was sourced from CLI or the environment, improving debuggability.

- **Integration Points:**
  - **Source File (`src/lib/main.js`):**
    - At the top of the file, add `import dotenv from 'dotenv';` and call `dotenv.config();` before any CLI argument processing.
    - Update the assignment of `svgWidth`, `svgHeight`, `padding`, and `pointsArg` to first check for a corresponding environment variable if the CLI argument is not provided. For example:
      ```js
      const svgWidth = widthArg || (process.env.SVG_WIDTH ? parseInt(process.env.SVG_WIDTH, 10) : 500);
      ```
    - Log the source of configuration values (e.g., "Using environment SVG_WIDTH=600" if applicable).

  - **Test File (`tests/unit/main.test.js`):**
    - Add unit tests to simulate scenarios where environment variables are set. Ensure that when CLI parameters are omitted, the code correctly picks up values from the environment.
    - Validate that explicitly provided CLI values override the environment defaults.

  - **Documentation (`README.md`):**
    - Update the documentation to include a section on using a `.env` file. Provide examples such as:
      ```bash
      SVG_WIDTH=600
      SVG_HEIGHT=400
      SVG_PADDING=30
      SVG_POINTS=20
      ```
    - Describe how the tool prioritizes CLI arguments over environment variables.

  - **Dependencies (`package.json`):**
    - Ensure `dotenv` is listed as a dependency so that users can benefit from easy configuration via a `.env` file.

## How to Test

1. Create a `.env` file with custom defaults (e.g., `SVG_WIDTH=600`, `SVG_HEIGHT=400`, `SVG_PADDING=30`, `SVG_POINTS=20`).
2. Run the CLI without specifying the corresponding parameters to verify that the output uses the environment-sourced values.
3. Run the CLI with explicit CLI parameters to ensure these override the environment defaults.
4. Update unit tests accordingly and confirm all tests pass.

This update aligns with our mission of being the go-to plot library by providing enhanced configurability and a user-friendly experience through flexible environment variable support.