# CLI_DIAGNOSTICS Feature Update

## Overview
This feature updates the existing CLI_DIAGNOSTICS functionality to provide users with detailed system and configuration diagnostics. When the `--diagnostics` flag is supplied, the CLI tool will output diagnostic information such as the Node.js version, current environment variables, and the CLI arguments provided by the user, bypassing the standard plot generation. This enhancement increases the tool's usability in troubleshooting and validating system setups.

## Implementation
- **Source File (`src/lib/main.js`):**
  - Modify the main function to check if the `--diagnostics` flag is present in the arguments.
  - If detected, output diagnostic details including:
    - Node.js version (`process.version`)
    - Current environment variables (`process.env`)
    - Parsed CLI arguments for transparency
  - If the flag is not provided, continue with the regular plot generation flow.

- **Test File (`tests/unit/main.test.js`):**
  - Add new test cases to simulate CLI invocation with the `--diagnostics` flag.
  - Verify that the output contains the Node.js version, environment snapshot, and CLI argument details.
  - Ensure that regular plot generation tests remain unaffected.

- **Documentation Updates (`README.md`):**
  - Update the CLI usage section to include a description of the `--diagnostics` flag.
  - Provide examples showing how to invoke the diagnostics mode using:
    ```bash
    node src/lib/main.js --diagnostics
    ```

- **Dependencies:**
  - Utilize the already integrated `zod` library for parsing and validating CLI arguments. No additional dependencies are required.

## Benefits
- Empowers users with a quick way to diagnose system configuration and runtime parameters.
- Enhances troubleshooting by clearly presenting environment details and CLI argument parsing results.
- Maintains backward compatibility with existing features while enriching the utility of the CLI tool.

## Testing and Validation
- Run `npm test` to ensure both diagnostics mode and standard plot generation work as expected.
- Manually test using the command:
  ```bash
  node src/lib/main.js --diagnostics
  ```
  to verify that diagnostic information is correctly displayed.
