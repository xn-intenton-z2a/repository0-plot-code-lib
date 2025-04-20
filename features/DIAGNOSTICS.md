# DIAGNOSTICS Feature Update

This feature introduces a new `--diagnostics` flag to the CLI tool. When enabled, the tool prints out important environmental and configuration details to help users and developers diagnose issues.

## Overview
- Enhance the CLI in `src/lib/main.js` to detect the `--diagnostics` flag among the command-line arguments.
- When `--diagnostics` is present, output diagnostic information including:
  - The current Node.js version (`process.version`).
  - The list of command-line arguments.
  - The version information from `package.json` (if accessible).
  - A summary of recognized CLI flags (e.g., `--stats`, `--expression`, `--range`, `--file`).
- Ensure that this diagnostic output does not interfere with the normal operation of other features.

## Implementation Details
### Source Code Changes (src/lib/main.js)
- Update the `main` function to check for the presence of `--diagnostics` in the argument list.
- If found, gather diagnostic data and print it to the console before executing the normal flow.
- Use simple checks and Node.js built-in methods (e.g., `process.version` and `process.argv`) to generate diagnostics.

### Test Enhancements (tests/unit/main.test.js)
- Add tests to simulate running the CLI with the `--diagnostics` flag. The tests should verify that the console output includes:
  - The Node.js version string.
  - The provided command-line arguments.
  - Any other expected diagnostic messages.

### Documentation Updates (README.md)
- Update the README to document the `--diagnostics` flag.
- Include usage examples, e.g.:
  ```sh
  node src/lib/main.js --diagnostics
  ```
  This command will produce a diagnostic report containing system and configuration details.

### Dependency File (package.json)
- No new dependencies are required for this feature.
- Optionally, update the `scripts` section to emphasize the existence of the diagnostics option (if not already documented).

## Conformance with Mission and Guidelines
- This feature strengthens our commitment to being a user-friendly tool and aligns with the mission of providing clear insights into the operations of the CLI.
- The changes are limited to the source file, test file, README file, and an optional minor update in the dependencies file, conforming to the repository guidelines.
