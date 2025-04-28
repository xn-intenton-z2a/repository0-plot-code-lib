# CONFIG MANAGEMENT

## Overview
This feature is responsible for merging configuration values from multiple sources: environment variables (via dotenv), external JSON configuration files, and CLI flags. It now includes enhanced environment variable interpolation and runtime configuration reloading via the SIGHUP signal. This ensures that changes made in the configuration file (including dynamic values injected from environment variables) can be applied on the fly without restarting the application.

## Implementation
- Load environment variables at startup using dotenv. If a custom .env file is specified using the --env flag, load from that path.
- If the --config flag is provided, read the JSON configuration file and perform recursive interpolation of environment variable placeholders in string values.
- Validate the configuration using a Zod schema. If validations fail (for example, non-numeric values for numeric fields), throw explicit error messages.
- Merge the configuration file values with CLI flags, with CLI flags having higher precedence.
- Implement a runtime reloading mechanism by setting up a SIGHUP signal listener. On receiving SIGHUP, reload the configuration (including env interpolation and validation) and update the global configuration variable.
- Update error logging to clearly indicate issues during both initial loading and runtime reloading of configuration.

## Testing
- Update and add tests in the unit test files to verify that environment variables are correctly interpolated in the configuration file values.
- Test that CLI flags override the file configuration properly.
- Simulate a SIGHUP signal in tests and check that the runtime configuration is reloaded without needing to restart the server.
- Validate that errors in JSON parsing or value validation produce clear error messages both at startup and during reload.

## Impact
This enhancement provides users with a robust and flexible configuration management system which simplifies the process of updating configuration parameters on the fly. It directly supports the library's mission by increasing operational flexibility and responsiveness to runtime demands.