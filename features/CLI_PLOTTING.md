# CLI_PLOTTING Enhancement with ENV Integration

## Overview
This update enhances the CLI_PLOTTING feature by adding full environment variable support. In addition to accepting CLI arguments, the tool will now also load a `.env` file using the `dotenv` library. When a CLI argument for parameters such as SVG width, height, padding, or the number of points is not provided, the tool will look for corresponding environment variable values. This allows users to set default plotting parameters easily without altering command line usage, while maintaining backward compatibility.

## Implementation Details
- **Source File (`src/lib/main.js`):**
  - **Load Environment Variables:**
    - At the top of the file, import dotenv:
      ```js
      import dotenv from 'dotenv';
      ```
    - Immediately after, initialize dotenv with:
      ```js
      dotenv.config();
      ```
  - **Default Parameter Fallback:**
    - Update parameter assignments for configurable settings. For example, replace:
      ```js
      const svgWidth = width || 500;
      ```
      with:
      ```js
      const svgWidth = width || (process.env.SVG_WIDTH ? parseInt(process.env.SVG_WIDTH, 10) : 500);
      ```
    - Apply similar changes for `svgHeight`, `padding`, and `points` as needed.
  - **Optional Logging (Debug Mode):**
    - Optionally, include logging to indicate if values were sourced from the environment, aiding in troubleshooting.

- **Test File (`tests/unit/main.test.js`):**
  - Add or modify tests to simulate environment variable settings. For example, set `process.env.SVG_WIDTH` and verify that when the `--width` CLI argument is omitted, the SVG width defaults to the environment value.
  - Ensure that tests for CLI functionality remain intact and cover both CLI and environment-sourced configurations.

- **README Update (`README.md`):**
  - Update the documentation to describe the environment variable configuration. Add a new section titled "Environment Variable Configuration" explaining how to create a `.env` file and list keys such as `SVG_WIDTH`, `SVG_HEIGHT`, `SVG_PADDING`, and `SVG_POINTS`.

- **Dependencies (`package.json`):**
  - Confirm that `dotenv` is included (e.g., `^16.4.7`) to support environment variable loading.

## Impact and Benefits
- **Increased Flexibility:** Users can now preset default plotting parameters via a `.env` file, reducing repetitive CLI arguments.
- **Backward Compatibility:** CLI arguments continue to override environment values, ensuring existing usage remains unaffected.
- **Enhanced Debuggability:** Optional logging can help confirm the source of each parameter, easing troubleshooting efforts.

This enhancement aligns with the repository's mission to become the "go-to plot library with a CLI" by making configuration more user-friendly and adaptable to various deployment environments.