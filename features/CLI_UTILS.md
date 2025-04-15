# CLI UTILITIES ENHANCEMENT UPDATE

This update refines and extends the CLI utilities of the repository. In addition to the existing functionalities (diagnostics, help, plot generation, and parameter validations), this update integrates a new `--version` flag for version reporting.

## Overview

- **Objective**: Enhance user experience by enabling users to quickly verify the application version from the CLI, while keeping all existing CLI functionalities intact.
- **Scope**: Modifications are limited to updating the source file (`src/lib/main.js`), test file (`tests/unit/main.test.js`), README (`README.md`), and `package.json` as necessary. No new files or deletion of existing files occur.

## Version Flag Functionality

- **Flag Behavior**: When the CLI is run with the `--version` flag, the application will read the version information from `package.json` and output it in the format `Version: x.y.z`, then exit with a status code of 0.

- **Implementation Details in Source File**:
  - Update `src/lib/main.js` to include an early check: if `--version` is present in the CLI arguments, then load `package.json` and output the current version.
  - Ensure that if `--version` is detected, the version is printed using `console.log` and the process exits immediately to avoid further processing of arguments.
  - This check must occur before validations of other flags to provide a quick version response.

## Test File Updates

- **File Affected**: `tests/unit/main.test.js`
  - Add new test cases to simulate CLI invocation with the `--version` flag.
  - Validate that the output string starts with `Version: ` and that the version format conforms to semantic versioning (e.g. using a regex pattern such as `/^Version: \d+\.\d+\.\d+$/`).

## README Updates

- **Documentation Changes**:
  - Update the CLI usage section in `README.md` to document the new `--version` flag with usage examples.
  - Include a code snippet demonstrating:

    ```sh
    node src/lib/main.js --version
    # Expected Output: Version: x.y.z
    ```

## Dependency and Code Integrity

- Ensure that the updated CLI remains compatible with Node 20 and ESM standards.
- Confirm that no additional libraries are needed; the existing dependencies such as `fs` can be used to read from `package.json`.
- Maintain compliance with the guidelines outlined in `CONTRIBUTING.md`, with code quality tests ensuring all functionalities (help, plot generation, CSV export, diagnostics, and new version reporting) operate as expected.

## Benefits

- **User-Friendly Version Check**: Quickly allows users to confirm the version of the application. Useful for debugging, support, and release verifications.
- **Cohesive CLI Experience**: Integrates version reporting along with existing CLI commands for a comprehensive and professional CLI tool.
- **Minimal Disruption**: Ensures that all existing CLI functionalities remain intact while adding additional value through version reporting.
