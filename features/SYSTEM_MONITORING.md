# SYSTEM_MONITORING Feature Specification (Enhanced with Unified Error Handling and External Log Streaming)

## Overview
This feature consolidates our system health diagnostics, performance monitoring, and unified error handling into a single, cohesive module. With this update, SYSTEM_MONITORING not only provides detailed runtime insights including performance metrics, health checks, and error logging but also introduces an external log streaming capability. This enhancement reinforces our mission to be the go-to plot library by ensuring that both planned operations and unexpected failures are logged, analyzed, and (optionally) streamed to external monitoring services.

## Implementation Details
### Unified CLI Flag Integration
- Introduce a unified flag (e.g., `--monitor`) in the main CLI (`src/lib/main.js`) to trigger the monitoring routine.
- Trap and log unhandled errors in both synchronous and asynchronous operations without interfering with core plotting or API functionalities.

### Health Checks & Performance Metrics
- **Environment Diagnostics:** Automatically retrieve key environment details (Node version, dependency versions, etc.).
- **Component Validation:** Evaluate critical components (PLOT_ENGINE, HTTP_API) by running self-checks including sample expressions or endpoint calls.
- **Performance Timers:** Use high-resolution timers to measure execution time and track resource usage such as CPU and memory.
- **Automated Recommendations:** Analyze collected metrics to detect misconfigurations or performance bottlenecks and provide actionable guidance.

### Unified Error Handling
- **Centralized Error Capture:** Implement a centralized error handling mechanism to intercept errors across CLI, HTTP API, and library usage.
- **HTTP API Middleware:** Include error-handling middleware for the Express server to log errors, return clear HTTP status codes, and provide diagnostic details.
- **Consistent Messaging:** Provide standardized, descriptive error messages and, in debug mode, include stack traces.

### Configurable and Streamlined Logging
- **Runtime Logging API:** Support logging via a unified API (`logEvent(level, message, options?)`) that outputs in plain text or JSON.
- **Log Rotation:** Monitor log file sizes and automatically archive logs with timestamped filenames when size thresholds are exceeded.

## External Log Streaming
- **Stream Configuration:** Allow users to configure external log streaming settings via configuration files or environment variables. Settings include the endpoint URL, authentication tokens, and streaming formats.
- **Streaming Integration:** Implement an optional module that streams real-time log events to supported external monitoring services (e.g., Logstash, Fluentd) or custom endpoints.
- **Fallback and Resilience:** Ensure that if streaming fails (network issues, authentication errors), logs are still archived locally without interrupting the application's operation.
- **Unified Log Interface:** Integrate the streaming module with the existing logging API so that all log events (including health checks and error logs) are eligible for external streaming.

## Testing and Documentation
- **Unit and Integration Tests:** Develop tests to simulate error scenarios, validate the comprehensive diagnostics reported via the `--monitor` flag, and verify that external log streaming configurations work as expected.
- **Documentation Updates:** Update README.md and CONTRIBUTING.md with detailed examples on how to enable and configure external log streaming, interpret diagnostic reports, and understand log rotation behavior.

## Usage Examples
- **Standard System Monitoring:**
  - Command: `node src/lib/main.js --monitor`
  - Expected Output: Consolidated report with environment diagnostics, performance metrics, and any captured errors.
- **JSON Log Output with Streaming Enabled:**
  - Command: `node src/lib/main.js --monitor --json-log`
  - Expected Behavior: Log entries output in JSON format with detailed error information and real-time streaming to the configured endpoint. Automatic log rotation is also triggered on size thresholds.

## Summary
By enhancing SYSTEM_MONITORING with unified error handling and a new external log streaming capability, the repository now offers a robust diagnostics module that ensures reliability and ease-of-debugging across both local and remote operations. This update not only improves monitoring and performance tuning but also facilitates integration with external logging and monitoring tools, strengthening the platform's resilience and aligning with our mission of being the go-to plot library for formula visualisations.