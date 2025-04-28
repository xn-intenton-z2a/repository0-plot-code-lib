# CONFIG MANAGEMENT

## Overview
This update enhances the configuration management feature by incorporating a verbose logging mode. When the CLI flag --verbose is provided, additional detailed logs are printed during configuration loading, runtime reloading, expression parsing, and plot generation. This extra diagnostic output helps users and developers quickly identify issues with configuration interpolation, environment variable substitution, and overall processing of CLI inputs.

## Implementation
- Update the main function to check if the CLI flag --verbose is present.
- If verbose mode is enabled, output additional logging messages for each major step:
  - When loading and merging configuration from a file and CLI flags.
  - When interpolating environment variables and validating configuration parameters.
  - During the expression validation and evaluation phase in computePlotData.
  - When runtime configuration is reloaded via SIGHUP signal in server mode.
- The verbose option does not alter functionality but provides insights on choices made, fallback defaults applied, and errors encountered.
- Log outputs should clearly indicate the processing stage and the corresponding values or decisions taken by the configuration management code.

## Testing
- Unit tests in tests/unit/configManagement.test.js and tests/unit/main.test.js are updated to simulate the presence of the --verbose flag and assert that additional log messages are printed. This is achieved by capturing console output and verifying that expected verbose messages appear.
- New tests verify that when the --verbose flag is omitted, verbose logging is not printed, ensuring that the output remains clean for typical production usage.

## Impact
- Provides enhanced transparency during configuration loading and runtime reloads.
- Improves usability by allowing easier debugging of environment variable interpolation, JSON config merging, and error reporting.
- The verbose logging mode directly supports the mission of making the library a clear and reliable go-to tool for plot generation by quickly revealing processing details to the user.