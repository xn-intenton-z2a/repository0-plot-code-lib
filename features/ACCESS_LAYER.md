# ACCESS_LAYER

## Overview
This feature consolidates the interactive CLI (formerly REPL_MODE) and web API (formerly WEB_API) into a single, unified access layer. In this update, we further enhance the module by introducing a Diagnostics Mode that provides real-time system and environment feedback. This not only simplifies user access to the plotting functionalities but also assists in debugging and validating the runtime configuration.

## Key Objectives
- **Unified Interface:** Continue to merge the interactive CLI and HTTP-based endpoints to provide a single point of entry for plot generation and analysis.
- **Seamless Mode Switching:** Refine the CLI parser to detect and handle multiple flags including `--interactive`, `--serve`, and the newly introduced `--diagnostics`.
- **Diagnostics Mode:** Implement a diagnostics branch that, when invoked with `--diagnostics`, outputs valuable system information such as configuration details, dependency versions, and runtime environment data. This mode serves as a quick health check for the repository, aiding users and developers in troubleshooting.
- **Consistent Experience:** Leverage shared input validation, error messaging, and debug logging across all access modes to maintain a unified user experience.
- **Simplified Maintenance:** By centralizing all access methods and diagnostics into one module, the codebase remains clean, well-documented, and easier to update.

## Design & Implementation
- **Mode Detection:** Enhance the main CLI parser to detect the following flags:
  - `--interactive`: Activates the interactive CLI session.
  - `--serve`: Starts the Express-based web server.
  - `--diagnostics`: Triggers the diagnostics mode to output current system state and configuration information.

- **Diagnostics Mode Implementation:**
  - When the `--diagnostics` flag is provided, the module will print detailed diagnostic information to the console including version info, environment variables, and configuration parameters.
  - This branch should be easy to extend, allowing for future inclusion of more granular diagnostic checks if needed.

- **Routing & Delegation:**
  - Maintain a central routing mechanism that directs incoming commands to the correct processing pipeline (interactive, web API, or diagnostics).
  - Ensure that all modes share common error handling and logging to provide consistency.

- **Documentation & Testing:**
  - Update README and CONTRIBUTING documentation to incorporate usage examples for the diagnostics mode.
  - Expand the unit tests to verify that each mode (`--interactive`, `--serve`, and `--diagnostics`) is activated correctly and outputs the expected results.

## Usage Examples
- **Interactive CLI Access:**
  ```bash
  node src/lib/main.js --interactive
  ```
- **Web Interface Access:**
  ```bash
  node src/lib/main.js --serve
  ```
- **Diagnostics Mode:**
  ```bash
  node src/lib/main.js --diagnostics
  ```

This update to the ACCESS_LAYER not only maintains its core mission of unifying interface access but also adds valuable system insights, aligning with the repository's goal of being a versatile and user-friendly plotting library.