# Overview
This update refines input validation, error handling, and extends plot generation by optionally exporting the computed time series data. The enhancements build on zod schema integration and RFC7807 compliant error responses. In addition to validating input parameters and formatting error messages, the endpoint now supports an optional query parameter to return the evaluated data points as JSON for further analysis.

# ZOD SCHEMA INTEGRATION
- Implement zod schemas to validate the mathematical expression and range parameters. The expression must be a non-empty string that includes the variable x (after removing any leading 'y=' prefix). 
- Define a zod schema for ranges enforcing the format: x=<min>:<max>,y=<min>:<max> with optional extra whitespace. The schema checks that min and max are numeric and that the lower bound is strictly less than the upper bound for both axes.

# RFC7807 ERROR HANDLING
- Update error handling for both CLI and HTTP API endpoints. When a validation error occurs and the client requests a structured error (via Accept header: application/problem+json), return a JSON error conforming to RFC7807. The error object contains type, title, status, detail, and instance properties.
- If the client does not request structured error responses, continue to return plain text errors.

# TIME SERIES DATA EXPORT
- Add an optional query parameter (exportData) to the HTTP /plot endpoint. When exportData is provided and truthy, after validating the expression and range, compute the time series data points as an array of objects with x and y values.
- The endpoint will return an application/json response with the evaluated results (including the expression, range, and computed points) rather than an image. This feature enables clients to obtain raw data for further processing or analysis.
- The input validations (via zod schemas) and error handling remain active, so any malformed requests or non-finite computations trigger appropriate error responses.

# CLI AND HTTP ENDPOINT UPDATES
- For CLI usage, maintain the current flags for expression, range, and file output. The exportData functionality is prioritized in HTTP mode when query parameters are provided.
- For the HTTP /plot endpoint, check for the exportData parameter. If present, bypass the image generation and return the computed time series data in JSON format. Otherwise, use content negotiation to determine whether to generate an SVG, PNG, or default JSON response.

# TESTING AND DOCUMENTATION
- Extend unit tests to include scenarios where exportData is truthy. Validate that the JSON response includes the computed array of data points along with the original expression and range.
- Update README and usage documentation to describe the new exportData option with examples demonstrating how clients can request raw time series data.
