# HTTP_API Feature Specification

## Overview
This feature integrates an HTTP API layer into the repository using Express. The HTTP API will expose the core plotting functionality provided by the existing PLOT_ENGINE. With this API, users can submit mathematical expressions and parameters via HTTP requests (GET/POST) and receive back an ASCII plot. This enhancement broadens the utility of our library, aligning with our mission to be the go-to plot library accessible via CLI, library imports, and now as a web service.

## Implementation Details
- **Endpoint Design:**
  - Create an Express-based server to handle requests.
  - Implement routes such as `/plot` which accepts query or JSON parameters including the formula, interval, and step.
  - Ensure both GET and POST methods are supported for flexibility.

- **Integration with PLOT_ENGINE:**
  - Leverage the existing PLOT_ENGINE functionality to compute and return the ASCII plot.
  - Wrap function calls to handle input validation and error messaging similar to the CLI.

- **Error Handling and Defaults:**
  - Validate all incoming parameters (e.g., mathematical expression, interval format, and step).
  - Provide structured JSON error responses for invalid requests.
  - Use default values (e.g., interval: [-10, 10], default step size) if parameters are missing or malformed.

- **Testing and Documentation:**
  - Add unit tests to verify that HTTP endpoints return the appropriate ASCII plot or error messages
  - Include integration tests that simulate HTTP requests and compare responses.
  - Update README.md and documentation to include usage examples for the HTTP API (both GET and POST examples).

## Usage Example
- **GET Request Example:**
  - URL: http://localhost:3000/plot?formula=sin(x)&interval=-15,15&step=0.5
- **POST Request Example:**
  - URL: http://localhost:3000/plot
  - Body: { "formula": "x^2", "interval": "-10,10", "step": 1 }

## Deployment Considerations
- This feature is designed to work in a single repository and can be easily started as a standalone HTTP server with minimal configuration.
- The introduction of Express as a dependency is already supported by the existing package.json, ensuring smooth integration.

