# ACCESS_LAYER

## Overview
This feature provides a unified interface for both CLI and HTTP operations. It supports interactive sessions, diagnostics, onboarding tutorials, alias management with enhanced import/export capabilities, and now an expanded Web API for programmatic access. This update maintains its core mission of empowering users with seamless plotting experiences while enabling remote usage via a RESTful interface.

## Key Objectives
- **Enhanced Interactive Mode:**
  - Offer a guided interactive session with real-time command suggestions, input validation, and error recovery.
  - Log command history to assist with troubleshooting and session review.

- **Extended Diagnostics:**
  - Continue supporting traditional diagnostic flags and a diagnostic API endpoint that returns alias and session details alongside runtime metrics and system configuration data.

- **Unified Alias Management:**
  - Facilitate creating, listing, deleting, exporting, and importing CLI command aliases with conflict validation.

- **Onboarding Tutorial Enhancement:**
  - Integrate an interactive tutorial to assist new users in learning CLI operations and plotting commands via dynamic walkthroughs.

- **Expanded Web API Integration:**
  - Implement a robust RESTful API using Express for remote plot submission and retrieval.
  - Expose endpoints such as:
    - **GET /** – Welcome and basic usage information.
    - **POST /plot** – Accept a plot specification and generate a plot (e.g., SVG, JSON, etc.).
    - **GET /plot/:id** – Retrieve details of a previously generated plot.
    - **GET /diagnostics** – Serve extended diagnostic data including session logs and alias configurations.
    - **GET /aliases** – List or manage alias configurations via HTTP.
  - Ensure consistent error handling, logging, and integration with the underlying plotting engine (PLOT_ENGINE) and text output utilities (TEXT_OUTPUT).

## Design & Implementation
- **CLI Parser Enhancements:**
  - Extend argument parsing in `src/lib/main.js` to handle CLI commands as before, seamlessly integrating with the new HTTP endpoints.

- **Interactive Session Module:**
  - Maintain a dedicated module to capture guided sessions, provide contextual help, and store interactive command histories.

- **Alias Configuration Module:**
  - Keep the robust alias management system with import/export functionality, now accessible via both CLI and HTTP endpoints.

- **Web API Integration:**
  - Build out a full RESTful API using Express. The API shall:
    - Expose endpoints for plot generation, diagnostics, and alias management.
    - Use asynchronous processing to call the underlying plotting and text-rendering modules.
    - Provide JSON responses with structured data including metadata, plot data, and logs.
    - Integrate error messaging and dynamic command suggestions similar to the interactive CLI mode.

## Testing and Documentation
- **Testing:**
  - Update unit and integration tests (e.g., in `tests/unit/main.test.js`) to cover new HTTP endpoints alongside CLI functionalities.
  - Ensure consistent test coverage across interactive, alias, and API modules.

- **Documentation:**
  - Revise README.md and CONTRIBUTING.md to include detailed API usage examples, endpoint descriptions, and integration guidelines.

## Usage Examples
- **CLI Interactive Mode:**
  ```bash
  node src/lib/main.js --interactive
  ```

- **Plot Generation via CLI:**
  ```bash
  node src/lib/main.js output.svg "quad:1,0,0,-10,10,1"
  ```

- **Starting the Web Interface (HTTP API):**
  ```bash
  node src/lib/main.js --serve
  ```

- **Example HTTP API Calls:**
  - Retrieve welcome info:
    ```bash
    curl http://localhost:3000/
    ```
  - Submit a plot specification:
    ```bash
    curl -X POST http://localhost:3000/plot -H "Content-Type: application/json" -d '{"plotSpec": "expr:Math.sin(x)*x:-10,10,0.5"}'
    ```
  - Access diagnostics:
    ```bash
    curl http://localhost:3000/diagnostics
    ```
