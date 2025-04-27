# Overview
This feature merges the plot validation and JSON export functionalities into a single, unified response handler on the /plot endpoint. The endpoint now provides robust validation of mathematical expressions and numeric ranges, alongside an optional detailed JSON export mode. When the client requests a JSON response with a truthy exportData parameter, the endpoint computes and returns an array of 100 time series data points along with the original expression and range. This consolidation removes redundancy, improves maintainability, and enhances user experience by providing both dynamic SVG visualizations and rich JSON data in one endpoint.

# Implementation
- Update the /plot endpoint to handle both SVG/PNG formatting and JSON export in a unified branch.
- When the requested output is application/json and exportData is truthy:
  - Parse and validate the expression and range parameters using enhanced expression validation (detecting missing operators and managing unbalanced parentheses).
  - Compute 100 evenly spaced x values according to the x-range, evaluate the expression for each x, and construct an array of objects with numeric x and y properties.
  - Return a JSON object including the original expression, range, and a data property with the computed time series. If exportData is falsy, follow the default JSON response structure.
- Ensure that SVG generation with dynamic axis labels and PNG fallback remain intact without interference.
- Maintain consistency in error handling and aggregated error reporting across query parameters.

# Testing
- Extend unit tests to verify that valid requests with exportData yield a JSON output containing an array of 100 data point objects.
- Confirm that error messages are aggregated when input validations (e.g., malformed range or missing variable in an expression) fail.
- Retain existing tests for SVG and PNG responses and confirm that dynamic axis labels and any optional custom formatting are preserved.
- Validate that the new unified response correctly merges the functionalities of the former PLOT_VALIDATION and JSON_EXPORT features.

# Impact
By merging the JSON export and plot validation features, this update simplifies the codebase and delivers a single authoritative endpoint that cleanly handles both visual rendering and data extraction. Users gain enhanced utility through direct access to raw numerical data for downstream applications without compromising the visual plot quality. This unified feature aligns with the project mission of serving as a go-to plot library with robust core functionality.