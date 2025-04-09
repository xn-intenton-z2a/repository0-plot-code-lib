# HTTP_API Feature Specification

## Overview
This feature integrates an HTTP API layer into the repository using Express. It exposes the core plotting functionality of the PLOT_ENGINE and includes enhanced endpoint validation, error handling, and now an auto-generated documentation endpoint. This extension not only broadens the utility of our library by making it accessible via HTTP, but also offers users immediate, self-served API documentation. This is aligned with our mission of being the go-to plot library and the jq of formula visualisations.

## Endpoint Design and Validation
- **Server Setup:**
  - Create an Express-based server to handle HTTP requests.
  - Implement routes such as `/plot` which accepts both GET and POST methods.

- **Input Handling with zod:**
  - Use the zod validation library to validate incoming query parameters or JSON bodies. This ensures that required fields (formula, interval, and step) are provided in the correct format.
  - Provide clear error messages if validation fails.

- **Route Implementation:**
  - **GET /plot:** Accepts query parameters (formula, interval formatted as two comma separated numbers, and step).
  - **POST /plot:** Accepts a JSON body containing the same fields.
  - On valid input, call the underlying PLOT_ENGINE to generate the ASCII plot.

## API Documentation Endpoint
- **New Documentation Route:**
  - Introduce a new endpoint `/docs` that serves auto-generated API documentation.
  - The `/docs` endpoint can return either JSON or plain HTML depending on a query parameter (e.g., `?format=json`), summarizing available routes (`/plot`, `/docs`) along with parameter details and usage examples.
  - This documentation aids both end-users and developers by providing a quick reference without the need to consult external documentation.

## Error Handling and Defaults
- **Input Validation Errors:**
  - Return JSON-formatted error responses detailing which input did not pass validation.
  - Use HTTP status codes (e.g., 400 for bad requests).
- **Fallback Defaults:**
  - If parameters such as interval or step are missing, default values (e.g., interval: [-10, 10], a standard step size) are applied.

## Security and Logging
- **Structured Logging:**
  - Integrate with the LOGGING feature to log HTTP request parameters and errors in a consistent format (plain text or JSON based on configuration).
- **Basic Rate Limiting (Future Consideration):**
  - Although not implemented initially, the API design keeps future enhancements like rate limiting in mind to prevent abuse.

## Testing and Documentation
- **Unit and Integration Tests:**
  - Develop tests to simulate both GET and POST requests to `/plot`, and check that the `/docs` endpoint correctly serves documentation in both formats.
  - Tests should verify that successful responses and proper error messages are delivered when inputs are invalid.
- **Documentation Updates:**
  - Update README.md and DOCUMENTATION.md with detailed usage examples for both GET and POST usage of the `/plot` endpoint as well as API documentation via `/docs`.

## Usage Example
- **GET Request Example for Plot:**
  - URL: http://localhost:3000/plot?formula=sin(x)&interval=-15,15&step=0.5
- **POST Request Example for Plot:**
  - URL: http://localhost:3000/plot
  - Body: { "formula": "x^2", "interval": "-10,10", "step": 1 }
- **API Documentation Access:**
  - URL: http://localhost:3000/docs or http://localhost:3000/docs?format=json
  - Expected output: An auto-generated guide of available routes with usage examples and parameter specifications.
