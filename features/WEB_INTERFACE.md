# WEB_INTERFACE

## Overview
This feature introduces an HTTP API for the plotting library. In addition to the CLI, users now have the option to submit plotting commands via web requests. This integration leverages the existing robust plotting engine (CORE_ENGINE) by exposing endpoints through an Express-based server. The web interface accepts both numeric parameter sequences and JSON-based configurations, ensuring consistency with our mission to be the go-to tool for formula visualisations.

## API Endpoints
- **POST /plot**: Accepts a JSON payload with plot commands. The payload can include
  - A command type (e.g., "quad", "chart", "spiral", etc.)
  - Parameters either as an array of numbers or as a JSON configuration object
  
- **GET /health**: Returns a simple health check response to verify that the service is up and running.

The HTTP API will parse incoming requests, route them to the CORE_ENGINE functions, and return diagnostic logging along with the plotting results (or error messages) in JSON format.

## Benefits
- **Extended Access**: Users can trigger plotting commands remotely without using the CLI directly.
- **Consistency**: Uses the same robust numeric parsing and JSON configuration support as the CLI.
- **Enhanced Integration**: Complements the existing CLI features, aligning with our mission of being a versatile plotting tool across different interfaces.

## Implementation Considerations
- Integrate an Express server in a single source file (e.g., src/web/app.js).
- Implement and document error handling, logging, and validation consistent with the guidelines in CONTRIBUTING.md.
- Prepare tests for the HTTP endpoints to be included within the web tests suite.
