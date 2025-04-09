# SYSTEM_MONITORING Feature Specification

## Overview
The SYSTEM_MONITORING feature consolidates our system health diagnostics and logging capabilities into a single, unified monitoring module. By merging the functionalities of the previous DIAGNOSTICS and LOGGING features, this update delivers comprehensive runtime insights including performance metrics, health checks, and robust log management with rotation. This alignment not only streamlines our CLI but also reinforces our mission of being the go-to plot library for formula visualisations.

## Implementation Details
### Unified CLI Flag Integration
- Introduce a unified flag (e.g., `--monitor`) in the main CLI (`src/lib/main.js`) to trigger the system monitoring routine.
- Ensure that using the flag does not interfere with standard execution modes (plotting, API, etc.).

### Health Checks & Performance Metrics
- **Environment Diagnostics:** Automatically retrieve key environment details (Node version, dependency versions, etc.).
- **Component Validation:** Evaluate critical components (PLOT_ENGINE, HTTP_API) by running test expressions and endpoint self-checks.
- **Performance Timers:** Utilize high-resolution timers (e.g., `process.hrtime`) to measure execution time and track resource usage (CPU, memory).
- **Automated Recommendations:** Analyze collected metrics to detect misconfigurations or performance bottlenecks and provide actionable guidance.

### Configurable Logging with Rotation
- **Runtime Logging:** Support logging through a unified API (`logEvent(level, message, options?)`) that can output in plain text or JSON format (activated via `--json-log`).
- **Log Rotation:** Monitor log file sizes (using `LOG_MAX_SIZE`) and automatically archive logs (by renaming with timestamps) when thresholds are exceeded.
- **Error Handling:** Ensure that file I/O errors during logging or rotation are managed gracefully without interrupting system monitoring.

### Output and Reporting
- **Consolidated Report:** Generate a detailed report that combines diagnostic health checks, performance metrics, and recent log entries.
- **Documentation Updates:** Revise README.md and CONTRIBUTING.md to include usage examples for the `--monitor` flag and instructions on configuring log rotation and log formats.

## Testing and Documentation
- Develop unit and integration tests that simulate the `--monitor` flag, verifying the accuracy and formatting of both diagnostic data and log rotation behavior.
- Update auto-completion scripts and CLI help output to reflect the new unified monitoring flag.

## Usage Examples
- **Unified System Monitoring:**
  - Command: `node src/lib/main.js --monitor`
  - Expected Output: A consolidated report including environment diagnostics, performance metrics, and recent log events.
- **JSON Log Formatting with Rotation:**
  - Command: `node src/lib/main.js --monitor --json-log`
  - Expected Behavior: Log entries are output in JSON format and log rotation is triggered when the file size exceeds the specified limit.
