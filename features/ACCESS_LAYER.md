# ACCESS_LAYER

## Overview
This update refines the existing ACCESS_LAYER module to fully support a dedicated diagnostics mode alongside its CLI and web interface functionalities. The enhanced diagnostics mode will output comprehensive system, dependency, and configuration details along with structured logs to facilitate troubleshooting and system introspection.

## Key Objectives
- **Diagnostics Mode Integration:** Implement a new command-line flag (`--diagnostics`) to trigger diagnostics mode, ensuring detailed information on system configuration, dependencies, and runtime state is output.
- **Consistent Logging:** Utilize the existing centralized structured logging approach to capture diagnostic details in both human-readable and JSON formats. All modes (interactive, serve, and diagnostics) will share the same logging practices.
- **Seamless User Interface:** Preserve the current interactive and web modes while extending functionality to support diagnostics mode without introducing complexity or redundant modules.
- **Robust Error Handling:** Enhance error management during diagnostics by logging exceptions and system warnings to aid rapid resolution.

## Design & Implementation
### Mode Detection and Routing
- Update the main CLI parser (in `src/lib/main.js`) to detect the `--diagnostics` flag.
- If the `--diagnostics` flag is present, bypass normal plot generation and interactive/web mode logic.
- Route to a new diagnostics handler that gathers and outputs:
  - System configuration (e.g., OS, Node version).
  - Dependency versions and environment details (parsed from package.json and process.env).
  - Recent log summaries from the centralized logging mechanism.

### Logging and Diagnostics Handler
- Integrate diagnostics functionality within the ACCESS_LAYER rather than as a separate module to maintain code simplicity.
- Consolidate logging methods (`logInfo()`, `logWarn()`, `logError()`, and `logDebug()`) to include diagnostic output upon flag activation.
- Ensure that detailed error capturing and asynchronous logging mechanisms are maintained across all modes.

### Testing and Documentation
- **Unit Tests:** Add test cases to validate that when `--diagnostics` is provided, all required system and environment details are output.
- **Documentation:** Update the README and CONTRIBUTING files to document the `--diagnostics` usage and expected output format.
- **Code Quality:** Ensure compliance with existing coding style and performance standards mandated in CONTRIBUTING.md.

## Usage Examples

- **Diagnostics Mode:**
  ```bash
  node src/lib/main.js --diagnostics
  ```

This update reinforces the mission of providing a versatile, reliable CLI tool for formula visualisation by ensuring robust diagnostics and logging capabilities to support effective troubleshooting and system analysis.