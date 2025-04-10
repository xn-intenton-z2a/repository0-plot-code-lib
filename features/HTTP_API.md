# HTTP_API Feature Specification

## Overview
This feature introduces a lightweight HTTP API server to provide programmatic access to the plotting library’s core functionalities. By offering HTTP endpoints, users and integrated systems can generate plots, retrieve history records, and perform dry-run simulations remotely. This API complements the CLI interface and library usage, aligning with our mission to be the go-to plot library for formula visualisations.

## Implementation Details
### Express Server Setup
- **Server Initialization:** Utilize the existing Express dependency to create a minimal HTTP server within a single source file (e.g., `src/lib/httpApi.js`).
- **Configuration:** Allow configuration of the server port via environment variables or command-line arguments.

### Endpoints
- **GET /plot**
  - Accepts query parameters such as `formula`, `interval`, `step`, `color`, etc.
  - Leverages the plotting engine to generate and return a colorized ASCII plot.
- **POST /plot**
  - Accepts a JSON payload containing plot parameters.
  - Returns the computed plot and diagnostic details in JSON format.
- **GET /history**
  - Integrates with the HISTORY_MANAGER to fetch and filter plot history records.
- **Additional Endpoints:**
  - Endpoints for dry-run simulation, clearing history, and more can be added as needed to mirror CLI functionalities.

### Integration & Validation
- **Reuse Validation Logic:** Incorporate the robust argument and payload validation (originally in ARG_VALIDATION, now merged into CLI_INTERFACE) using Zod schemas to ensure correct parameter formats.
- **Error Handling:** Return clear HTTP error statuses and messages for invalid inputs, following consistent messaging as in the CLI.
- **Logging & Monitoring:** Integrate with the SYSTEM_MONITORING feature to log API usage and errors.

## Testing and Documentation
- **Tests:** Add unit and integration tests for each endpoint using existing test frameworks (e.g., vitest) to verify expected behavior and error handling.
- **Documentation Updates:** Update README.md and CONTRIBUTING.md with detailed API usage examples, endpoint descriptions, and deployment instructions.

## Benefits
- **Programmatic Access:** Enables external systems to trigger plotting operations seamlessly via HTTP, promoting automation and integration.
- **Consistency:** Provides a unified interface with similar validation, logging, and error management as the CLI, enhancing user experience across interfaces.
- **Flexibility:** Serves as an alternative access layer, increasing the versatility of the repository by making its core functionalities available as a service.
