# ACTIVITY_MANAGER Feature Specification (Enhanced with Unified Logging, Telemetry, History, and Dashboard)

## Overview
The ACTIVITY_MANAGER feature consolidates error logging, usage telemetry, and command history management into a single unified module. This enhancement not only streamlines diagnostic and tracking functionalities but also integrates a lightweight web dashboard to provide real-time insights into system events, user actions, and performance metrics. By merging the capabilities of the previous MONITORING and HISTORY_MANAGER features, ACTIVITY_MANAGER delivers comprehensive activity tracking aligned with our mission to be the go-to plot library for formula visualisations.

## Implementation Details
- **Single Source File:** Implement as a dedicated module (e.g., `src/lib/activityManager.js`) that replaces the existing MONITORING and HISTORY_MANAGER modules.

- **Unified Logging and Telemetry:**
  - Capture errors, warnings, and informational events from CLI commands, HTTP endpoints, and background tasks.
  - Collect usage data including command frequency, performance metrics (e.g., plot generation timings), and other operational statistics.
  - Provide CLI flags such as `--view-logs` and `--usage-stats` to inspect recent logs and telemetry data.

- **Command History Management:**
  - Record and store command executions into a JSON-based history log with support for detailed metadata (timestamps, parameters, tags).
  - Include a recycle bin mechanism for non-permanent deletion and enabling undo actions via CLI commands (e.g., `--undo-history <record_id>`).

- **Web Dashboard Integration:**
  - Launch a lightweight HTTP server (leveraging Express) to expose a dashboard endpoint (e.g., `/dashboard`).
  - The dashboard displays real-time metrics, error logs, and command history, offering filtering and search capabilities.
  - Optionally, allow dashboard actions such as manual log clearance or history restoration.

- **Configuration and Validation:**
  - Utilize JSON configuration files and environment variables for setting log levels, retention periods, and dashboard parameters.
  - Validate data integrity using libraries such as zod to ensure robust operation.

## Testing and Documentation
- **Unit and Integration Tests:**
  - Develop tests simulating error conditions, telemetry data collection, and history management operations.
  - Test the web dashboard endpoints to ensure correct data presentation and responsiveness.

- **Documentation Updates:**
  - Update README.md and CONTRIBUTING.md with usage examples for the unified logging, telemetry, history, and dashboard functionalities.
  - Provide troubleshooting guidelines and API references for all new CLI flags and HTTP endpoints.

## Benefits
- **Centralized Monitoring:** Combines all activity tracking features into a single module, reducing maintenance overhead and improving diagnostic efficiency.
- **Real-time Insights:** The integrated web dashboard provides immediate access to performance metrics and system logs, facilitating proactive problem detection.
- **Enhanced Data Safety:** The recycle bin and undo functionalities ensure that command history remains secure and recoverable, minimizing accidental data loss.

## Summary
ACTIVITY_MANAGER represents a strategic consolidation of previously separate monitoring and history management capabilities. By merging these aspects and introducing a real-time dashboard, the feature delivers a powerful, unified approach to activity tracking that enhances user experience and aligns perfectly with our mission.
