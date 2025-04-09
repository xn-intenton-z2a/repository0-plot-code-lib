# ACCESS_LAYER

## Overview
This feature refines and extends the existing ACCESS_LAYER module. In addition to supporting a dedicated diagnostics mode and CLI version flag capabilities, this update significantly enhances the web interface by introducing a comprehensive RESTful API. These improvements ensure consistency in logging, diagnostics, and data retrieval across both CLI and web interactions.

## Key Objectives
- **Diagnostics Mode Integration:**
  - Support a `--diagnostics` CLI flag that outputs detailed system configuration, dependency information, and runtime diagnostics in both human-readable and JSON formats.
  - Route diagnostics requests through both CLI and the new API endpoints for consistency.

- **Version Information Flag:**
  - Add a `--version` CLI flag to output the current package version (sourced from package.json) along with key dependency summaries.
  - Ensure version information is formatted clearly and adheres to existing logging conventions.

- **Enhanced Web Interface & HTTP API:**
  - Evolve the existing web interface (triggered via the `--serve` flag) to not only display a welcome message but also expose a set of RESTful endpoints:
    - **GET /version:** Returns the current version information in JSON format.
    - **GET /diagnostics:** Provides detailed system diagnostics, including environment configuration and dependency statuses.
    - **POST /plot:** Accepts a JSON payload with plot specifications and output preferences, processes the plotting request (leveraging the PLOT_ENGINE and TEXT_OUTPUT modules), and returns the generated plot data or file.
  - Ensure endpoints include robust error handling, logging, and input validation according to the guidelines in CONTRIBUTING.md.

- **Seamless CLI and API Coexistence:**
  - Maintain the existing interactive (`--interactive`) and standard plot generation workflows while augmenting the repository with API-driven functionalities.

## Design & Implementation
### CLI Parser & API Server Enhancements
- **CLI Enhancements:**
  - Update the main CLI parser in `src/lib/main.js` to support the new API server endpoints in addition to the existing functionalities.
  - Branch based on flags: `--diagnostics`, `--version`, `--serve`, and standard plot generation.

- **HTTP API Implementation:**
  - Integrate Express within the `--serve` mode to launch the API server.
  - Define RESTful endpoints:
    - **GET /version:** Reads and returns version information.
    - **GET /diagnostics:** Aggregates diagnostics data using the same logic as the CLI diagnostics handler.
    - **POST /plot:** Processes incoming JSON plot requests, calls the PLOT_ENGINE for plot generation, and delivers results in the requested format. 
  - Modularize API endpoint definitions to facilitate testing and future enhancements.

### Testing and Documentation
- **Unit Tests:**
  - Extend tests (e.g., in `tests/unit/main.test.js`) to cover the new API endpoints, ensuring correct responses for version, diagnostics, and plot generation.
  - Validate error conditions and input validation through simulated API requests.

- **Documentation:**
  - Update the README and CONTRIBUTING guides with detailed documentation of the new HTTP API endpoints, usage examples, and expected outputs.

## Usage Examples
- **CLI Usage:**
  - Display version information:
    ```bash
    node src/lib/main.js --version
    ```
  - Run diagnostics mode:
    ```bash
    node src/lib/main.js --diagnostics
    ```

- **HTTP API Usage (when running in serve mode):**
  - Start the API server:
    ```bash
    node src/lib/main.js --serve
    ```
  - GET request for version:
    ```bash
    curl http://localhost:3000/version
    ```
  - POST request for plot generation:
    ```bash
    curl -X POST http://localhost:3000/plot -H "Content-Type: application/json" \
         -d '{"plotSpec": "quad:1,0,0,-10,10,1", "outputFormat": "svg"}'
    ```

This enhancement aligns with the mission of providing a versatile, go-to plotting tool by integrating robust diagnostics, clear versioning, and dynamic data interaction via a RESTful API.
