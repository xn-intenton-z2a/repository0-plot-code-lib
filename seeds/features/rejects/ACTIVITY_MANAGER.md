# ACTIVITY_MANAGER Feature Specification (Enhanced with Diagnostics)

## Overview
This feature consolidates error logging, usage telemetry, and command history management into a unified module. In addition to its core responsibilities of tracking user actions, system events, and performance metrics via a lightweight web dashboard, this update integrates a comprehensive diagnostics mode. The diagnostics mode aggregates key runtime and environmental data—including configuration validations, cache status, and system health metrics—to aid in troubleshooting. This enhancement further strengthens our mission to be the go-to plot library for formula visualisations by providing proactive insights and detailed operational reports.

## Implementation Details
### Unified Logging and Telemetry
- **Central Logging:** Capture errors, warnings, and informational events from CLI commands, HTTP endpoints, and background tasks.
- **Usage Analytics:** Collect telemetry data such as command frequency, performance metrics (e.g., plot generation timings), and operational statistics.
- **CLI Integration:** Provide CLI flags like `--view-logs` and `--usage-stats` to facilitate on-demand review of logs and metrics.

### Command History Management
- **History Tracking:** Log all command executions with detailed metadata (timestamps, parameters, tags) into a persistent JSON-based history file.
- **Recycle Bin Mechanism:** Implement a soft-deletion feature enabling command history recovery through a CLI flag (e.g., `--undo-history <record_id>`).

### Web Dashboard Integration
- **Dashboard Server:** Launch an Express-based HTTP server exposing a `/dashboard` endpoint that displays real-time logs, usage statistics, and history data.
- **Interactive Controls:** Enable functionalities such as log filtering, manual clearance, and history restoration directly from the dashboard.

### System Diagnostics Integration
- **Diagnostics Mode:** Introduce a new `--diagnostics` CLI flag that triggers a comprehensive system check. This mode aggregates information from various modules including configuration status, cache inspection (from PLOT_ENGINE and CONFIG_MANAGER), and environmental parameters.
- **Aggregated Report:** Generate a detailed diagnostics report that includes:
  - Current configuration summaries and validation status.
  - Cache status overview with active entries and their TTL values.
  - System health metrics and environment settings as defined in the tool configuration.
- **Seamless Integration:** Ensure the diagnostics report is accessible both through CLI output and via the web dashboard, offering a centralized view for troubleshooting and maintenance.

## Testing and Documentation
- **Unit and Integration Tests:** Develop tests that simulate error conditions, validate telemetry and history records, and verify the accuracy of diagnostics information.
- **Dashboard Testing:** Test HTTP endpoints for proper data presentation, filtering capabilities, and interactive actions.
- **Documentation Updates:** Update README.md and CONTRIBUTING.md with detailed usage examples, particularly covering the new `--diagnostics` flag and its expected outputs. Include troubleshooting guidelines for potential configuration and environment issues.

## Benefits
- **Centralized Monitoring:** Merges previously separate components (error logging, telemetry, and history management) into one robust feature.
- **Enhanced Troubleshooting:** The new diagnostics mode offers comprehensive insights into system performance and environmental conditions, enabling rapid issue identification and resolution.
- **Real-time Insights:** The integrated web dashboard and CLI flags provide immediate visibility into system health and operational metrics.

## Summary
This enhanced ACTIVITY_MANAGER feature not only unifies logging, telemetry, and command history but also introduces a diagnostics mode that delivers an aggregated overview of system status and configuration health. By streamlining monitoring and troubleshooting, this update significantly improves operational reliability and aligns with our mission of delivering a powerful, user-friendly plot library.