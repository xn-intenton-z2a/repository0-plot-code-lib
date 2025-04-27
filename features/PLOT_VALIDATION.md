# Overview
This update to the PLOT_VALIDATION feature integrates a new capability to export computed time series data. In addition to its existing validation for mathematical expressions and range parameters as well as SVG/PNG plot generation, the tool now supports an exportData feature. When clients include a truthy exportData query parameter and request a JSON response, the system computes an array of data points representing the function evaluation over the specified range.

# Input Validation and Error Handling
- Validates that the provided mathematical expression is non-empty and must include the variable x, with any 'y=' prefix removed prior to processing.
- Verifies that the range parameter adheres to the format: x=<min>:<max>,y=<min>:<max>, allowing extra whitespace. It enforces that for both x and y ranges, the lower bound is less than the upper bound.
- When multiple input errors occur, the system aggregates them and returns a combined error message. Errors are output either as plain text or as an RFC7807 compliant JSON error response when requested.

# Time Series Data Export
- A new branch in the implementation checks for the query parameter exportData. When present and if the output format is application/json, the endpoint bypasses image generation.
- Instead, the system computes 100 evenly spaced sample points over the defined x-range using the supplied mathematical expression.
- Each computed point is an object with corresponding x and y values. The JSON response includes the original expression, the specified range, and the computed array of data points. This enhancement enables clients to integrate the raw computed data into their own data processing pipelines.

# CLI and HTTP Endpoint Updates
- For HTTP clients, if the exportData parameter is provided with a JSON request, instead of generating an SVG or PNG image, the endpoint returns a detailed JSON object with computed time series data.
- CLI mode remains unchanged with respect to image file generation, ensuring that exportData functionality applies only to HTTP requests.
- The behavior is integrated with content negotiation so that if the output format is application/json and exportData is true, the raw data is returned.

# Testing and Documentation
- Unit tests have been updated to include scenarios that verify the presence and correctness of the computed data array when exportData is provided. New test cases assert that a JSON response includes a data array with 100 computed points.
- Documentation in the usage guide and README has been revised to detail this new exportData parameter. Examples demonstrate how to request raw time series data using URL query parameters.
- This enhancement brings significant value by enabling downstream analysis without requiring an intermediary image generation step.
