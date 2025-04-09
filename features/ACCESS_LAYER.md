# ACCESS_LAYER

## Overview
This feature unifies the CLI and web API access along with enhanced interactive functionality and diagnostics. In addition to supporting interactive mode with command history and web-based endpoints, this update explicitly adds a diagnostics mode to output detailed system and configuration information, thereby meeting both user experience and maintenance requirements.

## Key Objectives
- **Unified Interface:** Maintain a single module to handle interactive CLI, web API requests, and diagnostics output.
- **Interactive Mode Enhancements:** Retain command history functionality, ensuring that previous commands are saved to a local history file, and allow easy retrieval in subsequent sessions.
- **Diagnostics Mode:** Add a dedicated branch that triggers when the `--diagnostics` flag is provided. This mode outputs detailed system information including version numbers, environment variables, dependency versions, and configuration details to assist in troubleshooting and health checks.
- **Seamless Mode Switching:** Enhance the CLI parser to detect and route flags `--interactive`, `--serve`, and now `--diagnostics`, with comprehensive error handling and shared logging across modes.
- **Documentation & Testing:** Update usage guides and unit tests to cover diagnostics functionality alongside interactive and web API modes.

## Design & Implementation
### Mode Detection and Routing
- **Flag Handling:** Update the CLI parser in `src/lib/main.js` to detect the `--diagnostics` flag in addition to `--interactive` and `--serve`.
- **Routing Enhancements:**
  - If `--diagnostics` is detected, execute a diagnostics function that compiles and prints system configuration, dependency versions, environment variables, and version info.
  - Ensure that the diagnostics branch logs any errors or misconfigurations robustly.

### Enhanced Interactive Mode
- **Command History:** Ensure that the logic to record and retrieve previous commands remains intact, stored in a history file in the user’s home directory.
- **User Feedback:** Notify users when entering diagnostics mode if additional configuration details are available.

### Diagnostics Mode
- **Implementation:**
  - Create a diagnostics handler function that collects information from the environment, Node version, dependency versions, and configuration details.
  - Integrate this function call in the main CLI routing when the `--diagnostics` flag is provided.
- **Testing:** Write new unit tests to verify that upon passing `--diagnostics`, the expected system and configuration information is output.

## Usage Examples
- **Interactive Mode with Command History:**
  ```bash
  node src/lib/main.js --interactive
  # Enters interactive mode with support for command history.
  ```
- **Web Interface Access:**
  ```bash
  node src/lib/main.js --serve
  # Starts the web-based plotting interface.
  ```
- **Diagnostics Mode:**
  ```bash
  node src/lib/main.js --diagnostics
  # Outputs detailed diagnostics for troubleshooting the system configuration.
  ```

## Future Considerations
- Extend diagnostics to include more granular health checks as new system dependencies evolve.
- Enhance the interactive mode with additional command search or filtering capabilities within the history feature.

This update not only consolidates and clarifies all access routes within the application but also directly addresses the gap in diagnostics functionality, ensuring the repository remains robust, maintainable, and user-friendly.