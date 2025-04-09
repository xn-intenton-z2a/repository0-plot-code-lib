# WEB_API

## Overview
This feature consolidates the HTTP-based interactive web interface and export functionality into a unified API. By merging the previously separate WEB_INTERFACE and EXPORT_ENGINE features, users can both interact with the plotting library via a browser and trigger export operations in various formats (SVG, JSON, CSV, Markdown, ASCII, HTML) from a single source. This consolidation enhances maintainability, streamlines development, and provides a consistent workflow for both visualization and data export.

## Implementation Details
1. **Express Server Setup:**
   - Initialize an Express server in a single source file (e.g., `src/web/app.js`).
   - Use middleware to parse URL-encoded and JSON request bodies.
   - Serve a static HTML page for interactive plotting and export operations.

2. **Unified Routing and API Endpoints:**
   - Define a root GET endpoint (`/`) for serving the main UI page.
   - Create a POST endpoint (`/plot`) for initiating plotting operations using the existing numeric parameter validation and advanced plotting logic from the CORE_ENGINE.
   - Create a POST endpoint (`/export`) to handle export commands. It should accept parameters defining the desired export format and optionally a plot identifier or payload. This endpoint will invoke export functions to generate the output in the specified format.

3. **Integration with Core Logic:**
   - Re-use the numeric parameter conversion and validation utilities from CORE_ENGINE to ensure consistency between CLI and web inputs.
   - Integrate optional plugin support if enabled, allowing dynamic plot types and export settings.
   - Ensure error handling is robust, providing clear error messages and logging via environment variables (e.g., `DEBUG_WEB`, `DEBUG_EXPORT`).

4. **User Experience:**
   - The main UI should offer forms to configure plots and trigger export operations, clearly indicating accepted input formats and providing feedback.
   - Both interactive and API-based workflows should deliver consistent responses and logging outputs.

## Testing and Documentation
- Update unit and integration tests (located in `tests/web/`) to cover all endpoints and edge cases.
- Document the new WEB_API feature in the README and CONTRIBUTING guides, including usage examples with both web interactions and cURL commands.

## Usage Examples

**Starting the Unified Web API:**
```bash
npm run start:web
```

**Accessing the Web Interface:**
Open your browser and navigate to `http://localhost:3000`

**Sample Plot Request using cURL:**
```bash
curl -X POST http://localhost:3000/plot -d "plotType=spiral&params=1, NaN, 5, -10, 10, 1"
```

**Sample Export Request using cURL:**
```bash
curl -X POST http://localhost:3000/export -d "format=csv&plotId=12345"
```