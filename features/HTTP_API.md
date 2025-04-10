# HTTP_API Feature Specification (Enhanced with Health Checks)

## Overview
This feature introduces a lightweight HTTP API server that provides programmatic access to the plotting library’s core functionalities. Users and integrated systems can generate plots, retrieve history records, perform dry-run simulations, and now check the system health via a dedicated endpoint. This API complements the CLI interface and library usage, aligning with our mission to be the go-to plot library for formula visualisations.

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
- **Health Check Endpoint - GET /health**
  - Returns a JSON response with status information including current uptime, memory usage, and general service health.
  - Designed to support container orchestration readiness and monitoring tools.
- **Additional Endpoints:**
  - Endpoints for dry-run simulation, clearing history, and other functionalities can be added as needed to mirror CLI operations.

### Integration & Validation
- **Reuse Validation Logic:** Incorporate robust argument and payload validation (using Zod schemas) ensuring correct parameter formats across endpoints.
- **Error Handling:** Return clear HTTP error statuses and messages for invalid inputs using consistent messaging as used in the CLI.
- **Logging & Monitoring:** Integrate with the SYSTEM_MONITORING feature to log API usage and errors, including health check diagnostic logs.

## Testing and Documentation
- **Tests:** Add unit and integration tests for each endpoint, including the new health check endpoint, using existing frameworks (e.g., vitest) to validate expected behavior and error handling.
- **Documentation Updates:** Update README.md and CONTRIBUTING.md with detailed API usage examples, endpoint descriptions (including the new `/health` endpoint), and deployment instructions.

## Benefits
- **Programmatic Access:** Enables external systems to trigger plotting operations and monitor system health seamlessly via HTTP.
- **Operational Insight:** The dedicated health check endpoint provides vital runtime diagnostics, supporting automated monitoring and orchestration deployments.
- **Consistency:** Ensures uniform validation, logging, and error management across CLI and API interfaces, enhancing overall user experience.