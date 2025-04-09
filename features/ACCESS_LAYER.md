# ACCESS_LAYER

## Overview
This feature unifies CLI and web API access with centralized, structured logging. It merges the previously separate ACCESS_LAYER and LOG_MANAGER functionalities into a single module that handles interactive mode, web serving, diagnostics output (including system configuration and environmental details), and detailed logging across all modes. This integration simplifies the codebase, reduces redundancy, and improves maintainability while ensuring robust error handling and diagnostic support.

## Key Objectives
- **Unified Interface:** Provide a single module that routes CLI commands, web API requests, and diagnostics/logging outputs.
- **Interactive Mode Enhancements:** Retain interactive CLI support with command history and user prompts.
- **Diagnostics Mode:** When the `--diagnostics` flag is used, output detailed system, dependency, and configuration information along with comprehensive log details to assist in troubleshooting.
- **Centralized Logging:** Integrate structured logging (supporting INFO, WARN, ERROR, DEBUG) into all access modes. Logs will be available in both human-readable and JSON formats, consolidating the functionalities of the previous LOG_MANAGER.
- **Seamless Mode Switching:** Enhance flag handling and CLI parsing to reliably distinguish between `--interactive`, `--serve`, and `--diagnostics`, ensuring that appropriate logging is executed for each mode.
- **Robust Testing & Documentation:** Update unit tests and documentation to reflect the merged logging capabilities and unified access behavior, ensuring consistent output and error handling.

## Design & Implementation
### Mode Detection and Routing
- Update the CLI parser (in `src/lib/main.js`) to detect `--interactive`, `--serve`, and `--diagnostics` flags. Ensure that diagnostics mode invokes both system introspection and logging routines.
- Modularize routing logic to delegate logging responsibilities internally, avoiding dependency on a separate logging module.

### Integrated Logging
- Embed the structured logging functionality directly into this module, offering configurable log levels and multiple output formats (plain text and JSON).
- Ensure all modes (interactive, web, and diagnostics) use the same logging methods for consistency. The logging functions will handle errors, warnings, and debug messages uniformly across the application.

### Implementation Details
- **Flag Handling:** Extend the main CLI function to capture and properly route flags. Diagnostics mode will trigger extra logging and system information routines.
- **Logging Functions:** Consolidate log functions (previously in LOG_MANAGER) into this module, exposing methods such as `logInfo()`, `logWarn()`, and `logError()`. These functions are also used for routing messages in web mode.
- **Error Handling:** Ensure comprehensive error capture and logging, especially around the transition between different access modes.
- **Testing & Documentation:** Augment test cases to validate that merging the logging functionality does not break existing interactive, web, and plotting features. Update README and CONTRIBUTING documents to describe the consolidated interface.

## Usage Examples
- **Interactive Mode:**
  ```bash
  node src/lib/main.js --interactive
  ```
- **Web Interface:**
  ```bash
  node src/lib/main.js --serve
  ```
- **Diagnostics Mode with Logging:**
  ```bash
  node src/lib/main.js --diagnostics
  ```

This unified ACCESS_LAYER not only streamlines user access and diagnostics but also embodies a robust, centralized logging mechanism ensuring consistency and easier maintenance.