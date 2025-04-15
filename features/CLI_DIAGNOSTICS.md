# CLI_DIAGNOSTICS Feature Update with Version Info

## Overview
This update enhances the existing CLI diagnostics functionality by adding a new `--version` flag. When this flag is provided, the CLI tool will output the current version of the plot library (sourced from the package.json) along with the existing diagnostic details such as Node.js version, environment variables, and CLI arguments. This extension provides users with immediate version information, aiding in troubleshooting and ensuring compatibility.

## Implementation
- **Source File (`src/lib/main.js`):**
  - **Argument Parsing:** Extend the `parseArgs` function to recognize the `--version` flag and set a version indicator in the options object.
  - **Diagnostics Update:** In the main function, before proceeding with any other actions, check if the `--version` flag is present. If so:
    - Read the version field from `package.json` (using an appropriate synchronous file read or import method).
    - Output the version information along with diagnostics (Node.js version, environment variables, and parsed CLI arguments).
    - Terminate the process after printing version details.
  
- **Test File (`tests/unit/main.test.js`):**
  - Add new test cases that simulate CLI invocation with the `--version` flag.
  - Verify that the output contains the package version and other relevant diagnostic details.

- **Documentation Updates (`README.md`):)**
  - Update the CLI usage section to include the new `--version` flag.
  - Provide examples showing how to invoke the version information: 
    ```bash
    node src/lib/main.js --version
    ```

## Benefits
- **Enhanced Diagnostics:** Users can quickly retrieve the current version of the tool, facilitating support and troubleshooting.
- **Improved Transparency:** By combining version info with system diagnostics, users have a comprehensive snapshot of their runtime environment.
- **Ease of Use:** This feature makes it simpler to verify installation details, particularly useful when reporting issues or confirming updates.

## Testing and Validation
- Run `npm test` to ensure that both diagnostics and version info are correctly output.
- Manually test using:
  ```bash
  node src/lib/main.js --version
  ```
  to verify that the version information (as well as other diagnostics if needed) is displayed as expected.