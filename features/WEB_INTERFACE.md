# WEB_INTERFACE

## Overview
This feature introduces an HTTP API and web interface to complement the CLI-based plotting and formula evaluation. It leverages Express to serve an interactive web page where users can select plot types, enter numeric parameters, and even load and execute plugins. This makes the library accessible through a browser and enables quick, user-friendly visual explorations.

## Implementation Details
1. **Express Server Setup:**
   - Create a single source file (e.g., `src/web/app.js`) to initialize an Express server.
   - Use middleware to parse URL-encoded and JSON requests.
   - Serve a static HTML page that provides a form for plot selection and parameter entry.

2. **Routing and API Endpoints:**
   - Define endpoints for initiating plots and formula evaluations. For example, a POST endpoint `/plot` accepts plot type and parameters, and a GET endpoint `/` serves the main page.
   - Integrate with existing numeric parameter validation and conversion functions to ensure consistency between CLI and web inputs.
   - Allow optional integration with the PLUGIN_SYSTEM so that users can trigger custom plugin functionalities via the API.

3. **Error Handling and Logging:**
   - Implement robust error handling for API inputs, similar to the CLI error responses.
   - Log requests and errors for debugging purposes, optionally controlled via environment variables (e.g., `DEBUG_WEB`).

4. **Testing and Documentation:**
   - Add unit and integration tests in `tests/web/` to verify endpoint functionality and correct parameter parsing.
   - Update README and CONTRIBUTING documentation with usage examples, curl commands, and form-based interactions.

## Usage Examples

**Starting the Web Server:**
```bash
npm run start:web
```

**Accessing the Web Interface:**
Open your browser and navigate to `http://localhost:3000` (or the port specified by the PORT environment variable).

**Sample API Request using curl:**
```bash
curl -X POST http://localhost:3000/plot -d "plotType=spiral&params=1,NaN,5,-10,10,1"
```

This feature aligns with the repository's mission by extending plotting capabilities to a broader audience in a user-friendly web environment.