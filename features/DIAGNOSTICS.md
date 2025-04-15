# Diagnostics Feature

This feature introduces a diagnostics mode to the CLI that outputs key runtime information, aiding in debugging and system validation. With the diagnostics flag, the application will output details such as the Node.js version, basic dependency information, and environment variables status.

## Implementation Changes

- **Source File (`src/lib/main.js`):**
  - Check if the `--diagnostics` flag is present among the CLI arguments. If present, display the current Node version (using `process.version`), and confirm that essential dependencies (e.g., `zod`) are loaded properly.
  - Terminate execution after showing diagnostics information.

- **Test File (`tests/unit/main.test.js`):**
  - Add new tests that invoke the CLI with the `--diagnostics` flag.
  - Verify that the output contains expected diagnostics information, such as the Node version and a diagnostics confirmation message.

- **README.md Updates:**
  - Add a new section under **Usage** that documents the diagnostics mode:
    - How to run diagnostics (e.g., `node src/lib/main.js --diagnostics`).
    - An example output snippet illustrating the diagnostic information provided.

- **Dependencies File (`package.json`):**
  - No dependency changes are required, but ensure that the modifications remain compatible with Node 20 and ESM standards.

## Benefits

- **Improved Troubleshooting:** Enables users and developers to quickly assess the environment and dependency status.
- **User Confidence:** Provides clear system feedback, aligning with the mission to be a go-to plot library by ensuring robustness in various environments.
- **Consistency:** Enhances the CLI by providing additional support for diagnostics without bloating the core functionality.
