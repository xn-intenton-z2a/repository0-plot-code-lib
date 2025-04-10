# HTTP_API Feature Specification

## Overview
This feature integrates an HTTP API layer into the repository using Express. It exposes the core plotting functionality of the PLOT_ENGINE with enhanced endpoint validation, error handling, and auto-generated documentation. In this update, additional support for CORS, security enhancements, explicit rate limiting, and comprehensive API logging are introduced to make the API more robust and production-ready. These improvements align with our mission of being the go-to plot library for formula visualisations.

## Endpoint Design and Validation
- **Server Setup:**
  - Create an Express-based server to handle HTTP requests.
  - Implement routes such as `/plot` which accept both GET and POST methods.

- **Input Handling with zod:**
  - Utilize the zod validation library to validate incoming query parameters or JSON bodies. Required fields such as formula, interval, and step must be provided in the correct format.
  - Provide clear error messages when validation fails.

- **Route Implementation:**
  - **GET /plot:** Accepts query parameters (formula, interval in comma-separated numbers, and step).
  - **POST /plot:** Accepts a JSON body including similar fields.
  - **Documentation Route (/docs):** Auto-generates API documentation in JSON or HTML format, selectable via query parameter (e.g., `?format=json`).

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

- **Integration with System Monitoring:**
  - Optionally tie the API logs to the SYSTEM_MONITORING feature to provide a consolidated view of runtime performance and health metrics.

## Error Handling and Fallbacks
- **Validation Errors:**
  - Provide JSON-formatted error responses that specify which inputs failed validation with appropriate HTTP status codes (e.g., 400 for bad requests, 429 for rate limited requests).

- **Default Parameter Values:**
  - Supply default values for parameters (e.g., a default interval or step size) when not provided by the user.

## Testing and Documentation
### Unit and Integration Tests
- Develop tests for both GET and POST requests to `/plot` validating correct response statuses and payload formats.
- Simulate requests to `/docs` to verify accurate and complete documentation output in both JSON and HTML formats.
- Test the logging middleware to ensure that request details and errors are correctly captured and formatted.
- Validate middleware behavior for CORS and rate limiting under various scenarios.

### Documentation Updates
- Update README.md and DOCUMENTATION.md with usage examples covering new API logging middleware.
- Include troubleshooting guidelines for common issues such as misconfigured CORS, rate limiting, or logging errors.

## Usage Examples
- **Plot Request (GET):**
  - URL: http://localhost:3000/plot?formula=sin(x)&interval=-15,15&step=0.5

- **Plot Request (POST):**
  - URL: http://localhost:3000/plot
  - Body: { "formula": "x^2", "interval": "-10,10", "step": 1 }

- **API Documentation Access:**
  - URL: http://localhost:3000/docs or http://localhost:3000/docs?format=json

- **API Logging in Action:**
  - Observe console or log file outputs that detail incoming requests, response statuses, and any errors encountered, especially when using the `--json-log` flag.
