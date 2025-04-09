# LOG_MANAGER

## Overview
The LOG_MANAGER feature introduces a centralized and structured logging system for the repository. This module will capture, format, and route logs from different operational modes of the tool including CLI, web interface, and internal diagnostics. LOG_MANAGER provides detailed logs in both human-readable and JSON formats, enabling efficient monitoring, debugging, and integration with log analysis tools.

## Key Objectives
- **Centralized Logging:** Offer a single library for collecting logs from ACCESS_LAYER, PLOT_ENGINE, and TEXT_OUTPUT modes.
- **Structured Output:** Provide logs in multiple formats—plain text and structured JSON—for easier consumption by both users and automated systems.
- **Log Levels:** Support various logging levels (INFO, WARN, ERROR, DEBUG) configurable via a CLI flag (e.g., `--log-level`) or environment variables.
- **Enhanced Diagnostics:** Integrate with the diagnostics mode in ACCESS_LAYER to include detailed system and configuration logs, ensuring consistency across the repository.
- **Extensibility:** Design the module to allow future enhancements such as file logging, color-coded output, and integration with external monitoring tools.

## Design & Implementation
### Architecture
- **Logging Module:** Create a single source file (e.g., `src/lib/logManager.js`) that exposes logging functions for different levels and output formats.
- **Integration Points:** Refactor existing modules (CLI parser in `src/lib/main.js`, and modules in PLOT_ENGINE and TEXT_OUTPUT) to utilize LOG_MANAGER for all log outputs.

### Implementation Details
- **API Design:** Expose functions such as `logInfo()`, `logWarn()`, `logError()`, and `logDebug()`.
- **Configuration Options:** Allow dynamic configuration via CLI flags or environment variables (e.g., `LOG_LEVEL`), affecting verbosity.
- **Output Formats:** Support switchable output formats—default plain text and optional JSON structure—facilitating both user viewing and downstream processing.

### Testing & Documentation
- Write unit tests (e.g., in `tests/unit/logManager.test.js`) ensuring all log levels work correctly and outputs adhere to the specified format.
- Update the README and CONTRIBUTING documentation to describe how the logging system works and how contributors can extend or integrate it into new features.

## Usage Examples
- **Standard Logging:**
  ```bash
  node src/lib/main.js --log-level info
  ```
- **JSON Log Output (via environment variable):**
  ```bash
  LOG_FORMAT=json node src/lib/main.js --serve
  ```
- **Error Handling:**
  Logs related to parsing errors or diagnostic failures will use `logError()` and include structured information for troubleshooting.

## Future Considerations
- Integration with file-based logging and external monitoring services.
- Dynamic adjustment of logging verbosity at runtime via HTTP endpoints in the web interface.
- Advanced log filtering and search capabilities within the CLI.
