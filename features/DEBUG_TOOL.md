# DEBUG_TOOL

## Overview
The DEBUG_TOOL feature introduces enhanced logging and diagnostic capabilities to the plotting library. It provides developers and users with detailed insights into command processing, error handling, and internal state, thereby facilitating effective debugging and performance monitoring.

## Features
- **Extended Logging:** Integrate verbose logging for both CLI and HTTP API interactions. Enable detailed logging of numeric parsing, JSON configuration validation, and command execution steps.
- **Diagnostic Endpoints:** Augment the HTTP API with a new `/debug` endpoint (or extend the existing diagnostics command) that returns diagnostic information such as current configuration, environment variables, and processing metrics.
- **Configurable Debug Mode:** Allow users to toggle debug mode via an environment variable (e.g., `DEBUG_MODE`) or a CLI flag (e.g., `--debug`) to control the verbosity of logs and diagnostic output.
- **Error Traceability:** Enhance error messages with stack traces and contextual information to help pinpoint issues quickly during development and production troubleshooting.

## Implementation Considerations
- **Single Source File:** The feature should be achievable in a single source file, e.g., within the `src/lib/debugTool.js`, and integrated with existing components in `src/lib/main.js` and the web interface.
- **Testing:** Include unit tests to validate that the debug logs and diagnostic endpoints provide the expected outputs when activated.
- **Documentation:** Update the README and CONTRIBUTING guidelines to include usage examples and instructions for enabling and using the debug features.

## Benefits
- **Enhanced Developer Experience:** Provides clear insights during development and aids in rapid troubleshooting.
- **Improved Reliability:** Better error traceability and diagnostics support more robust and maintainable code.
- **Mission Alignment:** Reinforces our commitment to being the go-to tool for formula visualisations by improving internal tooling and support for debugging complex plotting commands.