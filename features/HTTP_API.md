# HTTP_API Feature Specification

## Overview
This feature integrates an HTTP API layer into the repository using Express. The HTTP API exposes the core plotting functionality of the PLOT_ENGINE and now includes enhanced request validation and error handling using modern schema validation (via zod). This feature broadens the utility of our library by making it accessible via HTTP, aligning with our mission of being the go-to plot library and jq of formula visualisations.

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

## Integration with PLOT_ENGINE
- **Function Call:**
  - Leverage the existing PLOT_ENGINE functionalities including input validation, evaluation, and ASCII plot generation.
  - When errors occur in the plotting function, ensure structured error responses are sent as JSON.

## Error Handling and Defaults
- **Input Validation Errors:**
  - Return JSON-formatted error responses detailing which input did not pass validation.
  - Use HTTP status codes (e.g., 400 for bad requests).
- **Fallback Defaults:**
  - If parameters such as interval or step are missing, default values (e.g., interval: [-10, 10], standard step size) are applied.

## Security and Logging
- **Structured Logging:**
  - Integrate with the LOGGING feature to log HTTP request parameters and errors in a consistent format (plain text or JSON, based on configuration).
- **Basic Rate Limiting (Future Consideration):**
  - Although not implemented in the initial version, the API design keeps future enhancements in mind, such as rate limiting to prevent abuse.

## Testing and Documentation
- **Unit and Integration Tests:**
  - Develop tests to simulate both GET and POST requests, verifying successful responses and correct error messages when inputs are invalid.
  - Tests should also cover edge cases for missing or malformed parameters.

- **Documentation Updates:**
  - Update README.md and DOCUMENTATION.md with detailed usage examples for both GET and POST usage of the `/plot` endpoint.
  - Include examples demonstrating input validation errors and expected JSON error responses.

## Usage Example
- **GET Request Example:**
  - URL: http://localhost:3000/plot?formula=sin(x)&interval=-15,15&step=0.5
- **POST Request Example:**
  - URL: http://localhost:3000/plot
  - Body: { "formula": "x^2", "interval": "-10,10", "step": 1 }

This refined HTTP_API feature not only continues to expose the core plotting capabilities but also improves robustness and clarity in handling user input, ultimately enhancing the overall reliability and accessibility of the plotting library.