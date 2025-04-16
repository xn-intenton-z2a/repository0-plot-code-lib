# CLI_IMPROVEMENTS Update

This update consolidates all CLI related enhancements into a single robust feature. It implements not only the existing help and maintenance checks but also introduces a new diagnostics mode, which outputs runtime diagnostics information in JSON format. This ensures that users have immediate access to system and version details when needed.

## Overview

- **Help Support:** Retains support for the `--help` flag. When invoked, the tool displays detailed usage instructions and exits without processing further arguments.
- **Maintenance Check:** Continues to check for the `--maintenance` flag. When present, the feature outputs a maintenance error message and halts further processing.
- **Diagnostics Mode:** Implements a new `--diagnostics` flag. When provided, the CLI outputs JSON-formatted diagnostic information including the current package version (sourced from package.json) and the Node.js runtime version. This mode is crucial for debugging and verifying the environment setup.

## Source Code Changes

- Update `src/lib/main.js`:
  - Add a new check at the beginning of the main function to detect the `--diagnostics` flag. If detected, gather diagnostic information (e.g., package version and Node.js version) and output this information in valid JSON format before exiting.
  - Ensure the new diagnostics check is placed before further processing of other CLI options.
  - Maintain existing functionalities for help display and maintenance issues.
  
  Example code snippet:
  ```js
  if (options.diagnostics) {
    // Import package.json version if needed or use a hard-coded version
    const pkgVersion = "1.2.0-0";
    const diagnosticsInfo = {
      version: pkgVersion,
      nodeVersion: process.version
    };
    console.log(JSON.stringify(diagnosticsInfo));
    return;
  }
  ```

## Testing Enhancements

- In `tests/unit/main.test.js`:
  - Add a new test case to confirm that running the CLI with `--diagnostics` produces valid JSON output containing at least `version` and `nodeVersion` keys.
  - Update existing tests (if needed) to ensure that introducing diagnostics does not interfere with help or maintenance functionalities.

## Documentation Updates

- Update the `README.md` under the CLI Usage section:
  - Include a new subsection for Diagnostics Mode:
    - Describe that invoking `node src/lib/main.js --diagnostics` will output a JSON object with diagnostic information.
    - Provide an example command and show expected output.

## Alignment with Mission & Contributing Guidelines

- **Mission Compliance:** This improvement supports our mission by further enhancing the accessibility and debuggability of the CLI tool, making it easier for users to verify tool status and runtime conditions.
- **Contributing Guidelines:** All modifications are confined to existing repository files (source code, tests, README, and dependencies). The new diagnostics feature follows the coding style and standards, includes thorough test coverage, and is well-documented.
