# ACCESS_LAYER

## Overview
This update refines the existing ACCESS_LAYER module to fully support a dedicated diagnostics mode alongside its CLI and web interface functionalities. In addition, this update introduces a new version information flag (`--version`) to provide users with quick access to the current version and dependency information, ensuring transparency and easier troubleshooting.

## Key Objectives
- **Diagnostics Mode Integration:**
  - Implement a command-line flag (`--diagnostics`) that outputs detailed system configuration, dependency, and runtime state information in both human-readable and JSON formats.
  - Integrate comprehensive error handling to log exceptions and warnings.

- **Version Information Flag:**
  - Introduce a new command-line flag (`--version`) that outputs the current version of the package (sourced from package.json) along with a summary of key dependency versions.
  - Ensure that version output is clear and formatted consistently with other CLI outputs.

- **Consistent Logging:**
  - Utilize the centralized structured logging approach for both diagnostics and version information outputs to maintain consistency across user interactions.

- **Seamless User Interface:**
  - Preserve existing interactive (`--interactive`) and web (`--serve`) modes while extending CLI functionalities without introducing additional complexity.

## Design & Implementation
### CLI Parser Enhancements
- **Flag Detection:**
  - Update the main CLI parser (in `src/lib/main.js`) to detect the new `--version` flag.
  - Branch early in the main function to handle the `--version` flag by reading package version info from package.json and outputting it.

### Diagnostics and Version Handlers
- **Diagnostics Handler:**
  - Route the `--diagnostics` flag to a diagnostics handler that aggregates system details, dependency versions, configuration settings, and logs summaries.

- **Version Handler:**
  - Implement a lightweight version handler that reads package.json and outputs the version, along with key dependency versions (e.g., express, mathjs, etc.).
  - Format the version information in a structured and user-friendly manner.

### Testing and Documentation
- **Unit Tests:**
  - Add test cases for verifying that the `--version` flag outputs correct version information.
  - Ensure test coverage for both standard output and error conditions.

- **Documentation:**
  - Update the README and CONTRIBUTING files to document the usage of both the `--diagnostics` and new `--version` flags.
  - Provide usage examples for both flags in the user documentation.

## Usage Examples
- **Version Information:**
  ```bash
  node src/lib/main.js --version
  ```

- **Diagnostics Mode:**
  ```bash
  node src/lib/main.js --diagnostics
  ```

This enhancement reinforces the mission of providing a versatile, reliable CLI tool for formula visualisation by improving system introspection and user transparency.