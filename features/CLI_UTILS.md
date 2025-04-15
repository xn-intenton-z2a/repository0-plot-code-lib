# CLI UTILITIES ENHANCEMENT Update

This update expands the current CLI utilities enhancement by integrating a new `--version` flag. In addition to the existing diagnostic and plotting functionalities, the `--version` flag offers users a quick and straightforward way to display the application version as defined in `package.json`.

## Version Functionality

- **Flag Behavior:** When the CLI is invoked with the `--version` flag, the application should immediately read the version information from `package.json` and output it in the format `Version: x.y.z`.
- **Error Handling:** If there is an issue reading the version, the application must print an appropriate error message and gracefully exit with a non-zero status.

## Source File Updates

- **File Affected:** `src/lib/main.js`
- **Implementation Details:**
  - Add an early check in the argument processing to detect the presence of the `--version` flag.
  - If detected, import the `package.json` file to retrieve the version, output the version to the console, and exit the process immediately.
  - Ensure that this change does not interfere with other flags such as `--help`, `--diagnostics`, and plot generation.

## Test File Updates

- **File Affected:** `tests/unit/main.test.js`
- **Implementation Details:**
  - Add a new test case that simulates CLI invocation with the `--version` flag.
  - Verify that the output begins with `Version: ` and matches a semantic version pattern using regex.

## README Updates

- **File Affected:** `README.md`
- **Documentation Changes:**
  - Update the CLI usage section to include description and examples for the new `--version` flag.
  - Add a snippet that demonstrates: 
    ```sh
    node src/lib/main.js --version
    # Expected Output: Version: x.y.z
    ```

## Benefits

- **Quick Version Verification:** Users can promptly check the application version, easing both debugging and version management.
- **Improved Transparency:** Clear version output builds trust and helps ensure that the correct release of the application is in use.
- **Unified CLI Experience:** Consolidates version management with existing diagnostic and plotting functionalities, maintaining a clean and cohesive CLI interface.

## Compliance

- Changes are limited to source, test, README, and dependency files as per the contribution guidelines in `CONTRIBUTING.md`.
- The implementation aligns with the mission stated in `MISSION.md`, providing a reliable and user-friendly plot library CLI.
