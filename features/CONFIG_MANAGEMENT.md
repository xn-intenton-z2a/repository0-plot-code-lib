# CONFIG MANAGEMENT

## Overview
This updated configuration management feature not only merges values from environment variables, JSON configuration files, and CLI flags but also now includes an automatic file watcher to monitor the configuration file for changes. When any change is detected, the configuration is automatically reloaded, validated, and merged with CLI overrides. This reduces downtime and further enhances operational flexibility.

## Implementation Details
- Continue to load and interpolate environment variables using dotenv with support for custom .env files via the --env flag.
- Merge configuration values from an external JSON config file (if provided through --config) with CLI flags. The JSON is validated against a Zod schema that now also includes new numeric and string validations for additional parameters.
- New: Setup a file watcher using the Node FS watch API targeting the provided configuration file. This watcher listens for change events and automatically triggers reloading and revalidation of the config. A success or error message is logged on each reload attempt.
- Retain support for runtime configuration reloading via SIGHUP in server mode. This update complements the file watching capability to ensure that configuration remains current without manual SIGHUP signals.
- Errors in configuration parsing, interpolation, or file watching events produce clear, descriptive error messages. CLI flags always take precedence over the configuration file values.

## Testing
- Unit tests simulate changes to the configuration file and verify that the file watcher triggers a reload. The tests ensure that environment variable interpolation continues to work in real-time.
- Tests for invalid JSON, malformed configurations, or invalid numeric values are maintained and expanded to include scenarios during live file modifications.
- Verify that both SIGHUP-triggered reloads and file watcher triggered reloads result in updated global configuration without requiring process restarts.

## Impact
This improvement ensures that configuration changes are picked up immediately, which minimizes manual intervention and potential downtime. The seamless integration of an automatic file watcher into the configuration management system enhances the library's core reliability and responsiveness. This update is aligned with the mission to be a go-to plot library with robust operational flexibility.