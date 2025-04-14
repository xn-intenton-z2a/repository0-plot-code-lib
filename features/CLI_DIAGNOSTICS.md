# CLI_DIAGNOSTICS Feature Update

## Overview
This feature update enhances the current CLI parser by implementing a fully functional `--diagnostics` flag. When activated, the CLI will output detailed diagnostic information including the Node.js version, environment variables snapshot, and current configuration details. This aligns with our mission to provide reliable and user-friendly tooling that helps users quickly troubleshoot and verify their setups.

## Implementation
- **Source File (src/lib/main.js):**
  - Integrate the `zod` library to validate CLI arguments and explicitly recognize the `--diagnostics` flag.
  - When the flag is detected, bypass the normal processing and output system diagnostic details such as:
    - Node.js version (using process.version)
    - A snapshot of relevant environment variables
    - Current configuration parameters (if any)
  - Preserve backward compatibility by maintaining existing functionality for other CLI flags.

- **Test File (tests/unit/main.test.js):**
  - Add new test cases to simulate CLI invocation with the `--diagnostics` flag.
  - Validate that the output contains the expected diagnostic details without causing errors.

- **README File (README.md):**
  - Update the documentation to include detailed usage instructions and examples for the `--diagnostics` flag, including expected output.

- **Dependencies (package.json):**
  - Ensure that any dependency updates (particularly around `zod`) are compatible with this feature.

## Benefits
- Provides a direct method for users and developers to validate their environment and configuration.
- Enhances troubleshooting by delivering comprehensive system diagnostics.
- Maintains backward compatibility while extending functionality, thereby reinforcing our mission of reliability and accessibility.
