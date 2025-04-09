# HTTP_API Feature Specification

## Overview
This feature integrates an HTTP API layer into the repository using Express. It exposes the core plotting functionality of the PLOT_ENGINE with enhanced endpoint validation, error handling, and an auto-generated documentation endpoint. This extension not only broadens the utility of our library by making it accessible via HTTP, but also reinforces our mission of being the go-to plot library and the jq of formula visualisations.

## Endpoint Design and Validation
- **Server Setup:**
  - Create an Express-based server to handle HTTP requests.
  - Implement routes such as `/plot` which accepts both GET and POST methods.
- **Input Handling with zod:**
  - Use the zod validation library to validate incoming query parameters or JSON bodies, ensuring that required fields (formula, interval, and step) are provided in the correct format.
  - Provide clear error messages if validation fails.
- **Route Implementation:**
  - **GET /plot:** Accepts query parameters (formula, interval formatted as two comma separated numbers, and step).
  - **POST /plot:** Accepts a JSON body containing the same fields.
  - On valid input, delegate processing to the underlying PLOT_ENGINE to generate the ASCII plot.

## API Documentation Endpoint
- **Documentation Route:**
  - Introduce a new endpoint `/docs` that serves auto-generated API documentation.
  - The `/docs` endpoint should return either JSON or plain HTML (based on a query parameter like `?format=json`), summarizing available routes (`/plot`, `/docs`) along with parameter details and usage examples.
  - This helps both end-users and developers quickly reference usage details without consulting external documents.

## Error Handling and Defaults
- **Validation Errors:**
  - Return JSON-formatted error responses with details on which input did not pass validation.
  - Use appropriate HTTP status codes (e.g., 400 for bad requests).
- **Fallback Defaults:**
  - Apply default values for parameters (e.g., interval: [-10, 10], a standard step size) when necessary.

## Security, Logging, and Rate Limiting
- **Structured Logging:**
  - Integrate with the LOGGING feature to log HTTP request parameters and errors in a consistent format (plain text or JSON based on configuration).
- **Basic Rate Limiting Middleware:**
  - Implement a simple in-memory rate limiting mechanism to restrict incoming requests (e.g., a maximum number of requests per IP address per minute).
  - The middleware should be placed early in the request pipeline. When the rate limit is exceeded, return an HTTP 429 status code along with a descriptive error message.
  - This ensures that the API remains robust against abuse while maintaining performance for legitimate users.

## Testing and Documentation
- **Unit and Integration Tests:**
  - Develop tests simulating both GET and POST requests to `/plot` and verify that the `/docs` endpoint correctly serves documentation in both JSON and HTML formats.
  - Include tests to simulate rate limit conditions and ensure that requests exceeding the threshold receive the correct HTTP 429 response.
- **Documentation Updates:**
  - Update the README.md and DOCUMENTATION.md with detailed usage examples for both the API endpoints and rate limiting behavior.

## Usage Examples
- **Plot Request (GET):**
  - URL: http://localhost:3000/plot?formula=sin(x)&interval=-15,15&step=0.5
- **Plot Request (POST):**
  - URL: http://localhost:3000/plot
  - Body: { "formula": "x^2", "interval": "-10,10", "step": 1 }
- **API Documentation Access:**
  - URL: http://localhost:3000/docs or http://localhost:3000/docs?format=json
- **Rate Limiting Activation:**
  - Upon exceeding the defined request threshold, the API returns an HTTP 429 response with a message such as "Too Many Requests – please try again later."
