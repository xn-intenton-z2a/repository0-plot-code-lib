# LOGGING Feature Specification

## Overview
The LOGGING feature introduces a robust logging system to capture runtime events, errors, and user interactions comprehensively. In this update, we add support for log rotation to manage file sizes and ensure long-term maintainability. This enhancement allows the logging utility to seamlessly switch between plain text and JSON-formatted logs, aiding automated log processing and troubleshooting while reinforcing our mission of delivering a reliable, user-friendly plotting tool.

## Implementation Details
### CLI Integration
- Extend the existing `--log` flag in the main CLI (`src/lib/main.js`) to include an optional `--json-log` flag. When enabled, all log entries will be formatted as JSON objects with standardized keys (timestamp, level, message).
- Allow configuration via environment variables, for example, `LOG_FILE`, `LOG_LEVEL`, and `LOG_MAX_SIZE` (max file size in bytes before rotation begins).

### Logging Core
- Use Node’s built-in `fs` module for file I/O to append log entries. When `--json-log` is enabled, each log entry will be written as a JSON string terminated by a newline.
- Maintain log levels (INFO, WARN, ERROR) and include timestamps for every entry.
- **Log Rotation:**
  - Monitor the log file size during write operations.
  - When the log file exceeds the threshold specified by `LOG_MAX_SIZE`, rename the current log file (e.g., append a timestamp or incrementing counter) and create a new log file for subsequent entries.
  - Ensure that rotation happens without losing any log data, and handle file I/O errors gracefully.

### Programmatic Access
- Expose a utility function (e.g., `logEvent(level, message, options?)`) for use across CLI commands and library functions. This function will format messages according to the active logging mode (plain text or JSON) and handle file writes and rotation seamlessly.

## Testing and Documentation
### Testing
- Develop unit tests simulating CLI calls with both `--log` and `--json-log` flags, verifying correct log formatting and that log rotation triggers appropriately when file size limits are reached.
- Test for file I/O errors and ensure that log rotation does not interrupt core application functionality.

### Documentation
- Update README.md and CONTRIBUTING.md with detailed instructions on enabling and configuring both plain text and JSON logging modes, including setting up log rotation through environment variables.
- Provide usage examples demonstrating how to trigger log rotation and switch between log formats.

## Usage Examples
- **Plain Text Logging:**
  - Command: `node src/lib/main.js --plot "sin(x)" --log`
- **JSON Logging with Rotation:**
  - Command: `node src/lib/main.js --plot "sin(x)" --log --json-log`
  - Ensure `LOG_MAX_SIZE` is defined in the environment (e.g., `export LOG_MAX_SIZE=1048576` for a 1MB threshold).

This update enhances the observability and maintainability of our application by introducing efficient log management and ensuring that our logging subsystem remains robust even under heavy use.