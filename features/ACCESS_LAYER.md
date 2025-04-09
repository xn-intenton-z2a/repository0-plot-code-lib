# ACCESS_LAYER

## Overview
This update refines and extends the existing ACCESS_LAYER module by ensuring full support for diagnostics across both CLI and web interfaces. In addition to supporting a dedicated diagnostics mode, version flag, and an enhanced RESTful API, this update now incorporates consistent diagnostics handling directly within the CLI, addressing the missing --diagnostics branch in the main execution flow.

## Key Objectives
- **CLI Diagnostics Integration:**
  - Add a new branch in the CLI argument parser to support the `--diagnostics` flag.
  - When the `--diagnostics` flag is provided, output detailed system configuration, dependency information, and runtime diagnostics in both human-readable and JSON formats.
  - Ensure the diagnostics output is consistent with data provided via the API endpoints.

- **Enhanced Version Information Flag:**
  - Ensure the existing `--version` flag outputs the current package version along with key dependency summaries, adhering to the standard logging conventions.

- **Robust Web Interface & HTTP API:**
  - Maintain and improve the web API endpoints:
    - **GET /version:** Returns the current package version.
    - **GET /diagnostics:** Provides detailed system diagnostics, mirroring the CLI output.
    - **POST /plot:** Accepts JSON payloads containing plot specifications and output preferences, processes the request with PLOT_ENGINE integration, and returns plot data.
  - Integrate robust error handling, input validations, and logging for all endpoints.

- **Seamless CLI and API Coexistence:**
  - Update the main CLI parser (in `src/lib/main.js`) to branch based on flags (`--diagnostics`, `--version`, `--serve`, etc.), ensuring that diagnostics can be invoked both as a standalone CLI command and via an API call in serve mode.
  - Provide consistent output formats and logging behavior across all diagnostics functionalities.

## Design & Implementation
### CLI Parser Enhancements (src/lib/main.js)
- Add a condition to check for the `--diagnostics` flag before other arguments.
- When invoked, gather system configuration details, environment variables, dependency versions (sourced from package.json), and runtime diagnostics.
- Output the diagnostics in both user-friendly and JSON format.

### HTTP API Updates
- Extend the Express-based API server to include a dedicated endpoint for diagnostics (`GET /diagnostics`).
- Route diagnostics requests through the same logic as the CLI handler for consistency.

### Testing and Documentation
- Update unit tests (e.g., in `tests/unit/main.test.js`) to include scenarios for the new diagnostics flag.
- Revise the README and CONTRIBUTING documentation to include usage examples for invoking diagnostics via the CLI and API.
- Ensure the diagnostics output includes all relevant system and dependency information.

## Usage Examples
- **CLI Diagnostics:**
  ```bash
  node src/lib/main.js --diagnostics
  ```

- **Version Information:**
  ```bash
  node src/lib/main.js --version
  ```

- **Start API Server (with diagnostics endpoint):**
  ```bash
  node src/lib/main.js --serve
  ```
  Then access diagnostics at:
  ```bash
  curl http://localhost:3000/diagnostics
  ```
