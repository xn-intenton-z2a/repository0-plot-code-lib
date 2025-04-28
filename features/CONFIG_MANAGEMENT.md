# CONFIG MANAGEMENT

## Overview
This feature is responsible for merging configuration values from multiple sources including environment variables, external JSON configuration files, and CLI flags. It supports recursive environment variable interpolation, runtime configuration reloading via SIGHUP, and now introduces a live file watcher for automatic configuration updates when the external configuration file changes.

## Implementation
- Load environment variables at startup using dotenv and support custom .env files via the --env flag.
- If a --config flag is provided, read the JSON configuration file and perform recursive interpolation of environment variable placeholders in its values.
- Validate the configuration using a Zod schema. If validations fail (for example, non-numeric values for numeric fields), throw clear error messages.
- Merge values from the configuration file with CLI flags, giving precedence to CLI flags.
- Implement a runtime reload mechanism by setting up a SIGHUP signal listener. On receiving SIGHUP, reload the configuration (including env interpolation and validation) and update the global configuration variable.
- NEW: Implement a file watcher using the Node FS watch API to monitor the configuration file. When a file change is detected, attempt to reload and validate the configuration automatically and log a success or error message. This provides a seamless live reload option without manual signal triggering.
- Update error logging to clearly indicate issues during both initial loading and live reloading of configuration.

## Testing
- Add unit tests to verify that environment variables are correctly interpolated in the configuration file values.
- Test that CLI flags correctly override configuration file values.
- Simulate SIGHUP signal in tests and verify that the configuration reloads correctly.
- Test the file watcher by modifying the configuration file during the test run, ensuring that the system automatically attempts a reload and logs appropriate messages.
- Validate that errors in JSON parsing or schema validation produce clear error messages during both initial load and live reload scenarios.

## Impact
This enhancement provides users with a robust and flexible configuration management system. By adding an automatic configuration file watcher, it reduces downtime and the need for manual interventions (such as sending SIGHUP) for configuration updates, thereby increasing operational flexibility. This aligns with the overall mission of improving user responsiveness and the library's core reliability.