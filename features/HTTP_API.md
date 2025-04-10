# HTTP_API Feature Specification

## Overview
This feature integrates an HTTP API layer into the repository using Express. It exposes the core plotting functionality of the PLOT_ENGINE with enhanced endpoint validation, error handling, and auto-generated documentation. In this update, additional support for CORS and security enhancements is introduced to make the API more accessible and robust for modern web clients, aligning with our mission of being the go-to plot library for formula visualisations.

## Endpoint Design and Validation
- **Server Setup:**
  - Create an Express-based server to handle HTTP requests.
  - Implement routes such as `/plot` which accept both GET and POST methods.
- **Input Handling with zod:**
  - Use the zod validation library to validate incoming query parameters or JSON bodies, ensuring that required fields (formula, interval, and step) are provided in the correct format.
  - Provide clear error messages if validation fails.
- **Route Implementation:**
  - **GET /plot:** Accepts query parameters (formula, interval formatted as two comma separated numbers, and step).
  - **POST /plot:** Accepts a JSON body containing the same fields.
  - On valid input, delegate processing to the underlying PLOT_ENGINE to generate the ASCII plot.

## CORS and Security Enhancements
- **CORS Middleware Integration:**
  - Implement middleware using the `cors` package or custom headers to support Cross-Origin Resource Sharing (CORS), allowing the API to be safely accessed from web-based clients.
  - Automatically handle preflight OPTIONS requests to improve integration with front-end applications.
- **Enhanced Security Measures:**
  - Enforce HTTP security headers (such as Content-Security-Policy, X-Content-Type-Options, etc.) to protect against common web vulnerabilities.
  - Validate and sanitize all input data using zod and built-in Express security best practices.

## API Documentation Endpoint
- **Documentation Route:**
  - Introduce a new endpoint `/docs` that serves auto-generated API documentation.
  - The `/docs` endpoint should return documentation in JSON or plain HTML (based on a query parameter like `?format=json`), summarizing available routes (`/plot`, `/docs`) along with parameter details and usage examples.
  - This assists both end-users and developers in quickly referencing usage details without consulting external documents.

## Error Handling and Defaults
- **Validation Errors:**
  - Return JSON-formatted error responses with details on which input did not pass validation.
  - Use appropriate HTTP status codes (e.g., 400 for bad requests).
- **Fallback Defaults:**
  - Apply default values for parameters (e.g., interval: [-10, 10], a standard step size) when necessary.

## Testing and Documentation
### Unit and Integration Tests
- Develop tests simulating both GET and POST requests to `/plot` and verify that the `/docs` endpoint correctly serves documentation in both JSON and HTML formats.
- Include tests to verify that CORS headers are correctly set and that preflight OPTIONS requests are handled as expected.
- Simulate rate limit conditions and validate that requests exceeding thresholds receive the appropriate HTTP 429 response.

### Documentation Updates
- Update the README.md and DOCUMENTATION.md with detailed usage examples for API endpoints, including security considerations and CORS integration.
- Provide troubleshooting guidelines for common issues such as CORS misconfigurations or header-related errors.

## Usage Examples
- **Plot Request (GET):**
  - URL: http://localhost:3000/plot?formula=sin(x)&interval=-15,15&step=0.5
- **Plot Request (POST):**
  - URL: http://localhost:3000/plot
  - Body: { "formula": "x^2", "interval": "-10,10", "step": 1 }
- **API Documentation Access:**
  - URL: http://localhost:3000/docs or http://localhost:3000/docs?format=json
- **Preflight and CORS Verification:**
  - Preflight OPTIONS request sent automatically by browsers will receive the appropriate CORS headers, ensuring smooth integration with front-end applications.
- **Rate Limiting Activation:**
  - Upon exceeding the defined request threshold, the API returns an HTTP 429 response with a message such as "Too Many Requests – please try again later."