# Overview
This feature refines input validation, error handling, and extends plot generation by optionally exporting computed time series data. It leverages zod schema principles and RFC7807 compliant error responses, while now enabling clients to request the raw computed data points when needed.

# Input Validation and Error Handling
- Validate that the mathematical expression is non-empty and includes the variable x. If the expression starts with a 'y=' prefix, remove it prior to validation.
- Validate that the range parameter follows the format: x=<min>:<max>,y=<min>:<max>, allowing extra whitespace around delimiters. Numeric order is strictly enforced for both x and y ranges.
- When a validation error occurs, the system responds with either a plain text error or an RFC7807 compliant JSON error (when requested via Accept header: application/problem+json), ensuring clarity and consistency across both HTTP API and CLI usage.

# Time Series Data Export
- An optional query parameter, exportData, has been integrated into the /plot endpoint. When exportData is provided and truthy, after validating the expression and range, the system computes the time series data points. These points are returned as an array of objects containing corresponding x and y values.
- The JSON response will include the original expression, the provided range, and the computed data points, enabling clients to further analyze or process the numerical results without generating an image.

# CLI and HTTP Endpoint Updates
- For HTTP requests with appropriate query parameters, if exportData is truthy, the endpoint bypasses image generation. Instead, it returns a JSON response with detailed plotting data including the computed points.
- In cases where exportData is not provided, content negotiation is used to determine the response format (SVG, PNG, or JSON) based on the fileType, format query parameters, or Accept header.
- The CLI mode continues to support flags for expression, range, and file output. In this mode, the exportData functionality is not applicable.

# Testing and Documentation
- Unit tests cover scenarios for both the traditional visual plot generation and the new exportData JSON output, including tests for valid data, malformed ranges, missing parameters, and non-finite expression evaluations.
- README, USAGE, and documentation files have been updated to detail the new exportData parameter, complete with examples demonstrating how to request raw time series data.
- This enhancement delivers significant user impact by allowing direct access to plotted data, fostering integration with external data processing pipelines without the intermediary step of image generation.
