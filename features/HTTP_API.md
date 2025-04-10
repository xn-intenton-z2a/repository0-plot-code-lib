# HTTP_API Feature Specification

## Overview
This feature integrates an HTTP API layer into the repository using Express. It exposes the core plotting functionality of the PLOT_ENGINE with enhanced endpoint validation, error handling, and auto-generated documentation. In this update, additional support for CORS, security enhancements, and explicit rate limiting are introduced to make the API more robust and production-ready, aligning with our mission of being the go-to plot library for formula visualisations.

## Endpoint Design and Validation
- **Server Setup:**
  - Create an Express-based server to handle HTTP requests.
  - Implement routes such as `/plot` which accept both GET and POST methods.
- **Input Handling with zod:**
  - Utilize the zod validation library to validate incoming query parameters or JSON bodies. Required fields such as formula, interval, and step must be provided in the correct format.
  - Clear error messages are returned when validation fails.
- **Route Implementation:**
  - **GET /plot:** Accepts query parameters (formula, interval in comma-separated numbers, and step).
  - **POST /plot:** Accepts a JSON body including the same fields.
  - Delegates valid input processing to the underlying PLOT_ENGINE to generate the ASCII plot.

## CORS, Security, and Rate Limiting Enhancements
- **CORS Middleware Integration:**
  - Implement middleware to support Cross-Origin Resource Sharing (CORS), ensuring safe access from web-based clients.
  - Handle preflight OPTIONS requests automatically.
- **Enhanced Security Measures:**
  - Enforce HTTP security headers such as Content-Security-Policy and X-Content-Type-Options to mitigate common web vulnerabilities.
  - Sanitize and validate all input data using zod and best practices.
- **Rate Limiting Integration:**
  - Introduce rate limiting to curb excessive requests and protect API resources. For instance, integrate a middleware (such as express-rate-limit) to restrict repeated requests within a set timeframe.
  - Return HTTP 429 responses with a message (e.g., "Too Many Requests – please try again later") when limits are exceeded.

## API Documentation Endpoint
- **Documentation Route:**
  - Add a `/docs` endpoint that auto-generates API documentation.
  - Supports output in JSON or plain HTML format (selectable via query parameter, e.g., `?format=json`).
  - Provides a summary of available endpoints along with parameter details and usage examples.

## Error Handling and Defaults
- **Validation Errors:**
  - Provide JSON-formatted error responses specifying which inputs failed validation.
  - Use appropriate HTTP status codes (e.g., 400 for bad requests, 429 for rate-limited requests).
- **Fallback Defaults:**
  - Apply default values for parameters (e.g., a default interval of [-10, 10] and standard step size) as necessary.

## Testing and Documentation
### Unit and Integration Tests
- Develop tests simulating both GET and POST requests to `/plot`.
- Validate that the `/docs` endpoint correctly serves documentation in both JSON and HTML formats.
- Test middleware functionality to ensure that CORS headers are set and preflight requests are managed.
- Validate rate limiting behavior by simulating requests that exceed the defined threshold and checking for HTTP 429 responses.

### Documentation Updates
- Update README.md and DOCUMENTATION.md with usage examples covering security headers, rate limiting, and CORS integration.
- Include troubleshooting guidelines for common issues, such as misconfigured CORS or exceeding rate limits.

## Usage Examples
- **Plot Request (GET):**
  - URL: http://localhost:3000/plot?formula=sin(x)&interval=-15,15&step=0.5
- **Plot Request (POST):**
  - URL: http://localhost:3000/plot
  - Body: { "formula": "x^2", "interval": "-10,10", "step": 1 }
- **API Documentation Access:**
  - URL: http://localhost:3000/docs or http://localhost:3000/docs?format=json
- **Rate Limiting Activation:**
  - Trigger rate limiting by issuing rapid, repeated requests to verify that the API returns HTTP 429 responses when the threshold is exceeded.
