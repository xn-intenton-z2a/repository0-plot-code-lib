# CLI UTILITIES ENHANCEMENT UPDATE

This update refines and extends the CLI utilities of the repository. In addition to the existing functionalities (diagnostics, help, plot generation, and parameter validations), this update integrates a new `--version` flag for version reporting.

## Overview

- **Objective**: Enhance user experience by enabling users to quickly verify the application version from the CLI.
- **Scope**: Modifications are limited to the source file (`src/lib/main.js`), test file (`tests/unit/main.test.js`), README (`README.md`), and dependencies if necessary. No new files or deletion of existing files will occur.

## Version Flag Functionality

- **Flag Behavior**: When the CLI is run with the `--version` flag, the application will read the version information from `package.json` and output it in the format `Version: x.y.z`, then exit immediately.

- **Implementation Details in Source File**:
  - Update `src/lib/main.js` to include an early check for the `--version` flag in the CLI arguments.
  - On detection, import and parse `package.json` to extract the version.
  - Output the version via `console.log` and exit the process with status 0.
  - Ensure that existing functionality (e.g., `--help`, `--diagnostics`, plotting, and evaluation) remains unaffected.

## Test File Updates

- **File Affected**: `tests/unit/main.test.js`
  - Add a new test case to simulate CLI invocation with the `--version` flag.
  - Validate that the CLI outputs a string starting with `Version: ` and that the version matches a semantic versioning pattern (using regex).

## README Updates

- **Documentation Changes**:
  - Update the CLI usage section to document the new `--version` flag with examples.
  - Add a code snippet demonstrating:

    ```sh
    node src/lib/main.js --version
    # Expected Output: Version: x.y.z
    ```

## Compliance and Benefits

- **Compliance**: The changes adhere to the guidelines in `CONTRIBUTING.md` by limiting updates to allowed files.
- **Benefits**:
  - **User-Friendly Version Check**: Enables users to quickly confirm the version of the application, which is useful for debugging and release verification.
  - **Cohesive CLI Experience**: Consolidates version management along with other CLI commands, ensuring a seamless command-line interface.
