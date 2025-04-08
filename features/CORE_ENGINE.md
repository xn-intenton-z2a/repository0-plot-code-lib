# CORE_ENGINE Feature Specification

## Description
This feature refines and consolidates the core plotting engine by integrating advanced CLI plotting, a new web interface, an interactive wizard mode, and enhanced logging capabilities. It now supports multiple output formats for plots including SVG, JSON, CSV, Markdown, ASCII, and HTML. Through robust numeric parameter validation, diagnostics, and the new logging subsystem, the engine ensures high reliability, a unified user experience, and easier troubleshooting.

## Motivation
- **Enhanced Accessibility:** Offers diverse output formats and interactive options to meet varied user needs.
- **Improved Usability:** Enables users to export plots directly in their desired format and guides them through an interactive wizard for plot configuration.
- **Unified Experience:** Merges plotting, web interface interaction, diagnostics, and logging under a single cohesive module.
- **Traceability & Debugging:** The new logging subsystem provides detailed runtime logs with configurable verbosity, aiding both users and developers in tracing execution flow and diagnosing issues.

## Implementation Details
1. **Module Consolidation and Advanced Plotting:**
   - Consolidate advanced plotting routines in `src/lib/advancedPlots.js` (currently inlined in `main.js`).
   - Update `src/lib/main.js` to import these functionalities and handle the `--advanced` flag accordingly.

2. **Web Interface Integration:**
   - Extend the Express-based web server (`src/web/app.js`) to support plot generation with export format selection via UI elements (e.g., a dropdown menu).
   - Enhance the POST endpoint at `/plot` to process an additional parameter for the desired export format.

3. **Interactive Wizard Mode:**
   - Introduce a CLI flag `--wizard` to launch an interactive session.
   - Step-by-step guidance is provided to select plot type, input parameters (using the `paramValidation` module), and choose an export format.

4. **Export Options:**
   - Support output formats including SVG, JSON, CSV, Markdown, ASCII, and HTML.
   - For CLI usage, enable an `--export <format>` flag to specify the desired output type and transform the plot data accordingly.

5. **Logging Integration:**
   - Integrate a lightweight logging subsystem to track and record significant events and errors across the engine.
   - Implement logging with timestamps and configurable log levels (e.g., INFO, DEBUG, ERROR) via environment variables (like `LOG_LEVEL`).
   - Replace scattered `console.log` calls with calls to the logging module to ensure consistency in log output.

6. **CLI and Routing Updates:**
   - Enhance the main CLI parser in `src/lib/main.js` to detect flags for advanced plotting, diagnostics, interactive wizard mode, export, and logging preferences.
   - Validate and route commands to the appropriate sub-modules (plotting, wizard, diagnostics, and logging).

7. **Testing and Documentation:**
   - Add comprehensive unit tests to cover new logging behavior as well as its integration with plotting, diagnostics, and the web interface.
   - Update the README and CONTRIBUTING documentation to include usage examples, logging configuration guidelines, and instructions for interpreting runtime logs.

## Usage Examples
- **CLI Advanced Plotting with Export Option and Logging:**
  ```bash
  node src/lib/main.js --advanced spiral "1,NaN,5,-10,10,1" --export SVG
  ```

- **Interactive Wizard Mode with Detailed Logging:**
  ```bash
  node src/lib/main.js --wizard
  ```

- **Web Interface:**
  1. Start the web server:
     ```bash
     npm run start:web
     ```
  2. Access the application at `http://localhost:3000` and use the provided UI to select plot types, input parameters, choose an export format, and view detailed logs if enabled.
