# WEB_API Feature

## Overview
This feature consolidates the HTTP-based interactive web interface and export functionality into a unified API. In addition to the existing endpoints for plotting and exporting in various formats (SVG, JSON, CSV, Markdown, ASCII, HTML), the feature now includes real-time status updates using Server-Sent Events (SSE). This enhancement provides users with live feedback during plot generation and export operations, aligning with our mission to deliver instant and interactive visualizations.

## Implementation Details
1. **Express Server Setup:**
   - Initialize an Express server in a single source file (e.g., `src/web/app.js`).
   - Use middleware to parse URL-encoded and JSON request bodies.
   - Serve a static HTML page for interactive plotting, export operations, and real-time updates.

2. **Unified Routing and API Endpoints:**
   - Define a root GET endpoint (`/`) to serve the main UI page.
   - Create a POST endpoint (`/plot`) for initiating plot operations. This endpoint reuses the numeric parameter validation and advanced plotting logic from the CORE_ENGINE.
   - Create a POST endpoint (`/export`) to handle export commands, accepting parameters that define the export format and plot payload.

3. **Real-Time Updates with SSE:**
   - Introduce a new GET endpoint (`/events`) that establishes a Server-Sent Events (SSE) connection with the client.
   - During processing of plot or export requests, send live status updates (e.g., progress, warnings, and completion messages) over the SSE channel.
   - Ensure that events include error notifications and debugging information based on environment configuration (e.g., `DEBUG_WEB`, `DEBUG_EXPORT`).

4. **Integration with Core Logic:**
   - Re-use numeric parameter conversion and validation utilities from CORE_ENGINE to ensure consistency between CLI and web inputs.
   - Integrate real-time feedback into the existing error handling and logging workflows.
   - Maintain support for dynamic plugin integration allowing external modules to contribute additional endpoints or update mechanisms.

## Testing and Documentation
- **Integration Testing:**
  - Ensure unit and integration tests (in `tests/web/`) cover all new SSE endpoints and real-time event flows.
  - Simulate client connections to verify that events are sent reliably and in the correct order.
- **Documentation Updates:**
  - Update README and CONTRIBUTING guides to include instructions on SSE usage and real-time debugging.
  - Provide sample cURL commands and browser-based examples demonstrating how to connect to the `/events` endpoint.

## Usage Examples

**Starting the Unified Web API with Real-Time Updates:**
```bash
npm run start:web
```

**Accessing the Web Interface:**
Open your browser and navigate to `http://localhost:3000` where the page provides forms for plot configuration, export requests, and displays live status updates.

**Sample Plot Request using cURL:**
```bash
curl -X POST http://localhost:3000/plot -d "plotType=spiral&params=1, NaN, 5"
```

**Subscribing to Real-Time Events:**
```bash
curl http://localhost:3000/events
```

## Benefits
- **Live Feedback:** Provides users with immediate, real-time updates during long-running plot or export operations.
- **Enhanced Debugging:** Improved event logs and error reporting make it easier to trace issues when they occur.
- **Unified Experience:** Combines interactive plotting, export functionality, and live status updates into a single coherent web interface, enhancing overall usability.
