# HTTP_API Feature Specification (Enhanced with History Endpoints)

## Overview
This feature integrates an HTTP API layer into the repository using Express. It exposes the core plotting functionality of the PLOT_ENGINE with enhanced endpoint validation, error handling, and auto-generated documentation. In this update, additional support is provided for managing plot history records remotely. This includes endpoints for listing, updating, deleting, and exporting history entries that were originally handled via CLI in the PLOT_HISTORY feature. These improvements further align with our mission of being the go-to plot library for formula visualisations.

## Existing Endpoint Design and Validation
- **Server Setup:**
  - Create an Express-based server to handle HTTP requests.
  - Implement routes such as `/plot` which accept both GET and POST methods.
- **Input Handling with zod:**
  - Utilize the zod validation library to validate incoming query parameters or JSON bodies. Required fields such as formula, interval, and step must be provided in the correct format.
  - Provide clear error messages when validation fails.
- **Route Implementation:**
  - **GET /plot:** Accepts query parameters (formula, interval in comma-separated numbers, and step).
  - **POST /plot:** Accepts a JSON body with similar fields.
  - **Documentation Route (/docs):** Auto-generates API documentation in JSON or HTML format, selectable via query parameter (e.g., `?format=json`).

## New History Management Endpoints
To extend the usability of the system, the following endpoints have been added to manage plot history records:

- **GET /history:**
  - Retrieves a list of all previously recorded plot commands along with associated parameters, timestamps, and tags.
  - Supports filtering by query parameters (e.g., tag-based filtering) similar to the CLI functionality.

- **DELETE /history/:id:**
  - Deletes a specific history record identified by its unique identifier. This provides remote fine-grained control over stored commands.

- **PUT /history/:id:**
  - Updates the tags or other metadata associated with a specific history record. Users can send a JSON body with updated tag information.

- **POST /history/export:**
  - Exports the history records in a specified format (JSON or CSV). A query parameter (e.g., `?format=csv`) allows selection of the export format.

## CORS, Security, and Rate Limiting Enhancements
- **CORS Middleware Integration:**
  - Implement middleware to support Cross-Origin Resource Sharing (CORS) with proper handling of preflight OPTIONS requests.
- **Enhanced Security Measures:**
  - Enforce HTTP security headers such as Content-Security-Policy and X-Content-Type-Options.
  - Sanitize and validate all incoming data using zod and best practices.
- **Rate Limiting Integration:**
  - Integrate middleware (e.g., express-rate-limit) to restrict repeated requests within a set timeframe.
  - Return HTTP 429 responses with appropriate messages when limits are exceeded.

## API Logging Integration
- **Request and Response Logging:**
  - Implement middleware to capture and log details of every incoming HTTP request, including method, URL, payload (if applicable), and response status.
  - Record response times to help diagnose performance issues.
  - When the `--json-log` flag is active (or if configured for JSON output), log entries should be formatted in JSON.
- **Error Logging:**
  - On validation or processing errors, log detailed error information while ensuring sensitive data is not exposed.
  - Use correlation identifiers (if available) to trace specific request flows.

## Error Handling and Fallbacks
- **Validation Errors:**
  - Provide JSON-formatted error responses that specify which inputs failed validation with appropriate HTTP status codes (e.g., 400 for bad requests, 429 for rate-limited requests).
- **Default Parameter Values:**
  - Supply default values for parameters (e.g., a default interval or step size) when not provided by the user.

## Testing and Documentation
### Unit and Integration Tests
- Develop tests for both GET and POST requests to `/plot` validating correct response statuses and payload formats.
- Create tests for the new history endpoints to ensure correct behavior (e.g., listing, updating, and deleting records).
- Simulate requests to `/docs` to verify accurate and complete documentation output in both JSON and HTML formats.

### Documentation Updates
- Update README.md, DOCUMENTATION.md, and CONTRIBUTING.md with usage examples for the new history management endpoints.
- Include troubleshooting guidelines for common issues such as misconfigured CORS, rate limiting, or logging errors.

## Usage Examples
- **Plot Request (GET):**
  - URL: http://localhost:3000/plot?formula=sin(x)&interval=-15,15&step=0.5

- **Plot Request (POST):**
  - URL: http://localhost:3000/plot
  - Body: { "formula": "x^2", "interval": "-10,10", "step": 1 }

- **View History Records:**
  - URL: http://localhost:3000/history

- **Delete a History Record:**
  - URL: http://localhost:3000/history/<record_id> (DELETE request)

- **Update a History Record's Tags:**
  - URL: http://localhost:3000/history/<record_id> (PUT request with JSON body, e.g., { "tags": ["updatedTag1", "updatedTag2"] })

- **Export History Data:**
  - URL: http://localhost:3000/history/export?format=csv

## Summary
Integrating the history management endpoints into the HTTP API layer allows remote access to core functionalities already available via the CLI. This consolidation supports the mission of providing a versatile, accessible plot library while maintaining robust API security, logging, and error handling.