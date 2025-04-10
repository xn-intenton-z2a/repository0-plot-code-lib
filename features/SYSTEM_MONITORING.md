# SYSTEM_MONITORING Feature Specification (Enhanced with Unified Error Handling)

## Overview
This feature consolidates our system health diagnostics, performance monitoring, and now unified error handling into a single, cohesive module. The updated SYSTEM_MONITORING provides comprehensive runtime insights including performance metrics, health checks, and centralized error management. This enhancement reinforces our mission to be the go-to plot library by ensuring that both planned operations and unexpected failures are logged and diagnosed in a consistent manner across CLI, HTTP API, and internal library usage.

## Implementation Details
### Unified CLI Flag Integration
- Introduce a unified flag (e.g., `--monitor`) in the main CLI (`src/lib/main.js`) to trigger the monitoring routine.
- The routine now also traps and logs unhandled errors during execution, without interfering with core plotting or API functionalities.

### Health Checks & Performance Metrics
- **Environment Diagnostics:** Automatically retrieve key environment details (Node version, dependency versions, etc.).
- **Component Validation:** Evaluate critical components (PLOT_ENGINE, HTTP_API) by running self-checks and sample expressions or endpoint calls.
- **Performance Timers:** Use high-resolution timers to measure execution time and track resource usage such as CPU and memory.
- **Automated Recommendations:** Analyze collected metrics to detect misconfigurations or performance bottlenecks and provide actionable guidance.

### Unified Error Handling
- **Centralized Error Capture:** Integrate a centralized error handling mechanism that intercepts errors in both synchronous and asynchronous operations. 
- **HTTP API Middleware:** Implement error-handling middleware for the Express server to log errors, return clear HTTP status codes, and include diagnostic details when appropriate.
- **CLI Integration:** Wrap CLI command dispatch with try/catch blocks to capture unexpected errors, log them using the unified logging API, and output helpful messages.
- **Consistent Messaging:** Standardize error messages across CLI and HTTP endpoints, using descriptive messages and incorporating stack traces in debug mode.

### Configurable Logging with Rotation
- **Runtime Logging:** Support logging through a unified API (`logEvent(level, message, options?)`) that outputs in plain text or JSON format (activated via `--json-log`).
- **Log Rotation:** Monitor log file sizes and automatically archive logs with timestamped filenames when size thresholds are exceeded.
- **Seamless Integration:** Ensure that error events and performance metrics are captured under the same logging strategy, facilitating unified monitoring.

## Testing and Documentation
- **Unit and Integration Tests:** Develop tests that simulate error scenarios to ensure that the error handling mechanism correctly captures and logs exceptions. Also, validate that the monitoring flag outputs consolidated diagnostics, including health checks, performance metrics, and logged errors.
- **Documentation Updates:** Update README.md and CONTRIBUTING.md with examples of how to use the `--monitor` flag, interpret diagnostic reports, and configure log rotation and error logging.

## Usage Examples
- **Standard System Monitoring:**
  - Command: `node src/lib/main.js --monitor`
  - Expected Output: A consolidated report including environment diagnostics, performance metrics, and any errors captured during execution.
- **JSON Log Output and Error Reporting:**
  - Command: `node src/lib/main.js --monitor --json-log`
  - Expected Behavior: Log entries output in JSON format with detailed error information, and automatic log rotation triggered on size thresholds.

## Summary
By enhancing SYSTEM_MONITORING with unified error handling, the repository now offers a robust diagnostics module that ensures reliability and ease-of-debugging across both local and remote operations. This update strengthens our platform's resilience and aligns with our mission to be the go-to plotting library for formula visualisations.